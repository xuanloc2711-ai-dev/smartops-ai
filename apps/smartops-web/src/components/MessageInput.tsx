"use client";

import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface MessageInputProps {
    onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (!inputText.trim()) return;
        onSend(inputText);
        setInputText('');
    };

    return (
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
    );
}
