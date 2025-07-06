import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Settings, Zap, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-purple-500/20"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
                AIX.dev
              </h1>
              <p className="text-xs text-gray-400">AI Platform</p>
            </div>
          </Link>
        </motion.div>

        {/* Search */}
        <motion.div 
          className="flex-1 max-w-2xl mx-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Search agents, projects, or ask AI anything..."
              className="w-full pl-12 pr-6 py-3 glass-light rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-gray-200 placeholder-gray-400 transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs bg-gray-700/50 text-gray-400 rounded border border-gray-600">⌘K</kbd>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 glass-card rounded-xl hover:bg-purple-500/10 transition-all duration-300 relative group"
          >
            <Bell className="w-5 h-5 text-gray-300 group-hover:text-purple-400 transition-colors" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          </motion.button>
          
          <Link to="/settings">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 glass-card rounded-xl hover:bg-purple-500/10 transition-all duration-300 group"
            >
              <Settings className="w-5 h-5 text-gray-300 group-hover:text-purple-400 transition-colors" />
            </motion.button>
          </Link>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 glass-card px-4 py-2 rounded-xl cursor-pointer group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">Developer</p>
              <p className="text-xs text-gray-400">Ready to build</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
}