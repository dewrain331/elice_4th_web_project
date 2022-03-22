import { useState } from "react"
import { Button, Form, Col, Row } from "react-bootstrap"
import * as Api from "../../api"
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { pageState, awardsState, PER_PAGE } from './AwardAtom'

const AwardEditForm = ({ currentAward, setIsEditing }) => {
    // RecoilStates
    const page = useRecoilValue(pageState)
    const setAwards = useSetRecoilState(awardsState)

    // 편집 버튼을 누른 항목의 수상내용을 담을 title 변수 선언.
    const [award, setAward] = useState(currentAward.award)
    // 편집 버튼을 누른 항목의 상세내용을 담을 description 변수 선언.
    const [description, setDescription] = useState(currentAward.description)

    const handleSubmit = async (evt) => {
        // Form의 기본 기능 막기.
        evt.preventDefault()
        evt.stopPropagation()

        const userId = currentAward.user_id

        // put 요청.
        try { await Api.post(`award/${currentAward.id}`, {
            changeAward: award,
            changeDescription: description,
        })
        } catch (err) {
            console.error(err)
        } 

        // put 요청값과 함께 각각의 Award들의 모임인 Awards를 다시 렌더링
        try {
            const res = await Api.get("awardlist", `${userId}?page=${page}&perPage=${PER_PAGE}`)
            setAwards(res.data.awards)
            // 편집 상태 종료.
            setIsEditing(false)
        } catch (err) {
            console.error(err)
        }
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
                            onClick={() => setIsEditing(false)}
                        >취소</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    )
}

export default AwardEditForm