import { useState } from "react";
import { FileText, Settings, Folder, Mail, Brain } from "lucide-react";
import { Window } from "./components/Window";
import { DesktopIcon } from "./components/DesktopIcon";
import { Taskbar } from "./components/Taskbar";
import { AboutContent } from "./components/AboutContent";
import { SkillsContent } from "./components/SkillsContent";
import { ProjectsContent } from "./components/ProjectsContent";
import { ContactContent } from "./components/ContactContent";
import { SettingsContent } from "./components/SettingsContent";
import { Toast } from "./components/Toast";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import blissWallpaper from "../imports/wp10390713-windows-classic-wallpapers.jpg";
import darkWallpaper from "../imports/download.gif";
import clickSound from "../imports/universfield-computer-mouse-click-352734.mp3";

type WindowType = "about" | "skills" | "projects" | "contact" | "settings";
type Theme = "dark" | "retro";

function AppContent() {
  const [openWindows, setOpenWindows] = useState<WindowType[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<WindowType[]>([]);
  const [theme, setTheme] = useState<Theme>("dark");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { t } = useLanguage();

  const playClickSound = () => {
    if (soundEnabled) {
      const audio = new Audio(clickSound);
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Ignore errors if audio can't play
      });
    }
  };

  const openWindow = (windowType: WindowType) => {
    if (!openWindows.includes(windowType)) {
      setOpenWindows([...openWindows, windowType]);
    }
  };

  const closeWindow = (windowType: WindowType) => {
    setOpenWindows(openWindows.filter((w) => w !== windowType));
    setMinimizedWindows(minimizedWindows.filter((w) => w !== windowType));
  };

  const minimizeWindow = (windowType: WindowType) => {
    if (!minimizedWindows.includes(windowType)) {
      setMinimizedWindows([...minimizedWindows, windowType]);
    }
  };

  const restoreWindow = (windowType: WindowType) => {
    setMinimizedWindows(minimizedWindows.filter((w) => w !== windowType));
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const getWindowConfig = (windowType: WindowType) => {
    const configs = {
      about: {
        title: t("aboutTitle"),
        content: <AboutContent />,
        initialX: 120,
        initialY: 80,
        width: "650px",
        height: "450px",
      },
      skills: {
        title: t("skillsTitle"),
        content: <SkillsContent />,
        initialX: 160,
        initialY: 120,
        width: "600px",
        height: "400px",
      },
      projects: {
        title: t("projectsTitle"),
        content: <ProjectsContent />,
        initialX: 200,
        initialY: 160,
        width: "600px",
        height: "400px",
      },
      contact: {
        title: t("contactTitle"),
        content: <ContactContent onShowToast={showToastMessage} onPlaySound={playClickSound} />,
        initialX: 240,
        initialY: 200,
        width: "600px",
        height: "400px",
      },
      settings: {
        title: t("settingsTitle"),
        content: (
          <SettingsContent
            currentTheme={theme}
            onThemeChange={setTheme}
            onClose={() => closeWindow("settings")}
            onShowToast={showToastMessage}
            soundEnabled={soundEnabled}
            onSoundChange={setSoundEnabled}
            onPlaySound={playClickSound}
          />
        ),
        initialX: 150,
        initialY: 100,
        width: "700px",
        height: "500px",
      },
    };
    return configs[windowType];
  };

  const getBackgroundStyle = () => {
    switch (theme) {
      case "dark":
        return {
          backgroundImage: `url(${darkWallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        };
      case "retro":
        return {
          backgroundImage: `url(${blissWallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        };
      default:
        return { backgroundColor: "#20b2aa" };
    }
  };

  return (
    <div className="size-full relative overflow-hidden" style={getBackgroundStyle()}>

      {/* Desktop Icons */}
      <div className="absolute top-8 left-8 flex flex-col gap-4">
        <DesktopIcon
          icon={<FileText size={48} />}
          label={t("about")}
          onClick={() => {
            playClickSound();
            openWindow("about");
          }}
          theme={theme}
        />
        <DesktopIcon
          icon={<Brain size={48} />}
          label={t("skills")}
          onClick={() => {
            playClickSound();
            openWindow("skills");
          }}
          theme={theme}
        />
        <DesktopIcon
          icon={<Folder size={48} />}
          label={t("projects")}
          onClick={() => {
            playClickSound();
            openWindow("projects");
          }}
          theme={theme}
        />
        <DesktopIcon
          icon={<Mail size={48} />}
          label={t("contact")}
          onClick={() => {
            playClickSound();
            openWindow("contact");
          }}
          theme={theme}
        />
        <DesktopIcon
          icon={<Settings size={48} />}
          label={t("settings")}
          onClick={() => {
            playClickSound();
            openWindow("settings");
          }}
          theme={theme}
        />
      </div>

      {/* Windows */}
      {openWindows.map((windowType) => {
        const config = getWindowConfig(windowType);
        const isMinimized = minimizedWindows.includes(windowType);

        if (isMinimized) return null;

        return (
          <Window
            key={windowType}
            title={config.title}
            onClose={() => {
              playClickSound();
              closeWindow(windowType);
            }}
            onMinimize={() => {
              playClickSound();
              minimizeWindow(windowType);
            }}
            onPlaySound={playClickSound}
            initialX={config.initialX}
            initialY={config.initialY}
            width={config.width}
            height={config.height}
          >
            {config.content}
          </Window>
        );
      })}

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows.map((w) => ({
          name: getWindowConfig(w).title,
          type: w,
          isMinimized: minimizedWindows.includes(w),
        }))}
        onMenuItemClick={(item) => openWindow(item as WindowType)}
        onWindowClick={(windowType) => restoreWindow(windowType as WindowType)}
        onShowToast={showToastMessage}
        onPlaySound={playClickSound}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}