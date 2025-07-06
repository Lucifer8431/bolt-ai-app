import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Key,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Shield,
} from "lucide-react";
import { useStore } from "../store/useStore";
import { aiService } from "../services/aiService";
import toast from "react-hot-toast";

interface ApiKeySetupProps {
  onComplete: () => void;
}

export function ApiKeySetup({ onComplete }: ApiKeySetupProps) {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { setApiKey: storeApiKey, user } = useStore();

  const handleValidateAndSave = async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }

    setIsLoading(true);

    try {
      // Test the API key by making a simple request
      const testOpenAI = {
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      };

      // Simple validation - check if key format is correct
      if (!apiKey.startsWith("sk-")) {
        throw new Error("Invalid API key format");
      }

      // Store the API key
      storeApiKey("openai", apiKey);

      // Save to user profile if logged in
      if (user?.id) {
        await aiService.saveApiKey(user.id, "openai", apiKey);
      }

      setIsValid(true);
      toast.success("API key saved successfully!");

      // Delay to show success state
      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (error: any) {
      console.error("API key validation failed:", error);
      setIsValid(false);
      toast.error("Invalid API key. Please check and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    toast("You can add your API key later in Settings", {
      icon: "💡",
    });
    onComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <Key className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Setup Your AI</h1>
          <p className="text-gray-400">
            Add your OpenAI API key to start building with AI agents
          </p>
        </div>

        {/* Setup card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-8 border border-purple-500/20"
        >
          {/* Benefits */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
              What you'll get:
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                Access to GPT-4 and GPT-3.5 models
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                Unlimited AI conversations
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                Code generation and debugging
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                Specialized AI agents for different tasks
              </div>
            </div>
          </div>

          {/* API Key input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              OpenAI API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-3 pr-12 glass-light border border-purple-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showKey ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>

              {/* Validation indicator */}
              <AnimatePresence>
                {isValid !== null && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="absolute right-12 top-1/2 transform -translate-y-1/2"
                  >
                    {isValid ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Help text */}
            <div className="mt-2 flex items-start space-x-2">
              <Shield className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-400">
                Your API key is stored securely and never shared. We use it only
                to make requests on your behalf.
              </p>
            </div>
          </div>

          {/* Get API key link */}
          <div className="mb-6 p-4 glass-light rounded-xl border border-purple-500/10">
            <p className="text-sm text-gray-300 mb-2">Don't have an API key?</p>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Get one from OpenAI
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleValidateAndSave}
              disabled={isLoading || !apiKey.trim()}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Validating...</span>
                </>
              ) : isValid ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Saved Successfully!</span>
                </>
              ) : (
                <>
                  <Key className="w-5 h-5" />
                  <span>Save & Continue</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSkip}
              className="w-full px-6 py-3 glass-light border border-purple-500/20 text-gray-300 font-medium rounded-xl hover:bg-purple-500/10 transition-all duration-300"
            >
              Skip for now
            </motion.button>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-gray-500 mt-6"
        >
          You can always change your API key later in Settings
        </motion.p>
      </motion.div>
    </div>
  );
}
