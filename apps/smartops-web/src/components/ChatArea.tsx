"use client";

import React from 'react';
import { Phone, User } from 'lucide-react';

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
}

interface ChatAreaProps {
    session: ChatSession;
}

export default function ChatArea({ session }: ChatAreaProps) {
    return (
        <>
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <User size={20} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">{session.customerName}</h3>
                        <span className="text-xs text-slate-500 capitalize">{session.platform}</span>
                    </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Gọi khách">
                    <Phone size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {session.messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${msg.sender === 'agent'
                                ? 'bg-blue-600 text-white rounded-tr-sm'
                                : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
                                }`}
                        >
                            <p className="text-sm">{msg.content}</p>
                            <p className={`text-[10px] mt-1 text-right ${msg.sender === 'agent' ? 'text-blue-200' : 'text-slate-400'}`}>
                                {msg.timestamp}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
