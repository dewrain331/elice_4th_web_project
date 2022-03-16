import { Card, Button, Row, Col } from "react-bootstrap"

const EducationCard=({ education, setIsEditing, isEditable})=>{
    return(
        <Card.Body>
            <Row className="align-items-center">
                <Col>
                    <span>{education.school}</span>
                    <br/>
                    <span className="text-muted">{education.major} ({education.position})</span>
                </Col>
                {isEditable && (
                    <Col>
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="mr-3">편집</Button>
                        <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="mr-3">삭제</Button>
                    </Col>
                  )
                } 
            </Row>
        </Card.Body>
    )
}

export default EducationCard