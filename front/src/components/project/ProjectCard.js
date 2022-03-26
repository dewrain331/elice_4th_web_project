import { Card, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";
// recoil 사용
import { useSetRecoilState, useRecoilState } from "recoil";
import { projectsState, pageState, totalPageState } from "./ProjectAtom";
import ModalComp from "../ModalComp";
import ModalPortal from "../ModalPortal";
import "../Components.css";

const PER_PAGE = 3;

function ProjectCard({ project, isEditable, setIsEditing }) {
  // 날짜 표시를 위한 슬라이싱
  const slicingDate = (date) => {
    return date.slice(0, 10);
  };

  // Modal 관련 State
  const [show, setShow] = useState(false);

  // recoil 적용
  const setProjects = useSetRecoilState(projectsState);
  const [page, setPage] = useRecoilState(pageState);
  const setTotalPage = useSetRecoilState(totalPageState);

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

  return (
    <>
      <Card.Body className="portfolioBG">
        {/* project의 제목, 상세내용, 기간 */}
        <Row className="align-items-center portfolioBG">
          <Col xs={9} className="portfolioBG">
            <span className="portfolioBG">{project.title}</span>
            <br />
            <span className="text-muted portfolioBG">
              {project.description}
            </span>
            <br />
            {/* project의 기간을 object로 받고 출력형식에 맞게 변경 */}
            <span className="text-muted portfolioBG">
              {slicingDate(project.fromDate)} ~ {slicingDate(project.toDate)}
            </span>
          </Col>
          {/* project 편집 버튼 */}
          {isEditable && (
            <Col xs={3} style={{ textAlign: "right" }} className="portfolioBG">
              <Button
                variant="info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3"
              >
                편집
              </Button>{" "}
              {/* project 삭제 버튼 */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShow(true)}
                className="mr-3"
              >
                삭제
              </Button>
            </Col>
          )}
        </Row>
      </Card.Body>

      <ModalPortal>
        {show && (
          <ModalComp
            setShow={setShow}
            show={show}
            title="삭제 확인"
            message="정말로 삭제하시겠습니까?"
            children
          >
            <Button variant="secondary" onClick={() => setShow(false)}>
              취소
            </Button>
            <Button variant="danger" onClick={() => handleDelete()}>
              삭제
            </Button>
          </ModalComp>
        )}
      </ModalPortal>
    </>
  );
}

export default ProjectCard;
