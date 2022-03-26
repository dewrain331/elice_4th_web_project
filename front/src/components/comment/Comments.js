import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Comment from "./Comment";
import CommentAddForm from "./CommentAddForm";
import * as Api from "../../api";
import "./Comment.css";

const Comments = ({ userId, author }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    Api.get("user/comment", userId).then((res) => setComments(res.data));
  }, [userId]);

  return (
    <Card.Body className="commentCard" id="commentCard_radius">
      <h4 className="commentCard">방명록</h4>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          setComments={setComments}
          isEditable={author?.id === comment.author_id}
          author={author}
        />
      ))}
      <CommentAddForm
        user_id={userId}
        author={author}
        setComments={setComments}
      />
    </Card.Body>
  );
};

export default Comments;
