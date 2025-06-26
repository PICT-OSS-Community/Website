'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Cube3D.module.css';
import { useProjectModalContext } from './ProjectModalContext';
import { ProjectInfo } from './useProjectModal';
import projectsData from '../data/projects.json';

const Cube3D = () => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [currentProject, setCurrentProject] = useState<string>('');
  const [clickedFaces, setClickedFaces] = useState<Set<string>>(new Set());
  const { openModal } = useProjectModalContext();

  const projects = {
    front: [
      { name: 'freeCodeCamp', logo: 'https://img.logo.dev/freecodecamp.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'TensorFlow', logo: 'https://img.logo.dev/tensorflow.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'React', logo: 'https://img.logo.dev/react.dev?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Vue', logo: 'https://img.logo.dev/vuejs.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Bootstrap', logo: 'https://img.logo.dev/getbootstrap.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Oh My Zsh', logo: 'https://img.logo.dev/ohmyz.sh?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Axios', logo: 'https://img.logo.dev/axios-http.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Build Your Own X', logo: 'https://img.logo.dev/github.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'React Native', logo: 'https://img.logo.dev/reactnative.dev?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' }
    ],
    back: [
      { name: 'Visual Studio Code', logo: 'https://img.logo.dev/code.visualstudio.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Kubernetes', logo: 'https://img.logo.dev/kubernetes.io?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Node.js', logo: 'https://img.logo.dev/nodejs.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Linux Kernel', logo: 'https://img.logo.dev/kernel.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Mozilla Firefox', logo: 'https://img.logo.dev/mozilla.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'OpenAI Gym', logo: 'https://img.logo.dev/openai.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Apache Kafka', logo: 'https://img.logo.dev/kafka.apache.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Flutter', logo: 'https://img.logo.dev/flutter.dev?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Bitcoin', logo: 'https://img.logo.dev/bitcoin.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' }
    ],
    right: [
      { name: 'DefinitelyTyped', logo: 'https://img.logo.dev/typescriptlang.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Linux', logo: 'https://img.logo.dev/linux.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Prometheus', logo: 'https://img.logo.dev/prometheus.io?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'OpenAI GPT', logo: 'https://img.logo.dev/openai.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'RISC-V', logo: 'https://img.logo.dev/riscv.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Rust', logo: 'https://img.logo.dev/rust-lang.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'WebAssembly', logo: 'https://img.logo.dev/webassembly.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'OpenTelemetry', logo: 'https://img.logo.dev/opentelemetry.io?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Edge Computing', logo: 'https://img.logo.dev/azure.microsoft.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' }
    ],
    left: [
      { name: 'Open Hub', logo: 'https://img.logo.dev/github.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'SourceForge', logo: 'https://img.logo.dev/sourceforge.net?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Libraries.io', logo: 'https://img.logo.dev/libraries.io?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'AlternativeTo', logo: 'https://img.logo.dev/alternativeto.net?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Coolify', logo: 'https://img.logo.dev/coolify.io?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'DevToys', logo: 'https://img.logo.dev/devtoys.app?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Zed', logo: 'https://img.logo.dev/zed.dev?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'STORM', logo: 'https://img.logo.dev/openai.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Co-STORM', logo: 'https://img.logo.dev/openai.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' }
    ],
    top: [
      { name: 'Budibase', logo: 'https://img.logo.dev/budibase.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'GrapesJS', logo: 'https://img.logo.dev/grapesjs.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'NocoBase', logo: 'https://img.logo.dev/nocobase.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Windmill', logo: 'https://img.logo.dev/windmill.dev?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Directus', logo: 'https://img.logo.dev/directus.io?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Refine', logo: 'https://img.logo.dev/refine.dev?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Appsmith', logo: 'https://img.logo.dev/appsmith.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Strapi', logo: 'https://img.logo.dev/strapi.io?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'ToolJet', logo: 'https://img.logo.dev/tooljet.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' }
    ],
    bottom: [
      { name: 'Appwrite', logo: 'https://img.logo.dev/appwrite.io?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'PocketBase', logo: 'https://img.logo.dev/pocketbase.io?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'NocoDB', logo: 'https://img.logo.dev/nocodb.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'AppFlowy', logo: 'https://img.logo.dev/appflowy.io?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Supabase', logo: 'https://img.logo.dev/supabase.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'n8n', logo: 'https://img.logo.dev/n8n.io?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'OpenCV', logo: 'https://img.logo.dev/opencv.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'Docker', logo: 'https://img.logo.dev/docker.com?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' },
      { name: 'PostgreSQL', logo: 'https://img.logo.dev/postgresql.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png' }
    ]
  };

  const faceTransforms = {
    front: [
      'translateZ(80px)',
      'translateZ(80px) translateX(-52px)',
      'translateZ(80px) translateX(52px)',
      'translateZ(80px) translateY(-52px)',
      'translateZ(80px) translateX(-52px) translateY(-52px)',
      'translateZ(80px) translateX(52px) translateY(-52px)',
      'translateZ(80px) translateY(52px)',
      'translateZ(80px) translateX(-52px) translateY(52px)',
      'translateZ(80px) translateX(52px) translateY(52px)'
    ],
    back: [
      'rotateY(180deg) translateZ(80px)',
      'rotateY(180deg) translateZ(80px) translateX(-52px)',
      'rotateY(180deg) translateZ(80px) translateX(52px)',
      'rotateY(180deg) translateZ(80px) translateY(-52px)',
      'rotateY(180deg) translateZ(80px) translateX(-52px) translateY(-52px)',
      'rotateY(180deg) translateZ(80px) translateX(52px) translateY(-52px)',
      'rotateY(180deg) translateZ(80px) translateY(52px)',
      'rotateY(180deg) translateZ(80px) translateX(-52px) translateY(52px)',
      'rotateY(180deg) translateZ(80px) translateX(52px) translateY(52px)'
    ],
    right: [
      'rotateY(90deg) translateZ(80px)',
      'rotateY(90deg) translateZ(80px) translateX(-52px)',
      'rotateY(90deg) translateZ(80px) translateX(52px)',
      'rotateY(90deg) translateZ(80px) translateY(-52px)',
      'rotateY(90deg) translateZ(80px) translateX(-52px) translateY(-52px)',
      'rotateY(90deg) translateZ(80px) translateX(52px) translateY(-52px)',
      'rotateY(90deg) translateZ(80px) translateY(52px)',
      'rotateY(90deg) translateZ(80px) translateX(-52px) translateY(52px)',
      'rotateY(90deg) translateZ(80px) translateX(52px) translateY(52px)'
    ],
    left: [
      'rotateY(-90deg) translateZ(80px)',
      'rotateY(-90deg) translateZ(80px) translateX(-52px)',
      'rotateY(-90deg) translateZ(80px) translateX(52px)',
      'rotateY(-90deg) translateZ(80px) translateY(-52px)',
      'rotateY(-90deg) translateZ(80px) translateX(-52px) translateY(-52px)',
      'rotateY(-90deg) translateZ(80px) translateX(52px) translateY(-52px)',
      'rotateY(-90deg) translateZ(80px) translateY(52px)',
      'rotateY(-90deg) translateZ(80px) translateX(-52px) translateY(52px)',
      'rotateY(-90deg) translateZ(80px) translateX(52px) translateY(52px)'
    ],
    top: [
      'rotateX(90deg) translateZ(80px)',
      'rotateX(90deg) translateZ(80px) translateX(-52px)',
      'rotateX(90deg) translateZ(80px) translateX(52px)',
      'rotateX(90deg) translateZ(80px) translateY(-52px)',
      'rotateX(90deg) translateZ(80px) translateX(-52px) translateY(-52px)',
      'rotateX(90deg) translateZ(80px) translateX(52px) translateY(-52px)',
      'rotateX(90deg) translateZ(80px) translateY(52px)',
      'rotateX(90deg) translateZ(80px) translateX(-52px) translateY(52px)',
      'rotateX(90deg) translateZ(80px) translateX(52px) translateY(52px)'
    ],
    bottom: [
      'rotateX(-90deg) translateZ(80px)',
      'rotateX(-90deg) translateZ(80px) translateX(-52px)',
      'rotateX(-90deg) translateZ(80px) translateX(52px)',
      'rotateX(-90deg) translateZ(80px) translateY(-52px)',
      'rotateX(-90deg) translateZ(80px) translateX(-52px) translateY(-52px)',
      'rotateX(-90deg) translateZ(80px) translateX(52px) translateY(-52px)',
      'rotateX(-90deg) translateZ(80px) translateY(52px)',
      'rotateX(-90deg) translateZ(80px) translateX(-52px) translateY(52px)',
      'rotateX(-90deg) translateZ(80px) translateX(52px) translateY(52px)'
    ]
  };

  const faceColors = {
    front: '#ff6b6b',
    back: '#4ecdc4',
    right: '#45b7d1',
    left: '#96ceb4',
    top: '#ffeaa7',
    bottom: '#dda0dd'
  };

  // Get project data from JSON file
  const getProjectInfo = (projectName: string, faceKey: string): ProjectInfo => {
    const { projects, defaultProjectTemplate } = projectsData;
    
    // Check if we have detailed info for this project
    if (projects[projectName as keyof typeof projects]) {
      const projectData = projects[projectName as keyof typeof projects];
      return {
        ...projectData,
        color: faceColors[faceKey as keyof typeof faceColors]
      };
    }

    // Generate default project info using template
    const randomLanguage = defaultProjectTemplate.languages[
      Math.floor(Math.random() * defaultProjectTemplate.languages.length)
    ];
    const randomStars = Math.floor(
      Math.random() * (defaultProjectTemplate.starRange[1] - defaultProjectTemplate.starRange[0])
    ) + defaultProjectTemplate.starRange[0];
    const randomForks = Math.floor(
      Math.random() * (defaultProjectTemplate.forkRange[1] - defaultProjectTemplate.forkRange[0])
    ) + defaultProjectTemplate.forkRange[0];

    return {
      name: projectName,
      logo: `https://img.logo.dev/${projectName.toLowerCase().replace(/\s+/g, '')}.org?token=pk_HJOUYljnSYebdIrq5WdAcg&size=40&format=png`,
      description: defaultProjectTemplate.description.replace('{name}', projectName),
      longDescription: defaultProjectTemplate.longDescription.replace('{name}', projectName),
      category: defaultProjectTemplate.category,
      language: randomLanguage,
      stars: randomStars,
      forks: randomForks,
      githubUrl: `https://github.com/example/${projectName.toLowerCase().replace(/\s+/g, '-')}`,
      websiteUrl: `https://${projectName.toLowerCase().replace(/\s+/g, '')}.org`,
      features: [...defaultProjectTemplate.features],
      color: faceColors[faceKey as keyof typeof faceColors]
    };
  };

  const handleFaceClick = (projectName: string, faceKey: string, index: number) => {
    const faceId = `${faceKey}-${index}`;
    console.log(`🚀 Clicked on: ${projectName}`);
    
    // Toggle clicked state
    setClickedFaces(prev => {
      const newSet = new Set(prev);
      if (newSet.has(faceId)) {
        newSet.delete(faceId);
      } else {
        newSet.add(faceId);
      }
      return newSet;
    });

    // Open modal with project info
    const projectInfo = getProjectInfo(projectName, faceKey);
    openModal(projectInfo);
  };

  const handleMouseEnter = (projectName: string) => {
    console.log(`👀 Hovering over: ${projectName}`);
    setCurrentProject(projectName);
  };

  const handleMouseLeave = () => {
    setCurrentProject('');
  };



  useEffect(() => {
    // Log all projects on mount
    console.log('🎲 Open Source Cube Projects:');
    console.log('🔴 Front (Red):', projects.front.map(p => p.name));
    console.log('🔵 Back (Teal):', projects.back.map(p => p.name));
    console.log('🟦 Right (Blue):', projects.right.map(p => p.name));
    console.log('🟢 Left (Green):', projects.left.map(p => p.name));
    console.log('🟡 Top (Yellow):', projects.top.map(p => p.name));
    console.log('🟣 Bottom (Purple):', projects.bottom.map(p => p.name));
  }, []);

  const renderFace = (faceKey: keyof typeof projects, className: string) => {
    return projects[faceKey].map((project, index) => {
      const faceId = `${faceKey}-${index}`;
      const isClicked = clickedFaces.has(faceId);
      
      return (
        <div
          key={faceId}
          className={`${styles.face} ${styles.textShadow} ${isClicked ? styles.clicked : ''}`}
          style={{
            transform: faceTransforms[faceKey][index],
            backgroundColor: isClicked ? 'rgba(255,255,255,0.8)' : faceColors[faceKey],
            borderColor: isClicked ? '#fff' : '#fff',
            borderWidth: isClicked ? '2px' : '1px',
            color: isClicked ? '#333' : '#fff'
          }}
          onClick={() => handleFaceClick(project.name, faceKey, index)}
          onMouseEnter={() => handleMouseEnter(project.name)}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={project.logo}
            alt={`${project.name} logo`}
            className={styles.faceImage}
            style={{
              filter: isClicked 
                ? 'brightness(0.8) contrast(1.2)' 
                : 'brightness(1.1) contrast(1.1)'
            }}
          />
        </div>
      );
    });
  };

  return (
    <>
      <div className={`${styles.scene} relative flex justify-center items-center mx-auto`}>
        {/* Tooltip */}
        <div
          ref={tooltipRef}
          className={styles.tooltip}
          style={{
            opacity: currentProject ? 1 : 0
          }}
        >
          {currentProject}
        </div>

        {/* Cube Wrapper */}
        <div className={styles.cubeWrapper}>
          {/* Cube */}
          <div className={styles.cube}>
            {/* Render all faces */}
            {renderFace('front', 'face_front')}
            {renderFace('back', 'face_back')}
            {renderFace('right', 'face_right')}
            {renderFace('left', 'face_left')}
            {renderFace('top', 'face_top')}
            {renderFace('bottom', 'face_bottom')}
          </div>
        </div>
      </div>

    </>
  );
};

export default Cube3D; 