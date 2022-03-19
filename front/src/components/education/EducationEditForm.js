import { useState } from 'react'
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from '../../api'

const VALUES=["재학중","학사졸업","석사졸업","박사졸업"]

const EducationEditForm=({ education, setEducations, setIsEditing, page })=>{
    const { id, userId }=education
    const [ school, setSchool ]=useState(education.school)
    const [ major, setMajor ]=useState(education.major)
    const [ position, setPosition ]=useState(education.position)

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            await Api.put('educations/'+id, {
                school,
                major,
                position
            })
            const res=await Api.get('educationlist', `${userId}?page=${page}&perPage=3`)
            setEducations(res.data.educations)
        }catch(err){
            console.log(err.message)
        }
        setIsEditing(false)
    }
    return(
            <Form onSubmit={ handleSubmit }>
                <Form.Group controlId="formBasicTitle">
                    <Form.Control
                        type="text"
                        placeholder="학교 이름"
                        value={ school }
                        onChange={(e) => setSchool(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTitle" className="mt-3">
                    <Form.Control
                        type="text"
                        placeholder="전공"
                        value={ major }
                        onChange={(e) => setMajor(e.target.value)}
                    />
                </Form.Group>

                <div key='inline-radio' className="mb-3" onChange={(e)=>setPosition(e.target.value)}>
                    {
                        VALUES.map(( value, idx )=>(
                            <Form.Check
                                inline
                                label={ value }
                                value={ value }
                                name="position"
                                type="radio"
                                key={ `inline-radio-${idx}` }
                                defaultChecked={ position===value }
                            />
                        ))
                     }
                </div>

                <Form.Group as={Row} className="mt-3 text-center mb-4">
                    <Col sm={{ span: 20 }}>
                        <Button variant="primary" type="submit" className="me-3">
                            확인
                        </Button>
                        <Button variant="secondary" onClick={() => setIsEditing(false)}>
                            취소
                        </Button>
                </Col>
            </Form.Group>


            </Form>
    )
}

export default EducationEditForm