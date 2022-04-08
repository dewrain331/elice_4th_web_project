import { Card, Col, Button } from "react-bootstrap";

const ProjectDetailCard = ({ project, setIsEditing, isEditable }) => {
  return (
    <Card.Body>
      {/* 
        project에서 받아오는 필수 정보가 이력서 쪽 project의 정보들이면 좋겠음
        title, fromDate, toDate, description 정보는 필수적
        images, deployLink, githubLink, projectRole, details 정보는 있으면 가져오도록 함
      */}
      {isEditable && (
        <Col xs={3}>
          <Button
            variant="info"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="mr-3"
          >
            편집
          </Button>{" "}
        </Col>
      )}
    </Card.Body>
  );
};

export default ProjectDetailCard;
