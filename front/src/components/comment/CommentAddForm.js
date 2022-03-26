import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as Api from "../../api";
import "./Comment.css";

const CommentAddForm = ({ userId, author, setComments }) => {
  const [comment, setComment] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Api.post("comment", {
      userId,
      authorId: author?.id,
      authorName: author?.name,
      text: comment,
    });

    setComments((comments) => [...comments, res.data]);
    setComment("");
  };

  return (
    <Form onSubmit={handleSubmit} className="commentCard">
      <Form.Group
        className="mb-3 commentCard"
        controlId="exampleForm.ControlTextarea1"
      >
        <Form.Label className="commentCard">댓글을 입력해주세요!</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default CommentAddForm;
