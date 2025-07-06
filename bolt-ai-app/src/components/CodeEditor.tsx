import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Save, Download, FileText, Code, Sparkles, Brain } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import toast from 'react-hot-toast';

export function CodeEditor() {
  const { generateCode } = useChat();
  const [code, setCode] = useState(`// Welcome to AI Team Code Editor
// Your AI team members can help you write, review, and optimize code

function createAwesomeApp() {
  const features = [
    'AI-powered development',
    'Real-time collaboration',
    'Automated testing',
    'Code optimization'
  ];
  
  return {
    name: 'AI Team Platform',
    features,
    status: 'Building the future!'
  };
}

console.log(createAwesomeApp());`);

  const [language, setLanguage] = useState('javascript');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState('');

  const handleGenerateCode = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a code generation prompt');
      return;
    }

    setIsGenerating(true);
    try {
      const generatedCode = await generateCode(prompt, language);
      if (generatedCode) {
        setCode(generatedCode);
        toast.success('Code generated successfully!');
      }
    } catch (error) {
      toast.error('Failed to generate code. Please check your API keys.');
    } finally {
      setIsGenerating(false);
      setPrompt('');
    }
  };

  const handleRunCode = () => {
    if (language === 'javascript') {
      try {
        // Create a safe execution environment
        const originalLog = console.log;
        const logs: string[] = [];
        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        // Execute the code
        eval(code);
        
        // Restore console.log
        console.log = originalLog;
        
        setOutput(logs.join('\n') || 'Code executed successfully (no output)');
        toast.success('Code executed successfully!');
      } catch (error) {
        setOutput(`Error: ${error}`);
        toast.error('Code execution failed');
      }
    } else {
      setOutput(`Code execution for ${language} is not supported in the browser`);
      toast.info(`${language} execution not supported`);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 border border-purple-500/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold gradient-text">AI Code Editor</h2>
              <p className="text-gray-400">Write, generate, and execute code with AI assistance</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-2 glass-light border border-purple-500/20 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="react">React</option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
            </select>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRunCode}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center space-x-2 shadow-glow"
            >
              <Play className="w-4 h-4" />
              <span>Run</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center space-x-2 shadow-glow"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </motion.button>
          </div>
        </div>

        {/* AI Code Generation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 p-4 glass-light rounded-xl border border-purple-500/10"
        >
          <div className="flex items-center space-x-2 mb-3">
            <Brain className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">AI Code Generator</h3>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what code you want to generate..."
              className="flex-1 px-4 py-3 glass-light border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && handleGenerateCode()}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerateCode}
              disabled={isGenerating}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2 shadow-glow disabled:opacity-50"
            >
              {isGenerating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
            </motion.button>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Code Editor */}
          <div className="lg:col-span-2">
            <div className="glass-light rounded-xl overflow-hidden border border-purple-500/10">
              <div className="flex items-center justify-between p-4 border-b border-purple-500/10">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-2">main.{language === 'javascript' ? 'js' : language === 'typescript' ? 'ts' : language}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">Lines: {code.split('\n').length}</span>
                </div>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 bg-transparent text-green-400 font-mono text-sm resize-none outline-none p-4 placeholder-gray-500"
                spellCheck={false}
                placeholder="Start coding or use AI to generate code..."
              />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-4">
            {/* AI Assistant */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-light rounded-xl p-4 border border-purple-500/10"
            >
              <div className="flex items-center space-x-2 mb-3">
                <Brain className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold text-white">AI Assistant</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="p-3 glass-card rounded-lg">
                  <p className="text-purple-400 font-medium mb-1">💡 Code Analysis</p>
                  <p className="text-gray-400">Your code looks great! Here are some suggestions:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-400 mt-2 text-xs">
                    <li>Consider adding error handling</li>
                    <li>Add type definitions for better IDE support</li>
                    <li>Consider using const instead of let where possible</li>
                  </ul>
                </div>
              </div>
            </motion.div>
            
            {/* Output */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-light rounded-xl p-4 border border-purple-500/10"
            >
              <div className="flex items-center space-x-2 mb-3">
                <FileText className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-white">Output</h3>
              </div>
              <div className="glass-card rounded-lg p-3 min-h-[200px]">
                <div className="text-green-400 font-mono text-sm">
                  <div className="text-gray-400 mb-2">{'>'} {language} execution</div>
                  <pre className="whitespace-pre-wrap text-green-400">
                    {output || 'No output yet. Click "Run" to execute your code.'}
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}