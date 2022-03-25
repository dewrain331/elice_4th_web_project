import React, { useEffect } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
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
    // "gallery/유저id로 get요청을 하여 gallerys를 세팅함.
    const fetchGallerys = async () => {
      try {
        const res = await Api.get("gallery", portfolioOwnerId);
        setGallerys(res.data.images);
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
        <Container>
          <Row lg="auto" style={{ jusifyContent: "flex-start" }}>
            {gallerys.map((gallery) => (
              <Gallery
                key={gallery.id}
                gallery={gallery}
                isEditable={isEditable}
              />
            ))}
          </Row>
        </Container>
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
