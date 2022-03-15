import React,{useEffect,useState} from 'react'
import * as Api from '../../api'
import EducationAddForm from './EducationAddForm';

//Educations는 Portfolio.js에 추가되어야 함
//백엔드서버/educations/아이디'에 사용자 포트폴리오가 저장되어 있으므로 아이디 정보 필요 
//포트폴리오가 사용자의 것이면 addform, editbutton이 보여야 함
const Educations = ({ portfolioOwnerId, isEditable, setIsAdding }) => {
    const [educations, setEducations]=useState([])
    const [isAdding, setIsAdding]=useState(false)
    useEffect(()=>{
        Api.get('educations',portfolioOwnerId).then(res=>setEducations(res.data))
    },[portfolioOwnerId])

    return(
        <div>
            {/* 정상적으로 불러와지는 게 확인되면 EducationCard로 옮겨갈 부분 */}
            <h3>학력</h3>
            {educations.map((edu)=>(
                <Education 
                    id={edu.id}
                    education={edu}
                    setEducations={setEducations}
                    isEditable={isEditable}
                    />))}
            {isEditable && 
                <button onClick={()=>setIsAdding(true)}>+</button>
            }
            {isAdding && 
            <EducationAddForm 
                user_id={portfolioOwnerId} 
                setEducations={setEducations}
                setIsAdding={setIsAdding}
            />}
        </div>
    )
}