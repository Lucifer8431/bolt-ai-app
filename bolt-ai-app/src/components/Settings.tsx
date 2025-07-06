import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';
import { ApiKeyManager } from './ApiKeyManager';

export function Settings() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 border border-purple-500/20"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Settings</h1>
            <p className="text-gray-400">Configure your AI Team Platform preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: User, label: 'Profile', description: 'Manage your account' },
            { icon: Bell, label: 'Notifications', description: 'Configure alerts' },
            { icon: Shield, label: 'Privacy', description: 'Security settings' },
            { icon: Palette, label: 'Appearance', description: 'Theme preferences' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-light rounded-xl p-4 border border-purple-500/10 hover:bg-purple-500/10 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center space-x-3 mb-2">
                <item.icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <h3 className="font-semibold text-white">{item.label}</h3>
              </div>
              <p className="text-sm text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <ApiKeyManager />
    </div>
  );
}