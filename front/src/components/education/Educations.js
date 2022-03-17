import React,{useEffect,useState} from 'react'
import { Card, Button, Row, Col} from 'react-bootstrap'
//import * as Api from '../../api'
import axios from "axios"
import EducationAddForm from './EducationAddForm'
import Education from './Education'

const Educations = ({ portfolioOwnerId, isEditable }) => {
    const backendPortNumber = "5001";
    const serverUrl = "http://" + window.location.hostname + ":" + backendPortNumber;

    const [totalPage,setTotalPage]=useState(0)
    const [page,setPage]=useState(1)
    const [educations, setEducations]=useState([])
    const [isAdding, setIsAdding]=useState(false)

    useEffect(()=>{
        // Api.get('educationlist', portfolioOwnerId).then((res)=>setEducations(res.data))
        axios
        .get(`${serverUrl}/educationlist/${portfolioOwnerId}?page=${page}&perPage=3`)
        .then((res)=>{
            const {totalPage, educations}=res.data
            setTotalPage(totalPage)
            setEducations(educations)
        })
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
                <Row className="mt-3 text-center mb-4">
                         <Col>
                            <Button variant="outline-secondary" size="sm" 
                                onClick={()=>setPage((prev)=>prev-1)}
                                disabled={page===1}>
                                {"<"}
                            </Button>{" "}
                            <Button variant="outline-secondary" size="sm" disabled>
                                {page}/{totalPage}
                            </Button>{" "}
                            <Button variant="outline-secondary" size="sm" 
                                onClick={()=>setPage((prev)=>prev+1)}
                                disabled={page===totalPage}>
                                {">"}
                            </Button>
                        </Col>
                    </Row>
            </Card.Body>
        </Card>
    )
}

export default Educations