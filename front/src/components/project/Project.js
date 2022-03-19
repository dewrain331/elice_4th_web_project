import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

function Project({ project, setProjects, isEditable, page, setTotalPage, setPage }) {
  // useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          currentProject={project}
          setProjects={setProjects}
          setIsEditing={setIsEditing}
          page={page}
        />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setProjects={setProjects}
          page={page}
          setTotalPage={setTotalPage}
          setPage={setPage}
        />
      )}
    </>
  );
}

export default Project;
