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
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-ink focus:text-paper"
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