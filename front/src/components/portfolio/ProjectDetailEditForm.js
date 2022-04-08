import { Button, Card } from "react-bootstrap";

const ProjectDetailEditForm = ({ project, setIsEditing }) => {
  return (
    <Card.Body>
      <p>수정중입니다,,</p>
      <Button variant="secondary" onClick={() => setIsEditing(false)}>
        취소
      </Button>
    </Card.Body>
  );
};

export default ProjectDetailEditForm;
