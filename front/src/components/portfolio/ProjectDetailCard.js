import { Card, Col, Button } from "react-bootstrap";

const ProjectDetailCard = ({ project, setIsEditing, isEditable }) => {
  return (
    <Card.Body
      className="mb-4"
      style={{ backgroundColor: "white", borderRadius: "10px" }}
    >
      <h4
        style={{
          display: "inline",
          marginRight: "10px",
          backgroundColor: "white",
        }}
      >
        {project.title}
      </h4>
      <p style={{ backgroundColor: "white" }}>{project.date}</p>
      {project.deployLink && (
        <div style={{ backgroundColor: "white" }}>
          <span style={{ backgroundColor: "white", fontWeight: "bold" }}>
            URL:{" "}
          </span>
          <span style={{ backgroundColor: "white" }}>{project.deployLink}</span>
        </div>
      )}
      {project.githubLink && (
        <div style={{ backgroundColor: "white" }}>
          <span style={{ backgroundColor: "white", fontWeight: "bold" }}>
            GitHub:{" "}
          </span>
          <span style={{ backgroundColor: "white" }}>{project.githubLink}</span>
        </div>
      )}

      {project.githubLink && (
        <div style={{ backgroundColor: "white", marginBottom: "15px" }}>
          <span style={{ backgroundColor: "white", fontWeight: "bold" }}>
            Project Role:{" "}
          </span>
          <span style={{ backgroundColor: "white" }}>
            {project.projectRole}
          </span>
        </div>
      )}

      {project.details !== [""] && (
        <>
          <span style={{ backgroundColor: "white", fontWeight: "bold" }}>
            세부 정보
          </span>
          <ul style={{ backgroundColor: "white" }}>
            {project.details.map((detail, idx) => (
              <li style={{ backgroundColor: "white" }} key={idx}>
                {detail}
              </li>
            ))}
          </ul>
        </>
      )}
      {isEditable && (
        <Col xs={3} style={{ backgroundColor: "white" }}>
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
