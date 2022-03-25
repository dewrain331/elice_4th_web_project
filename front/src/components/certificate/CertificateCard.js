import { Card, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageState, allPageState, certsState, PER_PAGE } from "./CertAtom";
import ModalComp from "../ModalComp";
import ModalPortal from "../ModalPortal";

const CertificateCard = ({ certificate, isEditable, setIsEditing }) => {
  // RecoilStates
  const [page, setPage] = useRecoilState(pageState);
  const setAllPage = useSetRecoilState(allPageState);
  const setCertificates = useSetRecoilState(certsState);

  // Modal 관련 State
  const slicingDate = (date) => {
    return date.slice(0, 10);
  };

  const [show, setShow] = useState(false);

  const handleDelete = async () => {
    try {
      const { id, userId } = certificate;
      await Api.delete(`certificate/${id}`);
      const res = await Api.get(
        "certificatelist", `${userId}?page=${page}&perPage=${PER_PAGE}`
      );
      const { total, certificates } = res.data;
      if (page > Math.ceil(total / PER_PAGE)) {
        setPage(page - 1);
      }
      setAllPage(Math.ceil(total / PER_PAGE));
      setCertificates(certificates);
      setShow(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card.Body>
        {/* certificate의 자격증 이름과 상세내용, 취득일자를 출력 */}
        <Row className="align-items-center">
          <Col>
            <span>{certificate.title}</span>
            <br />
            <span className="text-muted">{certificate.description}</span>
            <br />
            <span className="text-muted">{slicingDate(certificate.date)}</span>
          </Col>
          <Col xs lg="1">
            {/* 각 항목마다 편집 버튼을 생성 */}
            {isEditable && (
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3"
              >
                편집
              </Button>
            )}
            {/* 각 항목마다 삭제 버튼을 생성 */}
            {isEditable && (
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setShow(true)}
              >
                삭제
              </Button>
            )}
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

export default CertificateCard;
