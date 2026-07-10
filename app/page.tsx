import Contact from "./container/Contact";
import Education from "./container/Education";
import Experience from "./container/Experience";
import Hero from "./container/Hero";
import Nav from "../components/Nav";
import Projects from "./container/Projects";
import Skills from "./container/Skills";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Experience />
      <Projects />
      <Education />
      <Skills />
      <Contact />
    </main>
  );
}