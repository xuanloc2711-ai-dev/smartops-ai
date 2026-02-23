import { create } from 'zustand';

interface Message {
    id: string;
    sender: 'customer' | 'agent';
    content: string;
    timestamp: string;
}

interface ChatSession {
    id: string;
    customerName: string;
    platform: 'zalo' | 'messenger';
    messages: Message[];
    unread: number;
}

interface ChatStore {
    sessions: ChatSession[];
    activeSessionId: string | null;
    setActiveSession: (id: string) => void;
    addMessage: (sessionId: string, message: Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    sessions: [
        {
            id: '1',
            customerName: 'Nguyễn Văn A',
            platform: 'zalo',
            unread: 2,
            messages: [
                { id: 'm1', sender: 'customer', content: 'Shop tư vấn giá nhé', timestamp: '10:00' },
            ],
        },
        {
            id: '2',
            customerName: 'Trần Thị B',
            platform: 'messenger',
            unread: 0,
            messages: [
                { id: 'm2', sender: 'customer', content: 'Có giao về Long An không?', timestamp: '09:30' },
                { id: 'm3', sender: 'agent', content: 'Dạ bên em có giao toàn quốc ạ!', timestamp: '09:35' },
            ],
        },
    ],
    activeSessionId: null,
    setActiveSession: (id) => set((state) => ({ activeSessionId: id, sessions: state.sessions.map(s => s.id === id ? { ...s, unread: 0 } : s) })),
    addMessage: (sessionId, message) => set((state) => ({
        sessions: state.sessions.map((session) =>
            session.id === sessionId
                ? { ...session, messages: [...session.messages, message] }
                : session
        ),
    })),
}));
