import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { DispatchContext } from '../../App'
import { Button, Form, Card, Col, Row, Modal, FormControl } from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser }) {
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const navigate = useNavigate()
  const dispatch = useContext(DispatchContext)
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  //useState로 password 상태를 생성함.
  const [changePw, setChangePw] = useState("")
  const [pwInput, setPwInput] = useState("")
  //선택된 이미지의 상태
  const [pickedImage, setPickedImage] = useState({
    preview: "",
    data: ""
  })

  const [image, setImage] = useState(user.image)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(changePw.length >= 4) {
    await Api.post(`user/password`, {
      password: changePw
    })
    } else if(0 < changePw.length < 4) {
      alert("비밀번호는 최소 4자리여야 합니다. 비밀번호 이외의 다른 변경사항들만 적용됩니다.")
    }
    // 선택된 이미지 여부 판단, 없을시 편집 이전 이미지
    if (pickedImage.data !== "") {
      const formData = new FormData();
      formData.append('profile', pickedImage.data);
      const response = await Api.patch(`users/${user.id}/image`, formData);
      setImage(response.data.image); // 이미지 정보
    } else {
      setImage(image);
    }

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description
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

  const handleUserWithdraw = async () => {
    try {
      await Api.post('user/withdraw', {
        password: pwInput
      })
      alert("회원 탈퇴가 완료되었습니다. 30일 이내에 복구 신청이 가능합니다.")
      sessionStorage.removeItem("userToken");
      dispatch({ type: "LOGOUT" })
      navigate("/login")
    } catch (err) {
      console.error(err)
    }
  }

  const handleFileChange = (evt) => {
    const img = {
      preview: URL.createObjectURL(evt.target.files[0]),
      data: evt.target.files[0],
    }
    setPickedImage(img)
  }

  return (
    <>
      <Card className="mb-2">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
          {pickedImage.preview && <img src={pickedImage.preview} width="136px" height="128px" alt="profile_image" />}
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
            <Form.Group controlId="userEditDescription" className="mb-3">
              <Form.Control
                type="text"
                placeholder="정보, 인사말"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="userEditPw" className="mb-3">
              <Form.Control
                type="password"
                placeholder="변경할 비밀번호를 입력하세요"
                value={changePw}
                onChange={(e) => setChangePw(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="userWithdraw">
              <Button
                type="button"
                variant="danger"
                onClick={handleShow}
              >회원 탈퇴</Button>
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

      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>탈퇴 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            회원 탈퇴 확인을 위해 비밀번호를 입력해주세요.
            <FormControl
                type="password"
                placeholder="현재 로그인한 계정의 비밀번호를 입력해주세요."
                id="withdrawConfirmPw"
                value={pwInput}
                onChange={(evt) => setPwInput(evt.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              취소
          </Button>
          <Button variant="danger" onClick={() => {
              handleClose()
              handleUserWithdraw()
              }
          }>
              탈퇴
          </Button>
          </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserEditForm;