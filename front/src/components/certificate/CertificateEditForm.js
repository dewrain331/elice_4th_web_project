import { useState } from "react"
import { Button, Form, Col, Row } from "react-bootstrap"
import * as Api from "../../api"
import DatePicker from 'react-datepicker'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { pageState, certsState, PER_PAGE } from './CertAtom'

const CertificateEditForm = ({ currentCertificate, setIsEditing }) => {
    // RecoilStates
    const page = useRecoilValue(pageState)
    const setCertificates = useSetRecoilState(certsState)

    // 편집 버튼을 누른 항목의 자격증 제목을 담을 title 변수 선언.
    const [title, setTitle] = useState(currentCertificate.title)
    // 편집 버튼을 누른 항목의 상세내용을 담을 description 변수 선언.
    const [description, setDescription] = useState(currentCertificate.description)
    // 편집 버튼을 누른 항목의 취득일자를 담을 date 변수 선언.
    const [date, setDate] = useState(new Date(currentCertificate.date))

    const handleSubmit = async (evt) => {
        // Form의 기본 기능 막기.
        evt.preventDefault()
        evt.stopPropagation()

        const userId = currentCertificate.user_id

        // put 요청.
        try {
            await Api.post(`certificate/${currentCertificate.id}`, {
                title,
                description,
                date: date.toJSON()
            })
        } catch (err) {
            console.error(err)
        }

        // put 요청값과 함께 각각의 Certificate들의 모임인 Certificates를 다시 렌더링
        try {
            const res = await Api.get("certificatelist", `${userId}?page=${page}&perPage=${PER_PAGE}`)
            setCertificates(res.data.certificates)
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
                        placeholder="자격증 제목"
                        value={title}
                        onChange={evt => setTitle(evt.target.value)}
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

                <Form.Group controlId="formBasicDate" className="mt-3">
                    <DatePicker dateFormat="yyyy-MM-dd" selected={new Date(date)} onChange={v => setDate(v)} />
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

export default CertificateEditForm