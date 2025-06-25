'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useProjectModal, ProjectInfo } from './useProjectModal';

interface ProjectModalContextType {
  isModalOpen: boolean;
  selectedProject: ProjectInfo | null;
  openModal: (project: ProjectInfo) => void;
  closeModal: () => void;
}

const ProjectModalContext = createContext<ProjectModalContextType | undefined>(undefined);

export const ProjectModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const modalState = useProjectModal();

  return (
    <ProjectModalContext.Provider value={modalState}>
      {children}
    </ProjectModalContext.Provider>
  );
};

export const useProjectModalContext = () => {
  const context = useContext(ProjectModalContext);
  if (context === undefined) {
    throw new Error('useProjectModalContext must be used within a ProjectModalProvider');
  }
  return context;
}; 