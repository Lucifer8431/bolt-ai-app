import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Plus,
  BarChart3,
  Palette,
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

  return (
    <div
      style={{
        background: "#000000",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Exact MGX Layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "20px",
          position: "relative",
        }}
      >
        {/* Header Text - Exact Match */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "700",
              color: "#ffffff",
              margin: "0 0 16px 0",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
            }}
          >
            Dream, Chat, Create
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                color: "#ffffff",
                fontWeight: "400",
              }}
            >
              Your 24/7 AI Team
            </span>
            <div style={{ display: "flex", gap: "4px", marginLeft: "8px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#3b82f6",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#8b5cf6",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#ec4899",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#10b981",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#f59e0b",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Chat Container - Exact Match */}
        <div
          style={{
            width: "560px",
            height: "320px",
            background:
              "linear-gradient(135deg, rgba(88, 28, 135, 0.4) 0%, rgba(29, 78, 216, 0.4) 100%)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "32px",
            marginBottom: "40px",
            backdropFilter: "blur(20px)",
            position: "relative",
          }}
        >
          {/* Messages Area */}
          <div
            style={{
              height: "180px",
              marginBottom: "24px",
              position: "relative",
            }}
          >
            {messages.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  flexDirection: "column",
                }}
              >
                <Sparkles
                  style={{
                    width: "32px",
                    height: "32px",
                    color: "#a855f7",
                    marginBottom: "16px",
                  }}
                />
                <span style={{ color: "#d1d5db", fontSize: "16px" }}>
                  Start your conversation...
                </span>
              </div>
            ) : (
              <div
                style={{
                  height: "100%",
                  overflowY: "auto",
                  paddingRight: "8px",
                }}
              >
                <AnimatePresence>
                  {messages.map((message, index) => {
                    const sender = getSenderInfo(message.senderId);
                    if (!sender) return null;

                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                          display: "flex",
                          justifyContent: sender.isUser
                            ? "flex-end"
                            : "flex-start",
                          marginBottom: "12px",
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "70%",
                            padding: "12px 16px",
                            borderRadius: "16px",
                            background: sender.isUser
                              ? "rgba(255, 255, 255, 0.2)"
                              : "rgba(0, 0, 0, 0.3)",
                            color: "#ffffff",
                            fontSize: "14px",
                            lineHeight: "1.4",
                          }}
                        >
                          {!sender.isUser && (
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#a855f7",
                                marginBottom: "4px",
                              }}
                            >
                              {sender.name}
                            </div>
                          )}
                          {message.content}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <div
                      style={{
                        padding: "12px 16px",
                        borderRadius: "16px",
                        background: "rgba(0, 0, 0, 0.3)",
                        color: "#a855f7",
                        fontSize: "12px",
                      }}
                    >
                      AI is typing...
                    </div>
                  </motion.div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Exact Match */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              position: "absolute",
              bottom: "32px",
              left: "32px",
              right: "32px",
            }}
          >
            <button
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Plus
                style={{ width: "20px", height: "20px", color: "#ffffff" }}
              />
            </button>

            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell the AI what you want to build..."
              style={{
                flex: 1,
                height: "40px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                padding: "0 16px",
                color: "#ffffff",
                fontSize: "14px",
                outline: "none",
              }}
            />

            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "#ffffff",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: newMessage.trim() ? "pointer" : "not-allowed",
                opacity: newMessage.trim() ? 1 : 0.5,
              }}
            >
              <Send
                style={{ width: "18px", height: "18px", color: "#000000" }}
              />
            </button>
          </div>
        </div>

        {/* Quick Actions - Exact Match */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[
            { icon: BarChart3, label: "Dashboard", color: "#3b82f6" },
            { icon: Palette, label: "Startup UI", color: "#8b5cf6" },
            { icon: CreditCard, label: "Business Card", color: "#10b981" },
            { icon: Presentation, label: "PPT", color: "#f59e0b" },
            { icon: MoreHorizontal, label: "More", color: "#6b7280" },
          ].map((action, index) => (
            <button
              key={action.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                padding: "16px 12px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                cursor: "pointer",
                minWidth: "80px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: action.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <action.icon
                  style={{ width: "18px", height: "18px", color: "#ffffff" }}
                />
              </div>
              <span
                style={{
                  fontSize: "12px",
                  color: "#d1d5db",
                  fontWeight: "400",
                }}
              >
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
