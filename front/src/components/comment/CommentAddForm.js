import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as Api from "../../api";

const CommentAddForm = ({ user_id, author, setComments }) => {
  const [comment, setComment] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Api.post("comment", {
      user_id,
      author_id: author?.id,
      author_name: author?.name,
      text: comment,
    });

    setComments((comments) => [...comments, res.data]);
    setComment("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>댓글을 입력해주세요!</Form.Label>
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
