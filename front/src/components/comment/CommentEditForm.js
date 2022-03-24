import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as Api from "../../api";

const CommentEditForm = ({ comment, setComments, setIsEditing }) => {
  const { id } = comment;
  const [commentText, setCommentText] = useState(comment.text);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await Api.post(`comment/${id}`, {
      text: commentText,
    });

    setComments((comments) => {
      const pos = comments.findIndex((c) => c.id === comment.id);
      if (pos > -1) {
        comments[pos].text = commentText;
        return [...comments];
      }
      return comments;
    });

    setIsEditing(false);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>댓글을 입력해주세요!</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default CommentEditForm;
