import React, { useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Gallery from "./Gallery";
import GalleryAddForm from "./GalleryAddForm";
// recoil 사용
import { useRecoilState } from "recoil";
import { gallerysState, isAddingState } from "./GalleryAtom";

function Gallerys({ portfolioOwnerId, isEditable }) {
  // useState로 gallerys 상태를 생성함.
  const [gallerys, setGallerys] = useRecoilState(gallerysState);
  // useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useRecoilState(isAddingState);

  useEffect(() => {
    // "gallerylist/유저id?page={현재 페이지}&?perPage={데이터 수}"로 GET 요청하고,
    // response의 data로 totalPage와 gallerys를 세팅함.
    const fetchGallerys = async () => {
      try {
        const res = await Api.get("gallery", `${portfolioOwnerId}`);
        const { gallerys } = res.data;
        setGallerys(gallerys);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGallerys();
  }, [portfolioOwnerId, setGallerys]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>갤러리</Card.Title>
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
      </Card.Body>
    </Card>
  );
}

export default Gallerys;
