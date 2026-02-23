import { useChatStore } from '../src/store/useChatStore';

describe('useChatStore', () => {
    const initialState = useChatStore.getState();

    beforeEach(() => {
        useChatStore.setState(initialState);
    });

    it('should have initial sessions', () => {
        const state = useChatStore.getState();
        expect(state.sessions.length).toBe(2);
        expect(state.activeSessionId).toBeNull();
    });

    it('should set active session and clear unread count', () => {
        useChatStore.getState().setActiveSession('1');
        const state = useChatStore.getState();
        expect(state.activeSessionId).toBe('1');
        expect(state.sessions[0].id).toBe('1');
        expect(state.sessions[0].unread).toBe(0);
    });

    it('should add message to existing session', () => {
        const newMessage = {
            id: 'm100',
            sender: 'agent' as const,
            content: 'Hello customer',
            timestamp: '12:00'
        };
        useChatStore.getState().addMessage('2', newMessage);
        const state = useChatStore.getState();

        const session2 = state.sessions.find(s => s.id === '2');
        expect(session2?.messages.length).toBe(3);
        expect(session2?.messages[2].content).toBe('Hello customer');
    });
});
