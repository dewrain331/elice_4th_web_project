import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import { UserStateContext } from "../App";
import * as Api from "../api";
import User from "./user/User";
// project import
import Projects from "./project/Projects";
// award import
import Educations from "./education/Educations"
import Awards from "./award/Awards"
import Certificates from "./certificate/Certificates"
import { RecoilRoot } from "recoil"

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  // useState 훅을 통해 portfolioOwner 상태를 생성함.
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);
  const [isWidthUnder1300, setIsWidthUnder1300] = useState(false)
  const [isWidthUnder770, setIsWidthUnder770] = useState(false)
  const [isWidthUnder660, setIsWidthUnder660] = useState(false)

  const fetchPorfolioOwner = async (ownerId) => {
    // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    const res = await Api.get("users", ownerId);
    // 사용자 정보는 response의 data임.
    const ownerData = res.data;
    // portfolioOwner을 해당 사용자 정보로 세팅함.
    setPortfolioOwner(ownerData);
    // fetchPorfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    if (params.userId) {
      // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.userId;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    } else {
      // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
      const ownerId = userState.user.id;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    }

    window.onresize = () => {
      const innerWidth = window.innerWidth
      innerWidth > 1300 ? setIsWidthUnder1300(false) : setIsWidthUnder1300(true)
      innerWidth > 770 ? setIsWidthUnder770(false) : setIsWidthUnder770(true)
      innerWidth > 660 ? setIsWidthUnder660(false) : setIsWidthUnder660(true)
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <RecoilRoot>
      { isWidthUnder1300 === false && isWidthUnder770 === false && isWidthUnder660 === false &&
      <Container fluid>
        <Row>
          <Col>
            <User
              portfolioOwnerId={portfolioOwner.id}
              isEditable={portfolioOwner.id === userState.user?.id}
            />
          </Col>
          <Col>
            <Row className="mb-4">
              <Projects
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
            </Row>
            <Row className="mb-4">
              <Educations
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
            </Row>
            <Row className="mb-4">
              <Awards
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
            </Row>
            <Row className="mb-4">
              <Certificates
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
            </Row>
          </Col>
        </Row>
      </Container>
      }
      { isWidthUnder1300 === true && isWidthUnder770 === false && isWidthUnder660 === false &&
      <Container fluid>
          <Col>
              <Row className="mb-4 justify-content-center">
                <User
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </Row>
              <Row className="mb-4">
                <Projects
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </Row>
              <Row className="mb-4">
                <Educations
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </Row>
              <Row className="mb-4">
                <Awards
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </Row>
              <Row className="mb-4">
                <Certificates
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </Row>
          </Col>
      </Container>
      }
      { isWidthUnder1300 === true && isWidthUnder770 === true && isWidthUnder660 === false &&
      <Container fluid>
          <Col>
              <Row className="mb-4 justify-content-center">
                <User
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </Row>
              <Row className="mb-4">
                <Projects
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </Row>
              <Row className="mb-4">
                <Educations
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </Row>
              <Row className="mb-4">
                <Awards
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </Row>
              <Row className="mb-4">
                <Certificates
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </Row>
          </Col>
      </Container>
      }
    </RecoilRoot>
  );
}

export default Portfolio;
