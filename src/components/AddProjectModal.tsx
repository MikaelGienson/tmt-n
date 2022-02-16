import React, { useState, useEffect, useRef, useContext } from "react";
import { ColorResult, TwitterPicker } from 'react-color';
import ReactPortal from "./ReactPortal";
import "./AddProjectModal.scss";
import { ProjectContext } from "../context/ProjectContext";
import { IProjectData } from "../interfaces/Interfaces";

export type IAddProjectFormProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose: () => void;
  children: React.ReactNode;
};

// type IColorPicker = {
//   displayColorPicker: boolean;
//   setDisplayColorPicker: React.Dispatch<React.SetStateAction<boolean>>;
// };

function AddProjectModal({ isOpen, setIsOpen, handleClose }: IAddProjectFormProps) {

  // thumbnail color picker >>
  const [ displayColorPicker, setDisplayColorPicker] = useState(false)
  const [ thumbnailColor, setThumbnailColor ] = useState<string>('#7BDCB5')

  const handleColorClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  };

  const handleColorClose = () => {
    setDisplayColorPicker(false)
  };

  const handleChangeComplete = (color: string) => {
    setThumbnailColor(color)

  }
    // thumbnail color picker <<

  // adding new project >>
  const { addProject } = useContext(ProjectContext);

  const [newProject, setNewProject] = useState<IProjectData>({
    projectName: "",
    projectDescription: "",
    projectInitials: '',
    id: ""
  });

  // updates the newProject state
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const { projectName, projectDescription } = newProject;

  // submitts form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const projectInitals: string = document.getElementById('project-initials')!.innerHTML ? document.getElementById('project-initials')!.innerHTML : 'XX'
    addProject(projectName, projectDescription, projectInitals);
  };

  // adding new project <<

  // calculates no of characters in the textarea and sets new project data
  const [charsCount, setCharsCount] = useState<number>(0);
  const maxChars: number = 144;
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
    setCharsCount(e.target.value.length);
  };

  // closes modal on click outside >>
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  // closes modal on click outside <<

  // closes modal on ESC >>
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;
  // closes modal on ESC <<

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div className="overlay">
        <div ref={ref} className="modal">
          <h2>Create New Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter project name"
                name={"projectName"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onInputChange(e)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Project Description</label>
              <textarea
                className="form-control"
                rows={3}
                maxLength={maxChars}
                name={"projectDescription"}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleChange(e)
                }
                placeholder="Enter project description"
                required
                
              ></textarea>
            </div>

            <div style={{ display: "flex", justifyContent: "right" }}>
              <span>{`${maxChars - charsCount}/${maxChars}`}</span>
            </div>
            <div className="thumbnail">
              <div style={{backgroundColor: thumbnailColor}}><div className="text" contentEditable='true' id='project-initials'>GG</div></div>
              <button onClick={ handleColorClick }>Change thumbnail color</button>
            </div>
            <div className='color-picker-container'>
              { displayColorPicker ? <div className='popover'>
                <div className='cover' onClick={ handleColorClose }/>
                <TwitterPicker color={thumbnailColor} onChangeComplete={(color) => handleChangeComplete(color.hex)}/>
              </div> : null }
            </div>
            <div className="buttons">
              <button onClick={handleClose} className="btn btn-none-black">
                Cancel
              </button>
              <button className="btn btn-blue-white" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </ReactPortal>
  );
}

export default AddProjectModal;
