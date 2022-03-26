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
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem", backgroundColor: "white", borderRadius: "10px" }}>
      <Card.Body style={{backgroundColor: "white", borderRadius: "10px"}}>
        <Row className="justify-content-center" style={{backgroundColor: "white"}}>
          <Card.Img
            style={{ width: "10rem", height: "8rem", backgroundColor: "white" }}
            className="mb-3"
            src={user?.image?.saveFilePath}
            alt="프로필 이미지"
          />
        </Row>
        <Card.Title style={{backgroundColor: "white"}}>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={{backgroundColor: "white"}}>{user?.email}</Card.Subtitle>
        <Card.Text style={{backgroundColor: "white"}}>{user?.description}</Card.Text>
        {user && (
          <Like user={user} authorId={authorId} isDisabled={isDisabled} />
        )}

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }} style={{backgroundColor: "white"}}>
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
          <Row style={{backgroundColor: "white"}}>
            <Card.Link
              className="mt-3"
              href="#"
              onClick={() => navigate(`/users/${user.id}`)}
              style={{backgroundColor: "white"}}
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
