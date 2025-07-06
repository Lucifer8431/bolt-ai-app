import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  MessageCircle,
  Code,
  Users,
  Activity,
  Plus,
  ArrowRight,
  Zap,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export function DashboardPage() {
  const stats = [
    {
      icon: MessageCircle,
      label: "Conversations",
      value: "247",
      change: "+12%",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Code,
      label: "Code Generated",
      value: "1.2k",
      change: "+23%",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      label: "Active Agents",
      value: "5",
      change: "+1",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: CheckCircle,
      label: "Tasks Completed",
      value: "89",
      change: "+15%",
      color: "from-orange-500 to-red-500",
    },
  ];

  const recentActivity = [
    {
      action: "Generated React component",
      agent: "Alex Chen",
      time: "2 minutes ago",
      status: "completed",
    },
    {
      action: "Reviewed API design",
      agent: "Sarah Design",
      time: "5 minutes ago",
      status: "completed",
    },
    {
      action: "Created unit tests",
      agent: "Tina Tester",
      time: "12 minutes ago",
      status: "completed",
    },
    {
      action: "Project planning session",
      agent: "Mike Manager",
      time: "1 hour ago",
      status: "completed",
    },
  ];

  const quickActions = [
    {
      title: "Start New Chat",
      description: "Begin conversation with AI team",
      icon: MessageCircle,
      href: "/chat",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Create Project",
      description: "Initialize new development project",
      icon: Plus,
      href: "/projects",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Open Editor",
      description: "Start coding with AI assistance",
      icon: Code,
      href: "/editor",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Welcome back! Here's what's happening with your AI team.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">
                {stat.change}
              </span>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-xl p-6 border border-purple-500/20"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Zap className="w-5 h-5 text-purple-400 mr-2" />
              Quick Actions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={action.title}
                to={action.href}
                className="group p-4 rounded-lg border border-purple-500/30 hover:border-purple-500/50 transition-all duration-200 hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(168, 85, 247, 0.8))",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-medium text-white mb-1">{action.title}</h3>
                <p className="text-sm text-gray-400">{action.description}</p>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-400 mt-2 transition-colors" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Activity className="w-5 h-5 text-green-400 mr-2" />
              Recent Activity
            </h2>
            <Link
              to="/logs"
              className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium">
                    {activity.action}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-purple-400">
                      {activity.agent}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
          AI System Performance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Response Time</span>
              <span className="text-sm font-medium text-green-400">
                1.2s avg
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "88%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Accuracy Rate</span>
              <span className="text-sm font-medium text-blue-400">99.7%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "99.7%" }}
                transition={{ duration: 1, delay: 0.7 }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Uptime</span>
              <span className="text-sm font-medium text-purple-400">99.9%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "99.9%" }}
                transition={{ duration: 1, delay: 0.9 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
