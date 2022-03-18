import { Card, Button, Row, Col, Modal } from "react-bootstrap"
import {useState} from 'react'
import * as Api from "../../api"

const CertificateCard = ({ certificate, isEditable, setIsEditing, setCertificates, setAllPage, page, setPage }) => {
    // Modal 관련 State
    const slicingDate = (date) => {
        return date.slice(0, 10)
    }

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleDelete = async () => {
        const {id, user_id} = certificate
        await Api.delete(`certificate/${id}`)
        const res = await Api.get("certificatelist", `${user_id}?page=${page}&perPage=3`)
        const {total, certificates} = res
        if(page > Math.ceil(total / 3)) {
            setPage(page - 1)
        }
        setAllPage(Math.ceil(total / 3))
        setCertificates(certificates)
        setShow(false)
    }

    return (
        <>
            <Card.Body>
                {/* certificate의 자격증 이름과 상세내용, 취득일자를 출력 */}
                <Row className="align-items-center">
                    <Col>
                        <span>{certificate.title}</span>
                        <br />
                        <span className="text-muted">{certificate.description}</span>
                        <br />
                        <span className="text-muted">{slicingDate(certificate.date)}</span>
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

export default CertificateCard