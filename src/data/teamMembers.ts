import { TeamMember } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'developer',
    avatar: '👨‍💻',
    status: 'online',
    specialty: 'Full-Stack Development',
    experience: 8,
    isAI: true,
  },
  {
    id: '2',
    name: 'Sarah Design',
    role: 'designer',
    avatar: '👩‍🎨',
    status: 'online',
    specialty: 'UI/UX Design',
    experience: 6,
    isAI: true,
  },
  {
    id: '3',
    name: 'Dr. Research',
    role: 'researcher',
    avatar: '🔬',
    status: 'online',
    specialty: 'Data Analysis & Research',
    experience: 10,
    isAI: true,
  },
  {
    id: '4',
    name: 'Mike Manager',
    role: 'pm',
    avatar: '👔',
    status: 'busy',
    specialty: 'Agile Project Management',
    experience: 12,
    isAI: true,
  },
  {
    id: '5',
    name: 'Tina Tester',
    role: 'qa',
    avatar: '🧪',
    status: 'online',
    specialty: 'Quality Assurance',
    experience: 7,
    isAI: true,
  },
];

export const roleColors = {
  developer: 'bg-blue-500',
  designer: 'bg-purple-500',
  researcher: 'bg-green-500',
  pm: 'bg-orange-500',
  qa: 'bg-pink-500',
};

export const statusColors = {
  online: 'bg-green-500',
  busy: 'bg-yellow-500',
  away: 'bg-gray-500',
  offline: 'bg-red-500',
};