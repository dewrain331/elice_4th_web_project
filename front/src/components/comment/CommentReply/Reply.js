import { Card, Col, Row } from 'react-bootstrap'

const Reply=({reply})=>{
    const { author_name, text, createdAt } = reply

    return(
        <Card.Body className="mt-2 text-justify float-left">
            <Card className="p-3">
                <Row>
                    <Col xs={10} className="text-primary ">
                        <h4>{author_name}</h4></Col>
                    <Col xs={2} className="text-secondary">
                        <h6>{createdAt.slice(0,10)}</h6> </Col>
                </Row>
                <Card.Text className="mt-2">{text}</Card.Text>
            </Card>
        </Card.Body>
    )
}

export default Reply