import { profile } from "@/data/cv";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-6 lg:px-32 xl:px-40 max-w-content mx-auto py-24 border-t border-line"
    >
      <div className="flex items-baseline gap-4 mb-8">
        <span className="font-mono text-xs text-ink-mute">05</span>
        <h2 className="font-display text-2xl lg:text-3xl font-medium tracking-tight">
          Contact
        </h2>
      </div>

      <h3 className="font-display text-3xl lg:text-5xl font-medium max-w-2xl text-balance leading-tight">
        Let's build something reliable together.
      </h3>

      <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 font-mono text-sm">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-2 hover:text-ink-mute"
        >
          <Mail size={16} /> {profile.email}
        </a>
        <a
          href={`https://wa.me/${profile.phone.replace(/\s/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-ink-mute"
        >
          <Phone size={16} /> {profile.phone}
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          className="flex items-center gap-2 hover:text-ink-mute"
        >
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/ios/50/linkedin.png"
            alt="linkedin"
          />{" "}
          LinkedIn
        </a>
        <a
          href={profile.github}
          target="_blank"
          className="flex items-center gap-2 hover:text-ink-mute"
        >
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/ios-glyphs/30/github.png"
            alt="github"
          />{" "}
          GitHub
        </a>
      </div>

      <p className="mt-16 font-mono text-xs text-ink-mute">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js.
      </p>
    </section>
  );
}
