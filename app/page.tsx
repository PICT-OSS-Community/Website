import Image from "next/image";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Community from "./components/Community";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Community />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
