import { Card, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as Api from "../../api";

import ProjectDetail from "./ProjectDetail";
import ProjectDetailAddForm from "./ProjectDetailAddForm";

const PER_PAGE = 3;

const ProjectsDetail = ({ portfolioOwnerId, isEditable }) => {
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProjectsList = async () => {
      try {
        const res = await Api.get(
          "portfoliolist",
          `${portfolioOwnerId}?page=${page}&perPage=${PER_PAGE}`
        );
        const { totalPage, portfolios } = res.data;
        setAllPage(totalPage);
        setProjects(portfolios);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProjectsList();
  }, [portfolioOwnerId, page]);

  return (
    <Card.Body className="portfolioBG">
      <Card.Title className="portfolioBG">프로젝트 상세</Card.Title>
      {isEditable && (
        <Row className="mt-3 text-center mb-4">
          <Col sm={{ span: 20 }} className="portfolioBG">
            <Button onClick={() => setIsAdding(true)}>+</Button>
          </Col>
        </Row>
      )}
      {isAdding && (
        <ProjectDetailAddForm
          portfolioOwnerId={portfolioOwnerId}
          setIsAdding={setIsAdding}
          setProjects={setProjects}
          setPage={setPage}
          setAllPage={setAllPage}
          page={page}
          projects={projects}
        />
      )}
      {projects.map((proj) => (
        <ProjectDetail
          key={proj._id}
          project={proj}
          page={page}
          isEditable={isEditable}
          setProjects={setProjects}
          setPage={setPage}
          setAllPage={setAllPage}
        />
      ))}

      <Row className="mt-3 text-center mb-4">
        <Col className="portfolioBG">
          <Button
            variant="outline-secondary"
            size="sm"
            className="me-3"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page <= 1}
            id="prevBtn"
          >
            {"<"}
          </Button>
          <Button variant="outline-secondary" size="sm" disabled>
            {allPage === 0 ? 0 : page} / {allPage}
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            className="ms-3"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= allPage}
          >
            {">"}
          </Button>
        </Col>
      </Row>
    </Card.Body>
  );
};

export default ProjectsDetail;
