import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { ModernSidebar } from "./components/ModernSidebar";
import { Hero } from "./components/Hero";
import { DashboardPage } from "./pages/DashboardPage";
import { ChatPage } from "./pages/ChatPage";
import { AgentsPage } from "./pages/AgentsPage";
import { EditorPage } from "./pages/EditorPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { DesignPage } from "./pages/DesignPage";
import { Settings } from "./components/Settings";
import { ApiKeySetup } from "./components/ApiKeySetup";
import { useStore } from "./store/useStore";
import { AppMemoryProvider } from "./contexts/AppMemoryContext";

const queryClient = new QueryClient();

function AppContent() {
  const [showApiSetup, setShowApiSetup] = useState(false);
  const { apiKeys } = useStore();
  const location = useLocation();

  useEffect(() => {
    // Show API setup if user navigates to /chat and no OpenAI key is configured
    if (location.pathname === "/chat" && !apiKeys.openai) {
      setShowApiSetup(true);
    }
  }, [location.pathname, apiKeys.openai]);

  if (showApiSetup) {
    return <ApiKeySetup onComplete={() => setShowApiSetup(false)} />;
  }

  // Show hero page without layout for landing
  if (location.pathname === "/" || location.pathname === "/landing") {
    return <Hero />;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <ModernSidebar />
      <main className="flex-1 ml-64 overflow-hidden">
        <div className="h-screen overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/design" element={<DesignPage />} />
            <Route path="/settings" element={<Settings />} />
            {/* Redirect from app routes to dashboard */}
            <Route path="/app" element={<DashboardPage />} />
            <Route path="/app/*" element={<DashboardPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "rgba(17, 24, 39, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "12px",
              color: "#f9fafb",
            },
          }}
        />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
