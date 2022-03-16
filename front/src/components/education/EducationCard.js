import { Card, Button, Row, Col } from "react-bootstrap"

const EducationCard=({ education, setIsEditing, isEditable})=>{
    return(
        <Card.Text>
            <Row className="align-items-center">
                <Col>
                    <span>{education.school}</span>
                    <br/>
                    <span className="text-muted">{education.major} ({education.position})</span>
                </Col>
                {isEditable && (
                    <Col xs lg="1">
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="mr-3"
                      >편집</Button>
                    </Col>
                  )
                } 
            </Row>
        </Card.Text>
    )
}

export default EducationCard