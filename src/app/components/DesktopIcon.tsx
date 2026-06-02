import { ReactNode } from "react";

type Theme = "dark" | "retro";

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  theme?: Theme;
}

export function DesktopIcon({ icon, label, onClick, theme = "retro" }: DesktopIconProps) {
  const isDark = theme === "dark";

  const iconColor = isDark ? "text-white" : "text-white";
  const iconShadow = isDark
    ? "drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]"
    : "drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]";
  const labelColor = isDark ? "text-white" : "text-white";
  const labelShadow = isDark
    ? "drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]"
    : "drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]";

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-2 w-40 hover:bg-[#20b2aa]/30 hover:border-[#20b2aa]/50 border border-transparent transition-all"
    >
      <div className={`w-12 h-12 flex items-center justify-center ${iconColor} ${iconShadow}`}>
        {icon}
      </div>
      <span className={`text-xs font-['Press_Start_2P'] text-center leading-tight ${labelColor} ${labelShadow} px-2`}>
        {label}
      </span>
    </button>
  );
}
