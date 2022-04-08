import { useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Tech from "./Tech";
import TechAddForm from "./TechAddForm";
import { useRecoilState } from "recoil";
import {
  isAddingState,
  techsState,
} from "./TechAtom";
import "../Components.css";

const Techs = ({ portfolioOwnerId, isEditable }) => {
  // RecoilStates
  const [isAdding, setIsAdding] = useRecoilState(isAddingState);
  const [techs, setTechs] = useRecoilState(techsState);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await Api.get(
          "techList", `${portfolioOwnerId}`
        );
        const { techs } = res.data;
        setTechs(techs);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [portfolioOwnerId, setTechs]);

  return (
    <Card.Body className="portfolioBG" style={{ borderRadius: "10px" }}>
      <Card.Title className="portfolioBG">보유 기술</Card.Title>
      {techs.length !== 0 ? 
      '이곳에 가로형 막대 그래프가 들어갈 예정입니다.'
      : null}
      {techs.map((v) => (
        <Tech key={v.id} tech={v} isEditable={isEditable} />
      ))}
      {isEditable && (
        <Row className="mt-3 text-center mb-4">
          <Col sm={{ span: 20 }} className="portfolioBG">
            <Button onClick={() => setIsAdding(true)}>+</Button>
          </Col>
        </Row>
      )}
      {isAdding && <TechAddForm portfolioOwnerId={portfolioOwnerId} />}
    </Card.Body>
  );
};

export default Techs