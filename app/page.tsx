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
        className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-ink focus:border focus:border-ink focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
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