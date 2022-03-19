import React,{ useEffect, useState } from 'react'
import { Card, Button, Row, Col} from 'react-bootstrap'
import * as Api from '../../api'
import EducationAddForm from './EducationAddForm'
import Education from './Education'

const Educations = ({ portfolioOwnerId, isEditable }) => {

    const [ allPage, setAllPage ]=useState(0)
    const [ page, setPage ]=useState(1)
    const [ educations, setEducations ]=useState([])
    const [ isAdding, setIsAdding ]=useState(false)

    useEffect(()=>{
        Api
        .get('educationlist', `${portfolioOwnerId}?page=${page}&perPage=3`)
        .then((res)=>{
            const {totalPage, educations}=res.data
            setAllPage(totalPage)
            setEducations(educations)
        })
        .catch(err=>console.log(err.message))
    },[ portfolioOwnerId, page, allPage ])
    
    return(
        <Card>
            <Card.Body>
                <Card.Title>학력</Card.Title>
                { educations.map((edu)=>(
                    <Education 
                        key={edu.id}
                        education={edu}
                        setEducations={setEducations}
                        isEditable={isEditable}
                        page={page}
                        setPage={setPage}
                        setAllPage={setAllPage}
                        />)) }
                { isEditable && (
                    <Row className="mt-3 text-center mb-4">
                         <Col>
                             <Button onClick={()=>setIsAdding(true)}>+</Button>
                         </Col>
                    </Row>
                ) }
                {isAdding && 
                <EducationAddForm 
                    userId={portfolioOwnerId} 
                    setEducations={setEducations}
                    setIsAdding={setIsAdding}
                    page={page}
                    setPage={setPage}
                    setAllPage={setAllPage}
                />}
                <Row className="mt-3 text-center mb-4">
                         <Col>
                            <Button 
                                variant="outline-secondary" 
                                size="sm" 
                                className="me-3"
                                onClick={()=>setPage((prev)=>prev-1)}
                                disabled={page===1}
                                id="prevBtn">
                                {"<"}
                            </Button>
                            <Button 
                                variant="outline-secondary" 
                                size="sm" disabled>
                                {page}/{allPage}
                            </Button>
                            <Button 
                                variant="outline-secondary" 
                                size="sm" 
                                className="ms-3"
                                onClick={()=>setPage((prev)=>prev+1)}
                                disabled={page>=allPage}>
                                {">"}
                            </Button>
                        </Col>
                    </Row>
            </Card.Body>
        </Card>
    )
}

export default Educations