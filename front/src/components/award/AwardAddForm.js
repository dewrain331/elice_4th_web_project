import { useState } from "react"
import { Button, Form, Col, Row } from "react-bootstrap"
import * as Api from "../../api"
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isAddingState, pageState, allPageState, awardsState, PER_PAGE } from './AwardAtom'

const AwardAddForm = ({ portfolioOwnerId }) => {
    // RecoilStates
    const setIsAdding = useSetRecoilState(isAddingState)
    const [page, setPage] = useRecoilState(pageState)
    const setAllPage = useSetRecoilState(allPageState)
    const setAwards = useSetRecoilState(awardsState)

    // useState로 수상내역의 내용을 담을 title 변수 선언.
    const [award, setAward] = useState("")
    // useState로 상세내용을 담을 description 변수 선언.
    const [description, setDescription] = useState("")

    const handleSubmit = async (evt) => {
        // Form의 기본기능을 막기 위한 코드 선언.
        evt.preventDefault()
        evt.stopPropagation()

        const userId = portfolioOwnerId

        // post 요청
        try { 
            await Api.post("award/create", {
            user_id : userId,
            award,
            description,
        })
        } catch (err) {
            console.error(err)
        }

        // post 요청값과 함께 각각의 Award들의 모임인 Awards를 다시 렌더링
        try {
            const res = await Api.get("awardlist", `${userId}?page=${page}&perPage=${PER_PAGE}`)
            const {total, awards} = res.data
            setPage(Math.ceil(total / PER_PAGE))
            setAllPage(Math.ceil(total / PER_PAGE))
            setAwards(awards)
            // 생성 상태 종료.
            setIsAdding(false)
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
                            onClick={() => setIsAdding(false)}
                        >취소</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    )
}

export default AwardAddForm