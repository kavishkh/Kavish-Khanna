import Navigation from "@/components/Navigation";
import Hero       from "@/components/Hero";
import About      from "@/components/About";
import Expertise  from "@/components/Expertise";
import Projects   from "@/components/Projects";
import Experience from "@/components/Experience";
import Approach   from "@/components/Approach";
import Contact    from "@/components/Contact";
import Footer     from "@/components/Footer";

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Expertise />
      <Projects />
      <Experience />
      <Approach />
      <Contact />
      <Footer />
    </main>
  );
}
