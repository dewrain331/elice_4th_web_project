import { useEffect, useState } from "react"
import { Card, Button, Row, Col } from "react-bootstrap"
import * as Api from "../../api"
import Certificate from "./Certificate"
import CertificateAddForm from "./CertificateAddForm"
import Pagination from './Pagination'

const Certificates = ({ portfolioOwnerId, isEditable }) => {
    // useState로 낱개의 certificate들을 담을 배열 선언
    const [certificates, setCertificates] = useState([])
    // useState로 생성 상태를 관리할 변수를 선언
    // 초기 상태는 생성 중이 아니므로, 초기값은 false
    const [isAdding, setIsAdding] = useState(false)
    // Pagination 관련
    const [page, setPage] = useState(1)
    const offset = (page - 1) * 3

    useEffect(() => {
        // DB에 저장된 유저의 Certificate들을 Certificates 변수에 넣음.
        Api.get("certificatelist", portfolioOwnerId)
            .then(res => setCertificates(res.data))
    }, [portfolioOwnerId])

    return (
        <Card>
            <Card.Body>
                <Card.Title>자격증</Card.Title>
                {certificates.slice(offset, offset + 3).map(v => (
                    <Certificate
                        key={v.id}
                        certificate={v}
                        setCertificates={setCertificates}
                        isEditable={isEditable}
                    />
                ))}
                {isEditable && (
                    <Row className="mt-3 text-center mb-4">
                        <Col sm={{ span: 20 }}>
                            <Button onClick={() => setIsAdding(true)}>+</Button>
                        </Col>
                    </Row>
                )}
                {isAdding && (
                    <CertificateAddForm 
                        portfolioOwnerId={portfolioOwnerId}
                        setCertificates={setCertificates}
                        setIsAdding={setIsAdding}
                    />
                )}
                <Pagination 
                    total={certificates.length}
                    page={page}
                    setPage={setPage}
                />
            </Card.Body>
        </Card>
    )
}

export default Certificates
