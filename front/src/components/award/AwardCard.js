import { Card, Button, Row, Col, Modal } from "react-bootstrap"
import {useState} from 'react'
import * as Api from "../../api"

const AwardCard = ({ _award, isEditable, setIsEditing, setAwards, setAllPage, page, setPage }) => {
    // Modal 관련 State
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleDelete = async () => {
        try {
            const {id, user_id} = _award
            await Api.delete(`awards/${id}`)
            const res = await Api.get("awardlist", `${user_id}?page=${page}&perPage=3`)
            const {total, awards} = res.data
            if(page > Math.ceil(total / 3)) {
                setPage(page - 1)
            }
            setAllPage(Math.ceil(total / 3))
            setAwards(awards)
            setShow(false)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Card.Body>
                {/* award의 수상내용과 상세내용을 출력 */}
                <Row className="align-items-center">
                    <Col>
                        <span>{_award.award}</span>
                        <br />
                        <span className="text-muted">{_award.description}</span>
                    </Col>
                    <Col xs lg="1">
                        {/* 각 항목마다 편집 버튼을 생성 */}
                        {isEditable && <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => setIsEditing(prev => !prev)}
                            className="mr-3"
                        >편집</Button>}
                        {/* 각 항목마다 삭제 버튼을 생성 */}
                        {isEditable && <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={handleShow}
                        >삭제</Button>}
                    </Col>
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
                    handleDelete()
                    }
                }>
                    삭제
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AwardCard