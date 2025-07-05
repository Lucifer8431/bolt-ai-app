import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, TeamMember, Project } from '../types';

interface AppState {
  // User state
  user: any;
  setUser: (user: any) => void;

  // Messages state
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;

  // Team members state
  teamMembers: TeamMember[];
  setTeamMembers: (members: TeamMember[]) => void;
  updateMemberStatus: (id: string, status: string) => void;

  // Projects state
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;

  // API Keys state
  apiKeys: Record<string, string>;
  setApiKey: (service: string, key: string) => void;
  removeApiKey: (service: string) => void;

  // UI state
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  activeConversation: string | null;
  setActiveConversation: (id: string | null) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),

      // Messages state
      messages: [],
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      clearMessages: () => set({ messages: [] }),

      // Team members state
      teamMembers: [],
      setTeamMembers: (members) => set({ teamMembers: members }),
      updateMemberStatus: (id, status) => set((state) => ({
        teamMembers: state.teamMembers.map(member =>
          member.id === id ? { ...member, status } : member
        )
      })),

      // Projects state
      projects: [],
      addProject: (project) => set((state) => ({
        projects: [...state.projects, project]
      })),
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map(project =>
          project.id === id ? { ...project, ...updates } : project
        )
      })),

      // API Keys state
      apiKeys: {},
      setApiKey: (service, key) => set((state) => ({
        apiKeys: { ...state.apiKeys, [service]: key }
      })),
      removeApiKey: (service) => set((state) => {
        const { [service]: removed, ...rest } = state.apiKeys;
        return { apiKeys: rest };
      }),

      // UI state
      isTyping: false,
      setIsTyping: (typing) => set({ isTyping: typing }),
      activeConversation: null,
      setActiveConversation: (id) => set({ activeConversation: id }),
    }),
    {
      name: 'ai-team-storage',
      partialize: (state) => ({
        user: state.user,
        apiKeys: state.apiKeys,
        projects: state.projects,
      }),
    }
  )
);