import { Card, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import * as Api from "../../api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { EducationsState, pageState, allPageState } from "./EducationAtom";
import ModalComp from "../ModalComp";
import ModalPortal from "../ModalPortal";
import "../Components.css";

const PER_PAGE = 3;

const EducationCard = ({ education, setIsEditing, isEditable }) => {
  const { id, userId } = education;
  const [show, setShow] = useState(false);

  const [page, setPage] = useRecoilState(pageState);
  const setAllPage = useSetRecoilState(allPageState);
  const setEducations = useSetRecoilState(EducationsState);

  const handleDelete = async () => {
    try {
      await Api.delete("educations", id);

      const res = await Api.get(
        "educationlist",
        `${userId}?page=${page}&perPage=${PER_PAGE}`
      );
      const { totalPage, educations } = res.data;
      if (page > totalPage) {
        setPage(page - 1);
      }
      setAllPage(totalPage);
      setEducations(educations);
    } catch (err) {
      console.log(err.message);
    }

    setShow(false);
  };

  useEffect(() => {
    return () => setShow(false);
  }, []);

  return (
    <>
      <Card.Body className="portfolioBG">
        <Row className="align-items-center portfolioBG">
          <Col xs={9} className="portfolioBG">
            <span className="portfolioBG">{education.school}</span>
            <br />
            <span className="text-muted portfolioBG">
              {education.major} ({education.position})
            </span>
          </Col>
          {isEditable && (
            <Col xs={3} style={{ textAlign: "right" }} className="portfolioBG">
              <Button
                variant="info"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                편집
              </Button>{" "}
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
            <Button variant="danger" onClick={() => handleDelete()}>
              삭제
            </Button>
          </ModalComp>
        )}
      </ModalPortal>
    </>
  );
};

export default EducationCard;
