import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import Like from "./Like";

function UserCard({
  user,
  setIsEditing,
  isEditable,
  isNetwork,
  authorId,
  isDisabled,
}) {
  const navigate = useNavigate();

  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src={user?.image?.saveFilePath}
            alt="프로필 이미지"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>
        {user && (
          <Like user={user} authorId={authorId} isDisabled={isDisabled} />
        )}

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Row>
            <Card.Link
              className="mt-3"
              href="#"
              onClick={() => navigate(`/users/${user.id}`)}
            >
              포트폴리오
            </Card.Link>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
