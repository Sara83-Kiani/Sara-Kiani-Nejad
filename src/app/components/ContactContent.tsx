import { useState } from "react";
import { Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ContactContentProps {
  onShowToast: (message: string) => void;
  onPlaySound: () => void;
}

export function ContactContent({ onShowToast, onPlaySound }: ContactContentProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onPlaySound();

    // Submit to FormSubmit service
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      await fetch("https://formsubmit.co/sarakianinejad@gmail.com", {
        method: "POST",
        body: formData,
      });
      onShowToast(t("messageSent"));
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      onShowToast(t("messageFailed"));
    }
  };

  return (
    <div className="font-mono text-sm">
      <div className="mb-4">
        <p className="mb-2 font-bold">{t("newMessage")}</p>
        <p className="text-gray-600">━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">{t("from")}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white px-2 py-1 font-mono text-sm"
            placeholder={t("yourName")}
            required
          />
        </div>

        <div>
          <label className="block mb-2">{t("email")}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white px-2 py-1 font-mono text-sm"
            placeholder={t("yourEmail")}
            required
          />
        </div>

        <div>
          <label className="block mb-2">{t("message")}</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full h-32 border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white px-2 py-1 font-mono text-sm resize-none"
            placeholder={t("typeMessage")}
            required
          />
        </div>

        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="New contact from Portfolio" />

        <button
          type="submit"
          className="bg-white border-2 border-black px-4 py-2 hover:bg-gray-200 flex items-center gap-2 font-mono"
        >
          <Send size={14} />
          <span>{t("send")}</span>
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-300 text-xs text-gray-600">
        <p>{t("alternativeContact")}</p>
        <p className="mt-2">
          &gt; Email:{" "}
          <a
            href="mailto:sarakianinejad@gmail.com"
            className="text-[#20b2aa] hover:underline"
          >
            sarakianinejad@gmail.com
          </a>
        </p>
        <p>
          &gt; GitHub:{" "}
          <a
            href="https://github.com/Sara83-Kiani"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#20b2aa] hover:underline"
          >
            @Sara83-Kiani
          </a>
        </p>
        <p>
          &gt; LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/sara-kiani-nejad-807638271"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#20b2aa] hover:underline"
          >
            www.linkedin.com/in/sara-kiani-nejad-807638271
          </a>
        </p>
      </div>
    </div>
  );
}
