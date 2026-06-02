import { motion } from "motion/react";
import { X, Minimize2, Maximize2 } from "lucide-react";
import { ReactNode, useState } from "react";

interface WindowProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onPlaySound?: () => void;
  initialX?: number;
  initialY?: number;
  width?: string;
  height?: string;
}

export function Window({
  title,
  children,
  onClose,
  onMinimize,
  onPlaySound,
  initialX = 100,
  initialY = 100,
  width = "600px",
  height = "400px",
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      dragConstraints={!isMaximized ? undefined : { left: 0, right: 0, top: 0, bottom: 0 }}
      initial={!isMaximized ? { x: initialX, y: initialY } : { x: 0, y: 0 }}
      animate={
        isMaximized
          ? { x: 0, y: 0, width: "100%", height: "calc(100vh - 48px)" }
          : { width, height }
      }
      className={`absolute bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] z-10 ${
        isMaximized ? "left-0 top-0" : ""
      }`}
    >
      {/* Title Bar */}
      <div className="bg-black px-2 py-1 flex items-center justify-between cursor-move border-b-4 border-black">
        <span className="text-white text-xs font-['Press_Start_2P'] truncate">
          {title}
        </span>
        <div className="flex gap-1">
          <button
            className="w-6 h-6 bg-white border-2 border-black flex items-center justify-center hover:bg-gray-200"
            onClick={onMinimize}
          >
            <Minimize2 size={12} />
          </button>
          <button
            className="w-6 h-6 bg-white border-2 border-black flex items-center justify-center hover:bg-gray-200"
            onClick={() => {
              onPlaySound?.();
              toggleMaximize();
            }}
          >
            <Maximize2 size={12} />
          </button>
          <button
            className="w-6 h-6 bg-white border-2 border-black flex items-center justify-center hover:bg-gray-200"
            onClick={onClose}
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="bg-white h-[calc(100%-32px)] overflow-auto p-4">
        {children}
      </div>
    </motion.div>
  );
}
