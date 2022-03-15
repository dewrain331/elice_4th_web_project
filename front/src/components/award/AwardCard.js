import { Card, Button, Row, Col } from "react-bootstrap"

const AwardCard = ({ award, isEditable, setIsEditing }) => {
    // 삭제 버튼 클릭 시 함수
    const handleDelete = () => {

    }

    return (
        <>
            <Card.Text>
                {/* award의 수상내용과 상세내용을 출력 */}
                <Row className="align-items-center">
                    <Col>
                        <span>{award.title}</span>
                        <br />
                        <span className="text-muted">{award.description}</span>
                    </Col>
                    <Col xs lg="1">
                        {/* 각 항목마다 편집 버튼을 생성 */}
                        <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => setIsEditing(prev => !prev)}
                            className="mr-3"
                        >편집</Button>
                        {/* 각 항목마다 삭제 버튼을 생성 */}
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={handleDelete}
                            className="mr-3"
                        >삭제</Button>
                    </Col>
                </Row>
            </Card.Text>
        </>
    )
}

export default AwardCard