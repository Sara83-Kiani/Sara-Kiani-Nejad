import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "nl";

interface Translations {
  [key: string]: {
    en: string;
    fa: string;
    nl: string;
  };
}

const translations: Translations = {
  // Desktop Icons
  about: { en: "About", fa: "درباره", nl: "Over" },
  skills: { en: "Skills", fa: "مهارت‌ها", nl: "Vaardigheden" },
  projects: { en: "Projects", fa: "پروژه‌ها", nl: "Projecten" },
  contact: { en: "Contact", fa: "تماس", nl: "Contact" },
  settings: { en: "Settings", fa: "تنظیمات", nl: "Instellingen" },

  // Start Menu
  start: { en: "Start", fa: "شروع", nl: "Start" },
  portfolioOS: { en: "Sara OS", fa: "Sara OS", nl: "Sara OS" },
  aboutExe: { en: "About.exe", fa: "درباره.exe", nl: "Over.exe" },
  skillsExe: { en: "Skills.exe", fa: "مهارت‌ها.exe", nl: "Vaardigheden.exe" },
  projectsFolder: { en: "Projects", fa: "پروژه‌ها", nl: "Projecten" },
  contactMsg: { en: "Contact.msg", fa: "تماس.msg", nl: "Contact.msg" },
  downloadCV: { en: "Download CV", fa: "دانلود رزومه", nl: "CV Downloaden" },
  shutDown: { en: "Shut Down", fa: "خاموش کردن", nl: "Afsluiten" },
  inspiredBy: { en: "Made with ❤️ by Sara", fa: "ساخته شده با ❤️ توسط سارا", nl: "Gemaakt met ❤️ door Sara" },

  // Window Titles
  aboutTitle: { en: "About.txt", fa: "درباره.txt", nl: "Over.txt" },
  skillsTitle: { en: "System Skills", fa: "مهارت‌های سیستم", nl: "Vaardigheden" },
  projectsTitle: { en: "My Projects", fa: "پروژه‌های من", nl: "Mijn Projecten" },
  contactTitle: { en: "New Message", fa: "پیام جدید", nl: "Nieuw Bericht" },
  settingsTitle: { en: "Settings", fa: "تنظیمات", nl: "Instellingen" },

  // Settings
  display: { en: "Display", fa: "نمایش", nl: "Weergave" },
  sound: { en: "Sound", fa: "صدا", nl: "Geluid" },
  system: { en: "System", fa: "سیستم", nl: "Systeem" },
  language: { en: "Language", fa: "زبان", nl: "Taal" },
  themeSelection: { en: "Theme Selection", fa: "انتخاب تم", nl: "Thema Selectie" },
  lightMode: { en: "Light Mode", fa: "حالت روشن", nl: "Lichte Modus" },
  darkMode: { en: "Dark Mode", fa: "حالت تاریک", nl: "Donkere Modus" },
  retroYellow: { en: "Retro Sea Green", fa: "سبز دریایی رترو", nl: "Retro Zeegroen" },
  cleanWhite: { en: "Clean white background", fa: "پس‌زمینه سفید تمیز", nl: "Schone witte achtergrond" },
  darkBackground: { en: "Dark elegant background", fa: "پس‌زمینه تیره و زیبا", nl: "Donkere elegante achtergrond" },
  easyEyes: { en: "Easy on the eyes", fa: "راحت برای چشم", nl: "Rustgevend voor de ogen" },
  classicPixel: { en: "Classic pixel art", fa: "پیکسل آرت کلاسیک", nl: "Klassieke pixelkunst" },
  displayOptions: { en: "Display Options", fa: "تنظیمات نمایش", nl: "Weergave Opties" },
  uiAnimations: { en: "UI Animations", fa: "انیمیشن رابط", nl: "UI Animaties" },
  audioSettings: { en: "Audio Settings", fa: "تنظیمات صدا", nl: "Audio Instellingen" },
  soundEffects: { en: "Sound Effects", fa: "جلوه‌های صوتی", nl: "Geluidseffecten" },
  soundDescription: { en: "Enable retro click and notification sounds throughout the interface.", fa: "فعال‌سازی صداهای کلیک و اعلان رترو در رابط کاربری.", nl: "Schakel retro klik- en meldingsgeluiden in de interface in." },
  systemInfo: { en: "System Info", fa: "اطلاعات سیستم", nl: "Systeeminformatie" },
  version: { en: "Version", fa: "نسخه", nl: "Versie" },
  build: { en: "Build", fa: "ساخت", nl: "Bouw" },
  renderer: { en: "Renderer", fa: "رندرر", nl: "Weergave-engine" },
  styleEngine: { en: "Style Engine", fa: "موتور استایل", nl: "Stijlmotor" },
  apply: { en: "Apply", fa: "اعمال", nl: "Toepassen" },
  cancel: { en: "Cancel", fa: "لغو", nl: "Annuleren" },

  // About Content
  greeting: { en: "Hi, I'm Sara 👋", fa: "سلام، من سارا هستم 👋", nl: "Hoi, ik ben Sara 👋" },
  role: { en: "IT Student | Software Developer & UI/UX Designer", fa: "دانشجوی IT | توسعه‌دهنده نرم‌افزار و طراح UI/UX", nl: "IT-student | Softwareontwikkelaar & UI/UX-ontwerper" },
  interests: { en: "Interests:", fa: "علاقه‌مندی‌ها:", nl: "Interesses:" },
  interestFrontend: { en: "Frontend Development", fa: "توسعه فرانت‌اند", nl: "Frontend-ontwikkeling" },
  interestUIUX: { en: "UI/UX Design", fa: "طراحی UI/UX", nl: "UI/UX-ontwerp" },
  interestWeb: { en: "Web Development", fa: "توسعه وب", nl: "Webontwikkeling" },
  interestGame: { en: "Game Development", fa: "توسعه بازی", nl: "Gameontwikkeling" },
  interestVR: { en: "Virtual Reality (VR)", fa: "واقعیت مجازی (VR)", nl: "Virtual Reality (VR)" },
  interestMobile: { en: "Mobile Application Development", fa: "توسعه اپلیکیشن موبایل", nl: "Mobiele applicatieontwikkeling" },
  aboutMe: { en: "About Me:", fa: "درباره من:", nl: "Over mij:" },
  aboutText: {
    en: "I'm an IT student passionate about software development and UI/UX design. I enjoy building user-centered applications and have experience with frontend development, backend systems, databases, and prototyping. Through projects ranging from full-stack web applications to VR experiences, I have developed a strong interest in creating technology that is both functional and intuitive. I am currently seeking internship opportunities to grow as a software developer and UI/UX designer, and contribute to real-world products.",
    fa: "من یک دانشجوی IT هستم که به توسعه نرم‌افزار و طراحی UI/UX علاقه‌مندم. من از ساخت برنامه‌های کاربرمحور لذت می‌برم و تجربه‌ای در توسعه فرانت‌اند، سیستم‌های بک‌اند، پایگاه داده و نمونه‌سازی دارم. از طریق پروژه‌هایی که از برنامه‌های وب فول‌استک تا تجربیات VR را شامل می‌شوند، علاقه قوی به ایجاد فناوری‌هایی که هم کاربردی و هم شهودی هستند، پیدا کرده‌ام. در حال حاضر به دنبال فرصت‌های کارآموزی برای رشد به عنوان توسعه‌دهنده نرم‌افزار و طراح UI/UX هستم و می‌خواهم به محصولات واقعی کمک کنم.",
    nl: "Ik ben een IT-student met een passie voor softwareontwikkeling en UI/UX-ontwerp. Ik geniet ervan om gebruikersgerichte applicaties te bouwen en heb ervaring met frontend-ontwikkeling, backendsystemen, databases en prototyping. Door projecten variërend van full-stack webapplicaties tot VR-ervaringen, heb ik een sterke interesse ontwikkeld in het creëren van technologie die zowel functioneel als intuïtief is. Momenteel ben ik op zoek naar stagemogelijkheden om te groeien als softwareontwikkelaar en UI/UX-ontwerper, en bij te dragen aan praktijkproducten."
  },
  statusInternship: { en: "Status: Seeking internship", fa: "وضعیت: در جستجوی کارآموزی", nl: "Status: Zoekt stage" },

  // Contact
  newMessage: { en: "NEW MESSAGE", fa: "پیام جدید", nl: "NIEUW BERICHT" },
  from: { en: "From:", fa: "از:", nl: "Van:" },
  email: { en: "Email:", fa: "ایمیل:", nl: "E-mail:" },
  message: { en: "Message:", fa: "پیام:", nl: "Bericht:" },
  yourName: { en: "Your name", fa: "نام شما", nl: "Jouw naam" },
  yourEmail: { en: "your.email@example.com", fa: "ایمیل.شما@example.com", nl: "jouw.email@voorbeeld.nl" },
  typeMessage: { en: "Type your message here...", fa: "پیام خود را اینجا تایپ کنید...", nl: "Typ hier je bericht..." },
  send: { en: "Send", fa: "ارسال", nl: "Verzenden" },
  alternativeContact: { en: "Alternative contact methods:", fa: "روش‌های تماس جایگزین:", nl: "Alternatieve contactmethoden:" },

  // Skills
  systemSpecs: { en: "SYSTEM SPECIFICATIONS", fa: "مشخصات سیستم", nl: "SYSTEEMSPECIFICATIES" },
  systemStatus: { en: "System Status: OPTIMAL", fa: "وضعیت سیستم: بهینه", nl: "Systeemstatus: OPTIMAAL" },
  readyChallenges: { en: "Ready for new challenges", fa: "آماده برای چالش‌های جدید", nl: "Klaar voor nieuwe uitdagingen" },

  // Soft Skills
  softSkill1: { en: "Team Collaboration", fa: "همکاری تیمی", nl: "Teamcollaboratie" },
  softSkill2: { en: "Problem Solving", fa: "حل مسئله", nl: "Problemen oplossen" },
  softSkill3: { en: "Communication", fa: "ارتباطات", nl: "Communicatie" },
  softSkill4: { en: "Adaptability", fa: "انعطاف‌پذیری", nl: "Aanpassingsvermogen" },
  softSkill5: { en: "Time Management", fa: "مدیریت زمان", nl: "Tijdmanagement" },
  softSkill6: { en: "Attention to Detail", fa: "توجه به جزئیات", nl: "Oog voor detail" },
  softSkill7: { en: "Ownership & Initiative", fa: "مالکیت و ابتکار", nl: "Eigenaarschap & Initiatief" },
  softSkill8: { en: "Continuous Learning", fa: "یادگیری مستمر", nl: "Continue leren" },
  active: { en: "ACTIVE", fa: "فعال", nl: "ACTIEF" },

  // Projects
  myProjects: { en: "MY PROJECTS", fa: "پروژه‌های من", nl: "MIJN PROJECTEN" },
  tools: { en: "Tools:", fa: "ابزارها:", nl: "Tools:" },

  // Project 1
  project1Name: { en: "Smart Time Registration System", fa: "سیستم ثبت زمان هوشمند", nl: "Smart Tijdregistratiesysteem" },
  project1Period: { en: "January 2026 – April 2026", fa: "ژانویه ۲۰۲۶ – آوریل ۲۰۲۶", nl: "Januari 2026 – April 2026" },
  project1Desc: {
    en: "Developed a full-stack web application using React and NestJS for tracking employee work hours within projects, acting as Scrum Master and designing the system wireframes. Implemented authentication, RESTful APIs with TypeORM, and dynamic UI components for project management and dashboards. Used Docker for containerization and ensured efficient API communication and client-side validation.",
    fa: "توسعه یک برنامه وب فول‌استک با استفاده از React و NestJS برای ردیابی ساعات کاری کارکنان در پروژه‌ها، به عنوان Scrum Master و طراحی wireframe سیستم. پیاده‌سازی احراز هویت، API های RESTful با TypeORM و کامپوننت‌های UI پویا برای مدیریت پروژه و داشبوردها. استفاده از Docker برای containerization و اطمینان از ارتباط کارآمد API و اعتبارسنجی سمت کلاینت.",
    nl: "Ontwikkelde een full-stack webapplicatie met React en NestJS voor het bijhouden van werkuren van medewerkers binnen projecten, waarbij ik optrad als Scrum Master en de systeemwireframes ontwierp. Implementeerde authenticatie, RESTful API's met TypeORM en dynamische UI-componenten voor projectbeheer en dashboards. Gebruikte Docker voor containerisatie en zorgde voor efficiënte API-communicatie en client-side validatie."
  },

  // Project 2
  project2Name: { en: "StreamFlix – Full-Stack Streaming Platform", fa: "StreamFlix – پلتفرم استریمینگ فول‌استک", nl: "StreamFlix – Full-Stack Streamingplatform" },
  project2Period: { en: "November 2025 – January 2026", fa: "نوامبر ۲۰۲۵ – ژانویه ۲۰۲۶", nl: "November 2025 – Januari 2026" },
  project2Desc: {
    en: "Developed a full-stack streaming platform using React and NestJS, implementing user authentication, RESTful APIs, and a MySQL database, all containerized with Docker Compose.",
    fa: "توسعه یک پلتفرم استریمینگ فول‌استک با استفاده از React و NestJS، پیاده‌سازی احراز هویت کاربر، API های RESTful و پایگاه داده MySQL، همه با Docker Compose containerized شده‌اند.",
    nl: "Ontwikkelde een full-stack streamingplatform met React en NestJS, waarbij gebruikersauthenticatie, RESTful API's en een MySQL-database werden geïmplementeerd, allemaal gecontaineriseerd met Docker Compose."
  },

  // Project 3
  project3Name: { en: "SSH Capture the Flag – Multiplayer Web Platform", fa: "SSH Capture the Flag – پلتفرم وب چندنفره", nl: "SSH Capture the Flag – Multiplayer Webplatform" },
  project3Period: { en: "September 2025 – January 2026", fa: "سپتامبر ۲۰۲۵ – ژانویه ۲۰۲۶", nl: "September 2025 – Januari 2026" },
  project3Desc: {
    en: "Designed and developed a multiplayer Capture the Flag game over SSH using client-server architecture, enabling real-time multi-user interaction; additionally served as Product Owner and created the full website wireframe, translating requirements into structured UI/UX designs.",
    fa: "طراحی و توسعه یک بازی Capture the Flag چندنفره از طریق SSH با استفاده از معماری کلاینت-سرور، امکان تعامل چندکاربره در زمان واقعی؛ همچنین به عنوان Product Owner عمل کرد و wireframe کامل وب‌سایت را ایجاد کرد و نیازمندی‌ها را به طراحی‌های ساختاریافته UI/UX ترجمه کرد.",
    nl: "Ontwierp en ontwikkelde een multiplayer Capture the Flag-spel via SSH met behulp van client-server architectuur, waardoor real-time multi-user interactie mogelijk werd; fungeerde ook als Product Owner en creëerde de volledige website-wireframe, waarbij requirements werden vertaald naar gestructureerde UI/UX-ontwerpen."
  },

  // Project 4
  project4Name: { en: "Silent Storytellers – VR Awareness Experience", fa: "Silent Storytellers – تجربه آگاهی VR", nl: "Silent Storytellers – VR Bewustwordingservaring" },
  project4Period: { en: "April 2025 – June 2025", fa: "آوریل ۲۰۲۵ – ژوئن ۲۰۲۵", nl: "April 2025 – Juni 2025" },
  project4Desc: {
    en: "Designed a web and VR platform to share real stories from the deaf community and simulate communication barriers.",
    fa: "طراحی یک پلتفرم وب و VR برای به اشتراک گذاشتن داستان‌های واقعی از جامعه ناشنوایان و شبیه‌سازی موانع ارتباطی.",
    nl: "Ontwierp een web- en VR-platform om echte verhalen van de dovengemeenschap te delen en communicatiebarrières te simuleren."
  },

  // Project 5
  project5Name: { en: "SeGAR – Unity VR Game for Dementia Therapy", fa: "SeGAR – بازی VR Unity برای درمان زوال عقل", nl: "SeGAR – Unity VR-game voor Dementietherapie" },
  project5Period: { en: "April 2025 – May 2025", fa: "آوریل ۲۰۲۵ – می ۲۰۲۵", nl: "April 2025 – Mei 2025" },
  project5Desc: {
    en: "Created a VR game with memory-based gardening tasks to support cognitive engagement for elderly users.",
    fa: "ایجاد یک بازی VR با وظایف باغبانی مبتنی بر حافظه برای حمایت از مشارکت شناختی برای کاربران سالمند.",
    nl: "Creëerde een VR-game met geheugengebaseerde tuiniertaken om cognitieve betrokkenheid voor oudere gebruikers te ondersteunen."
  },

  // Project 6
  project6Name: { en: "Shopping Cart – E-Commerce Web Application", fa: "سبد خرید – برنامه وب تجارت الکترونیک", nl: "Winkelwagen – E-commerce Webapplicatie" },
  project6Period: { en: "March 2025 – May 2025", fa: "مارس ۲۰۲۵ – می ۲۰۲۵", nl: "Maart 2025 – Mei 2025" },
  project6Desc: {
    en: "Developed a responsive shopping cart application using React and TypeScript, implementing product management, quantity updates, persistent cart storage with Local Storage, and state management through Context API.",
    fa: "توسعه یک برنامه سبد خرید واکنش‌گرا با استفاده از React و TypeScript، پیاده‌سازی مدیریت محصول، به‌روزرسانی مقدار، ذخیره‌سازی پایدار سبد خرید با Local Storage و مدیریت state از طریق Context API.",
    nl: "Ontwikkelde een responsieve winkelwagenapplicatie met React en TypeScript, waarbij productbeheer, aantalupdates, persistente winkelwagenopslag met Local Storage en state management via Context API werden geïmplementeerd."
  },

  // Project 7
  project7Name: { en: "Battle Bots – Autonomous Robot Development", fa: "Battle Bots – توسعه ربات خودکار", nl: "Battle Bots – Autonome Robotontwikkeling" },
  project7Period: { en: "February 2025 – April 2025", fa: "فوریه ۲۰۲۵ – آوریل ۲۰۲۵", nl: "Februari 2025 – April 2025" },
  project7Desc: {
    en: "Programmed a line-following robot to navigate mazes and handle objects using sensors and servo motors.",
    fa: "برنامه‌نویسی یک ربات دنبال‌کننده خط برای پیمایش در پیچ و خم‌ها و کنترل اشیا با استفاده از سنسورها و موتورهای سروو.",
    nl: "Programmeerde een lijnvolgende robot om doolhoven te navigeren en objecten te hanteren met behulp van sensoren en servomotoren."
  },

  // Project 8
  project8Name: { en: "Gemorskos – IT Infrastructure Project", fa: "Gemorskos – پروژه زیرساخت IT", nl: "Gemorskos – IT-infrastructuurproject" },
  project8Period: { en: "November 2024 – January 2025", fa: "نوامبر ۲۰۲۴ – ژانویه ۲۰۲۵", nl: "November 2024 – Januari 2025" },
  project8Desc: {
    en: "Configured a dual-server network with user roles, file sharing, and remote access in a simulated business setup.",
    fa: "پیکربندی یک شبکه دو سرور با نقش‌های کاربری، اشتراک فایل و دسترسی از راه دور در یک راه‌اندازی تجاری شبیه‌سازی شده.",
    nl: "Configureerde een dual-server netwerk met gebruikersrollen, bestandsdeling en externe toegang in een gesimuleerde bedrijfsopstelling."
  },

  // Project 9
  project9Name: { en: "Oui Café – Dynamic Web Application", fa: "Oui Café – برنامه وب پویا", nl: "Oui Café – Dynamische Webapplicatie" },
  project9Period: { en: "September 2024 – November 2024", fa: "سپتامبر ۲۰۲۴ – نوامبر ۲۰۲۴", nl: "September 2024 – November 2024" },
  project9Desc: {
    en: "Built a responsive café website with dynamic content, menu, gallery, and contact form using HTML/CSS and PHP.",
    fa: "ساخت یک وب‌سایت کافه واکنش‌گرا با محتوای پویا، منو، گالری و فرم تماس با استفاده از HTML/CSS و PHP.",
    nl: "Bouwde een responsieve caféwebsite met dynamische content, menu, galerij en contactformulier met behulp van HTML/CSS en PHP."
  },

  // Notifications
  languageUpdated: { en: "Language updated successfully!", fa: "زبان با موفقیت به‌روزرسانی شد!", nl: "Taal succesvol bijgewerkt!" },
  settingsApplied: { en: "Settings applied!", fa: "تنظیمات اعمال شد!", nl: "Instellingen toegepast!" },
  messageSent: { en: "Message sent successfully!", fa: "پیام با موفقیت ارسال شد!", nl: "Bericht succesvol verzonden!" },
  messageFailed: { en: "Failed to send message. Please try again.", fa: "ارسال پیام ناموفق بود. لطفا دوباره امتحان کنید.", nl: "Verzenden mislukt. Probeer het opnieuw." },
  cvDownload: { en: "CV downloaded successfully!", nl: "CV succesvol gedownload!" },
  thanksVisiting: { en: "Thanks for visiting! 👋", fa: "از بازدید شما متشکریم! 👋", nl: "Bedankt voor je bezoek! 👋" },
  applyToUpdate: { en: "Click Apply to update the entire interface", fa: "برای به‌روزرسانی کل رابط کاربری، روی اعمال کلیک کنید", nl: "Klik op Toepassen om de hele interface bij te werken" },
  currentLanguage: { en: "Current language is active", fa: "زبان فعلی فعال است", nl: "Huidige taal is actief" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const isRTL = false;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
