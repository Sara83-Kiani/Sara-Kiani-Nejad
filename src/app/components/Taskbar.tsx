import { useState, useEffect, useRef } from "react";
import { Menu, User, Brain, Folder, Mail, FileText, Settings, Power } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import cvFile from "../../imports/CV_Sara_Kiani_Nejad.pdf";

interface WindowInfo {
  name: string;
  type: string;
  isMinimized: boolean;
}

interface TaskbarProps {
  openWindows: WindowInfo[];
  onMenuItemClick: (item: string) => void;
  onWindowClick: (windowType: string) => void;
  onShowToast: (message: string) => void;
  onPlaySound: () => void;
}

export function Taskbar({ openWindows, onMenuItemClick, onWindowClick, onShowToast, onPlaySound }: TaskbarProps) {
  const [time, setTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        startButtonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !startButtonRef.current.contains(event.target as Node)
      ) {
        setIsStartMenuOpen(false);
      }
    };

    if (isStartMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isStartMenuOpen]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const menuItems = [
    { icon: <User size={16} />, label: t("aboutExe"), action: "about" },
    { icon: <Brain size={16} />, label: t("skillsExe"), action: "skills" },
    { icon: <Folder size={16} />, label: t("projectsFolder"), action: "projects" },
    { icon: <Mail size={16} />, label: t("contactMsg"), action: "contact" },
    { icon: <FileText size={16} />, label: t("downloadCV"), action: "cv" },
    { icon: <Settings size={16} />, label: t("settings"), action: "settings" },
    { icon: <Power size={16} />, label: t("shutDown"), action: "shutdown" },
  ];

  const handleMenuItemClick = (action: string) => {
    onPlaySound();
    if (action === "cv") {
      // Create download link
      const link = document.createElement("a");
      link.href = cvFile;
      link.download = "CV_Sara_Kiani_Nejad.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      onShowToast(t("cvDownload"));
      setIsStartMenuOpen(false);
      return;
    }
    if (action === "shutdown") {
      onShowToast(t("thanksVisiting"));
      setIsStartMenuOpen(false);
      return;
    }
    onMenuItemClick(action);
    setIsStartMenuOpen(false);
  };

  return (
    <>
      {/* Start Menu */}
      <AnimatePresence>
        {isStartMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-12 left-2 w-64 bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] z-30"
          >
            {/* Menu Header */}
            <div className="bg-black px-3 py-2 border-b-2 border-black">
              <span className="text-white font-['Press_Start_2P'] text-xs">
                {t("portfolioOS")}
              </span>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuItemClick(item.action)}
                  className="w-full px-3 py-2 flex items-center gap-3 hover:bg-black hover:text-white transition-colors group"
                >
                  <div className="w-6 flex items-center justify-center text-black group-hover:text-white">
                    {item.icon}
                  </div>
                  <span className="font-mono text-sm">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Menu Footer */}
            <div className="border-t-2 border-black px-3 py-2 bg-gray-100">
              <span className="font-mono text-xs text-gray-700">
                {t("inspiredBy")}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-white border-t-4 border-black flex items-center px-2 gap-2 z-20">
        {/* Start Button */}
        <button
          ref={startButtonRef}
          onClick={() => {
            onPlaySound();
            setIsStartMenuOpen(!isStartMenuOpen);
          }}
          className={`border-2 border-black px-3 py-1 flex items-center gap-2 ${
            isStartMenuOpen
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          <Menu size={16} />
          <span className="font-['Press_Start_2P'] text-xs">{t("start")}</span>
        </button>

        {/* Separator */}
        <div className="w-px h-8 bg-black"></div>

        {/* Open Windows */}
        <div className="flex gap-1 flex-1">
          {openWindows.map((window, index) => (
            <button
              key={index}
              onClick={() => {
                onPlaySound();
                onWindowClick(window.type);
              }}
              className={`border-2 border-black px-3 py-1 font-['Press_Start_2P'] text-xs overflow-hidden text-ellipsis whitespace-nowrap min-w-[120px] max-w-[200px] inline-block ${
                window.isMinimized
                  ? "bg-white hover:bg-[#e0f7f5]"
                  : "bg-gray-100 hover:bg-[#20b2aa] hover:text-white"
              }`}
              style={{ boxSizing: 'border-box' }}
            >
              {window.name}
            </button>
          ))}
        </div>

        {/* Clock */}
        <div className="bg-white border-2 border-black px-3 py-1 flex flex-col items-center">
          <span className="font-['Press_Start_2P'] text-xs">{formatTime(time)}</span>
          <span className="font-['Press_Start_2P'] text-[10px] text-gray-600 mt-0.5">{formatDate(time)}</span>
        </div>
      </div>
    </>
  );
}
