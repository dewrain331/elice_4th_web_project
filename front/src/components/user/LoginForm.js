import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";

import * as Api from "../../api";
import { DispatchContext } from "../../App";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;


  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const handleFindPwStepOne = async () => {
    const emailForFindPw = document.querySelector('#findPwEmailInput').value
    const isEmailForFindPwValid = validateEmail(emailForFindPw)
    if(isEmailForFindPwValid === true) {
      try {
        await Api.xxx('url')

      } catch (err) {
        console.error(err)
        alert("등록된 이메일이 아니거나, 이메일을 잘못 입력했습니다. 다시 시도해주세요.")
      }
    }
    else {
      alert("올바른 이메일 형식이 아닙니다. 다시 시도해주세요.")
    }
  }

  const handleFindPwStepTwo = async () => {
    const authForFindPw = document.querySelector('#findPwAuthInput').value
      try {
        await Api.xxx('url')
        alert("로그인되었습니다. 편집 버튼을 눌러 비밀번호를 변경해주세요.")
      } catch (err) {
        console.error(err)
        alert("잘못된 인증번호입니다. 다시 시도해주세요.")
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("user/login", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col lg={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="loginEmail">
                <Form.Label>이메일 주소</Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="on"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isEmailValid && (
                  <Form.Text className="text-success">
                    이메일 형식이 올바르지 않습니다.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="loginPassword" className="mt-3">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="on"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isPasswordValid && (
                  <Form.Text className="text-success">
                    비밀번호는 4글자 이상입니다.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button variant="primary" type="submit" disabled={!isFormValid}>
                    로그인
                  </Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button variant="light" onClick={() => navigate("/register")}>
                    회원가입하기
                  </Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button variant="info" onClick={() => navigate("/recovery")}>
                    회원복구하기
                  </Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button variant="success" onClick={(handleShow)}>
                    비밀번호 찾기
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>비밀번호 변경</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            비밀번호 변경을 위해 이메일 인증이 필요합니다.
            <p>
              <input type="email" id="findPwEmailInput" placeholder="가입한 이메일을 입력해주세요." />
              <Button variant="primary" onClick={handleFindPwStepOne}>인증번호 발송</Button>
            </p>
            <p>
              <input type="text" id="findPwAuthInput" placeholder="이메일을 확인하고 인증번호를 입력해주세요." />
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              취소
            </Button>
            <Button variant="primary" onClick={() => {
              handleClose()
              handleFindPwStepTwo()
              }
            }>
              찾기
            </Button>
          </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginForm;
