import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";
// recoil 사용
import { useSetRecoilState, useRecoilState } from "recoil";
import { projectsState, pageState, totalPageState } from "./ProjectAtom";
// styled 사용
import styled from "styled-components";

const PER_PAGE = 3;

const DetailSpan = styled.div`
  ${({ show }) => {
    if (show) {
      return `max-height: 100%;`;
    } else {
      return `overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;`;
    }
  }}
`;

const DetailButton = styled.button`
  border: 0;
`;

function ProjectCard({ project, isEditable, setIsEditing }) {
  // 날짜 표시를 위한 슬라이싱
  const slicingDate = (date) => {
    return date.slice(0, 10);
  };

  // Modal 관련 State
  const [show, setShow] = useState(false);
  const handleAlertShow = () => setShow(true);
  const handleAlertCancel = () => setShow(false);

  // recoil 적용
  const setProjects = useSetRecoilState(projectsState);
  const [page, setPage] = useRecoilState(pageState);
  const setTotalPage = useSetRecoilState(totalPageState);

  // 더보기 버튼 state
  const [showDetail, setShowDetail] = useState(false);
  // const [isLong, setIsLong] = useState(false); // overflow 판단 처리 필요

  // 삭제 기능을 하는 함수
  const handleDelete = async () => {
    const { id, userId } = project;
    try {
      await Api.delete("projects", id);
      // "projectlist/유저id?page={현재 페이지}&?perPage={데이터 수}"로 GET 요청하고,
      // response의 data로 totalPage와 projects를 세팅함.
      const res = await Api.get(
        "projectlist",
        `${userId}?page=${page}&perPage=${PER_PAGE}`
      );
      const { totalPage, projects } = res.data;
      if (page > totalPage) {
        setPage((prev) => prev - 1);
      }
      setTotalPage(totalPage);
      setProjects(projects);
    } catch (error) {
      console.error(error);
    }
    setShow(false);
  };

  // const DetailOpenSpan = styled.span`
  //   max-height: 100%;
  //   line-height: 30px;
  // `;

  const handleDetailButton = () => {
    setShowDetail(!showDetail);
    handleIsLong();
  };

  const handleIsLong = () => {
    // console.log(project.description);
  };

  return (
    <>
      <Card.Body>
        {/* project의 제목, 상세내용, 기간 */}
        <Row className="align-items-center">
          <Col>
            <span>{project.title}</span>
            <br />
            <DetailSpan show={showDetail} className="text-muted">
              {project.description}
            </DetailSpan>
            <DetailButton onClick={handleDetailButton}>
              {showDetail ? "다시 접기" : "더보기"}
            </DetailButton>
            <br />
            {/* project의 기간을 object로 받고 출력형식에 맞게 변경 */}
            <span className="text-muted">
              {slicingDate(project.fromDate)} ~ {slicingDate(project.toDate)}
            </span>
          </Col>
          {/* project 편집 버튼 */}
          {isEditable && (
            <Col xs lg="1">
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3"
              >
                편집
              </Button>
            </Col>
          )}
          {/* project 삭제 버튼 */}
          {isEditable && (
            <Col xs lg="1">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleAlertShow}
                className="mr-3"
              >
                삭제
              </Button>
            </Col>
          )}
        </Row>
      </Card.Body>

      <Modal show={show} onHide={handleAlertCancel}>
        <Modal.Header closeButton>
          <Modal.Title>삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAlertCancel}>
            취소
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProjectCard;
