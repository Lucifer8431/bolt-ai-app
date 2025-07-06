import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Code,
  Download,
  Upload,
  RotateCcw,
  Save,
  Key,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Zap,
  Eye,
  Database,
} from "lucide-react";
import { useStore } from "../store/useStore";
import { useUserSettings } from "../hooks/useUserSettings";
import { ApiKeyManager } from "./ApiKeyManager";
import toast from "react-hot-toast";

export function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const { user, apiKeys } = useStore();
  const {
    settings,
    updateSetting,
    resetSettings,
    exportSettings,
    importSettings,
  } = useUserSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "ai", label: "AI Settings", icon: Zap },
    { id: "api-keys", label: "API Keys", icon: Key },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "advanced", label: "Advanced", icon: Code },
  ];

  const handleImportSettings = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileImport = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await importSettings(file);
        toast.success("Settings imported successfully!");
      } catch (error) {
        toast.error("Failed to import settings. Please check the file format.");
      }
    }
  };

  const handleExportSettings = () => {
    exportSettings();
    toast.success("Settings exported successfully!");
  };

  const handleResetSettings = () => {
    resetSettings();
    toast.success("Settings reset to defaults!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-white border border-purple-500/30"
                  : "text-gray-300 hover:bg-gray-800/30 hover:text-white"
              }`}
              style={
                activeTab === tab.id
                  ? {
                      background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }
                  : {}
              }
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "general" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div
                className="rounded-xl p-6 border border-purple-500/20"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Profile Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-100 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Developer"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-100 mb-2">
                      Language
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) =>
                        updateSetting("language", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-6 border border-purple-500/20"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  General Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-white">
                        Auto-save projects
                      </label>
                      <p className="text-sm text-gray-200">
                        Automatically save your work every few minutes
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={settings.autoSave}
                      onChange={(e) =>
                        updateSetting("autoSave", e.target.checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-white">
                        Enable animations
                      </label>
                      <p className="text-sm text-gray-200">
                        Show smooth transitions and animations
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={settings.animations}
                      onChange={(e) =>
                        updateSetting("animations", e.target.checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "appearance" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div
                className="rounded-xl p-6 border border-purple-500/20"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Theme & Display
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-100 mb-2">
                      Theme
                    </label>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateSetting("theme", "dark")}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                          settings.theme === "dark"
                            ? "bg-white/20 text-white"
                            : "bg-white/10 text-gray-300"
                        }`}
                      >
                        <Moon className="w-4 h-4" />
                        <span>Dark</span>
                      </button>
                      <button
                        onClick={() => updateSetting("theme", "light")}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                          settings.theme === "light"
                            ? "bg-white/20 text-white"
                            : "bg-white/10 text-gray-300"
                        }`}
                      >
                        <Sun className="w-4 h-4" />
                        <span>Light</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-100 mb-2">
                      Font Size
                    </label>
                    <select
                      value={settings.fontSize}
                      onChange={(e) =>
                        updateSetting("fontSize", e.target.value as any)
                      }
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "ai" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div
                className="rounded-xl p-6 border border-purple-500/20"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  AI Response Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-100 mb-2">
                      Response Speed
                    </label>
                    <select
                      value={settings.aiResponseSpeed}
                      onChange={(e) =>
                        updateSetting("aiResponseSpeed", e.target.value as any)
                      }
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      <option value="fast">Fast (Quick responses)</option>
                      <option value="balanced">Balanced (Recommended)</option>
                      <option value="detailed">
                        Detailed (Thorough responses)
                      </option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-white">
                        Save chat history
                      </label>
                      <p className="text-sm text-gray-200">
                        Keep conversation history for future reference
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={settings.chatHistory}
                      onChange={(e) =>
                        updateSetting("chatHistory", e.target.checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div
                className="rounded-xl p-6 border border-purple-500/20"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Notification Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-white">
                        Push notifications
                      </label>
                      <p className="text-sm text-gray-200">
                        Receive notifications about important updates
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={settings.notifications}
                      onChange={(e) =>
                        updateSetting("notifications", e.target.checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-white">
                        Sound effects
                      </label>
                      <p className="text-sm text-gray-200">
                        Play sounds for notifications and actions
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={settings.soundEffects}
                      onChange={(e) =>
                        updateSetting("soundEffects", e.target.checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "api-keys" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ApiKeyManager />
            </motion.div>
          )}

          {activeTab === "advanced" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div
                className="rounded-xl p-6 border border-purple-500/20"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Data Management
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={handleExportSettings}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Settings</span>
                  </button>
                  <button
                    onClick={handleImportSettings}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Import Settings</span>
                  </button>
                  <button
                    onClick={handleResetSettings}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
