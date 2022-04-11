import { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { useSetRecoilState } from "recoil";
import {
  isAddingState,
  techsState,
} from "./TechAtom";
import "../Components.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faJsSquare as javascript, 
  faHtml5 as html, 
  faCss3Alt as css, 
  faReact as react, 
  faNodeJs as nodejs, 
  faJava as java 
} from "@fortawesome/free-brands-svg-icons"

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
  // 아이콘 추가 시 skills 리스트와 상위 import에 추가할 것.
  const skills = [javascript, html, css, react, nodejs, java]

  const makeIcons = (skillName) => {
    return (
      <>
        <FontAwesomeIcon
          icon={skillName}
          onclick={() => {setTitle(`${skillName}`)}}
          style={{fontSize: '40px', cursor: 'pointer', marginLeft: '15px', marginRight: '15px', background: 'white'}}
        />
      </>
    )
  }

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
        "techList", `${userId}`
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
      <Form.Group controlId="formBasicTitle" style={{background: 'white'}}>
        {skills.map(v => makeIcons(v))}
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="간단한 설명을 적어주세요."
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