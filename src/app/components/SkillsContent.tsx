import { useLanguage } from "../context/LanguageContext";

export function SkillsContent() {
  const { t } = useLanguage();

  const skills = [
    { name: "HTML / CSS", level: 90 },
    { name: "JavaScript / TypeScript", level: 80 },
    { name: "React / Frontend Development", level: 80 },
    { name: "PHP / NestJS", level: 75 },
    { name: "MySQL / Database Design", level: 70 },
    { name: "UI/UX Design / Figma", level: 90 },
    { name: "Git / GitHub / CI/CD", level: 75 },
    { name: "Docker / Development Tools", level: 65 },
    { name: "Scrum / Agile Methodologies", level: 80 },
    { name: "Java / C# / C++", level: 65 },
  ];

  const softSkills = [
    "Team Collaboration",
    "Problem Solving",
    "Communication",
    "Adaptability",
    "Time Management",
    "Attention to Detail",
    "Ownership & Initiative",
    "Continuous Learning",
  ];

  return (
    <div className="font-mono text-sm space-y-6">
      <div>
        <p className="mb-2 font-bold">{t("systemSpecs")}</p>
        <p className="text-gray-600 mb-4">━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-1">
            <div className="flex justify-between items-center">
              <span>{skill.name}</span>
              <span className="text-gray-600">{skill.level}%</span>
            </div>
            <div className="h-6 bg-white border-2 border-black p-1">
              <div
                className="h-full bg-gradient-to-r from-[#20b2aa] to-[#008b8b]"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t-2 border-gray-300 text-xs text-gray-600 space-y-1">
        {softSkills.map((skill) => (
          <p key={skill}>
            &gt; {skill} {".".repeat(Math.max(0, 28 - skill.length))} ACTIVE
          </p>
        ))}
      </div>
    </div>
  );
}
