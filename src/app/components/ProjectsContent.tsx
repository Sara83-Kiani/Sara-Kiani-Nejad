import { Folder, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function ProjectsContent() {
  const { t } = useLanguage();
  const projects = [
    {
      nameKey: "project1Name",
      periodKey: "project1Period",
      tech: "React, JavaScript, NestJS, TypeORM, REST API, MySQL, Git, Docker",
      descKey: "project1Desc",
      link: "https://github.com/oomfrikkie/SmartTimeRegistration",
    },
    {
      nameKey: "project2Name",
      periodKey: "project2Period",
      tech: "React, TypeScript, NestJS, MySQL, Docker",
      descKey: "project2Desc",
      link: "https://github.com/Sara83-Kiani/Data-Processing",
    },
    {
      nameKey: "project3Name",
      periodKey: "project3Period",
      tech: "JavaScript, TypeScript, SSHamble, Figma, GitHub Actions",
      descKey: "project3Desc",
      link: "https://github.com/bencemohr/ssh-multiplayer",
    },
    {
      nameKey: "project4Name",
      periodKey: "project4Period",
      tech: "Unreal Engine, PHP, HTML/CSS, Blender, Figma",
      descKey: "project4Desc",
      link: "https://deafinitystories.com/en/",
    },
    {
      nameKey: "project5Name",
      periodKey: "project5Period",
      tech: "Unity, C#, Meta Quest 2",
      descKey: "project5Desc",
      link: "https://github.com/Olavo-Estima/SAP_Project",
    },
    {
      nameKey: "project6Name",
      periodKey: "project6Period",
      tech: "React, TypeScript, Tailwind CSS, Context API, Local Storage",
      descKey: "project6Desc",
      link: "https://github.com/Sara83-Kiani/Shopping-Cart",
    },
    {
      nameKey: "project7Name",
      periodKey: "project7Period",
      tech: "Arduino, C++, Line Sensors",
      descKey: "project7Desc",
      link: "https://github.com/AlexMakesC0de/IT1F-BattleBots",
    },
    {
      nameKey: "project8Name",
      periodKey: "project8Period",
      tech: "Windows Server 2019, Ubuntu Server",
      descKey: "project8Desc",
      link: null,
    },
    {
      nameKey: "project9Name",
      periodKey: "project9Period",
      tech: "HTML/CSS, PHP",
      descKey: "project9Desc",
      link: "https://github.com/bencemohr/OUI",
    },
  ];

  return (
    <div className="font-mono text-sm">
      <div className="mb-4">
        <p className="mb-2 font-bold">{t("myProjects")}</p>
        <p className="text-gray-600">━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
      </div>

      <div className="space-y-3">
        {projects.map((project, index) => {
          const Component = project.link ? 'a' : 'div';
          const linkProps = project.link
            ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <Component
              key={index}
              {...linkProps}
              className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] p-3 hover:bg-[#d0d0d0] cursor-pointer transition-colors block no-underline text-black"
            >
              <div className="flex items-start gap-3">
                <Folder size={20} className="text-[#20b2aa] mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-bold">{t(project.nameKey)}</p>
                    {project.link && <ExternalLink size={14} className="mt-1 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{t(project.periodKey)}</p>
                  <p className="text-xs text-gray-600 mb-2">{t("tools")} {project.tech}</p>
                  <p className="text-xs leading-relaxed">{t(project.descKey)}</p>
                </div>
              </div>
            </Component>
          );
        })}
      </div>
    </div>
  );
}
