import { useState, useEffect, useCallback } from "react";

export interface UserSettings {
  theme: "dark" | "light";
  animations: boolean;
  notifications: boolean;
  autoSave: boolean;
  language: string;
  fontSize: "small" | "medium" | "large";
  sidebarCollapsed: boolean;
  aiResponseSpeed: "fast" | "balanced" | "detailed";
  codeTheme: "dark" | "light" | "auto";
  chatHistory: boolean;
  soundEffects: boolean;
}

const defaultSettings: UserSettings = {
  theme: "dark",
  animations: true,
  notifications: true,
  autoSave: true,
  language: "en",
  fontSize: "medium",
  sidebarCollapsed: false,
  aiResponseSpeed: "balanced",
  codeTheme: "dark",
  chatHistory: true,
  soundEffects: false,
};

const SETTINGS_KEY = "aix-user-settings";

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings((prevSettings) => ({ ...prevSettings, ...parsedSettings }));
      }
    } catch (error) {
      console.warn("Failed to load user settings from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      } catch (error) {
        console.warn("Failed to save user settings to localStorage:", error);
      }
    }
  }, [settings, isLoading]);

  const updateSetting = useCallback(
    <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
    localStorage.removeItem(SETTINGS_KEY);
  }, []);

  const exportSettings = useCallback(() => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "aix-settings.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [settings]);

  const importSettings = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings((prev) => ({ ...prev, ...importedSettings }));
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  }, []);

  return {
    settings,
    isLoading,
    updateSetting,
    updateSettings,
    resetSettings,
    exportSettings,
    importSettings,
  };
}
