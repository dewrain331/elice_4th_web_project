import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import Comment from './Comment'
import CommentAddForm from './CommentAddForm'
import * as Api from '../../api'

const Comments=({ userId, author })=>{
    const [comments,setComments]=useState([])

    useEffect(()=>{
        Api
        .get('comment',userId)
        .then((res)=>setComments(res.data))
    },[userId])

    return(
        <Card>
            <Card.Body>
                <Card.Title>방명록</Card.Title>
                {
                    comments.map((comment)=>(
                        <Comment 
                            key={comment.id}
                            comment={comment}
                            setComments={setComments}
                            isEditable={comment.author_id===userId}
                        />
                    ))
                }
                <CommentAddForm
                    user_id={userId}
                    author={author}
                    setComments={setComments}
                />
            </Card.Body>
        </Card>
    )
}

export default Comments