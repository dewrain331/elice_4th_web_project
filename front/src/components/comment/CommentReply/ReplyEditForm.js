import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import * as Api from "../../../api";

const ReplyEditForm = ({ reply, setReplies, setIsEditing }) => {
  const { id, text } = reply;
  const [replyText, setReplyText] = useState(text);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Api.post(`comment/reply/${id}`, {
      text: replyText,
    });
    setReplies((replies) => {
      const pos = replies.findIndex((r) => r.id === id);
      if (pos > -1) {
        replies[pos] = res.data;
        return [...replies];
      }
      return replies;
    });
    setIsEditing(false);
  };
  return (
    <Card.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>댓글을 입력해주세요!</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Card.Body>
  );
};

export default ReplyEditForm;
