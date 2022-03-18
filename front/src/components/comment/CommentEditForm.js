import {useState} from 'react'
import { Form, Button } from 'react-bootstrap'

const CommentEditForm=({ comment,setComments,setIsEditing })=>{
    const { id }=comment
    const [body,setBody]=useState(comment.body)

    const handleSubmit=(e)=>{
        e.preventDefault()
        //put->get으로 바꿔야 함.
        setComments((comments)=>{
            const newComments=[...comments]
            newComments.map(c=>{
                if(c.id===id) c.body=body
            })
            return newComments
        })
        setIsEditing(false)
    }
    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>댓글을 입력해주세요!</Form.Label>
                <Form.Control as="textarea" rows={3} value={body} onChange={(e)=>setBody(e.target.value)}/>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default CommentEditForm