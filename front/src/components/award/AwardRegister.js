import {useState} from 'react'

const AwardRegister = () => {
    // form의 submit 핸들러입니다. 
    const handleSubmit = (evt) => {
        evt.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="수상 내역" name='title' />
            <input type="text" placeholder="상세 내역" name='description' />
            <button type="submit">확인</button>
            <button type="button">취소</button>
        </form>
    )
}

export default AwardRegister