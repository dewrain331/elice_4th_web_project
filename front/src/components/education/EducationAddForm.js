import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isAddingState, pageState, allPageState } from "./EducationAtom";
import "../Components.css";

const VALUES = ["재학중", "학사졸업", "석사졸업", "박사졸업"];
const PER_PAGE = 3;

const EducationAddForm = ({ userId, setEducations }) => {
  //학력 정보를 post할 때 필요한 school, major, position을 state로 지정
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("");

  const setIsAdding = useSetRecoilState(isAddingState);
  const [page, setPage] = useRecoilState(pageState);
  const setAllPage = useSetRecoilState(allPageState);

  //확인 버튼을 눌렀을 때 post요청 보낼 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.post("education/create", {
        userId,
        school,
        major,
        position,
      });

      const res = await Api.get(
        "educationlist",
        `${userId}?page=${page}&perPage=${PER_PAGE}`
      );

      const { totalPage, educations } = res.data;

      setPage(totalPage);
      setAllPage(totalPage);
      setEducations(educations);
    } catch (err) {
      console.log(err.message);
    }
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="portfolioBG">
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="학교 이름"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicTitle" className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <div
        className="mb-3 portfolioBG"
        onChange={(e) => setPosition(e.target.value)}
      >
        {VALUES.map((value, idx) => (
          <Form.Check
            className="portfolioBG"
            inline
            label={value}
            value={value}
            name="position"
            type="radio"
            key={`inline-radio-${idx}`}
          />
        ))}
      </div>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }} className="portfolioBG">
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default EducationAddForm;
