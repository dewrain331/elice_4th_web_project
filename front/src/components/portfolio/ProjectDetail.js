import { useState } from "react";

import ProjectDetailEditForm from "./ProjectDetailEditForm";
import ProjectDetailCard from "./ProjectDetailCard";

const ProjectDetail = ({ project, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <ProjectDetailEditForm project={project} setIsEditing={setIsEditing} />
      ) : (
        <ProjectDetailCard
          project={project}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
};

export default ProjectDetail;
