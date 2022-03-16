import { Card, Button, Row, Col } from "react-bootstrap";

function ProjectCard({ project, isEditable, setIsEditing }) {
  // const convertDate = (date) => {
  //   const year = date.getFullYear();
  //   const month = ('0' + (date.getMonth() + 1)).slice(-2);
  //   const day = ('0' + date.getDate()).slice(-2);
  //   const selectedDate = [year, month, day].join("-");
  //   return selectedDate;
  // }
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
          <span className="text-muted">{(project.from_date)} ~ {(project.to_date)}</span>
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
