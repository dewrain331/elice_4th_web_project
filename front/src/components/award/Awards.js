import { useEffect } from "react"
import { Card, Button, Row, Col } from "react-bootstrap"
import * as Api from "../../api"
import Award from "./Award"
import AwardAddForm from "./AwardAddForm"
import { useRecoilState } from 'recoil'
import { isAddingState, pageState, allPageState, awardsState } from './AwardAtom'

const Awards = ({ portfolioOwnerId, isEditable }) => {
    // RecoilStates
    const [isAdding, setIsAdding] = useRecoilState(isAddingState)
    const [page, setPage] = useRecoilState(pageState)
    const [allPage, setAllPage] = useRecoilState(allPageState)
    const [awards, setAwards] = useRecoilState(awardsState)

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
    }, [portfolioOwnerId, page, allPage, setAllPage, setPage, setAwards])

    return (
        <Card>
            <Card.Body>
                <Card.Title>수상이력</Card.Title>
                {awards.map(v => (
                    <Award
                        key={v.id}
                        _award={v}
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