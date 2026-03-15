import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader } from 'lucide-react';
import api from '../services/api';

const initialMessages = [
    {
        sender: 'ai',
        text: 'Hi traveler! 👋 I\'m your AI trip assistant. Ask me for destination ideas, itinerary tips, budget planning, or adventure activities.',
        createdAt: new Date().toISOString(),
    },
];

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(initialMessages);
    const [typing, setTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (open && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, open]);

    const updateMessages = (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
    };

    const handleSend = async () => {
        if (!message.trim()) return;

        const outgoing = { sender: 'user', text: message.trim(), createdAt: new Date().toISOString() };
        updateMessages(outgoing);
        setMessage('');
        setError('');
        setLoading(true);

        try {
            setTyping(true);
            const typingIndicator = { sender: 'ai', text: '✍️ Typing...', createdAt: new Date().toISOString(), typing: true };
            updateMessages(typingIndicator);

            const response = await api.post('/api/ai/chat', { message: outgoing.text });
            const replyText = response.data?.reply || 'Sorry, I am unable to respond right now.';

            setMessages((prev) => prev.filter((msg) => !msg.typing));
            updateMessages({ sender: 'ai', text: replyText, createdAt: new Date().toISOString() });
            setTyping(false);
        } catch (err) {
            console.error('AI chat error:', err);
            setTyping(false);
            setMessages((prev) => prev.filter((msg) => !msg.typing));
            const status = err?.response?.status;
            const errMessage = err?.response?.data?.detail || err?.response?.data?.message || err?.message || 'Unable to reach AI service, try again later.';
            const userMessage = `⚠️ AI service error${status ? ` (${status})` : ''}: ${errMessage}`;
            updateMessages({ sender: 'ai', text: userMessage, createdAt: new Date().toISOString() });
            setError(userMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
            {/* Chat Window */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="w-96 max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-200px)] card-glass flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center">
                                    <MessageCircle size={18} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">AI Travel Assistant</h3>
                                    <p className="text-xs text-white/50">Always here to help</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs px-4 py-2.5 rounded-2xl ${msg.sender === 'user'
                                                ? 'bg-gradient-to-r from-primary-600 to-cyan-600 text-white rounded-br-none'
                                                : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 rounded-bl-none'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 flex-shrink-0">
                            {error && (
                                <div className="mb-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                                    {error}
                                </div>
                            )}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    placeholder="Ask me anything..."
                                    className="flex-1 input-field !bg-white/5 text-sm py-2"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={loading || !message.trim()}
                                    className="p-2.5 bg-gradient-to-r from-primary-600 to-cyan-600 text-white rounded-lg hover:shadow-glow-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {loading ? (
                                        <Loader size={18} className="animate-spin" />
                                    ) : (
                                        <Send size={18} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-600 to-cyan-600 flex items-center justify-center text-white shadow-2xl hover:shadow-glow-blue transition-all duration-300"
            >
                {open ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </div>
    );
}
