import { useState } from 'react'
import CommentCard from './CommentCard'
import CommentEditForm from './CommentEditForm'


const Comment=({ comment, setComments, isEditable })=>{
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
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                />
            )}
        </>
    )
}

export default Comment