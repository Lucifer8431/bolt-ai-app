import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Plus,
  Mic,
  Image,
  Code2,
  Zap,
  Sparkles,
  ArrowUp,
  Bot,
  User,
  Globe,
  Layers,
  Palette,
  Database,
  Settings,
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

  const quickPrompts = [
    "Build a modern landing page with React and Tailwind",
    "Create a REST API with Node.js and Express",
    "Design a mobile app interface for e-commerce",
    "Write unit tests for my React components",
  ];

  const toolCards = [
    {
      icon: Globe,
      title: "Web App",
      subtitle: "Full-stack application",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Layers,
      title: "UI Component",
      subtitle: "Reusable design system",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Database,
      title: "API Service",
      subtitle: "Backend & database",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Palette,
      title: "Brand Design",
      subtitle: "Logo & visual identity",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6 border-b border-white/5"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                AI Workshop
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>5 AI agents ready</span>
              </div>
            </div>
          </div>

          <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-200">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full text-center space-y-8"
              >
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <Sparkles className="w-12 h-12 text-purple-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    What shall we build today?
                  </h2>
                  <p className="text-lg text-gray-400 max-w-md">
                    Your AI development team is ready to help you create
                    anything from web apps to APIs.
                  </p>
                </div>

                {/* Quick Prompts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                  {quickPrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setNewMessage(prompt)}
                      className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 text-left group"
                    >
                      <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        "{prompt}"
                      </p>
                    </motion.button>
                  ))}
                </div>

                {/* Tool Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                  {toolCards.map((tool, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}
                      >
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-1">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-gray-400">{tool.subtitle}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
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
                        transition={{ duration: 0.3 }}
                        className={`flex items-start space-x-4 ${sender.isUser ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            sender.isUser
                              ? "bg-gradient-to-br from-purple-500 to-pink-500"
                              : "bg-white/10 border border-white/20"
                          }`}
                        >
                          {sender.isUser ? (
                            <User className="w-5 h-5 text-white" />
                          ) : (
                            <Bot className="w-5 h-5 text-purple-400" />
                          )}
                        </div>

                        <div
                          className={`flex-1 max-w-2xl ${sender.isUser ? "text-right" : ""}`}
                        >
                          <div
                            className={`p-4 rounded-2xl ${
                              sender.isUser
                                ? "bg-gradient-to-br from-purple-500/90 to-pink-500/90 text-white ml-8"
                                : "bg-white/5 border border-white/10 text-gray-100 mr-8"
                            }`}
                          >
                            {!sender.isUser && (
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-sm font-medium text-purple-400">
                                  {sender.name}
                                </span>
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                              </div>
                            )}
                            <p className="leading-relaxed whitespace-pre-wrap">
                              {message.content}
                            </p>
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
                    className="flex items-start space-x-4"
                  >
                    <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center">
                      <Bot className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mr-8">
                      <div className="flex items-center space-x-3">
                        <div className="typing-indicator">
                          <div className="typing-dot bg-purple-400"></div>
                          <div className="typing-dot bg-purple-400"></div>
                          <div className="typing-dot bg-purple-400"></div>
                        </div>
                        <span className="text-sm text-purple-400">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 border-t border-white/5"
          >
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="flex items-end space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 group">
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </button>
                    <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 group">
                      <Image className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </button>
                    <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 group">
                      <Code2 className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </button>
                  </div>

                  {/* Text Input */}
                  <div className="flex-1 relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Describe what you want to build..."
                      rows={1}
                      className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none py-3 px-4 max-h-32"
                      style={{ minHeight: "48px" }}
                    />
                  </div>

                  {/* Send Button */}
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      newMessage.trim()
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        : "bg-white/10 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ArrowUp className="w-5 h-5" />
                  </button>
                </div>

                {/* Voice Input */}
                <button className="absolute -top-6 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200">
                  <Mic className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-3">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
