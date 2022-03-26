import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
// recoil 사용
import { useRecoilValue, useSetRecoilState } from "recoil";
import { projectsState, pageState } from "./ProjectAtom";
// 기간 선택을 위한 react-datepicker 라이브러리 및 css import
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Components.css";

const PER_PAGE = 3;

function ProjectEditForm({ project, setIsEditing }) {
  // useState로 title 상태를 생성함.
  const [title, setTitle] = useState(project.title);
  // useState로 description 상태를 생성함.
  const [description, setDescription] = useState(project.description);
  // useState로 from_date, to_date 상태를 생성함.
  const [fromDate, setFromDate] = useState(new Date(project.fromDate));
  const [toDate, setToDate] = useState(new Date(project.toDate));

  // recoil 적용
  const setProjects = useSetRecoilState(projectsState);
  const page = useRecoilValue(pageState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentProject의 user_id를 user_id 변수에 할당함.
    const { id, userId } = project;

    // "projects/프로젝트id" 엔드포인트로 PUT 요청함.
    try {
      await Api.put(`projects/${id}`, {
        title,
        description,
        fromDate: fromDate.toJSON(),
        toDate: toDate.toJSON(),
      });
      // "projectlist/유저id?page={현재 페이지}&?perPage={데이터 수}"로 GET 요청하고,
      // response의 data로 totalPage와 projects를 세팅함.
      const res = await Api.get(
        "projectlist",
        `${userId}?page=${page}&perPage=${PER_PAGE}`
      );
      setProjects(res.data.projects);
    } catch (error) {
      console.error(error);
    }
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="portfolioBG">
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 portfolioBG">
        <Col className="col-3 portfolioBG">
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
          />
        </Col>
        <Col className="col-3 portfolioBG">
          <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }} className="portfolioBG">
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;
