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
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    useEffect(() => {
        // DB에 저장된 유저의 Award들을 Awards 변수에 넣음.
        Api.get(`awardlist/${portfolioOwnerId}`)
            .then(res => setAwards(res.data))
    }, [portfolioOwnerId])
        /*
        // params 적용시 사용할 api.get
        Api.get(`awardlist/${portfolioOwnerId}?page=${page}&perPage=3`)
            .then(res => {
                const {totalPage, awards} = res.data
                setTotalPage(totalPage)
                setAwards(awards)
            })
    }, [porfolioOwnerId, page]
        */

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
                            {page} / {totalPage}
                        </Button>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setPage(prev => prev + 1)}
                            disabled={page === totalPage}
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