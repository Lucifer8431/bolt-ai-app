import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Plus,
  Mic,
  Image,
  Code2,
  ArrowUp,
  Bot,
  User,
  Sparkles,
  Paperclip,
} from "lucide-react";
import { useChat } from "../hooks/useChat";
import { teamMembers } from "../data/teamMembers";
import { Message } from "../types";

export function ChatPage() {
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
    "Build a React component with TypeScript",
    "Create a Node.js API endpoint",
    "Design a mobile-first UI",
    "Help me debug this code",
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Chat Hub</h1>
            <p className="text-gray-400">
              Collaborate with your AI development team
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {teamMembers.slice(0, 3).map((member, index) => (
              <div key={member.id} className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-xs">
                  {member.avatar}
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 ${
                    member.status === "online" ? "bg-green-400" : "bg-gray-500"
                  } rounded-full border border-gray-900`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">
                Start a conversation
              </h2>
              <p className="text-gray-400 max-w-md">
                Ask your AI team anything - from code reviews to architecture
                decisions.
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
                  className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-200 text-left group"
                >
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    "{prompt}"
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
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
                    transition={{ duration: 0.3 }}
                    className={`flex items-start space-x-4 ${sender.isUser ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        sender.isUser
                          ? "bg-gradient-to-br from-purple-500 to-pink-500"
                          : "bg-gray-800 border border-gray-700"
                      }`}
                    >
                      {sender.isUser ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-purple-400" />
                      )}
                    </div>

                    <div
                      className={`flex-1 max-w-3xl ${sender.isUser ? "text-right" : ""}`}
                    >
                      <div
                        className={`p-4 rounded-xl ${
                          sender.isUser
                            ? "bg-purple-600 text-white ml-8"
                            : "bg-gray-800 border border-gray-700 text-gray-100 mr-8"
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
                <div className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-purple-400" />
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mr-8">
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
      <div className="p-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button className="p-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200">
                <Paperclip className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200">
                <Image className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200">
                <Code2 className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Text Input */}
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your AI team anything..."
                rows={1}
                className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none py-3 px-4 max-h-32"
                style={{ minHeight: "48px" }}
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`p-3 rounded-lg transition-all duration-200 ${
                newMessage.trim()
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-3">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
