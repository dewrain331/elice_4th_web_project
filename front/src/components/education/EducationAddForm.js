import React,{useState} from 'react'
import * as Api from '../../api'
const EducationAddForm=({ user_id, setEducations, setIsAdding })=>{
    //학력 정보를 post할 때 필요한 school, major, position을 state로 지정
    const [school, setSchool]=useState("")
    const [major, setMajor]=useState("")
    const [position,setPosition]=useState("")
    
    //확인 버튼을 눌렀을 때 post요청 보낼 함수
    const handleSubmit=(e)=>{
        e.preventDefault()
        Api.post('education/create',{
            user_id,
            school,
            major,
            position
        })
        .then(res=>setEducations(res.data)) //add한 정보 바탕으로 새롭게 educations state를 세팅
        .then(()=>setIsAdding(false)) //add 완료했으므로 폼을 닫아주기 위해 isadding state를 false로 세팅
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