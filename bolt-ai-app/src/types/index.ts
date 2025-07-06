export interface TeamMember {
  id: string;
  name: string;
  role: 'developer' | 'designer' | 'researcher' | 'pm' | 'qa';
  avatar: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  specialty: string;
  experience: number;
  isAI: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'code' | 'file' | 'image';
  metadata?: {
    language?: string;
    fileName?: string;
    fileSize?: number;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  progress: number;
  deadline: Date;
  teamMembers: string[];
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  dueDate?: Date;
  tags: string[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  target: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface ResearchResult {
  id: string;
  query: string;
  results: {
    title: string;
    url: string;
    snippet: string;
    relevance: number;
  }[];
  timestamp: Date;
  requestedBy: string;
}