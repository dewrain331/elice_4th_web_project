import { Card, Button, Row, Col, Modal } from "react-bootstrap"
import {useState} from 'react'
import * as Api from "../../api"

const CertificateCard = ({ certificate, isEditable, setIsEditing, setCertificates }) => {
    // Modal 관련 State
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleDelete = async (id) => {
        await Api.delete(`certificate/${id}`)
        const res = await Api.get("certificatelist", certificate.user_id)
        setCertificates(res.data)
    }

    return (
        <>
            <Card.Text>
                {/* certificate의 자격증 이름과 상세내용, 취득일자를 출력 */}
                <Row className="align-items-center">
                    <Col>
                        <span>{certificate.title}</span>
                        <br />
                        <span className="text-muted">{certificate.description}</span>
                        <br />
                        <span className="text-muted">{certificate.date}</span>
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
            </Card.Text>

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
                    handleDelete(certificate.id)
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