'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Star, GitFork, ExternalLink, Github } from 'lucide-react';
import { ProjectInfo } from './useProjectModal';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectInfo | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[9999] p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(2px)'
      }}
      onClick={(e) => {
        // Close modal when clicking on backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto pixelated-border relative shadow-2xl">
        {/* Header */}
        <div 
          className="p-6 text-white relative"
          style={{ backgroundColor: project.color }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-black hover:bg-white hover:bg-opacity-20 p-2 pixelated-border transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-4 mr-12">
            <div className="w-16 h-16 bg-white bg-opacity-20 pixelated-border flex items-center justify-center">
              <img 
                src={project.logo} 
                alt={project.name}
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <h2 className="font-mono text-2xl font-bold">{project.name}</h2>
              <p className="font-mono text-sm opacity-90">{project.category}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-100 p-3 pixelated-border text-center">
              <div className="flex items-center justify-center gap-1 text-yellow-600 mb-1">
                <Star size={16} />
                <span className="font-mono font-bold">{project.stars.toLocaleString()}</span>
              </div>
              <p className="font-mono text-xs text-gray-600">STARS</p>
            </div>
            
            <div className="bg-gray-100 p-3 pixelated-border text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <GitFork size={16} />
                <span className="font-mono font-bold">{project.forks.toLocaleString()}</span>
              </div>
              <p className="font-mono text-xs text-gray-600">FORKS</p>
            </div>
            
            <div className="bg-gray-100 p-3 pixelated-border text-center">
              <div className="font-mono font-bold text-green-600 mb-1">{project.language}</div>
              <p className="font-mono text-xs text-gray-600">LANGUAGE</p>
            </div>
            
            <div className="bg-gray-100 p-3 pixelated-border text-center">
              <div className="font-mono font-bold text-purple-600 mb-1">OPEN</div>
              <p className="font-mono text-xs text-gray-600">SOURCE</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-mono text-lg font-bold text-black mb-3">ABOUT</h3>
            <p className="font-mono text-gray-700 leading-relaxed mb-4">{project.description}</p>
            <p className="font-mono text-sm text-gray-600 leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-mono text-lg font-bold text-black mb-3">KEY FEATURES</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 pixelated-border"></div>
                  <span className="font-mono text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-black text-white font-mono font-bold px-4 py-3 pixelated-border hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <Github size={18} />
              VIEW ON GITHUB
            </a>
            
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border-2 border-black text-black font-mono font-bold px-4 py-3 pixelated-border hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink size={18} />
              VISIT WEBSITE
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // Render the modal directly without portal
  return modalContent;
};

export default ProjectModal; 