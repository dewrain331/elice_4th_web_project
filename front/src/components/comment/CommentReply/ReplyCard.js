import { Card, Col, Row, Button } from "react-bootstrap";
import * as Api from "../../../api";
import "../Comment.css";

const ReplyCard = ({ reply, isEditable, setReplies, setIsEditing }) => {
  const { id, author_name, text, parent_comment_id, createdAt } = reply;

  const handleDelete = async () => {
    try {
      await Api.delete("comment/reply", `${parent_comment_id}/${id}`);

      setReplies((replies) => {
        const pos = replies.findIndex((r) => r.id === id);
        if (pos >= -1) {
          replies.splice(pos, 1);
          return [...replies];
        }
        return replies;
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Card.Body className="mt-2 text-justify float-left commentBody">
      <Card className="p-3">
        <Row>
          <Col xs={10} className="text-primary commentBody">
            <h4 className="commentBody">{author_name}</h4>
          </Col>
          <Col xs={2} className="text-secondary commentBody">
            <h6 className="commentBody">{createdAt.slice(0, 10)}</h6>{" "}
          </Col>
        </Row>
        <Card.Text className="mt-2 commentBody">{text}</Card.Text>
        <Col className="commentBody">
          {isEditable && (
            <>
              <Button
                variant="secondary"
                className="me-1"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button variant="secondary" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </Col>
      </Card>
    </Card.Body>
  );
};

export default ReplyCard;
