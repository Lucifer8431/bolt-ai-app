import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface AppMemoryState {
  currentPage: string;
  sidebarCollapsed: boolean;
  userPreferences: {
    theme: "dark" | "light";
    animations: boolean;
    notifications: boolean;
  };
  recentProjects: string[];
  chatHistory: any[];
}

interface AppMemoryContextType {
  state: AppMemoryState;
  updateCurrentPage: (page: string) => void;
  toggleSidebar: () => void;
  updateUserPreferences: (
    preferences: Partial<AppMemoryState["userPreferences"]>,
  ) => void;
  addRecentProject: (projectId: string) => void;
  clearMemory: () => void;
}

const defaultState: AppMemoryState = {
  currentPage: "/dashboard",
  sidebarCollapsed: false,
  userPreferences: {
    theme: "dark",
    animations: true,
    notifications: true,
  },
  recentProjects: [],
  chatHistory: [],
};

const AppMemoryContext = createContext<AppMemoryContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "aix-app-memory";

export function AppMemoryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppMemoryState>(defaultState);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setState((prevState) => ({ ...prevState, ...parsedState }));
      }
    } catch (error) {
      console.warn("Failed to load app memory from localStorage:", error);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn("Failed to save app memory to localStorage:", error);
    }
  }, [state]);

  const updateCurrentPage = useCallback((page: string) => {
    setState((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setState((prev) => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
  }, []);

  const updateUserPreferences = useCallback(
    (preferences: Partial<AppMemoryState["userPreferences"]>) => {
      setState((prev) => ({
        ...prev,
        userPreferences: { ...prev.userPreferences, ...preferences },
      }));
    },
    [],
  );

  const addRecentProject = useCallback((projectId: string) => {
    setState((prev) => ({
      ...prev,
      recentProjects: [
        projectId,
        ...prev.recentProjects.filter((id) => id !== projectId),
      ].slice(0, 5), // Keep only 5 recent projects
    }));
  }, []);

  const clearMemory = useCallback(() => {
    setState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value: AppMemoryContextType = {
    state,
    updateCurrentPage,
    toggleSidebar,
    updateUserPreferences,
    addRecentProject,
    clearMemory,
  };

  return (
    <AppMemoryContext.Provider value={value}>
      {children}
    </AppMemoryContext.Provider>
  );
}

export function useAppMemory() {
  const context = useContext(AppMemoryContext);
  if (context === undefined) {
    throw new Error("useAppMemory must be used within an AppMemoryProvider");
  }
  return context;
}
