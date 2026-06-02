import { useState } from "react";
import { Monitor, Volume2, Cpu, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type SettingsTab = "display" | "sound" | "system";
type Theme = "dark" | "retro";
type Language = "en" | "nl";

interface SettingsContentProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onClose: () => void;
  onShowToast: (message: string) => void;
  soundEnabled: boolean;
  onSoundChange: (enabled: boolean) => void;
  onPlaySound: () => void;
}

export function SettingsContent({ currentTheme, onThemeChange, onClose, onShowToast, soundEnabled, onSoundChange, onPlaySound }: SettingsContentProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("display");
  const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);
  const { language, setLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language);

  const handleApply = () => {
    onPlaySound();
    const languageChanged = selectedLanguage !== language;

    onThemeChange(selectedTheme);

    if (languageChanged) {
      setLanguage(selectedLanguage);
      onShowToast(t("languageUpdated"));
    } else {
      onShowToast(t("settingsApplied"));
    }
  };

  const handleCancel = () => {
    onPlaySound();
    setSelectedTheme(currentTheme);
    setSelectedLanguage(language);
    onClose();
  };

  const themes = [
    {
      id: "dark" as Theme,
      name: t("darkMode"),
      description: t("darkBackground"),
      preview: "bg-[#1a1a1a] border-2 border-black",
    },
    {
      id: "retro" as Theme,
      name: t("retroYellow"),
      description: t("classicPixel"),
      preview: "bg-[#20b2aa] border-2 border-black",
    },
  ];

  const languages = [
    {
      id: "en" as Language,
      name: "English",
      nativeName: "English",
      flag: "🇬🇧",
    },
    {
      id: "nl" as Language,
      name: "Dutch",
      nativeName: "Nederlands",
      flag: "🇳🇱",
    },
  ];

  const tabs = [
    { id: "display" as SettingsTab, icon: <Monitor size={16} />, label: t("display") },
    { id: "sound" as SettingsTab, icon: <Volume2 size={16} />, label: t("sound") },
    { id: "system" as SettingsTab, icon: <Cpu size={16} />, label: t("system") },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-40 bg-gray-100 border-r-4 border-black p-2">
        <div className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                onPlaySound();
                setActiveTab(tab.id);
              }}
              className={`w-full px-3 py-2 flex items-center gap-2 border-2 border-black font-mono text-sm ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === "display" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-['Press_Start_2P'] text-sm mb-4">
                  {t("themeSelection")}
                </h3>
                <div className="space-y-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        onPlaySound();
                        setSelectedTheme(theme.id);
                      }}
                      className={`w-full p-4 border-2 border-black flex items-center gap-4 transition-colors ${
                        selectedTheme === theme.id
                          ? "bg-black text-white"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      <div className={`w-12 h-12 ${theme.preview}`} />
                      <div className="flex-1 text-left">
                        <p className="font-mono font-bold">{theme.name}</p>
                        <p className="text-xs font-mono opacity-70">
                          {theme.description}
                        </p>
                      </div>
                      {selectedTheme === theme.id && (
                        <Check size={20} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "sound" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-['Press_Start_2P'] text-sm mb-4">
                  {t("audioSettings")}
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 bg-white border-2 border-black">
                    <span className="font-mono">{t("soundEffects")}</span>
                    <button
                      onClick={() => {
                        onPlaySound();
                        onSoundChange(!soundEnabled);
                      }}
                      className={`w-12 h-6 border-2 border-black relative ${
                        soundEnabled ? "bg-black" : "bg-white"
                      }`}
                    >
                      <div
                        className={`absolute top-0 w-5 h-4 bg-white border-2 border-black transition-all ${
                          soundEnabled ? "right-0" : "left-0"
                        }`}
                      />
                    </button>
                  </label>
                </div>
                <p className="mt-4 text-sm font-mono text-gray-600">
                  {t("soundDescription")}
                </p>
              </div>
            </div>
          )}

          {activeTab === "system" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-['Press_Start_2P'] text-sm mb-4">
                  {t("language")}
                </h3>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => {
                        onPlaySound();
                        setSelectedLanguage(lang.id);
                      }}
                      className={`w-full p-4 border-2 border-black flex items-center gap-4 transition-colors ${
                        selectedLanguage === lang.id
                          ? "bg-black text-white"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <div className="flex-1 text-left">
                        <p className="font-mono font-bold text-lg">
                          {lang.nativeName}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                          selectedLanguage === lang.id
                            ? "border-white bg-white"
                            : "border-black bg-white"
                        }`}
                      >
                        {selectedLanguage === lang.id && (
                          <div className="w-3 h-3 bg-black rounded-full" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs font-mono text-gray-600 bg-[#e0f7f5] border-2 border-[#20b2aa] p-2">
                  💡 {selectedLanguage !== language ? t("applyToUpdate") : t("currentLanguage")}
                </p>
              </div>

              <div className="pt-4 border-t-2 border-black">
                <h3 className="font-['Press_Start_2P'] text-sm mb-4">
                  {t("systemInfo")}
                </h3>
                <div className="bg-white border-2 border-black p-4 font-mono text-sm space-y-2">
                  <p>
                    <span className="font-bold">{t("version")}:</span> Sara OS 1.0
                  </p>
                  <p>
                    <span className="font-bold">{t("build")}:</span> 20260420
                  </p>
                  <p>
                    <span className="font-bold">{t("renderer")}:</span> React 18.3.1
                  </p>
                  <p>
                    <span className="font-bold">{t("styleEngine")}:</span> Tailwind CSS v4
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="border-t-4 border-black p-4 bg-gray-100 flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-white border-2 border-black font-mono hover:bg-gray-200"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-black text-white border-2 border-black font-mono hover:bg-gray-800"
          >
            {t("apply")}
          </button>
        </div>
      </div>
    </div>
  );
}
