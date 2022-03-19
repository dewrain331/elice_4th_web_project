import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import { useState } from 'react'
import * as Api from "../../api"

function ProjectCard({ project, isEditable, setIsEditing, setProjects, page, setTotalPage, setPage }) {
    const slicingDate = (date) => {
        return date.slice(0, 10);
    }

    // Modal 관련 State
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    // 삭제 기능을 하는 함수
    const handleDelete = async () => {
        const { id, userId } = project;
        try {
            await Api.delete('projects', id);
        } catch (error) {
            console.error(error);
        }

        try {
            const res = await Api.get('projectlist', `${userId}?page=${page}&perPage=3`)
            let { totalPage, projects } = res.data
            // 현재 페이지에 더 이상 프로젝트가 없다면 데이터가 있는 이전 페이지로 넘어감
            if (projects.length === 0) {
                setPage((prev) => prev - 1);
            } else {
                setTotalPage(totalPage);
                setProjects(projects);
            }
            setShow(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Card.Body>
                {/* project의 제목, 상세내용, 기간 */}
                <Row className="align-items-center">
                    <Col>
                        <span>{project.title}</span>
                        <br />
                        <span className="text-muted">{project.description}</span>
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
                            >편집
                            </Button>
                        </Col>
                    )}
                    {/* project 삭제 버튼 */}
                    {isEditable && (
                        <Col xs lg="1">
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={handleShow}
                                className="mr-3"
                            >삭제
                            </Button>
                        </Col>
                    )}
                </Row>
            </Card.Body>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>삭제 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="danger" onClick={() => {
                        handleClose()
                        handleDelete(project.id)
                    }
                    }>
                        삭제
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProjectCard;
