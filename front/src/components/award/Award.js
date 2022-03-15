import React, { useState } from "react";
import AwardEditForm from "./AwardEditForm";
import AwardCard from "./AwardCard";
import * as Api from "../../api";

const Award = ({ award, setAwards, isEditable }) => {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <AwardEditForm
          currentAward={award}
          setIsEditing={setIsEditing}
          setAwards={setAwards}
        />
      ) : (
        <AwardCard
          award={award}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Award