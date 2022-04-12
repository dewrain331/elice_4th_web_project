import { useState } from "react";

import ProjectDetailEditForm from "./ProjectDetailEditForm";
import ProjectDetailCard from "./ProjectDetailCard";

const ProjectDetail = ({
  project,
  page,
  isEditable,
  setProjects,
  setPage,
  setAllPage,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <ProjectDetailEditForm
          project={project}
          page={page}
          setIsEditing={setIsEditing}
          setProjects={setProjects}
        />
      ) : (
        <ProjectDetailCard
          project={project}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          page={page}
          setPage={setPage}
          setAllPage={setAllPage}
          setProjects={setProjects}
        />
      )}
    </>
  );
};

export default ProjectDetail;
