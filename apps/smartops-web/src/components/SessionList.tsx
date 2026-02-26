"use client";

import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ChatSession {
    id: string;
    customerName: string;
    platform: 'zalo' | 'messenger';
    messages: { content: string }[];
    unread: number;
}

interface SessionListProps {
    sessions: ChatSession[];
    activeSessionId: string | null;
    onSelectSession: (id: string) => void;
}

export default function SessionList({ sessions, activeSessionId, onSelectSession }: SessionListProps) {
    return (
        <div className="w-1/3 border-r border-slate-200 flex flex-col bg-slate-50">
            <div className="p-4 border-b border-slate-200 bg-white shadow-sm z-10">
                <h2 className="font-semibold text-lg flex items-center gap-2 text-slate-800">
                    <MessageSquare size={20} className="text-blue-600" />
                    Inbox
                </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {sessions.map((session) => (
                    <div
                        key={session.id}
                        onClick={() => onSelectSession(session.id)}
                        className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors ${activeSessionId === session.id ? 'bg-blue-50 border-blue-200 shadow-inner' : ''
                            }`}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-slate-800 truncate pr-2">{session.customerName}</span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 capitalize shrink-0">
                                {session.platform}
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 truncate h-5">
                            {session.messages[session.messages.length - 1]?.content || 'No messages yet'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
