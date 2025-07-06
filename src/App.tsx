import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { Layout } from "./components/Layout";
import { Hero } from "./components/Hero";
import { Dashboard } from "./components/Dashboard";
import { TeamView } from "./components/TeamView";
import { ChatWindow } from "./components/ChatWindow";
import { CodeEditor } from "./components/CodeEditor";
import { Settings } from "./components/Settings";
import { ApiKeySetup } from "./components/ApiKeySetup";
import { useStore } from "./store/useStore";

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
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/team" element={<TeamView />} />
        <Route path="/chat" element={<ChatWindow />} />
        <Route path="/editor" element={<CodeEditor />} />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/projects"
          element={
            <div className="text-center p-8 text-gray-500">
              Projects view coming soon...
            </div>
          }
        />
        <Route
          path="/design"
          element={
            <div className="text-center p-8 text-gray-500">
              Design System coming soon...
            </div>
          }
        />
        <Route
          path="/research"
          element={
            <div className="text-center p-8 text-gray-500">
              Research tools coming soon...
            </div>
          }
        />
        <Route
          path="/logs"
          element={
            <div className="text-center p-8 text-gray-500">
              Activity logs coming soon...
            </div>
          }
        />
        <Route
          path="/analytics"
          element={
            <div className="text-center p-8 text-gray-500">
              Analytics coming soon...
            </div>
          }
        />
      </Routes>
    </Layout>
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
              background: "rgba(30, 41, 59, 0.9)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "12px",
              color: "#e2e8f0",
            },
          }}
        />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
