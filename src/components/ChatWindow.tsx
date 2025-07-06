import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Plus,
  BarChart3,
  Layout,
  CreditCard,
  Presentation,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";
import { useChat } from "../hooks/useChat";
import { teamMembers } from "../data/teamMembers";
import { Message } from "../types";

export function ChatWindow() {
  const { messages, isTyping, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage, "user");
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSenderInfo = (senderId: string) => {
    if (senderId === "user") {
      return { name: "You", avatar: "👤", isUser: true };
    }
    const member = teamMembers.find((m) => m.id === senderId);
    return member
      ? { name: member.name, avatar: member.avatar, isUser: false }
      : null;
  };

  const quickActions = [
    { icon: BarChart3, label: "Dashboard", color: "from-blue-500 to-cyan-500" },
    { icon: Layout, label: "Startup UI", color: "from-purple-500 to-pink-500" },
    {
      icon: CreditCard,
      label: "Business Card",
      color: "from-green-500 to-emerald-500",
    },
    { icon: Presentation, label: "PPT", color: "from-orange-500 to-red-500" },
    {
      icon: MoreHorizontal,
      label: "More",
      color: "from-gray-500 to-slate-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* Main Content Container */}
      <div className="w-full max-w-4xl mx-auto">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4">
            Dream, Chat, Create
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-8">
            <h2 className="text-xl lg:text-2xl text-gray-300">
              Your 24/7 AI Team
            </h2>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 mb-8"
          style={{ minHeight: "400px" }}
        >
          {/* Messages Area */}
          <div className="min-h-[300px] mb-6">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-purple-300" />
                  </div>
                  <p className="text-gray-300 text-lg">
                    Tell the AI what you want to build...
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                <AnimatePresence>
                  {messages.map((message, index) => {
                    const sender = getSenderInfo(message.senderId);
                    if (!sender) return null;

                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`flex ${sender.isUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md p-4 rounded-2xl ${
                            sender.isUser
                              ? "bg-white/20 text-white"
                              : "bg-black/30 text-gray-200"
                          }`}
                        >
                          {!sender.isUser && (
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm">{sender.avatar}</span>
                              <span className="text-xs font-medium text-purple-300">
                                {sender.name}
                              </span>
                            </div>
                          )}
                          <p className="text-sm leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-black/30 px-4 py-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <div className="typing-indicator">
                          <div className="typing-dot"></div>
                          <div className="typing-dot"></div>
                          <div className="typing-dot"></div>
                        </div>
                        <span className="text-xs text-purple-300">
                          AI is thinking...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="relative">
            <div className="flex items-center space-x-3">
              <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200">
                <Plus className="w-5 h-5 text-white" />
              </button>

              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tell the AI what you want to build..."
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="p-4 bg-white text-black rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center space-x-4"
        >
          {quickActions.map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex flex-col items-center space-y-2 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 group"
            >
              <div
                className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
              >
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                {action.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
