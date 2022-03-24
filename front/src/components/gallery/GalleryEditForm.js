import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
// import * as Api from "../../api";
// recoil 사용
// import { useSetRecoilState } from "recoil";
// import { gallerysState } from "./GalleryAtom";

function GalleryEditForm({ gallery, setIsEditing }) {
  // useState로 description 상태를 생성함.
  const [description, setDescription] = useState(gallery.description);
  // recoil 적용
  // const setGallerys = useSetRecoilState(gallerysState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // patch
    const formData = new FormData();
    const data = [{ description: description }];
    formData.append("gallery", data);

    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default GalleryEditForm;
