import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageCircle,
  Code,
  Palette,
  Database,
  Settings,
  Activity,
  Star,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import { teamMembers } from "../data/teamMembers";

export function AgentsPage() {
  const agentStats = [
    { label: "Active Agents", value: "5", color: "text-green-400" },
    { label: "Total Conversations", value: "247", color: "text-blue-400" },
    { label: "Code Generated", value: "1.2k", color: "text-purple-400" },
    { label: "Avg Response Time", value: "1.2s", color: "text-orange-400" },
  ];

  const getAgentIcon = (role: string) => {
    switch (role) {
      case "developer":
        return Code;
      case "designer":
        return Palette;
      case "researcher":
        return Database;
      case "pm":
        return Users;
      case "qa":
        return Activity;
      default:
        return Code;
    }
  };

  const getAgentColor = (role: string) => {
    switch (role) {
      case "developer":
        return "from-blue-500 to-cyan-500";
      case "designer":
        return "from-purple-500 to-pink-500";
      case "researcher":
        return "from-green-500 to-emerald-500";
      case "pm":
        return "from-orange-500 to-red-500";
      case "qa":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-400";
      case "busy":
        return "bg-yellow-400";
      case "away":
        return "bg-gray-400";
      case "offline":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Agents</h1>
          <p className="text-gray-400 mt-1">
            Manage and interact with your specialized AI development team
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Agent</span>
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {agentStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="text-2xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((agent, index) => {
          const AgentIcon = getAgentIcon(agent.role);
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-200 group hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Agent Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${getAgentColor(agent.role)} rounded-xl flex items-center justify-center`}
                  >
                    <AgentIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{agent.name}</h3>
                    <p className="text-sm text-gray-400 capitalize">
                      {agent.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 ${getStatusColor(agent.status)} rounded-full`}
                  />
                  <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Agent Info */}
              <div className="space-y-3 mb-4">
                <div>
                  <span className="text-sm text-gray-400">Specialty:</span>
                  <p className="text-sm text-white">{agent.specialty}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Experience:</span>
                  <p className="text-sm text-white">{agent.experience} years</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Rating:</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="text-sm text-gray-400 ml-1">4.9</span>
                  </div>
                </div>
              </div>

              {/* Agent Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors flex items-center justify-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat</span>
                </button>
                <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              {/* Performance Indicator */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400">Performance</span>
                  <span className="text-xs text-green-400">98%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "98%" }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Team Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <h2 className="text-xl font-semibold text-white mb-6">
          Team Performance Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Response Times</h3>
            <div className="space-y-3">
              {teamMembers.slice(0, 3).map((agent, index) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-400">{agent.name}</span>
                  <span className="text-sm text-green-400">
                    {(Math.random() * 2 + 0.5).toFixed(1)}s
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Tasks Completed</h3>
            <div className="space-y-3">
              {teamMembers.slice(0, 3).map((agent, index) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-400">{agent.name}</span>
                  <span className="text-sm text-blue-400">
                    {Math.floor(Math.random() * 50 + 20)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Accuracy Rate</h3>
            <div className="space-y-3">
              {teamMembers.slice(0, 3).map((agent, index) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-400">{agent.name}</span>
                  <span className="text-sm text-purple-400">
                    {(Math.random() * 5 + 95).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
