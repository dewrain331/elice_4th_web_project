import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav, Modal, Button } from "react-bootstrap";
import { UserStateContext, DispatchContext } from "../App";
import { useRecoilValue } from 'recoil'
import { portfolioOwnerState } from './Portfolio'
import * as Api from "../api"

function Header() {
  const portfolioOwner = useRecoilValue(portfolioOwnerState)
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // Modal 관련 State
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  const discardId = async () => {
    try {
      await Api.post(`user/withdraw`, {
        password: userState.user?.password
      })
      dispatch({type : "LOGOUT"})
      alert("회원탈퇴가 완료되었습니다.")
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Nav activeKey={location.pathname}>
        <Nav.Item className="me-auto mb-5">
          <Nav.Link disabled>안녕하세요, 포트폴리오 공유 서비스입니다.</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/")}>나의 페이지</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/network")}>네트워크</Nav.Link>
        </Nav.Item>
        {isLogin && (
          <Nav.Item>
            <Nav.Link onClick={logout}>로그아웃</Nav.Link>
          </Nav.Item>
        )}
        {portfolioOwner.id === userState.user?.id && (
          <Nav.Item>
            <Nav.Link onClick={(evt) => {
              evt.preventDefault()
              handleShow()
            }}>회원탈퇴</Nav.Link>
          </Nav.Item>
        )}
      </Nav>
      
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>탈퇴 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>정말로 탈퇴하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              취소
            </Button>
            <Button variant="danger" onClick={() => {
              handleClose()
              discardId()
            }
            }>
              탈퇴
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default Header;
