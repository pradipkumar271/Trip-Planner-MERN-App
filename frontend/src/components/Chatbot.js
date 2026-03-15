import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader, Smile, Paperclip } from 'lucide-react';
import api from '../services/api';

const TYPING_MESSAGE_TEXT = 'Thinking about your next trip...';

const initialMessages = [
    {
        sender: 'ai',
        text: 'Hi traveler! I\'m your AI trip assistant. Ask me for destination ideas, itinerary tips, budget planning, or adventure activities.',
        createdAt: new Date().toISOString(),
    },
];

const TypingDots = () => (
    <span className="inline-flex items-center gap-1.5" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '0ms' }}></span>
        <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '120ms' }}></span>
        <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '240ms' }}></span>
    </span>
);

export default function Chatbot({ mode = 'floating', className = '' }) {
    const isEmbedded = mode === 'embedded';

    const [open, setOpen] = useState(isEmbedded);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(initialMessages);
    const [typing, setTyping] = useState(false);

    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        if (isEmbedded) {
            setOpen(true);
        }
    }, [isEmbedded]);

    useEffect(() => {
        if (open && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, open, typing]);

    useEffect(() => {
        if (!messagesContainerRef.current || !open) {
            return;
        }

        const container = messagesContainerRef.current;
        const nearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 120;

        if (nearBottom) {
            container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        }
    }, [messages, open]);

    const updateMessages = (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
    };

    const handleSend = async () => {
        if (!message.trim()) {
            return;
        }

        const outgoing = {
            sender: 'user',
            text: message.trim(),
            createdAt: new Date().toISOString(),
        };

        updateMessages(outgoing);
        setMessage('');
        setError('');
        setLoading(true);

        try {
            setTyping(true);
            updateMessages({
                sender: 'ai',
                text: TYPING_MESSAGE_TEXT,
                createdAt: new Date().toISOString(),
                typing: true,
            });

            const response = await api.post('/api/ai/chat', { message: outgoing.text });
            const replyText = response.data?.reply || 'Sorry, I am unable to respond right now.';

            setMessages((prev) => prev.filter((msg) => !msg.typing));
            updateMessages({ sender: 'ai', text: replyText, createdAt: new Date().toISOString() });
        } catch (err) {
            console.error('AI chat error:', err);
            setMessages((prev) => prev.filter((msg) => !msg.typing));

            const status = err?.response?.status;
            const errMessage =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                err?.message ||
                'Unable to reach AI service, try again later.';

            const userMessage = `AI service error${status ? ` (${status})` : ''}: ${errMessage}`;
            updateMessages({ sender: 'ai', text: userMessage, createdAt: new Date().toISOString() });
            setError(userMessage);
        } finally {
            setTyping(false);
            setLoading(false);
        }
    };

    const chatWindowClassName = isEmbedded
        ? 'h-[clamp(480px,72vh,760px)] w-full card-glass flex flex-col shadow-2xl'
        : 'w-96 max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-200px)] card-glass flex flex-col shadow-2xl';

    const chatHeader = (
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

            {!isEmbedded && (
                <button
                    onClick={() => setOpen(false)}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    aria-label="Close chatbot"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );

    const chatMessages = (
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
            {messages.map((msg, idx) => (
                <motion.div
                    key={`${msg.createdAt}-${idx}`}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div
                        className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${msg.sender === 'user'
                                ? 'bg-gradient-to-r from-primary-600 to-cyan-600 text-white rounded-br-none'
                                : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 rounded-bl-none'
                            }`}
                    >
                        {msg.typing ? (
                            <div className="flex items-center gap-2 text-sm text-white/80">
                                <TypingDots />
                                <span>{msg.text}</span>
                            </div>
                        ) : (
                            <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                        )}
                    </div>
                </motion.div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );

    const chatInput = (
        <div className="p-4 border-t border-white/10 flex-shrink-0">
            {error && (
                <div className="mb-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                    {error}
                </div>
            )}

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    title="Emoji support coming soon"
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    aria-label="Emoji support coming soon"
                >
                    <Smile size={18} />
                </button>

                <button
                    type="button"
                    title="Attachment support coming soon"
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    aria-label="Attachment support coming soon"
                >
                    <Paperclip size={18} />
                </button>

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
                    placeholder="Ask me anything about your trip..."
                    className="flex-1 input-field !bg-white/5 text-sm py-2"
                />

                <button
                    onClick={handleSend}
                    disabled={loading || !message.trim()}
                    className="p-2.5 bg-gradient-to-r from-primary-600 to-cyan-600 text-white rounded-lg hover:shadow-glow-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    aria-label="Send message"
                >
                    {loading ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
            </div>
        </div>
    );

    const chatWindow = (
        <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className={chatWindowClassName}
        >
            {chatHeader}
            {chatMessages}
            {chatInput}
        </motion.div>
    );

    if (isEmbedded) {
        return <div className={`w-full ${className}`}>{chatWindow}</div>;
    }

    return (
        <div className={`fixed bottom-24 sm:bottom-20 md:bottom-8 right-4 sm:right-6 z-40 flex flex-col items-end gap-4 ${className}`}>
            <AnimatePresence>
                {open && chatWindow}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-600 to-cyan-600 flex items-center justify-center text-white shadow-2xl hover:shadow-glow-blue transition-all duration-300"
                aria-label={open ? 'Close chatbot' : 'Open chatbot'}
            >
                {open ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </div>
    );
}
