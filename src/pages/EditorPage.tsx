import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Play,
  Save,
  Download,
  Share,
  Settings,
  FileText,
  Folder,
  Plus,
  Terminal,
  Zap,
} from "lucide-react";

export function EditorPage() {
  const [code, setCode] = useState(`// Welcome to AI Code Editor
import React from 'react';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="app">
      <h1>Hello, World!</h1>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}

export default App;`);

  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("Ready to run code...");

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
  ];

  const files = [
    { name: "App.js", active: true, type: "javascript" },
    { name: "styles.css", active: false, type: "css" },
    { name: "package.json", active: false, type: "json" },
  ];

  const aiSuggestions = [
    "Add error handling to this function",
    "Optimize this component for performance",
    "Generate unit tests for this code",
    "Convert to TypeScript",
    "Add responsive design",
  ];

  return (
    <div className="h-full flex">
      {/* File Explorer */}
      <div
        className="w-64 border-r border-purple-500/30 flex flex-col"
        style={{
          background:
            "linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(168, 85, 247, 0.9))",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-medium">Files</h3>
            <button className="p-1 hover:bg-gray-700 rounded">
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-2">
          {files.map((file, index) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                file.active
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm">{file.name}</span>
            </motion.div>
          ))}
        </div>

        {/* AI Suggestions */}
        <div className="p-4 border-t border-gray-700">
          <h4 className="text-white font-medium mb-3 flex items-center">
            <Zap className="w-4 h-4 text-purple-400 mr-2" />
            AI Suggestions
          </h4>
          <div className="space-y-2">
            {aiSuggestions.slice(0, 3).map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left text-xs text-gray-400 hover:text-purple-400 transition-colors p-2 hover:bg-gray-800 rounded"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Editor Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-white">Code Editor</h1>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-800 border border-gray-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center space-x-1 text-sm"
            >
              <Play className="w-4 h-4" />
              <span>Run</span>
            </motion.button>
            <button className="p-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg">
              <Save className="w-4 h-4" />
            </button>
            <button className="p-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg">
              <Share className="w-4 h-4" />
            </button>
            <button className="p-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Code Editor */}
          <div className="flex-1 relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none outline-none"
              style={{
                fontFamily: "JetBrains Mono, Fira Code, monospace",
                lineHeight: "1.6",
                tabSize: 2,
              }}
              spellCheck={false}
            />

            {/* Line Numbers */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800 border-r border-gray-700 p-4 font-mono text-xs text-gray-500">
              {code.split("\n").map((_, index) => (
                <div key={index} className="leading-6">
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Output Panel */}
          <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col">
            <div className="p-3 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-white font-medium flex items-center">
                <Terminal className="w-4 h-4 mr-2" />
                Output
              </h3>
              <button className="text-gray-400 hover:text-white text-sm">
                Clear
              </button>
            </div>

            <div className="flex-1 p-4">
              <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
                {output}
              </pre>
            </div>

            {/* AI Assistant Panel */}
            <div className="border-t border-gray-700 p-4">
              <h4 className="text-white font-medium mb-3 flex items-center">
                <Code className="w-4 h-4 text-purple-400 mr-2" />
                AI Assistant
              </h4>
              <div className="space-y-2">
                <button className="w-full text-left text-sm bg-gray-800 hover:bg-gray-700 p-3 rounded-lg text-gray-300 transition-colors">
                  Explain this code
                </button>
                <button className="w-full text-left text-sm bg-gray-800 hover:bg-gray-700 p-3 rounded-lg text-gray-300 transition-colors">
                  Find bugs
                </button>
                <button className="w-full text-left text-sm bg-gray-800 hover:bg-gray-700 p-3 rounded-lg text-gray-300 transition-colors">
                  Optimize performance
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
