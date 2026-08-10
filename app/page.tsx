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
        className="fixed top-0 left-0 z-50 p-3 m-3 -translate-y-24 focus:translate-y-0 transition-transform bg-ink text-white font-mono text-sm rounded-md shadow-lg"
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