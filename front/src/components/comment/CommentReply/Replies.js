import { useState, useEffect } from 'react'
import * as Api from '../../../api'
import Reply from './Reply'

const Replies=({ id })=>{
    const [replies, setReplies]=useState([])

    useEffect(()=>{
        Api
        .get('comment',id)
        .then(res=>setReplies(res.data[0].replys))
    },[id])

    console.log(replies)
    return(
        <>
            {
                replies && replies.map(reply=>(
                    <Reply
                        key={reply.id} 
                        reply={reply}/>
                ))
            }
        </>
    )
}

export default Replies