import { createContext, useState } from "react";
import { IProjectData } from "../interfaces/Interfaces";
import React from "react";
import { v4 as uuid } from "uuid";

type ProjectContextProviderProps = {
  children: React.ReactNode;
};

type IProject = {
  projectName: string,
  projectDescription: string,
  projectInitials: string,
  id: string;
};

type IProjectContext = {
  projects: IProject[];
  setProjects: React.Dispatch<React.SetStateAction<IProjectData[]>>;
  addProject: (projectName: string, projectDescription: string, projectInitials: string) => void;
  deleteProject: (id: string) => void;
  updateProject: (id: string, updatedProject: IProject) => void;
};

const PROJECTS = [
  {
    projectName: "TMT",
    projectDescription: "Very good project for very good people",
    projectInitials: 'GG',
    id: uuid()
  }
];

export const ProjectContext = createContext<IProjectContext>({
  projects: PROJECTS,
  setProjects: () => {},
  addProject: () => {},
  deleteProject: () => {},
  updateProject: () => {}
});

export const ProjectContextProvider = ({
  children
}: ProjectContextProviderProps) => {
  const [projects, setProjects] = useState<IProject[]>(PROJECTS);

  const addProject = (
    projectName: string,
    projectDescription: string,
    projectInitials: string
  ): void => {
    setProjects([...projects, { projectName, projectDescription, projectInitials, id: uuid() }]);
  };

  const deleteProject = (id: string): void => {
    setProjects(PROJECTS.filter((project) => project.id !== id));
  };

  const updateProject = (id: string, updatedProject: IProject): void => {
    setProjects(
      PROJECTS.map((project) => (project.id === id ? updatedProject : project))
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        addProject,
        deleteProject,
        updateProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
