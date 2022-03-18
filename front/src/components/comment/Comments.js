import { useState } from 'react'
import { Card } from 'react-bootstrap'
import Comment from './Comment'
import CommentAddForm from './CommentAddForm'

const Comments=({ portfolioOwnerId, isEditable })=>{
    const [comments,setComments]=useState([{
        id:1,
        user:"배서영",
        body: "잘 보고 갑니다."
    },{
        id:2,
        user:"test",
        body: "대박이네요!"  
    }])
    return(
        <Card>
            <Card.Body>
                <Card.Title>방명록</Card.Title>
                {
                    comments.map((comment)=>{
                        <Comment 
                            key={comment.id}
                            comment={comment}
                            setComments={setComments}
                            isEditable={isEditable}
                        />
                    })
                }
                <CommentAddForm
                    userId={portfolioOwnerId}
                    setComment={setComments}
                />
            </Card.Body>
        </Card>
    )
}

export default Comments