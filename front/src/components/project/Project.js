import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";
// recoil 사용

function Project({ project, isEditable }) {
  // useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <ProjectEditForm project={project} setIsEditing={setIsEditing} />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Project;
