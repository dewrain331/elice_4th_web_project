import React,{useEffect,useState} from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import * as Api from '../../api'
import EducationAddForm from './EducationAddForm';
import Education from './Education'

//Educations는 Portfolio.js에 추가되어야 함
//백엔드서버/educations/아이디'에 사용자 포트폴리오가 저장되어 있으므로 아이디 정보 필요 
//포트폴리오가 사용자의 것이면 addform, editbutton이 보여야 함
const Educations = ({ portfolioOwnerId, isEditable }) => {
    const [educations, setEducations]=useState([])
    const [isAdding, setIsAdding]=useState(false)
    useEffect(()=>{
        Api.get('educationlist', portfolioOwnerId).then((res)=>setEducations(res.data))
    },[portfolioOwnerId])
    return(
        <Card>
            <Card.Body>
                <Card.Title>학력</Card.Title>
                {educations.map((edu)=>(
                    <Education 
                        key={edu.id}
                        education={edu}
                        setEducations={setEducations}
                        isEditable={isEditable}
                        />))}
                {isEditable && (
                    <Row className="mt-3 text-center mb-4">
                         <Col>
                             <Button onClick={()=>setIsAdding(true)}>+</Button>
                         </Col>
                    </Row>
                )}
                {isAdding && 
                <EducationAddForm 
                    userId={portfolioOwnerId} 
                    setEducations={setEducations}
                    setIsAdding={setIsAdding}
                />}
            </Card.Body>
        </Card>
    )
}

export default Educations