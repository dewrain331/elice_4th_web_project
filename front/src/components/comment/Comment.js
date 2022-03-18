import { useState } from 'react'

const Comment=({ comment, setComments, isEditable })=>{
    return(
        <div>
            {comment.user}
            {comment.body}
        </div>
    )
}

export default Comment