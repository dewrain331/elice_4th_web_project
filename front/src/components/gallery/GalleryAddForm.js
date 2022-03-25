import React, { useState } from "react";
import { Button, Form, Col, Row, Card } from "react-bootstrap";
import * as Api from "../../api";
// recoil 사용
import { useSetRecoilState } from "recoil";
import { gallerysState, isAddingState } from "./GalleryAtom";

function GalleryAddForm({ portfolioOwnerId }) {
  // useState로 description 상태를 생성함.
  const [description, setDescription] = useState("");
  // recoil 적용
  const setGallerys = useSetRecoilState(gallerysState);
  const setIsAdding = useSetRecoilState(isAddingState);

  //선택된 이미지의 상태
  const [pickedImage, setPickedImage] = useState({
    preview: "",
    data: "",
  });
  const [isPicked, setIsPicked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 userId 변수에 할당함.
    const userId = portfolioOwnerId;

    if (pickedImage.data !== "") {
      try {
        const formData = new FormData();
        formData.append("gallery", pickedImage.data);
        formData.append("userId", userId);
        formData.append("description", description);

        // "gallery/create" 엔드포인트로 post요청함.
        await Api.postImage("gallery/create", formData);

        // "gallery/유저id로 get요청하여 gallery를 setting
        const res = await Api.get("gallery", userId);
        setGallerys(res.data.images);
      } catch (err) {
        console.error(err);
      }
    }
    setIsPicked(false);
    // gallery를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setPickedImage(img);
    setIsPicked(true);
  };

  return (
    <Card.Body>
      <Form onSubmit={handleSubmit}>
        {pickedImage.preview && (
          <div className="img-wrapper">
            <img
              className="mb-3"
              src={pickedImage.preview}
              alt="미리보기 이미지"
            />
          </div>
        )}
        <Form.Group controlId="useEditImage" className="mb-3">
          <Form.Control
            type="file"
            accept="pickedImage/*"
            onChange={handleFileChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDescription" className="mt-3">
          <Form.Control
            type="text"
            placeholder="상세내역"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            <Button
              variant="primary"
              type="submit"
              className="me-3"
              disabled={!isPicked}
            >
              확인
            </Button>
            <Button variant="secondary" onClick={() => setIsAdding(false)}>
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Card.Body>
  );
}

export default GalleryAddForm;
