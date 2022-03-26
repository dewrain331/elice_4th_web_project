import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Form,
  Button,
  Modal,
  InputGroup,
  FormControl,
  Card,
} from "react-bootstrap";

import ModalPortal from "../ModalPortal";
import ModalComp from "../ModalComp";

import * as Api from "../../api";
import { DispatchContext } from "../../App";

import "./User.css";

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
  const [isFindingPw, setIsFindingPw] = useState(false);
  const [emailForFindPw, setEmailForFindPw] = useState("");
  const [authForFindPw, setAuthForFindPw] = useState("");

  const [show, setShow] = useState(false);
  const handleShow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const [loginFailureShow, setLoginFailureShow] = useState(false);

  const handleFindPwStepOne = async () => {
    try {
      await Api.post("user/auth", {
        email: emailForFindPw,
      });
      setIsFindingPw(true);
      alert("이메일을 확인하고, 인증코드를 입력해주세요.");
    } catch (err) {
      console.error(err);
      alert(
        "등록된 이메일이 아니거나, 이메일을 잘못 입력했습니다. 다시 시도해주세요."
      );
    }
  };

  const handleFindPwStepTwo = async () => {
    try {
      const res = await Api.post("user/auth/code", {
        email: emailForFindPw,
        code: authForFindPw,
      });
      const user = res.data;
      const jwtToken = user.token;
      sessionStorage.setItem("userToken", jwtToken);
      setIsFindingPw(false);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
      alert("로그인되었습니다. 편집 버튼을 눌러 비밀번호를 변경해주세요.");
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      alert("잘못된 인증번호입니다. 다시 시도해주세요.");
    }
  };

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
      setLoginFailureShow(true);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
      <div className="wrap">
        <Card.Body className="form-wrap mt-10" style={{display: "flex", flexDirection: "column", alignItems: "center", height: "580px"}}>
        <img src="/images/Twogether.png" alt="ourLogo" style={{width: "12rem", height:"12rem", position: "relative", backgroundColor: "white"}} />
          <Form onSubmit={handleSubmit} className="back-white">
            <Form.Group controlId="loginEmail" className="back-white">
              <input
                type="email"
                autoComplete="on"
                value={email}
                className="input-field"
                placeholder="이메일"
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid ? (
                <Form.Text className="text-success back-white">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              ) : (
                <Form.Text className="text-success back-white" style={{visibility: "hidden"}}>
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="loginPassword" className="mt-3 back-white">
              <input
                type="password"
                autoComplete="off"
                value={password}
                className="input-field"
                placeholder="비밀번호"
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid ? (
                <Form.Text className="text-success back-white">
                  비밀번호는 4글자 이상으로 설정해 주세요.
                </Form.Text>
              ) : (
                <Form.Text className="text-success back-white" style={{visibility: "hidden"}}>
                  비밀번호는 4글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Row} className="mt-3 text-center back-white">
              <Col sm={{ span: 20 }} className="back-white">
                <button
                  className="submit-button"
                  type="submit"
                  disabled={!isFormValid}
                >
                  로그인
                </button>
              </Col>
            </Form.Group>
            <Form.Group
              className="mt-3 text-center"
              style={{ backgroundColor: "white" }}
            >
              <div className="back-white">
                <button
                  className="sub-button-left"
                  onClick={() => navigate("/register")}
                >
                  회원 가입
                </button>
                <button className="sub-button-right" onClick={handleShow}>
                  비밀번호 찾기
                </button>
              </div>
            </Form.Group>
            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }} className="back-white">
                <button
                  className="sub-button"
                  onClick={() => navigate("/recovery")}
                >
                  회원 복구
                </button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </div>

      <ModalPortal>
        {loginFailureShow && (
          <ModalComp
            setShow={setLoginFailureShow}
            show={loginFailureShow}
            title="로그인 실패"
            message="로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요."
          >
            <Button
              variant="secondary"
              onClick={() => setLoginFailureShow(false)}
            >
              확인
            </Button>
          </ModalComp>
        )}
      </ModalPortal>

      <Modal
        show={show}
        onHide={handleClose}
        style={{ background: "transparent" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>비밀번호</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          이메일 인증이 필요합니다.
          <InputGroup className="mb-3 mt-3">
            <FormControl
              type="email"
              placeholder="이메일을 입력해주세요."
              id="findPwEmailInput"
              value={emailForFindPw}
              onChange={(e) => setEmailForFindPw(e.target.value)}
            />
            <Button variant="outline-primary" onClick={handleFindPwStepOne}>
              인증번호 발송
            </Button>
          </InputGroup>
          <FormControl
            type="text"
            placeholder="인증번호를 입력해주세요."
            id="findPwAuthInput"
            disabled={!isFindingPw}
            value={authForFindPw}
            onChange={(e) => setAuthForFindPw(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button
            variant="primary"
            disabled={!isFindingPw}
            onClick={() => {
              handleClose();
              handleFindPwStepTwo();
            }}
          >
            찾기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginForm;
