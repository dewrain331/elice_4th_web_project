import { useEffect, useState } from "react"
import { Card, Button, Row, Col } from "react-bootstrap"
import * as Api from "../../api"
import Certificate from "./Certificate"
import CertificateAddForm from "./CertificateAddForm"
import { useRecoilState } from 'recoil'
import { isAddingState, pageState, allPageState } from './CertAtom'

const Certificates = ({ portfolioOwnerId, isEditable }) => {
    // RecoilStates
    const [isAdding, setIsAdding] = useRecoilState(isAddingState)
    const [page, setPage] = useRecoilState(pageState)
    const [allPage, setAllPage] = useRecoilState(allPageState)

    // useState로 낱개의 certificate들을 담을 배열 선언
    const [certificates, setCertificates] = useState([])

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
    }, [portfolioOwnerId, page, allPage, setAllPage, setPage])

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
