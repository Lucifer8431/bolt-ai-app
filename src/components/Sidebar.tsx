import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Users, 
  MessageCircle, 
  FolderOpen, 
  BarChart3, 
  Search, 
  Settings, 
  Code,
  Palette,
  Activity,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const navigationItems = [
  { icon: Home, label: 'Dashboard', path: '/', color: 'from-blue-500 to-cyan-500' },
  { icon: Users, label: 'AI Agents', path: '/team', color: 'from-purple-500 to-pink-500' },
  { icon: MessageCircle, label: 'Chat Hub', path: '/chat', color: 'from-green-500 to-emerald-500' },
  { icon: Code, label: 'Code Editor', path: '/editor', color: 'from-indigo-500 to-purple-500' },
  { icon: FolderOpen, label: 'Projects', path: '/projects', color: 'from-orange-500 to-red-500' },
  { icon: Palette, label: 'Design', path: '/design', color: 'from-pink-500 to-rose-500' },
  { icon: Search, label: 'Research', path: '/research', color: 'from-teal-500 to-cyan-500' },
  { icon: Activity, label: 'Activity', path: '/logs', color: 'from-yellow-500 to-orange-500' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics', color: 'from-violet-500 to-purple-500' },
  { icon: Settings, label: 'Settings', path: '/settings', color: 'from-gray-500 to-slate-500' },
];

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      className={`fixed left-0 top-16 bottom-0 ${
        isCollapsed ? 'w-20' : 'w-72'
      } glass border-r border-purple-500/20 transition-all duration-500 z-40`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="p-6 h-full flex flex-col">
        {/* Collapse Toggle */}
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 w-6 h-6 glass-card rounded-full flex items-center justify-center hover:bg-purple-500/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-purple-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-purple-400" />
          )}
        </motion.button>

        {/* AI Status */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card rounded-xl p-4 mb-6"
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-200">AI System Online</p>
                  <p className="text-xs text-gray-400">5 agents active</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link
                  to={item.path}
                  className={`group flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                      : 'hover:bg-purple-500/10 hover:border-purple-500/20 border border-transparent'
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r"
                      layoutId="activeIndicator"
                    />
                  )}
                  
                  {/* Icon */}
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} ${isActive ? 'shadow-lg' : 'opacity-70 group-hover:opacity-100'} transition-all duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex-1"
                      >
                        <span className={`font-medium transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {item.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass-card rounded-xl p-4 mt-6"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-gray-200">System Health</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Performance</span>
                  <span>98%</span>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}