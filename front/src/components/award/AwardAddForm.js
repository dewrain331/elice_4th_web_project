import { useState } from "react"
import { Button, Form, Col, Row } from "react-bootstrap"
import * as Api from "../../api"

const AwardAddForm = ({ portfolioOwnerId, setAwards, setIsAdding, page, setAllPage, setPage }) => {
    // useState로 수상내역의 내용을 담을 title 변수 선언.
    const [award, setAward] = useState("")
    // useState로 상세내용을 담을 description 변수 선언.
    const [description, setDescription] = useState("")

    const handleSubmit = async (evt) => {
        // Form의 기본기능을 막기 위한 코드 선언.
        evt.preventDefault()
        evt.stopPropagation()

        const user_id = portfolioOwnerId

        // post 요청
        await Api.post("award/create", {
            user_id,
            award,
            description,
        })

        // post 요청값과 함께 각각의 Award들의 모임인 Awards를 다시 렌더링
        const res = await Api.get("awardlist", `${user_id}?page=${page}&perPage=3`)
        const {total, awards} = res.data
        setPage(total / 3)
        setAllPage(total / 3)
        setAwards(awards)
        // 생성 상태 종료.
        setIsAdding(false)
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

                <Form.Group controlId="formBasicDescription" className="mt-3">
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
                            onClick={() => setIsAdding(false)}
                        >취소</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    )
}

export default AwardAddForm