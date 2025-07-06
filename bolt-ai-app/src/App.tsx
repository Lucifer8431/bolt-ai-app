import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { TeamView } from './components/TeamView';
import { ChatWindow } from './components/ChatWindow';
import { CodeEditor } from './components/CodeEditor';
import { Settings } from './components/Settings';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<TeamView />} />
            <Route path="/chat" element={<ChatWindow />} />
            <Route path="/editor" element={<CodeEditor />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/projects" element={<div className="text-center p-8 text-gray-500">Projects view coming soon...</div>} />
            <Route path="/design" element={<div className="text-center p-8 text-gray-500">Design System coming soon...</div>} />
            <Route path="/research" element={<div className="text-center p-8 text-gray-500">Research tools coming soon...</div>} />
            <Route path="/logs" element={<div className="text-center p-8 text-gray-500">Activity logs coming soon...</div>} />
            <Route path="/analytics" element={<div className="text-center p-8 text-gray-500">Analytics coming soon...</div>} />
          </Routes>
        </Layout>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(30, 41, 59, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '12px',
              color: '#e2e8f0',
            },
          }}
        />
      </Router>
    </QueryClientProvider>
  );
}

export default App;