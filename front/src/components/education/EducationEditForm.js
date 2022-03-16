import {useState} from 'react'
import * as Api from '../../api'

const EducationEditForm=({ id, education, setEducations, setIsEditing })=>{
    const { user_id }=education
    const [school, setSchool]=useState(education.school)
    const [major, setMajor]=useState(education.major)
    const [position,setPosition]=useState(education.position)

    const handleSubmit= async (e)=>{
        e.preventDefault()
        await Api.put('educations/'+id, {
            school,
            major,
            position
        })
        const res=await Api.get('educationlist', user_id)
        setEducations(res.data)
        setIsEditing(false)
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="학교 이름" value={school} onChange={(e)=>setSchool(e.target.value)}/>
                <input type="text" placeholder="전공" value={major} onChange={(e)=>setMajor(e.target.value)}/>
                <div onChange={(e)=>setPosition(e.target.value)}>
                   <input type="radio" value="재학중" id="attending" name="pos" checked={position==="재학중"}/>
                   <label htmlFor="attending">재학중</label>
                   <input type="radio" value="학사졸업" id="bachelor" name="pos" checked={position==="학사졸업"}/>
                   <label htmlFor="bachelor">학사졸업</label>
                   <input type="radio" value="석사졸업" id="master" name="pos" checked={position==="석사졸업"}/>
                   <label htmlFor="master">석사졸업</label>
                   <input type="radio" value="박사졸업" id="phD" name="pos" checked={position==="박사졸업"}/>
                   <label htmlFor="phD">박사졸업</label>
                </div>
                <button type="submit">확인</button>
                <button onClick={()=>setIsEditing(false)}>취소</button> 
            </form>
        </div>
    )
}

export default EducationEditForm