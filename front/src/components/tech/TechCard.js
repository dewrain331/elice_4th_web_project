import { Card, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";
import { useSetRecoilState } from "recoil";
import { techsState } from "./TechAtom";
import ModalComp from "../ModalComp";
import ModalPortal from "../ModalPortal";
import "../Components.css";

const TechCard = ({ tech, isEditable, setIsEditing }) => {
  // RecoilStates
  const setTechs = useSetRecoilState(techsState);

  // Modal 관련 State
  const [show, setShow] = useState(false);

  const handleDelete = async () => {
    try {
      const { id, userId } = tech
      await Api.delete(`techs/${id}`);
      const res = await Api.get(
        "techlist", `${userId}`
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
            <span className="portfolioBG">{tech.title}</span>
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