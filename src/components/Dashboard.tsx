import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Code, 
  Activity,
  TrendingUp,
  Zap,
  Brain,
  Rocket,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { teamMembers } from '../data/teamMembers';

export function Dashboard() {
  const stats = [
    { 
      icon: Users, 
      label: 'AI Agents', 
      value: teamMembers.length, 
      change: '+2 this week',
      href: '/team'
    },
    { 
      icon: MessageSquare, 
      label: 'Conversations', 
      value: 24, 
      change: '+12 today',
      href: '/chat'
    },
    { 
      icon: Code, 
      label: 'Code Generated', 
      value: '1.2k', 
      change: '+156 lines',
      href: '/editor'
    },
    { 
      icon: Activity, 
      label: 'Tasks Completed', 
      value: 89, 
      change: '+23 today',
      href: '/projects'
    },
  ];

  const quickActions = [
    {
      title: 'Start New Chat',
      description: 'Begin a conversation with your AI team',
      icon: MessageSquare,
      href: '/chat',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Generate Code',
      description: 'Create code with AI assistance',
      icon: Code,
      href: '/editor',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Manage Team',
      description: 'Configure your AI agents',
      icon: Users,
      href: '/team',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'View Analytics',
      description: 'Track your productivity metrics',
      icon: TrendingUp,
      href: '/analytics',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-3 mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-5xl font-bold gradient-text">AIX.dev</h1>
            <p className="text-gray-400 text-lg">AI Development Platform</p>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
        >
          Accelerate your development workflow with AI-powered agents, 
          intelligent code generation, and seamless collaboration tools.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center space-x-4"
        >
          <Link
            to="/chat"
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-semibold">Start Building</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/team"
            className="px-8 py-4 glass-light border border-purple-500/20 text-white rounded-xl hover:bg-purple-500/10 transition-all duration-300 flex items-center space-x-2"
          >
            <Users className="w-5 h-5" />
            <span className="font-semibold">Meet Your Team</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={stat.href}
              className="block glass-card rounded-xl p-6 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-purple-400" />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
              </div>
              
              <div className="space-y-2">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                <p className="text-xs text-green-400">{stat.change}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-8 border border-purple-500/20"
      >
        <div className="flex items-center space-x-3 mb-8">
          <Zap className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={action.href}
                className="block glass-light rounded-xl p-6 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-400">{action.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-8 border border-purple-500/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">AI System Status</h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-green-400 font-medium">All Systems Operational</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-light rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">AI Processing</span>
              <span className="text-sm font-bold text-green-400">98%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '98%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          <div className="glass-light rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Response Time</span>
              <span className="text-sm font-bold text-blue-400">1.2s</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1, delay: 0.7 }}
              />
            </div>
          </div>

          <div className="glass-light rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Accuracy</span>
              <span className="text-sm font-bold text-purple-400">99.7%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '99.7%' }}
                transition={{ duration: 1, delay: 0.9 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}