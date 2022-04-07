import { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { useSetRecoilState } from "recoil";
import {
  isAddingState,
  techsState,
} from "./TechAtom";
import "../Components.css";

const TechAddForm = ({ portfolioOwnerId }) => {
  // RecoilStates
  const setIsAdding = useSetRecoilState(isAddingState)
  const setTechs = useSetRecoilState(techsState);

  // useState로 기술 이름을 담을 title 변수 선언.
  const [title, setTitle] = useState("");
  // useState로 상세내용을 담을 description 변수 선언.
  const [description, setDescription] = useState("");
  // useState로 주관적 퍼센테이지를 담을 percent 변수 선언
  const [percent, setPercent] = useState()

  const handleSubmit = async (evt) => {
    // Form의 기본기능을 막기 위한 코드 선언.
    evt.preventDefault();
    evt.stopPropagation();

    const userId = portfolioOwnerId;

    // post 요청
    try {
      await Api.post("tech/create", {
        userId,
        title,
        description,
        percent
      });
    } catch (err) {
      console.error(err);
    }

    // post 요청값과 함께 각각의 tech들의 모임인 techs를 다시 렌더링
    try {
      const res = await Api.get(
        "techlist", `${userId}`
      );
      const { techs } = res.data;
      setTechs(techs);
      // 생성 상태 종료.
      setIsAdding(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="portfolioBG">
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="기술 이름"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPercent" className="mt-3">
        <Form.Control
          type="number"
          placeholder="주관적 퍼센테이지"
          value={percent}
          min="0"
          max="100"
          onChange={(evt) => setPercent(evt.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }} className="portfolioBG">
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setIsAdding(false)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default TechAddForm