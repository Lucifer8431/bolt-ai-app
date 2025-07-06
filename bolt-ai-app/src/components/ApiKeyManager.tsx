import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Eye, EyeOff, Save, Trash2, Plus, CheckCircle, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { aiService } from '../services/aiService';
import toast from 'react-hot-toast';

const API_SERVICES = [
  { id: 'openai', name: 'OpenAI', description: 'GPT models for chat and code generation' },
  { id: 'anthropic', name: 'Anthropic', description: 'Claude models for advanced reasoning' },
  { id: 'google', name: 'Google AI', description: 'Gemini models for multimodal AI' },
  { id: 'perplexity', name: 'Perplexity', description: 'Real-time research and web search' },
];

export function ApiKeyManager() {
  const { apiKeys, setApiKey, removeApiKey, user } = useStore();
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [keyValue, setKeyValue] = useState('');

  const handleSaveKey = async (service: string) => {
    if (!keyValue.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }

    try {
      if (user?.id) {
        const success = await aiService.saveApiKey(user.id, service, keyValue);
        if (success) {
          setApiKey(service, keyValue);
          toast.success(`${service.toUpperCase()} API key saved successfully`);
        } else {
          toast.error('Failed to save API key');
        }
      } else {
        setApiKey(service, keyValue);
        toast.success(`${service.toUpperCase()} API key saved locally`);
      }
      
      setEditingKey(null);
      setKeyValue('');
    } catch (error) {
      toast.error('Failed to save API key');
    }
  };

  const handleRemoveKey = (service: string) => {
    removeApiKey(service);
    toast.success(`${service.toUpperCase()} API key removed`);
  };

  const toggleKeyVisibility = (service: string) => {
    setShowKeys(prev => ({ ...prev, [service]: !prev[service] }));
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 4) + '•'.repeat(key.length - 8) + key.substring(key.length - 4);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 border border-purple-500/20"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Key className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold gradient-text">API Key Management</h2>
            <p className="text-gray-400">Configure your AI service API keys for enhanced functionality</p>
          </div>
        </div>

        <div className="space-y-4">
          {API_SERVICES.map((service) => {
            const hasKey = !!apiKeys[service.id];
            const isEditing = editingKey === service.id;
            const isVisible = showKeys[service.id];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-light rounded-xl p-4 border border-purple-500/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${hasKey ? 'bg-green-400' : 'bg-gray-500'}`} />
                    <div>
                      <h3 className="font-semibold text-white">{service.name}</h3>
                      <p className="text-sm text-gray-400">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {hasKey && (
                      <div className="flex items-center space-x-1 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs">Connected</span>
                      </div>
                    )}
                    {!hasKey && (
                      <div className="flex items-center space-x-1 text-gray-400">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs">Not configured</span>
                      </div>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {isEditing ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <input
                        type="password"
                        value={keyValue}
                        onChange={(e) => setKeyValue(e.target.value)}
                        placeholder={`Enter your ${service.name} API key`}
                        className="w-full px-4 py-3 glass-light border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400"
                      />
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSaveKey(service.id)}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center space-x-2"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setEditingKey(null);
                            setKeyValue('');
                          }}
                          className="px-4 py-2 glass-light border border-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/20 transition-all duration-300"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-between">
                      {hasKey ? (
                        <div className="flex items-center space-x-3">
                          <code className="text-sm text-gray-300 font-mono">
                            {isVisible ? apiKeys[service.id] : maskKey(apiKeys[service.id])}
                          </code>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleKeyVisibility(service.id)}
                            className="p-1 text-gray-400 hover:text-purple-400 transition-colors"
                          >
                            {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </motion.button>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">No API key configured</span>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setEditingKey(service.id);
                            setKeyValue(hasKey ? apiKeys[service.id] : '');
                          }}
                          className="p-2 glass-light border border-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-all duration-300"
                        >
                          {hasKey ? <Key className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </motion.button>
                        {hasKey && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRemoveKey(service.id)}
                            className="p-2 glass-light border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 glass-light rounded-lg border border-blue-500/20"
        >
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-blue-400 mb-1">Security Notice</h4>
              <p className="text-sm text-gray-400">
                Your API keys are stored securely and encrypted. They are only used to make requests to the respective AI services on your behalf.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}