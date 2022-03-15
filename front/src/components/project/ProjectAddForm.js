import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

// 기간 선택을 위한 react-datepicker 라이브러리 및 css import
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
    // useState로 title 상태를 생성함.
    const [title, setTitle] = useState("");
    // useState로 description 상태를 생성함.
    const [description, setDescription] = useState("");
    // useState로 from_date, to_date 상태를 생성함.
    // 초기값을 현재 날짜로 설정
    const today = new Date();
    // const date = `${today.getFullYear()}${today.getMonth()}/${today.getDate()}`
    const [from_date, setFrom_date] = useState(today);
    const [to_date, setTo_date] = useState(today);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // portfolioOwnerId를 user_id 변수에 할당함.
        const user_id = portfolioOwnerId;

        // "project/create" 엔드포인트로 post요청함.
        await Api.post("project/create", {
            user_id: portfolioOwnerId,
            title,
            description,
            from_date: convertDate(from_date),
            to_date: convertDate(to_date)
        });

        // "projectlist/유저id" 엔드포인트로 get요청함.
        const res = await Api.get("projectlist", user_id);
        // projects를 response의 data로 세팅함.
        setProjects(res.data);
        // project를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
        setIsAdding(false);
    };

    // post 형식에 맞게 날짜를 변환함
    const convertDate = (date) => {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const selectedDate = year + '-' + month + '-' + day
        console.log(convertDate)
        return selectedDate;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
                <Form.Control
                    type="text"
                    placeholder="프로젝트 제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="상세내역"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group as={Row} className="mt-3">
                <Col class="col-3">
                    <DatePicker selected={from_date} onChange={(date) => setFrom_date(date)} />
                </Col>
                <Col class="col-3">
                    <DatePicker selected={to_date} onChange={(date) => setTo_date(date)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
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
    );
}

export default ProjectAddForm;
