import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Smile, Code, Image, Zap, Brain, Sparkles, MessageCircle } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { teamMembers } from '../data/teamMembers';
import { Message } from '../types';
import { format } from 'date-fns';

export function ChatWindow() {
  const { messages, isTyping, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage, 'user');
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSenderInfo = (senderId: string) => {
    if (senderId === 'user') {
      return { name: 'You', avatar: '👤', isUser: true };
    }
    const member = teamMembers.find(m => m.id === senderId);
    return member ? { name: member.name, avatar: member.avatar, isUser: false } : null;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        className="glass-card rounded-t-2xl p-6 border border-purple-500/20 border-b-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">AI Chat Hub</h1>
              <p className="text-gray-400 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>{teamMembers.filter(m => m.status === 'online').length} agents online</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {teamMembers.slice(0, 4).map((member, index) => (
              <motion.div
                key={member.id}
                className="relative"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-sm">
                  {member.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${
                  member.status === 'online' ? 'bg-green-400' : 'bg-gray-500'
                } rounded-full border border-gray-800`} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 glass-card border-x border-purple-500/20">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Start a conversation</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Ask your AI team anything - from code generation to project planning, they're here to help.
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((message, index) => {
            const sender = getSenderInfo(message.senderId);
            if (!sender) return null;

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`flex ${sender.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${sender.isUser ? 'order-2' : 'order-1'}`}>
                  <div className={`relative p-4 rounded-2xl ${
                    sender.isUser 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white ml-4' 
                      : 'glass-light border border-purple-500/20 text-gray-200 mr-4'
                  }`}>
                    {!sender.isUser && (
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">{sender.avatar}</span>
                        <span className="text-sm font-medium text-purple-400">{sender.name}</span>
                        <Brain className="w-3 h-3 text-purple-400" />
                      </div>
                    )}
                    
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <p className={`text-xs ${
                        sender.isUser ? 'text-purple-100' : 'text-gray-400'
                      }`}>
                        {format(message.timestamp, 'HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex justify-start"
          >
            <div className="glass-light border border-purple-500/20 px-6 py-4 rounded-2xl mr-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
                <span className="text-xs text-purple-400">AI thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <motion.div
        className="glass-card rounded-b-2xl p-6 border border-purple-500/20 border-t-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 glass-light rounded-xl hover:bg-purple-500/20 transition-all duration-300"
            >
              <Paperclip className="w-5 h-5 text-gray-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 glass-light rounded-xl hover:bg-purple-500/20 transition-all duration-300"
            >
              <Code className="w-5 h-5 text-gray-400" />
            </motion.button>
          </div>

          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your AI team anything..."
              className="w-full px-6 py-4 glass-light border border-purple-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400 transition-all duration-300"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}