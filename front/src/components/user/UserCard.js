import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
// src={"./images/" + saveFileName}
// "..\\front\\public\\images\\default_img.jpg" 형식으로 백엔드에서 받아
// 1. ".\\images\\default_img.jpg" 와 같은 형식으로 프론트에서 문자열 슬라이스를 변경하기
// 2. 백엔드에서 문자열 슬라이스한 값을 프론트 기준으로 보내주기

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
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
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
