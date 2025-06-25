'use client';

import { useState } from 'react';

interface ProjectInfo {
  name: string;
  logo: string;
  description: string;
  longDescription: string;
  category: string;
  language: string;
  stars: number;
  forks: number;
  githubUrl: string;
  websiteUrl: string;
  features: string[];
  color: string;
}

export const useProjectModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(null);

  const openModal = (project: ProjectInfo) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return {
    isModalOpen,
    selectedProject,
    openModal,
    closeModal
  };
};

export type { ProjectInfo }; 