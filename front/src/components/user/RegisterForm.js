import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Form, Button, Card } from "react-bootstrap";
import ModalPortal from "../ModalPortal";
import ModalComp from "../ModalComp";
import * as Api from "../../api";

import "./User.css";

function RegisterForm() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");

  const [show, setShow] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

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
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("user/register", {
        email,
        password,
        name,
      });

      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      setErrorMessage(err.response.data.errormessage);
      setShow(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
    }
  };

  return (
    <>
      <div className="wrap">
        <Card.Body className="form-wrap">
          <Form onSubmit={handleSubmit} className="back-white">
            <Form.Group controlId="registerEmail" className="back-white">
              <input
                type="email"
                autoComplete="on"
                value={email}
                className="input-field"
                placeholder="이메일"
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <Form.Text className="text-success back-white">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              controlId="registerPassword"
              className="mt-3 back-white"
            >
              <input
                type="password"
                autoComplete="off"
                value={password}
                className="input-field"
                placeholder="비밀번호"
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success back-white">
                  비밀번호는 4글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              controlId="registerConfirmPassword"
              className="mt-3 back-white"
            >
              {/* <Form.Label className="back-white">비밀번호 재확인</Form.Label> */}
              <input
                type="password"
                autoComplete="off"
                value={confirmPassword}
                className="input-field"
                placeholder="비밀번호 재확인"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!isPasswordSame && (
                <Form.Text className="text-success back-white">
                  비밀번호가 일치하지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerName" className="mt-3 back-white">
              {/* <Form.Label className="back-white">이름</Form.Label> */}
              <input
                type="text"
                autoComplete="off"
                value={name}
                className="input-field"
                placeholder="이름"
                onChange={(e) => setName(e.target.value)}
              />
              {!isNameValid && (
                <Form.Text className="text-success back-white">
                  이름은 2글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }} className="back-white">
                <button
                  className="submit-button"
                  type="submit"
                  disabled={!isFormValid}
                >
                  회원 가입
                </button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }} className="back-white">
                <button
                  className="sub-button"
                  onClick={() => navigate("/login")}
                >
                  로그인하기
                </button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </div>

      <ModalPortal>
        {show && (
          <ModalComp
            setShow={setShow}
            show={show}
            title="회원가입 실패"
            message={errorMessage}
          >
            <Button variant="secondary" onClick={() => setShow(false)}>
              확인
            </Button>
          </ModalComp>
        )}
      </ModalPortal>
    </>
  );
}

export default RegisterForm;
