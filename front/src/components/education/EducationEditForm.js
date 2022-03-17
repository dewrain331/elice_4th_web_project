import {useState} from 'react'
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from '../../api'

const EducationEditForm=({ education, setEducations, setIsEditing })=>{
    const { id, userId }=education
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
        const res=await Api.get('educationlist', userId)
        setEducations(res.data)
        setIsEditing(false)
    }
    return(
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Control
                        type="text"
                        placeholder="학교 이름"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTitle" className="mt-3">
                    <Form.Control
                        type="text"
                        placeholder="전공"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                    />
                </Form.Group>

                <div key='inline-radio' className="mb-3" onChange={(e)=>setPosition(e.target.value)}>
                    <Form.Check
                        inline
                        label="재학중"
                        value="재학중"
                        name="position"
                        type="radio"
                        id="inline-radio-1"
                        defaultChecked={position==="재학중"}
                    />
                    <Form.Check
                        inline
                        label="학사졸업"
                        value="학사졸업"
                        name="position"
                        type="radio"
                        id="inline-radio-2"
                        defaultChecked={position==="학사졸업"}
                    />
                    <Form.Check
                        inline
                        label="석사졸업"
                        value="석사졸업"
                        name="position"
                        type="radio"
                        id="inline-radio-3"
                        defaultChecked={position==="석사졸업"}
                    />
                    <Form.Check
                        inline
                        label="박사졸업"
                        value="박사졸업"
                        name="position"
                        type="radio"
                        id="inline-radio-4"
                        defaultChecked={position==="박사졸업"}
                    />
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