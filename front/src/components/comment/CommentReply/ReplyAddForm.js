import { useState } from 'react'
import * as Api from '../../../api'
import { Form, Button, Card } from 'react-bootstrap'

const ReplyAddForm=({ author, CommentId, setReplies })=>{
    const { id, name } = author

    const [reply, setReply]=useState("")

    const handleSubmit= async (e)=> {
        e.preventDefault()
        
        const res=await Api.post('reply',{
            parent_comment_id: CommentId,
            author_id: id,
            author_name: name,
            text: reply
        })
        setReplies((replies)=>[...replies,res.data])
        setReply("")
    }

    return(
        <Card.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>댓글을 입력해주세요!</Form.Label>
                    <Form.Control as="textarea" rows={3} value={reply} onChange={(e)=>setReply(e.target.value)}/>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Card.Body>
    )

}

export default ReplyAddForm