import { useState } from "react";
import * as Api from "../../../api";
import { Form, Button } from "react-bootstrap";
import "../Comment.css";

const ReplyAddForm = ({ author, CommentId, setReplies }) => {
  const { id, name } = author;

  const [reply, setReply] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Api.post("reply", {
      parent_comment_id: CommentId,
      author_id: id,
      author_name: name,
      text: reply,
    });
    setReplies((replies) => [...replies, res.data]);
    setReply("");
  };

  return (
    <Form onSubmit={handleSubmit} className="commentBody" id="replyAddForm">
      <Form.Group
        className="mb-3 commentBody"
        controlId="exampleForm.ControlTextarea1"
      >
        <Form.Label className="commentBody">댓글을 입력해주세요!</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default ReplyAddForm;
