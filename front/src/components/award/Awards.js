import { useEffect, useState } from "react"
import { Card, Button, Row, Col } from "react-bootstrap"
import * as Api from "../../api"
import Award from "./Award"
import AwardAddForm from "./AwardAddForm"

const Awards = ({ portfolioOwnerId, isEditable }) => {
    // useState로 낱개의 award들을 담을 배열 선언
    const [awards, setAwards] = useState([])
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
                const res = await Api.get("awardlist", `${portfolioOwnerId}?page=${page}&perPage=3`)
                const { total, awards } = res.data
                setAllPage(total)
                setAwards(awards)
            } catch (err) {
                console.error(err)
            }
        }
        fetch()
    }, [portfolioOwnerId, page, allPage])

    return (
        <Card>
            <Card.Body>
                <Card.Title>수상이력</Card.Title>
                {awards.map(v => (
                    <Award
                        key={v.id}
                        _award={v}
                        setAwards={setAwards}
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
                    <AwardAddForm 
                        portfolioOwnerId={portfolioOwnerId}
                        setAwards={setAwards}
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

export default Awards