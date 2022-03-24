import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { UserStateContext, DispatchContext } from "../App";

function HamburgerBar() {
  const navigate = useNavigate();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

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

  return (
    <div style={{display: "flex"}}>
        <DropdownButton align="start" title="Menu" style={{margin: "8px 16px 8px auto"}}>
            <Dropdown.Item eventKey="1" onClick={() => navigate("/")}>나의 페이지</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => navigate("/network")}>네트워크</Dropdown.Item>
            <Dropdown.Divider />
            { isLogin &&
                <Dropdown.Item eventKey="3" onClick={logout}>로그아웃</Dropdown.Item>
            }
        </DropdownButton>
    </div>
  );
}

export default HamburgerBar;