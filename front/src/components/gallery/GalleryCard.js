import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";
// recoil 사용
import { useSetRecoilState } from "recoil";
import { gallerysState } from "./GalleryAtom";

function GalleryCard({ gallery, isEditable, setIsEditing }) {
  // Modal 관련 State
  const [show, setShow] = useState(false);
  const handleAlertShow = () => setShow(true);
  const handleAlertCancel = () => setShow(false);

  // recoil 적용
  const setGallerys = useSetRecoilState(gallerysState);

  // 삭제 기능을 하는 함수
  const handleDelete = async () => {
    const { id, userId } = gallery;
    try {
      await Api.delete(`gallery/${userId}/${id}`);
      // "gallery
      const res = await Api.get(`gallery/${userId}`);
      setGallerys(res.data.gallerys);
    } catch (error) {
      console.error(error);
    }
    setShow(false);
  };

  return (
    <>
      <Card.Body>
        {/* gallery의 제목, 상세내용, 기간 */}
        <Row className="align-items-center">
          <Col>
            <Card.Img
              style={{ width: "10rem", height: "8rem" }}
              className="mb-3"
              src={gallery?.saveFilePath}
              alt="프로필 이미지"
            />
            <br />
            <span className="text-muted">{gallery.description}</span>
            <br />
          </Col>
          {/* gallery 편집 버튼 */}
          {isEditable && (
            <Col xs lg="1">
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3"
              >
                편집
              </Button>
            </Col>
          )}
          {/* gallery 삭제 버튼 */}
          {isEditable && (
            <Col xs lg="1">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleAlertShow}
                className="mr-3"
              >
                삭제
              </Button>
            </Col>
          )}
        </Row>
      </Card.Body>

      <Modal show={show} onHide={handleAlertCancel}>
        <Modal.Header closeButton>
          <Modal.Title>삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
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

export default GalleryCard;
