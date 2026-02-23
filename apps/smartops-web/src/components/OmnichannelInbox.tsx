"use client";

import React, { useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { MessageSquare, Phone, Send, User } from 'lucide-react';

export default function OmnichannelInbox() {
    const { sessions, activeSessionId, setActiveSession, addMessage } = useChatStore();
    const [inputText, setInputText] = useState('');

    const activeSession = sessions.find(s => s.id === activeSessionId);

    const handleSend = () => {
        if (!inputText.trim() || !activeSessionId) return;
        addMessage(activeSessionId, {
            id: crypto.randomUUID(),
            sender: 'agent',
            content: inputText,
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        });
        setInputText('');
    };

    return (
        <div className="flex h-[600px] bg-white text-slate-900 border border-slate-200 rounded-lg overflow-hidden relative">
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
                            onClick={() => setActiveSession(session.id)}
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

            <div className="flex-1 flex flex-col bg-white">
                {activeSession ? (
                    <>
                        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white shadow-sm z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">{activeSession.customerName}</h3>
                                    <span className="text-xs text-slate-500 capitalize">{activeSession.platform}</span>
                                </div>
                            </div>
                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Gọi khách">
                                <Phone size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                            {activeSession.messages.map((msg) => (
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

                        <div className="p-4 border-t border-slate-200 bg-white">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Nhập tin nhắn..."
                                    className="flex-1 border border-slate-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    onClick={handleSend}
                                    className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"
                                >
                                    <Send size={18} className="translate-x-[1px]" />
                                </button>
                            </div>
                        </div>
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
