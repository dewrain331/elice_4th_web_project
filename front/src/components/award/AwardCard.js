import { Card, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageState, allPageState, awardsState, PER_PAGE } from "./AwardAtom";
import ModalComp from "../ModalComp";
import ModalPortal from "../ModalPortal";
import "../Components.css";

const AwardCard = ({ _award, isEditable, setIsEditing }) => {
  // RecoilStates
  const [page, setPage] = useRecoilState(pageState);
  const setAllPage = useSetRecoilState(allPageState);
  const setAwards = useSetRecoilState(awardsState);

  // Modal 관련 State
  const [show, setShow] = useState(false);

  const handleDelete = async () => {
    try {
      const { id, userId } = _award;
      await Api.delete(`awards/${id}`);
      const res = await Api.get(
        "awardlist",
        `${userId}?page=${page}&perPage=${PER_PAGE}`
      );
      const { total, awards } = res.data;
      if (page > Math.ceil(total / PER_PAGE)) {
        setPage(page - 1);
      }
      setAllPage(Math.ceil(total / PER_PAGE));
      setAwards(awards);
      setShow(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card.Body className="portfolioBG">
        {/* award의 수상내용과 상세내용을 출력 */}
        <Row className="align-items-center portfolioBG">
          <Col xs={9} className="portfolioBG">
            <span className="portfolioBG">{_award.award}</span>
            <br />
            <span className="text-muted portfolioBG">{_award.description}</span>
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

export default AwardCard;
