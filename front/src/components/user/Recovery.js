import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Col, Row, Form, Card } from "react-bootstrap";
import * as Api from "../../api";

import "./User.css";

const Recovery = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await Api.post(`user/recovery`, {
        email,
        password,
      });
      alert("복구 완료");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="wrap">
      <Card.Body className="form-wrap" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <img src="/images/Twogether.png" alt="ourLogo" style={{width: "12rem", height:"12rem", position: "relative", backgroundColor: "white"}} />
        <Form onSubmit={handleSubmit} className="back-white">
          <Form.Group controlId="registerEmail" className="back-white">
            <input
              type="email"
              autoComplete="off"
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

          <Form.Group controlId="registerPassword" className="mt-3 back-white">
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

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }} className="back-white">
              <button
                className="submit-button"
                type="submit"
                disabled={!isFormValid}
              >
                회원 복구
              </button>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center ">
            <Col sm={{ span: 20 }} className="back-white">
              <button className="sub-button" onClick={() => navigate("/login")}>
                로그인하기
              </button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </div>
  );
};

export default Recovery;
