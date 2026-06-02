import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";
import profilePhoto from "../../imports/photo_2026-05-12_11-52-10.jpg";

export function AboutContent() {
  const { t } = useLanguage();
  const [imageHover, setImageHover] = useState(false);

  return (
    <div className="flex gap-6 h-full">
      {/* Left Side - Profile Image */}
      <div className="flex flex-col items-center gap-3">
        <div
          className={`w-40 h-40 border-4 border-black overflow-hidden cursor-pointer transition-transform ${
            imageHover ? "scale-105" : "scale-100"
          }`}
          onMouseEnter={() => setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
        >
          <img
            src={profilePhoto}
            alt="Sara's profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-black text-white px-3 py-1 border-2 border-black">
          <p className="font-['Press_Start_2P'] text-xs">SARA.IMG</p>
        </div>
      </div>

      {/* Right Side - Text Content */}
      <div className="flex-1 font-mono text-sm space-y-4">
        <div>
          <h2 className="font-['Press_Start_2P'] text-lg mb-2">
            {t("greeting")}
          </h2>
          <div className="h-1 w-20 bg-[#20b2aa] mb-4"></div>
        </div>

        <div className="space-y-3">
          <div className="bg-[#e0f7f5] border-2 border-[#20b2aa] p-3">
            <p className="font-bold text-black">🎓 {t("role")}</p>
          </div>

          <div className="space-y-2">
            <p className="font-bold">💡 {t("interests")}</p>
            <ul className="pl-4 space-y-1">
              <li>→ {t("interestFrontend")}</li>
              <li>→ {t("interestUIUX")}</li>
              <li>→ {t("interestWeb")}</li>
              <li>→ {t("interestGame")}</li>
              <li>→ {t("interestVR")}</li>
              <li>→ {t("interestMobile")}</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-bold">✨ {t("aboutMe")}</p>
            <p className="leading-relaxed">
              {t("aboutText")}
            </p>
          </div>

          <div className="pt-2 border-t-2 border-black">
            <p className="text-xs text-gray-600">
              &gt; {t("statusInternship")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
