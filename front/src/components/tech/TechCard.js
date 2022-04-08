import { Card, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";
import { useSetRecoilState } from "recoil";
import { techsState } from "./TechAtom";
import ModalComp from "../ModalComp";
import ModalPortal from "../ModalPortal";
import "../Components.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJsSquare as javascript, faHtml5 as html, faCss3Alt as css, faReact as react, faNodeJs as nodejs, faJava as java } from "@fortawesome/free-brands-svg-icons"

const TechCard = ({ tech, isEditable, setIsEditing }) => {
  // RecoilStates
  const setTechs = useSetRecoilState(techsState);

  // Modal 관련 State
  const [show, setShow] = useState(false);

  const [showCard, setShowCard] = useState(false)
  const [cardTitle, setCardTitle] = useState("")
  const [cardDescript, setCardDescript] = useState("")

  const handleShowCard = (title, description) => {
    setCardTitle(title)
    setCardDescript(description)
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
        {/* tech의 title에 알맞는 icon을 출력하고, 그 아이콘을 클릭 시 하단에 상세내용과 편집 및 삭제 버튼을 보이게 함. */}
        <Row className="align-items-center portfolioBG">
          <Col xs={9} className="portfolioBG">
            <span className="portfolioBG">
              {tech.title === "javascript" ? 
                <FontAwesomeIcon 
                  icon={javascript}
                  style={{fontSize: '40px', cursor: 'pointer', marginLeft: '30px', marginRight: '30px', background: 'white'}}
                  onClick={() => {
                    if(showCard === false) {
                      handleShowCard(tech.title, tech.desription)
                      setShowCard(true)
                    } else if(showCard === true) {
                      setShowCard(false)
                    }
                  }}
                /> 
              : null}
              {tech.title === "html" ? 
                <FontAwesomeIcon 
                  icon={html} 
                  style={{fontSize: '40px', cursor: 'pointer', marginLeft: '30px', marginRight: '30px', background: 'white'}}
                  onClick={() => {
                    if(showCard === false) {
                      handleShowCard(tech.title, tech.desription)
                      setShowCard(true)
                    } else if(showCard === true) {
                      setShowCard(false)
                    }
                  }}
                /> 
              : null}
              {tech.title === "css" ? 
                <FontAwesomeIcon 
                  icon={css} 
                  style={{fontSize: '40px', cursor: 'pointer', marginLeft: '30px', marginRight: '30px', background: 'white'}}
                  onClick={() => {
                    if(showCard === false) {
                      handleShowCard(tech.title, tech.desription)
                      setShowCard(true)
                    } else if(showCard === true) {
                      setShowCard(false)
                    }
                  }}
                /> 
              : null}
              {tech.title === "react" ? 
                <FontAwesomeIcon 
                  icon={react} 
                  style={{fontSize: '40px', cursor: 'pointer', marginLeft: '30px', marginRight: '30px', background: 'white'}}
                  onClick={() => {
                    if(showCard === false) {
                      handleShowCard(tech.title, tech.desription)
                      setShowCard(true)
                    } else if(showCard === true) {
                      setShowCard(false)
                    }
                  }}
                /> 
              : null}
              {tech.title === "nodejs" ? 
                <FontAwesomeIcon 
                  icon={nodejs} 
                  style={{fontSize: '40px', cursor: 'pointer', marginLeft: '30px', marginRight: '30px', background: 'white'}}
                  onClick={() => {
                    if(showCard === false) {
                      handleShowCard(tech.title, tech.desription)
                      setShowCard(true)
                    } else if(showCard === true) {
                      setShowCard(false)
                    }
                  }}
                /> 
              : null}
              {tech.title === "java" ? 
                <FontAwesomeIcon 
                  icon={java} 
                  style={{fontSize: '40px', cursor: 'pointer', marginLeft: '30px', marginRight: '30px', background: 'white'}}
                  onClick={() => {
                    if(showCard === false) {
                      handleShowCard(tech.title, tech.desription)
                      setShowCard(true)
                    } else if(showCard === true) {
                      setShowCard(false)
                    }
                  }}
                /> 
              : null}
            </span>
            <br />
            {showCard ? 
            (
            <>
              <Card style={{background: 'white'}}>
                <Card.Title>
                  <FontAwesomeIcon
                    icon={cardTitle}
                  />
                  {cardTitle}
                </Card.Title>
                <Card.Text>{cardDescript}</Card.Text>
              </Card>
              {/* 각 항목마다 편집 버튼을 생성 */}
              {isEditable && (
              <Col xs={3} style={{ textAlign: "center" }} className="portfolioBG">
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
            </>
            ) : null}
          </Col>
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