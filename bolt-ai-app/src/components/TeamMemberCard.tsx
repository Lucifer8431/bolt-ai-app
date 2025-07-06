import React from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from '../types';
import { roleColors, statusColors } from '../data/teamMembers';
import { Zap, Star, TrendingUp, Brain } from 'lucide-react';

interface TeamMemberCardProps {
  member: TeamMember;
  onClick?: (member: TeamMember) => void;
}

export function TeamMemberCard({ member, onClick }: TeamMemberCardProps) {
  const getRoleGradient = (role: string) => {
    const gradients = {
      developer: 'from-blue-500 to-cyan-500',
      designer: 'from-purple-500 to-pink-500',
      researcher: 'from-green-500 to-emerald-500',
      pm: 'from-orange-500 to-red-500',
      qa: 'from-pink-500 to-rose-500',
    };
    return gradients[role as keyof typeof gradients] || 'from-gray-500 to-slate-500';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      online: 'from-green-400 to-emerald-500',
      busy: 'from-yellow-400 to-orange-500',
      away: 'from-gray-400 to-slate-500',
      offline: 'from-red-400 to-rose-500',
    };
    return colors[status as keyof typeof colors] || 'from-gray-400 to-slate-500';
  };

  return (
    <motion.div
      className="glass-card rounded-2xl p-6 border border-purple-500/20 card-hover group cursor-pointer relative overflow-hidden"
      whileHover={{ scale: 1.02, y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(member)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* AI Badge */}
      {member.isAI && (
        <motion.div
          className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 shadow-glow"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <Brain className="w-3 h-3" />
          <span>AI</span>
        </motion.div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl shadow-glow group-hover:shadow-glow-lg transition-all duration-300"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {member.avatar}
            </motion.div>
            
            {/* Status indicator */}
            <motion.div
              className={`absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br ${getStatusColor(member.status)} rounded-full border-2 border-gray-800 shadow-lg`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          <div className="flex-1">
            <motion.h3
              className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {member.name}
            </motion.h3>
            <motion.p
              className="text-gray-400 text-sm font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              {member.specialty}
            </motion.p>
          </div>
        </div>

        {/* Role Badge */}
        <motion.div
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r ${getRoleGradient(member.role)} text-white text-sm font-medium shadow-lg mb-4`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Zap className="w-4 h-4" />
          <span>{member.role.toUpperCase()}</span>
        </motion.div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 glass-light rounded-lg">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Experience</span>
            </div>
            <span className="text-sm font-bold text-white">
              {member.experience} years
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 glass-light rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Status</span>
            </div>
            <span className={`text-sm font-bold capitalize ${
              member.status === 'online' ? 'text-green-400' :
              member.status === 'busy' ? 'text-yellow-400' :
              member.status === 'away' ? 'text-gray-400' :
              'text-red-400'
            }`}>
              {member.status}
            </span>
          </div>

          {/* Performance indicator */}
          <div className="p-3 glass-light rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">AI Performance</span>
              <span className="text-sm font-bold text-purple-400">98%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '98%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Interaction hint */}
        <motion.div
          className="mt-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
        >
          <p className="text-xs text-purple-400 font-medium">
            Click to start collaboration
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}