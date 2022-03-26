import React, { useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import EducationAddForm from "./EducationAddForm";
import Education from "./Education";
import { useRecoilState } from "recoil";
import {
  EducationsState,
  isAddingState,
  pageState,
  allPageState,
} from "./EducationAtom";
import "../Components.css";

const PER_PAGE = 3;

const Educations = ({ portfolioOwnerId, isEditable }) => {
  const [educations, setEducations] = useRecoilState(EducationsState);
  const [isAdding, setIsAdding] = useRecoilState(isAddingState);

  const [page, setPage] = useRecoilState(pageState);
  const [allPage, setAllPage] = useRecoilState(allPageState);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await Api.get(
          "educationlist",
          `${portfolioOwnerId}?page=${page}&perPage=${PER_PAGE}`
        );
        const { totalPage, educations } = res.data;
        setAllPage(totalPage);
        setEducations(educations);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProjects();
  }, [portfolioOwnerId, page, allPage, setAllPage, setEducations]);

  return (
    <Card.Body className="portfolioBG" style={{ borderRadius: "10px" }}>
      <Card.Title className="portfolioBG">학력</Card.Title>
      {educations.map((edu) => (
        <Education key={edu.id} education={edu} isEditable={isEditable} />
      ))}
      {isEditable && (
        <Row className="mt-3 text-center mb-4">
          <Col className="portfolioBG">
            <Button onClick={() => setIsAdding(true)}>+</Button>
          </Col>
        </Row>
      )}
      {isAdding && (
        <EducationAddForm
          userId={portfolioOwnerId}
          setEducations={setEducations}
        />
      )}
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

export default Educations;
