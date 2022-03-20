import { Card, Col, Row, Button } from 'react-bootstrap'
import * as Api from '../../../api'

const Reply=({ reply, isEditable, setReplies })=>{
    const { id, author_name, text, parent_comment_id, createdAt } = reply

    const handleDelete= async ()=>{
        try{
            await Api.delete('comment/reply',`${parent_comment_id}/${id}`)
            
            setReplies((replies)=>{
                const pos=replies.findIndex(r=>r.id===id)
                if(pos>=-1){
                    replies.splice(pos,1)
                    return [...replies]
                }
                return replies
            })
            
        }catch(err){
            console.log(err.message)
        }
    }

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
                <Col>
                    { isEditable && <Button variant="secondary" onClick={ handleDelete }>Delete</Button>}
                </Col>
            </Card>
        </Card.Body>
    )
}

export default Reply