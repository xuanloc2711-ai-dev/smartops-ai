/**
 * useOfflineQueue - Unit tests
 * Validates S1 (UUID) & S2 (AsyncStorage persistence) audit fixes
 */

// Mock AsyncStorage before importing hook
const mockAsyncStorage: Record<string, string> = {};
jest.mock('@react-native-async-storage/async-storage', () => ({
    __esModule: true,
    default: {
        getItem: jest.fn((key: string) => Promise.resolve(mockAsyncStorage[key] ?? null)),
        setItem: jest.fn((key: string, value: string) => {
            mockAsyncStorage[key] = value;
            return Promise.resolve();
        }),
        removeItem: jest.fn((key: string) => {
            delete mockAsyncStorage[key];
            return Promise.resolve();
        }),
    },
}));

// Mock uuid
jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mocked-uuid-v4-value'),
}));

import { renderHook, act } from '@testing-library/react-native';
import { useOfflineQueue } from '../src/hooks/useOfflineQueue';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('useOfflineQueue', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Clear mock storage
        Object.keys(mockAsyncStorage).forEach(key => delete mockAsyncStorage[key]);
    });

    it('should initialize with empty queue and online status', async () => {
        const { result } = renderHook(() => useOfflineQueue());

        // Wait for async initialization
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        expect(result.current.queue).toEqual([]);
        expect(result.current.isOnline).toBe(true);
    });

    it('should load persisted queue from AsyncStorage on mount (S2)', async () => {
        const savedQueue = [
            { id: 'saved-1', action: 'UPDATE_STATUS', payload: {}, timestamp: new Date().toISOString() }
        ];
        mockAsyncStorage['@offline_queue'] = JSON.stringify(savedQueue);

        const { result } = renderHook(() => useOfflineQueue());

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        expect(AsyncStorage.getItem).toHaveBeenCalledWith('@offline_queue');
        expect(result.current.queue.length).toBe(1);
        expect(result.current.queue[0].id).toBe('saved-1');
    });

    it('should add item to queue with UUID when offline (S1 + S2)', async () => {
        const { result } = renderHook(() => useOfflineQueue());

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        // Toggle to offline
        act(() => {
            result.current.toggleNetwork();
        });

        expect(result.current.isOnline).toBe(false);

        // Add to queue
        await act(async () => {
            result.current.addToQueue('UPDATE_STATUS', { orderId: '123', status: 'DELIVERED' });
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        expect(result.current.queue.length).toBe(1);
        expect(result.current.queue[0].id).toBe('mocked-uuid-v4-value'); // S1: UUID not Math.random
        expect(result.current.queue[0].action).toBe('UPDATE_STATUS');
    });

    it('should persist queue to AsyncStorage when items change (S2)', async () => {
        const { result } = renderHook(() => useOfflineQueue());

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        // Go offline
        act(() => {
            result.current.toggleNetwork();
        });

        // Add item to trigger save
        await act(async () => {
            result.current.addToQueue('UPLOAD_IMAGE', { imageUrl: 'photo.jpg' });
            await new Promise(resolve => setTimeout(resolve, 100));
        });

        // AsyncStorage.setItem should have been called with the queue data
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
            '@offline_queue',
            expect.any(String)
        );
    });

    it('should clear queue when processQueue is called while online', async () => {
        const { result } = renderHook(() => useOfflineQueue());

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        // Go offline, add items
        act(() => {
            result.current.toggleNetwork();
        });

        await act(async () => {
            result.current.addToQueue('UPDATE_STATUS', { status: 'DONE' });
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        expect(result.current.queue.length).toBe(1);

        // Go back online
        act(() => {
            result.current.toggleNetwork();
        });

        // Process queue
        await act(async () => {
            result.current.processQueue();
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        expect(result.current.queue).toEqual([]);
    });

    it('should toggle network status', async () => {
        const { result } = renderHook(() => useOfflineQueue());

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
        });

        expect(result.current.isOnline).toBe(true);

        act(() => {
            result.current.toggleNetwork();
        });
        expect(result.current.isOnline).toBe(false);

        act(() => {
            result.current.toggleNetwork();
        });
        expect(result.current.isOnline).toBe(true);
    });
});
