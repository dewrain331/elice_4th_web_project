import { Card, Button, Modal, ListGroup } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";
// recoil 사용
import { useSetRecoilState } from "recoil";
import { techsState } from "./TechAtom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TechPercentage from './TechPercentage'
import { 
  faJsSquare as javascript, 
  faHtml5 as html, 
  faCss3Alt as css, 
  faReact as react, 
  faNodeJs as nodejs, 
  faJava as java 
} from "@fortawesome/free-brands-svg-icons"

const TechCard = ({ tech, isEditable, setIsEditing }) => {
  // Modal 관련 State
  const [show, setShow] = useState(false);
  const handleAlertShow = () => setShow(true);
  const handleAlertCancel = () => setShow(false);

  // recoil 적용
  const setTechs = useSetRecoilState(techsState);

  // 삭제 기능을 하는 함수
  const handleDelete = async () => {
    const { id, userId } = tech;
    try {
      await Api.delete("techs", id);
      setShow(false);
      // "tech/유저id" get 요청 후 setting
      const res = await Api.get("techList", userId);
      setTechs(res.data.techs);
    } catch (error) {
      console.error(error);
    }
  };

  const makeTitle = (title) => {
    return (
      <>
        <FontAwesomeIcon
          icon={title}
          style={{fontSize: '40px', marginLeft: '15px', marginRight: '15px', background: 'white'}}
        />
        {title.toUpperCase()}
      </>
    )
  }

  return (
    <>
      <Card.Body style={{ width: "330px", backgroundColor: "white" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Card.Title>{makeTitle(tech.title)}</Card.Title>
            <Card.Text>{tech.description}</Card.Text>
          </ListGroup.Item>
          <ListGroup.Item>
            <TechPercentage title={tech.title} percentage={tech.percent} />
          </ListGroup.Item>
        </ListGroup>
        <br />
        {/* tech 편집 버튼 */}
        <div
          style={{
            display: "flex",
            paddingLeft: "85px",
            backgroundColor: "white",
          }}
        >
          {isEditable && (
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              편집
            </Button>
          )}
          {/* tech 삭제 버튼 */}
          {isEditable && (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleAlertShow}
            >
              삭제
            </Button>
          )}
        </div>
      </Card.Body>

      <Modal
        show={show}
        onHide={handleAlertCancel}
        style={{ background: "transparent" }}
      >
        <Modal.Header closeButton style={{ backgroundColor: "white" }}>
          <Modal.Title style={{ backgroundColor: "white" }}>
            삭제 확인
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "white" }}>
          정말로 삭제하시겠습니까?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "white" }}>
          <Button variant="secondary" onClick={handleAlertCancel}>
            취소
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TechCard;
