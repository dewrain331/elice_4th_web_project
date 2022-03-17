import { useEffect, useState } from "react"
import { Card, Button, Row, Col } from "react-bootstrap"
import * as Api from "../../api"
import Certificate from "./Certificate"
import CertificateAddForm from "./CertificateAddForm"

const Certificates = ({ portfolioOwnerId, isEditable }) => {
    // useState로 낱개의 certificate들을 담을 배열 선언
    const [certificates, setCertificates] = useState([])
    // useState로 생성 상태를 관리할 변수를 선언
    // 초기 상태는 생성 중이 아니므로, 초기값은 false
    const [isAdding, setIsAdding] = useState(false)
    // Pagination 관련
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(3)
    const offset = (page - 1) * limit
    const pagination = () => {
        const numPages = Math.ceil(certificates.length / limit)

        return (
            <>
                <nav>
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}>$lt;</button>
                    {Array(numPages)
                        .fill()
                        .map((_, i) => {
                            <button
                                key={i + 1}
                                onClick={() => setPage(i + 1)}
                                ariaCurrent={page === i + 1 ? "page" : null}
                            >
                                {i + 1}
                            </button>
                        })
                    }
                    <button onClick={() => setPage(page + 1)} disabled={page === numPages}>$gt;</button>
                </nav>
            </>
        )
    }

    useEffect(() => {
        // DB에 저장된 유저의 Certificate들을 Certificates 변수에 넣음.
        Api.get("certificatelist", portfolioOwnerId)
            .then(res => setCertificates(res.data))
    }, [portfolioOwnerId])

    return (
        <Card>
            <Card.Body>
                <Card.Title>자격증</Card.Title>
                {certificates.slice(offset, offset + limit).map(v => (
                    <Certificate
                        key={v.id}
                        certificate={v}
                        setCertificates={setCertificates}
                        isEditable={isEditable}
                    />
                ))}
                {pagination}
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
            </Card.Body>
        </Card>
    )
}

export default Certificates
