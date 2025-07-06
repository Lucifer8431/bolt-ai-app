import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  MessageCircle,
  Code,
  Users,
  FolderOpen,
  Palette,
  Search,
  Settings,
  Zap,
  User,
  ChevronLeft,
  Activity,
  Bell,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppMemory } from "../contexts/AppMemoryContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home, badge: null },
  { name: "Chat Hub", href: "/chat", icon: MessageCircle, badge: "3" },
  { name: "AI Agents", href: "/agents", icon: Users, badge: null },
  { name: "Code Editor", href: "/editor", icon: Code, badge: null },
  { name: "Projects", href: "/projects", icon: FolderOpen, badge: "2" },
  { name: "Design", href: "/design", icon: Palette, badge: null },
];

export function ModernSidebar() {
  const location = useLocation();
  const { state, updateCurrentPage, toggleSidebar } = useAppMemory();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(2);

  // Update current page in memory when location changes
  useEffect(() => {
    if (location.pathname !== state.currentPage) {
      updateCurrentPage(location.pathname);
    }
  }, [location.pathname, state.currentPage, updateCurrentPage]);

  const filteredNavigation = navigation.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {state.sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -320 }}
        animate={{
          x: 0,
          width: state.sidebarCollapsed ? 280 : 320,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`fixed left-0 top-0 bottom-0 glass-sidebar flex flex-col z-50 ${
          state.sidebarCollapsed ? "w-70" : "w-80"
        } lg:relative lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold gradient-text">AIX.dev</h1>
                <p className="text-sm text-gray-400 font-medium">AI Platform</p>
              </div>
            </div>

            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors lg:hidden"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-800/50">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search agents, projects..."
              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-400 focus-modern transition-all duration-300 hover:bg-gray-800/70"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-3 h-3 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-800/50">
          <motion.div
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800/30 transition-all duration-300 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 status-indicator" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                Developer
              </p>
              <p className="text-xs text-green-400 font-medium">
                Ready to build
              </p>
            </div>
            {notifications > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative"
              >
                <Bell className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">
                    {notifications}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* AI Status */}
        <div className="p-4 border-b border-gray-800/50">
          <motion.div
            className="glass-light rounded-xl p-4 hover:bg-gray-800/20 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white">
                AI System
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full status-indicator" />
                <span className="text-xs text-green-400 font-medium">
                  Online
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Active Agents</span>
                <span className="text-xs font-semibold text-purple-400">
                  5/5
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {filteredNavigation.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  <Link
                    to={item.href}
                    className={`sidebar-link flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden ${
                      isActive
                        ? "active text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/30"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 transition-all duration-300 ${
                        isActive
                          ? "text-purple-400"
                          : "text-gray-400 group-hover:text-purple-400"
                      }`}
                    />
                    <span className="relative z-10">{item.name}</span>

                    {item.badge && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto px-2 py-1 bg-purple-500 text-white text-xs rounded-full font-semibold"
                      >
                        {item.badge}
                      </motion.div>
                    )}

                    {isActive && (
                      <motion.div
                        layoutId="activeBackground"
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20"
                        transition={{
                          type: "spring",
                          bounce: 0.15,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {searchQuery && filteredNavigation.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">No matches found</p>
            </div>
          )}
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-800/50">
          <div className="space-y-2">
            <Link
              to="/settings"
              className="sidebar-link flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/30 transition-all duration-300 group"
            >
              <Settings className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
              <span>Settings</span>
            </Link>

            <motion.button
              onClick={() => setNotifications(0)}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/30 transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Activity className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
              <span>Activity</span>
              {notifications > 0 && (
                <div className="ml-auto w-2 h-2 bg-red-500 rounded-full" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
