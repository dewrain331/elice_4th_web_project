import { useState } from "react"
import { Button, Form, Col, Row } from "react-bootstrap"
import * as Api from "api"

const AwardEditForm = ({ currentAward, setAwards, setIsEditing }) => {
    // 편집 버튼을 누른 항목의 수상내용을 담을 title 변수 선언.
    const [award, setAward] = useState(currentAward.award)
    // 편집 버튼을 누른 항목의 상세내용을 담을 description 변수 선언.
    const [description, setDescription] = useState(currentAward.description)

    const handleSubmit = async (evt) => {
        // Form의 기본 기능 막기.
        evt.preventDefault()
        evt.stopPropagation()

        // put 요청.
        await Api.put(`awards/${currentAward.id}`, {
            user_id: currentAward.user_id,
            award,
            description,
        })

        // put 요청값과 함께 각각의 Award들의 모임인 Awards를 다시 렌더링
        const res = await Api.get("awardlist", currentAward.user_id)
        setAwards(res.data)
        // 편집 상태 종료.
        setIsEditing(false)
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Control
                        type="text"
                        placeholder="수상내역"
                        value={award}
                        onChange={evt => setAward(evt.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicDescription">
                    <Form.Control
                        type="text"
                        placeholder="상세내역"
                        value={description}
                        onChange={evt => setDescription(evt.target.value)}
                    />
                </Form.Group>

                <Form.Group as={Row} className="mt-3 text-center">
                    <Col sm={{ span: 20 }}>
                        <Button
                            variant="primary"
                            type="submit"
                            className="me-3"
                        >확인</Button>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => setIsEditing(false)}
                        >취소</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    )
}

export default AwardEditForm