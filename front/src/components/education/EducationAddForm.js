import React,{useState} from 'react'
import * as Api from '../../api'
const EducationAddForm=({ user_id, setEducations, setIsAdding })=>{
    const [school, setSchool]=useState("")
    const [major, setMajor]=useState("")
    const [position,setPosition]=useState("")

    const handleSubmit=(e)=>{
        e.preventDefault()
        Api.post('education/create',{
            user_id,
            school,
            major,
            position
        })
        .then(res=>setEducations(res.data))
        .then(()=>setIsAdding(false))
    }
   return(
       <div>
           <form onSubmit={handleSubmit}>
               <input type="text" placeholder="학교 이름" value={school} onChange={(e)=>setSchool(e.target.value)}/>
               <input type="text" placeholder="전공" value={major} onChange={(e)=>setMajor(e.target.value)}/>
               <div onChange={(e)=>setPosition(e.target.value)}>
                   <input type="radio" name="position" value="재학중"/>
                   <input type="radio" name="position" value="학사졸업"/>
                   <input type="radio" name="position" value="석사졸업"/>
                   <input type="radio" name="position" value="박사졸업"/>
               </div>
               <button type="submit">확인</button>
               <button onClick={()=>setIsAdding(false)}>취소</button>
           </form>
       </div>
   )
}

export default EducationAddForm