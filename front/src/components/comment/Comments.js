import { useState } from 'react'
import { Card } from 'react-bootstrap'
import Comment from './Comment'
import CommentAddForm from './CommentAddForm'

const Comments=({ portfolioOwnerId, isEditable })=>{
    const [comments,setComments]=useState([{
        id:1,
        user:"배서영",
        body: "잘 보고 갑니다.",
        date:"18 March, 2022",
    },{
        id:2,
        user:"test",
        body: "대박이네요!",
        date:"18 March, 2022",  
    }])

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
                            isEditable={isEditable}
                        />
                    ))
                }
                <CommentAddForm
                    userId={portfolioOwnerId}
                    setComments={setComments}
                />
            </Card.Body>
        </Card>
    )
}

export default Comments