import React, { useState } from "react";
import GalleryCard from "./GalleryCard";
import GalleryEditForm from "./GalleryEditForm";

function Gallery({ gallery, isEditable }) {
  // useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <GalleryEditForm gallery={gallery} setIsEditing={setIsEditing} />
      ) : (
        <GalleryCard
          gallery={gallery}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Gallery;
