import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
// recoil 사용
import { useSetRecoilState } from "recoil";
import { isEditingState } from "./UserAtom";

function UserEditForm({ user, setUser }) {
  const setIsEditing = useSetRecoilState(isEditingState);
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  //선택된 이미지의 상태
  const [pickedImage, setPickedImage] = useState({
    preview: "",
    data: "",
  });
  //적용될 이미지
  const [image, setImage] = useState(user.image);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 선택된 이미지 여부 판단, 없을시 편집 이전 이미지
    if (pickedImage.data !== "") {
      try {
        const formData = new FormData();
        formData.append("profile", pickedImage.data);
        const response = await Api.patch(`users/${user.id}/image`, formData);
        setImage(response.data.image); // 이미지 정보
      } catch (err) {
        console.log("파일크기가 3MB로 제한되어 있습니다.");
        alert("파일크기는 3MB이하여야 합니다.");
      }
    } else {
      setImage(image);
    }

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // updatedUser.image = image;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);
    // console.log(user);
    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  const handleFileChange = (evt) => {
    const img = {
      preview: URL.createObjectURL(evt.target.files[0]),
      data: evt.target.files[0],
    };
    setPickedImage(img);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {pickedImage.preview && (
            <img
              src={pickedImage.preview}
              width="136px"
              height="128px"
              alt="profile_image"
            />
          )}
          <Form.Group controlId="useEditImage" className="mb-3">
            <Form.Control
              type="file"
              accept="pickedImage/*"
              onChange={handleFileChange}
            />
          </Form.Group>

          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
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
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
