import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { Container, Col, Row, Form, Button } from "react-bootstrap"
import * as Api from '../../api'

const Recovery = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [wrongInput, setWrongInput] = useState(false)

    const validateEmail = (email) => {
        return email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const isEmailValid = validateEmail(email)
    const isPasswordValid = password.length >= 4
    const isFormValid = isEmailValid && isPasswordValid

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        try {
            await Api.post(`/user/recovery`, {
                email,
                password
            })
            alert("복구 완료")
            navigate('/login')
        } catch (err) {
            console.error(err)
            setWrongInput(true)
        }
    }

    return (
        <Container>
          <Row className="justify-content-md-center mt-5">
            <Col lg={8}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="registerEmail">
                  <Form.Label>이메일 주소</Form.Label>
                  <Form.Control
                    type="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!isEmailValid && !wrongInput && (
                    <Form.Text className="text-success">
                      이메일 형식이 올바르지 않습니다.
                    </Form.Text>
                  )}
                  {wrongInput && (
                    <Form.Text className="text-success">
                      이메일과 비밀번호를 다시 확인해주세요.
                    </Form.Text>
                  )}
                </Form.Group>
    
                <Form.Group controlId="registerPassword" className="mt-3">
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!isPasswordValid && !wrongInput && (
                    <Form.Text className="text-success">
                      비밀번호는 4글자 이상입니다.
                    </Form.Text>
                  )}
                  {wrongInput && (
                    <Form.Text className="text-success">
                      이메일과 비밀번호를 다시 확인해주세요.
                    </Form.Text>
                  )}
                </Form.Group>
    
                <Form.Group as={Row} className="mt-3 text-center">
                  <Col sm={{ span: 20 }}>
                    <Button variant="primary" type="submit" disabled={!isFormValid}>
                      회원 복구
                    </Button>
                  </Col>
                </Form.Group>
    
                <Form.Group as={Row} className="mt-3 text-center">
                  <Col sm={{ span: 20 }}>
                    <Button variant="light" onClick={() => navigate("/login")}>
                      로그인하기
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      )
}

export default Recovery