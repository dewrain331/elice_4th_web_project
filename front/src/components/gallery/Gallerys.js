import React, { useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Gallery from "./Gallery";
import GalleryAddForm from "./GalleryAddForm";
// recoil 사용
import { useRecoilState } from "recoil";
import {
  gallerysState,
  isAddingState,
  pageState,
  totalPageState,
} from "./GalleryAtom";

const PER_PAGE = 3;

function Gallerys({ portfolioOwnerId, isEditable }) {
  // useState로 gallerys 상태를 생성함.
  const [gallerys, setGallerys] = useRecoilState(gallerysState);
  // useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useRecoilState(isAddingState);
  // useState로 totalPage, page 상태를 생성함.
  const [totalPage, setTotalPage] = useRecoilState(totalPageState);
  const [page, setPage] = useRecoilState(pageState);

  useEffect(() => {
    // "gallerylist/유저id?page={현재 페이지}&?perPage={데이터 수}"로 GET 요청하고,
    // response의 data로 totalPage와 gallerys를 세팅함.
    const fetchGallerys = async () => {
      try {
        // 데이터 전송을 위한 page를 1로 setting함
        if (page === 0) {
          setPage(1);
        }
        const res = await Api.get(
          "gallerylist",
          `${portfolioOwnerId}?page=${page}&perPage=${PER_PAGE}`
        );
        const { totalPage, gallerys } = res.data;
        setTotalPage(totalPage);
        setGallerys(gallerys);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGallerys();
  }, [portfolioOwnerId, page, totalPage, setGallerys, setTotalPage, setPage]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        {gallerys.map((gallery) => (
          <Gallery key={gallery.id} gallery={gallery} isEditable={isEditable} />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && <GalleryAddForm portfolioOwnerId={portfolioOwnerId} />}
        <Col className="text-center">
          <Button
            variant="outline-secondary"
            type="submit"
            className="me-3"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page <= 1}
          >
            {"<"}
          </Button>
          {/* totalPage가 0인 경우 현재 page 표시도 0으로 함 */}
          <Button
            variant="outline-secondary"
            size="sm"
            className="me-3"
            disabled
          >
            {totalPage === 0 ? 0 : page}/{totalPage}
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= totalPage}
          >
            {">"}
          </Button>
        </Col>
      </Card.Body>
    </Card>
  );
}

export default Gallerys;
