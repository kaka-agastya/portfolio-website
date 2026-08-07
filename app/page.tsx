import Contact from "./container/Contact";
import Education from "./container/Education";
import Experience from "./container/Experience";
import Hero from "./container/Hero";
import Nav from "../components/Nav";
import Projects from "./container/Projects";
import Skills from "./container/Skills";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="absolute -top-[9999px] left-4 z-50 rounded-md border border-ink bg-paper px-4 py-2 font-mono text-sm text-ink focus:top-4 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Skip to main content
      </a>
      <Nav />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <Experience />
        <Projects />
        <Education />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
