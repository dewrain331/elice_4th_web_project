import React,{ useState } from 'react'
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from '../../api'

const VALUES=["재학중","학사졸업","석사졸업","박사졸업"]

const EducationAddForm=({ userId, setEducations, setIsAdding, page, setPage, setAllPage })=>{
    //학력 정보를 post할 때 필요한 school, major, position을 state로 지정
    const [school, setSchool]=useState("")
    const [major, setMajor]=useState("")
    const [position,setPosition]=useState("")
    
    //확인 버튼을 눌렀을 때 post요청 보낼 함수
    const handleSubmit= async (e)=>{
        e.preventDefault()
        await Api.post('education/create',{ 
            userId,
            school,
            major,
            position
        })
        const res=await Api.get('educationlist', `${userId}?page=${page}&perPage=3`)
        const { totalPage, educations }=res.data
        setPage(totalPage)
        setAllPage(totalPage)
        setEducations(educations)
        setIsAdding(false)
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
                    id={ `inline-radio-${idx}` }
                />
            ))
        }
    </div>

    <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
            <Button variant="primary" type="submit" className="me-3">
                확인
            </Button>
            <Button variant="secondary" onClick={() => setIsAdding(false)}>
                취소
            </Button>
    </Col>
</Form.Group>


</Form>
   )
}

export default EducationAddForm