import React,{useState} from 'react'
import * as Api from '../../api'
const EducationAddForm=({ user_id, setEducations, setIsAdding })=>{
    //학력 정보를 post할 때 필요한 school, major, position을 state로 지정
    const [school, setSchool]=useState("")
    const [major, setMajor]=useState("")
    const [position,setPosition]=useState("")
    
    //확인 버튼을 눌렀을 때 post요청 보낼 함수
    const handleSubmit= async (e)=>{
        e.preventDefault()
        await Api.post('education/create',{ 
            user_id,
            school,
            major,
            position
        })
        const res=await Api.get('educationlist', user_id)
        setEducations(res.data)
        setIsAdding(false)
    }
   return(
       <div>
           <form onSubmit={handleSubmit}>
               <input type="text" placeholder="학교 이름" value={school} onChange={(e)=>setSchool(e.target.value)}/>
               <input type="text" placeholder="전공" value={major} onChange={(e)=>setMajor(e.target.value)}/>
               <div onChange={(e)=>setPosition(e.target.value)}>
                   <input type="radio" value="재학중" id="attending"/>
                   <label htmlFor="attending">재학중</label>
                   <input type="radio" value="학사졸업" id="bachelor"/>
                   <label htmlFor="bachelor">학사졸업</label>
                   <input type="radio" value="석사졸업" id="master"/>
                   <label htmlFor="master">석사졸업</label>
                   <input type="radio" value="박사졸업" id="phD"/>
                   <label htmlFor="phD">박사졸업</label>
               </div>
               <button type="submit">확인</button>
               <button onClick={()=>setIsAdding(false)}>취소</button> 
           </form>
       </div>
   )
}

export default EducationAddForm