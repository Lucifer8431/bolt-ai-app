import React from 'react';
import { motion } from 'framer-motion';
import { TeamMemberCard } from './TeamMemberCard';
import { teamMembers } from '../data/teamMembers';
import { TeamMember } from '../types';
import { Users, Zap, Brain } from 'lucide-react';

export function TeamView() {
  const handleMemberClick = (member: TeamMember) => {
    console.log('Member clicked:', member);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">AI Agent Team</h1>
        </div>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Meet your specialized AI agents, each designed to excel in different areas of development and collaboration.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="glass-card rounded-xl p-6 border border-purple-500/20 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{teamMembers.filter(m => m.status === 'online').length}</p>
          <p className="text-sm text-gray-400">Agents Online</p>
        </div>

        <div className="glass-card rounded-xl p-6 border border-purple-500/20 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">99.7%</p>
          <p className="text-sm text-gray-400">AI Accuracy</p>
        </div>

        <div className="glass-card rounded-xl p-6 border border-purple-500/20 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">{teamMembers.length}</p>
          <p className="text-sm text-gray-400">Total Agents</p>
        </div>
      </motion.div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TeamMemberCard member={member} onClick={handleMemberClick} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}