"use client";

import React from 'react';
import { useChatStore } from '../store/useChatStore';
import { MessageSquare } from 'lucide-react';
import SessionList from './SessionList';
import ChatArea from './ChatArea';
import MessageInput from './MessageInput';

export default function OmnichannelInbox() {
    const { sessions, activeSessionId, setActiveSession, addMessage } = useChatStore();

    const activeSession = sessions.find(s => s.id === activeSessionId);

    const handleSend = (text: string) => {
        if (!activeSessionId) return;
        addMessage(activeSessionId, {
            id: crypto.randomUUID(),
            sender: 'agent',
            content: text,
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        });
    };

    return (
        <div className="flex h-[600px] bg-white text-slate-900 border border-slate-200 rounded-lg overflow-hidden relative">
            <SessionList
                sessions={sessions}
                activeSessionId={activeSessionId}
                onSelectSession={setActiveSession}
            />

            <div className="flex-1 flex flex-col bg-white">
                {activeSession ? (
                    <>
                        <ChatArea session={activeSession} />
                        <MessageInput onSend={handleSend} />
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                        <MessageSquare size={48} className="mb-4 text-slate-300" />
                        <p>Chọn một phiên chat để bắt đầu</p>
                    </div>
                )}
            </div>
        </div>
    );
}
