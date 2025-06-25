'use client';

import Image from "next/image";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Community from "./components/Community";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import { ProjectModalProvider, useProjectModalContext } from "./components/ProjectModalContext";
import ProjectModal from "./components/ProjectModal";

function HomeContent() {
  const { isModalOpen, selectedProject, closeModal } = useProjectModalContext();

  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      <main>
        <Hero />
        <Community />
        <Blogs />
      </main>
      <Footer />
      
      {/* Modal rendered as overlay */}
      {isModalOpen && (
        <ProjectModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          project={selectedProject}
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <ProjectModalProvider>
      <HomeContent />
    </ProjectModalProvider>
  );
}
