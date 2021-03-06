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
    const [page, setPage] = useState(0)
    const [allPage, setAllPage] = useState(1)

    useEffect(() => {
        const fetch = async () => {
            try {
                if(page === 0) {
                    setPage(1)
                }
                const res = await Api.get("certificatelist", `${portfolioOwnerId}?page=${page}&perPage=3`)
                const { total, certificates } = res.data
                setAllPage(total)
                setCertificates(certificates)
            } catch (err) {
                console.error(err)
            }
        }
        fetch()
    }, [portfolioOwnerId, page, allPage])

    return (
        <Card>
            <Card.Body>
                <Card.Title>자격증</Card.Title>
                {certificates.map(v => (
                    <Certificate
                        key={v.id}
                        certificate={v}
                        setCertificates={setCertificates}
                        isEditable={isEditable}
                        setAllPage={setAllPage}
                        page={page}
                        setPage={setPage}
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
                        setPage={setPage}
                        page={page}
                        setAllPage={setAllPage}
                        allPage={allPage}
                    />
                )}
                <Row className="mt-3 text-center mb-4">
                    <Col>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setPage(prev => prev - 1)}
                            disabled={page === 1}
                            className="me-3"
                        >
                            {"<"}
                        </Button>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                        >
                            {Math.ceil(allPage / 3) === 0 ? 0 : page} / {Math.ceil(allPage / 3)}
                        </Button>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setPage(prev => prev + 1)}
                            disabled={page >= Math.ceil(allPage / 3)}
                            className="ms-3"
                        >
                            {">"}
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default Certificates
