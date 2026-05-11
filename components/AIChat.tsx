import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { ChatMessage, ChatRole } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: ChatRole.MODEL,
      text: "Hi! I'm Birdie, 3legsbird's AI assistant. Ask me anything about the developer's skills or experience!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: ChatRole.USER,
      text: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponseText = await sendMessageToGemini(userMsg.text);
      
      const aiMsg: ChatMessage = {
        role: ChatRole.MODEL,
        text: aiResponseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] md:w-[350px] h-[60vh] md:h-[500px] bg-bird-card border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-float origin-bottom-right">
          
          {/* Header */}
          <div className="bg-bird-dark p-4 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-bird-accent/20 rounded-lg">
                 <Sparkles className="w-4 h-4 text-bird-accent" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Ask Birdie AI</h3>
                <div className="flex items-center gap-1">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                   <span className="text-xs text-slate-400">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-900/50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-2 ${msg.role === ChatRole.USER ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === ChatRole.USER ? 'bg-slate-700' : 'bg-bird-secondary/20'
                }`}>
                  {msg.role === ChatRole.USER ? <User size={14} /> : <Bot size={14} className="text-bird-secondary" />}
                </div>
                <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                  msg.role === ChatRole.USER 
                    ? 'bg-bird-accent text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex gap-2">
                 <div className="w-8 h-8 rounded-full bg-bird-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-bird-secondary" />
                 </div>
                 <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                      <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                    </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-bird-dark border-t border-slate-800">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about React, Skills..."
                className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-bird-accent transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-bird-accent text-white rounded-lg hover:bg-bird-accent/90 disabled:opacity-50 disabled:hover:bg-bird-accent transition-colors"
              >
                <Send size={14} />
              </button>
            </div>
            <div className="text-[10px] text-center text-slate-600 mt-2">
              Powered by Google Gemini 2.5
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-bird-accent hover:bg-bird-accent/90 text-white rounded-full shadow-lg hover:shadow-bird-accent/50 transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bird-pink opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-bird-pink"></span>
          </span>
        )}
      </button>
    </div>
  );
};