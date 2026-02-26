import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

interface QueueItem {
    id: string;
    action: 'UPDATE_STATUS' | 'UPLOAD_IMAGE';
    payload: Record<string, unknown>;
    timestamp: Date;
}

const QUEUE_STORAGE_KEY = '@offline_queue';

export function useOfflineQueue() {
    const [queue, setQueue] = useState<QueueItem[]>([]);
    const [isOnline, setIsOnline] = useState(true); // Mock network status
    const [isInitialized, setIsInitialized] = useState(false);

    // S2 fix: Load queue from AsyncStorage on mount
    useEffect(() => {
        const loadQueue = async () => {
            try {
                const stored = await AsyncStorage.getItem(QUEUE_STORAGE_KEY);
                if (stored) {
                    setQueue(JSON.parse(stored));
                }
            } catch (error) {
                console.error('Failed to load offline queue', error);
            } finally {
                setIsInitialized(true);
            }
        };
        loadQueue();
    }, []);

    // S2 fix: Save queue to AsyncStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            AsyncStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue)).catch(err => {
                console.error('Failed to save offline queue', err);
            });
        }
    }, [queue, isInitialized]);

    const addToQueue = useCallback((action: QueueItem['action'], payload: Record<string, unknown>) => {
        const newItem: QueueItem = {
            id: uuidv4(), // S1 fix: Reliable UUID instead of Math.random
            action,
            payload,
            timestamp: new Date(),
        };

        if (isOnline) {
            // Process immediately
            // UI Layer will handle success/failure state
        } else {
            // Enqueue
            setQueue((prev: QueueItem[]) => [...prev, newItem]);
        }
    }, [isOnline]);

    const toggleNetwork = () => setIsOnline((prev: boolean) => !prev);

    const processQueue = useCallback(() => {
        if (queue.length > 0 && isOnline) {
            // Giả lập xử lý thành công
            setQueue([]);
        }
    }, [queue, isOnline]);

    return {
        queue,
        isOnline,
        toggleNetwork,
        addToQueue,
        processQueue
    };
}
