import { useState } from 'react'
import CommentCard from './CommentCard'
import CommentEditForm from './CommentEditForm'


const Comment=({ comment, setComments, isEditable, author })=>{
    const [isEditing, setIsEditing]=useState(false)
    
    return(
        <>
            {isEditing ? (
                <CommentEditForm
                    comment={comment}
                    setComments={setComments}
                    setIsEditing={setIsEditing}
                />
            ):(
                <CommentCard
                    comment={comment}
                    setComments={setComments}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                    author={author}
                />
            )}
        </>
    )
}

export default Comment