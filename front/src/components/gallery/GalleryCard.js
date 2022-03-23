import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";
// recoil 사용
import { useSetRecoilState, useRecoilState } from "recoil";
import { gallerysState, pageState, totalPageState } from "./GalleryAtom";

const PER_PAGE = 3;

function GalleryCard({ gallery, isEditable, setIsEditing }) {
  // 날짜 표시를 위한 슬라이싱
  const slicingDate = (date) => {
    return date.slice(0, 10);
  };

  // Modal 관련 State
  const [show, setShow] = useState(false);
  const handleAlertShow = () => setShow(true);
  const handleAlertCancel = () => setShow(false);

  // recoil 적용
  const setGallerys = useSetRecoilState(gallerysState);
  const [page, setPage] = useRecoilState(pageState);
  const setTotalPage = useSetRecoilState(totalPageState);

  // 삭제 기능을 하는 함수
  const handleDelete = async () => {
    const { id, userId } = gallery;
    try {
      await Api.delete("gallerys", id);
      // "gallerylist/유저id?page={현재 페이지}&?perPage={데이터 수}"로 GET 요청하고,
      // response의 data로 totalPage와 gallerys를 세팅함.
      const res = await Api.get(
        "gallerylist",
        `${userId}?page=${page}&perPage=${PER_PAGE}`
      );
      const { totalPage, gallerys } = res.data;
      if (page > totalPage) {
        setPage((prev) => prev - 1);
      }
      setTotalPage(totalPage);
      setGallerys(gallerys);
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
            <span>{gallery.title}</span>
            <br />
            <span className="text-muted">{gallery.description}</span>
            <br />
            {/* gallery의 기간을 object로 받고 출력형식에 맞게 변경 */}
            <span className="text-muted">
              {slicingDate(gallery.fromDate)} ~ {slicingDate(gallery.toDate)}
            </span>
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
