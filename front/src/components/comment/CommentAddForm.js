import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const CommentAddForm=({ userId, setComments })=>{
    const [comment,setComment]=useState("")
    const handleSubmit=(e)=>{
        e.preventDefault()
        //여기부분을 post->get으로 바꿔야 함
        setComments((comments)=>{
            const newComments=[...comments,{
                id:3,
                user:userId,
                body:comment,
                date:"20220318"
            }]
            return newComments
        })
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>댓글을 입력해주세요!</Form.Label>
                <Form.Control as="textarea" rows={3} value={comment} onChange={(e)=>setComment(e.target.value)}/>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default CommentAddForm