import { Card, Button, Row, Col } from "react-bootstrap"
import {useState} from "react"
import * as Api from "../../api"

const EducationCard=({ education, setEducations, setIsEditing, isEditable})=>{
    
    const [show,setShow]=useState(false)
    
    const handleDelete = async () => {
        const { id } = education
        const res=await Api.delete('educations',id)
        if(res.status===200){
            setEducations((cur)=>{
                const newEducations=[...cur]
                newEducations.filter(v=>v.id!==id)
                return newEducations
            })
        }else{
            console.error(res.message)
        }
        setShow(false)   
    }
    
    return(
        <>
            <Card.Body>
                <Row className="align-items-center">
                    <Col>
                        <span>{education.school}</span>
                        <br/>
                        <span className="text-muted">{education.major} ({education.position})</span>
                    </Col>
                    {isEditable && (
                        <Col>
                        <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            className="mr-3">편집</Button>
                            <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setShow(true)}
                            className="mr-3">삭제</Button>
                        </Col>
                    )
                    } 
                </Row>
            </Card.Body>

            <Modal show={show} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>삭제 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>setShow(false)}>
                    취소
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    삭제
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EducationCard