import { Card, Button, Row, Col } from "react-bootstrap";

function ProjectCard({ project, isEditable, setIsEditing }) {
  const slicingDate = (date) => {
    return date.slice(0, 10);
  }
  return (
    <Card.Text>
      {/* project의 제목, 상세내용, 기간 */}
      <Row className="align-items-center">
        <Col>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <br />
          {/* project의 기간을 object로 받고 출력형식에 맞게 변경 */}
          <span className="text-muted">{slicingDate(project.from_date)} ~ {slicingDate(project.to_date)}</span>
        </Col>
        {/* project 편집 버튼 */}
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;
