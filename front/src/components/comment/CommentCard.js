import { Card, Col, Row, ButtonGroup, Button } from 'react-bootstrap'

const CommentCard=({comment,isEditable,setIsEditing})=>{
    const { user, body, date }=comment    
    return(
        <Card.Body className="mt-2 text-justify float-left">
                <Card className="p-3">
                    <Row>
                        <Col xs={10} className="text-primary ">
                            <h4>{user}</h4></Col>
                        <Col xs={2} className="text-secondary">
                            <h6>{date}</h6> </Col>
                    </Row>
                <Card.Text className="mt-2">{body}</Card.Text>
                <Col>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" className="me-1">Reply</Button>
                        <Button variant="secondary" className="me-1">Comments</Button>
                        {isEditable && <Button variant="secondary" onClick={()=>setIsEditing(true)}>Edit</Button>}
                    </ButtonGroup>
                </Col>
                </Card>
            </Card.Body>
    )
}

export default CommentCard