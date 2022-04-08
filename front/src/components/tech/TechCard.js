import { Card, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";
import { useSetRecoilState } from "recoil";
import { techsState } from "./TechAtom";
import ModalComp from "../ModalComp";
import ModalPortal from "../ModalPortal";
import "../Components.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJsSquare as jsIcon, faHtml5 as htmlIcon, faCss3Alt as cssIcon, faReact as reactIcon, faNodeJs as nodejsIcon, faJava as javaIcon } from "@fortawesome/free-brands-svg-icons"

const TechCard = ({ tech, isEditable, setIsEditing }) => {
  // RecoilStates
  const setTechs = useSetRecoilState(techsState);

  // Modal 관련 State
  const [show, setShow] = useState(false);

  const [showCard, setShowCard] = useState(false)

  const handleShowCard = (title, description) => {

  }

  const handleDelete = async () => {
    try {
      const { id, userId } = tech
      await Api.delete(`techs/${id}`);
      const res = await Api.get(
        "techList", `${userId}`
      );
      const { techs } = res.data;
      setTechs(techs);
      setShow(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card.Body className="portfolioBG">
        {/* tech의 수상내용과 상세내용을 출력 */}
        <Row className="align-items-center portfolioBG">
          <Col xs={9} className="portfolioBG">
            <span className="portfolioBG">
              {tech.title === "javascript" ? 
                <FontAwesomeIcon 
                  icon={jsIcon}
                  style={{fontSize: '40px', cursor: 'pointer', marginLeft: '30px', marginRight: '30px', background: 'white'}}
                  onClick={() => {
                    handleShowCard(tech.title, tech.desription)
                    setShowCard(true)
                  }}
                /> 
              : null}
              {tech.title === "html" ? 
                <FontAwesomeIcon 
                  icon={htmlIcon} 
                  style={{fontSize: '40px', cursor: 'pointer', marginLeft: '30px', marginRight: '30px', background: 'white'}}
                  onClick={() => {
                    handleShowCard(tech.title, tech.desription)
                    setShowCard(true)
                  }}
                /> 
              : null}
              {tech.title === "css" ? 
                <FontAwesomeIcon 
                  icon={cssIcon} 
                  style={{fontSize: '40px', cursor: 'pointer', marginLeft: '30px', marginRight: '30px', background: 'white'}}
                  onClick={() => {
                    handleShowCard(tech.title, tech.desription)
                    setShowCard(true)
                  }}
                /> 
              : null}
              {tech.title === "react" ? 
                <FontAwesomeIcon 
                  icon={reactIcon} 
                  style={{fontSize: '40px', cursor: 'pointer', marginLeft: '30px', marginRight: '30px', background: 'white'}}
                  onClick={() => {
                    handleShowCard(tech.title, tech.desription)
                    setShowCard(true)
                  }}
                /> 
              : null}
              {tech.title === "nodejs" ? 
                <FontAwesomeIcon 
                  icon={nodejsIcon} 
                  style={{fontSize: '40px', cursor: 'pointer', marginLeft: '30px', marginRight: '30px', background: 'white'}}
                  onClick={() => {
                    handleShowCard(tech.title, tech.desription)
                    setShowCard(true)
                  }}
                /> 
              : null}
              {tech.title === "java" ? 
                <FontAwesomeIcon 
                  icon={javaIcon} 
                  style={{fontSize: '40px', cursor: 'pointer', marginLeft: '30px', marginRight: '30px', background: 'white'}}
                  onClick={() => {
                    handleShowCard(tech.title, tech.desription)
                    setShowCard(true)
                  }}
                /> 
              : null}
            </span>
            <br />
            <span className="text-muted portfolioBG">{tech.description}</span>
          </Col>
          {/* 각 항목마다 편집 버튼을 생성 */}
          {isEditable && (
            <Col xs={3} style={{ textAlign: "right" }} className="portfolioBG">
              <Button
                variant="info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3"
              >
                편집
              </Button>{" "}
              {/* 각 항목마다 삭제 버튼을 생성 */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShow(true)}
              >
                삭제
              </Button>
            </Col>
          )}
        </Row>
      </Card.Body>

      <ModalPortal>
        {show && (
          <ModalComp
            setShow={setShow}
            show={show}
            title="삭제 확인"
            message="정말로 삭제하시겠습니까?"
            children
          >
            <Button variant="secondary" onClick={() => setShow(false)}>
              취소
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDelete();
              }}
            >
              삭제
            </Button>
          </ModalComp>
        )}
      </ModalPortal>
    </>
  );
};

export default TechCard