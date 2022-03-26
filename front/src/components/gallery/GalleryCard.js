import { Card, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";
// recoil 사용
import { useSetRecoilState } from "recoil";
import { gallerysState } from "./GalleryAtom";

import "./Gallery.css";

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
      await Api.delete("gallery", `${userId}/${id}`);
      setShow(false);
      // "gallery/유저id" get 요청 후 setting
      const res = await Api.get("gallery", userId);
      setGallerys(res.data.images);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card.Body style={{ maxWidth: "330px", backgroundColor: "white" }}>
        {/* gallery의 제목, 상세내용, 기간 */}
        <div className="img-wrapper">
          <img
            className="mb-3"
            src={gallery?.saveFilePath}
            alt="갤러리 이미지"
          />
        </div>
        <br />
        <div className="text-muted" style={{ width: "260px", backgroundColor: "white" }}>
          {gallery.description}
        </div>
        <br />
        {/* gallery 편집 버튼 */}
        {isEditable && (
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => setIsEditing((prev) => !prev)}
            // className="mr-3"
          >
            편집
          </Button>
        )}
        {/* gallery 삭제 버튼 */}
        {isEditable && (
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleAlertShow}
            // className="mr-3"
          >
            삭제
          </Button>
        )}
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
