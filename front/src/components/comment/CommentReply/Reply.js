import { useState } from "react";
import ReplyEditForm from "./ReplyEditForm";
import ReplyCard from "./ReplyCard";

const Reply = ({ reply, isEditable, setReplies }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <ReplyEditForm
          reply={reply}
          setReplies={setReplies}
          setIsEditing={setIsEditing}
        />
      ) : (
        <ReplyCard
          reply={reply}
          setReplies={setReplies}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
};

export default Reply;
