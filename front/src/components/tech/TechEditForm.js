import { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { useSetRecoilState } from "recoil";
import { techsState } from "./TechAtom";
import "../Components.css";

const TechEditForm = ({ currentTech, setIsEditing }) => {
  // RecoilStates
  const setTechs = useSetRecoilState(techsState);

  const [description, setDescription] = useState(
    currentTech.description
  );
  const [percent, setPercent] = useState(
      currentTech.percent
  )

  const handleSubmit = async (evt) => {
    // Form의 기본 기능 막기.
    evt.preventDefault();
    evt.stopPropagation();

    const userId = currentTech.userId;

    // put 요청.
    try {
      await Api.post(`tech/${currentTech.id}`, {
        description,
        percent
      });
    } catch (err) {
      console.error(err);
    }

    // put 요청값과 함께 각각의 Tech들의 모임인 Techs를 다시 렌더링
    try {
      const res = await Api.get(
        "techlist", `${userId}`
      );
      setTechs(res.data.techs);
      // 편집 상태 종료.
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="portfolioBG">
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
              onClick={() => setIsEditing(false)}
            >
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default TechEditForm