import { Card, Button, Row, Col, Modal } from "react-bootstrap"
import { useState, useEffect } from "react"
import * as Api from "../../api"

const EducationCard=({ education, setEducations, setIsEditing, isEditable, page, setPage, setAllPage })=>{
    
    const [ show, setShow ]=useState(false)
    
    const handleDelete = async () => {
        const { id, userId } = education
        await Api.delete('educations',id)
        
        const res=await Api.get('educationlist', `${userId}?page=${page}&perPage=3`)
        const { totalPage, educations }=res.data
        if(page>totalPage){
            setPage(page-1)
        }
        setAllPage(totalPage)
        setEducations(educations)

        setShow(false)   
    }
    
    useEffect(() => {
        return () => setShow(false);
      }, []);

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