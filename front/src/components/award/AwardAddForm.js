import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

// 기간 선택을 위한 react-datepicker 라이브러리 및 css import
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AwardAddForm = ({ portfolioOwnerId, setAwards, setIsAdding }) => {
    // useState로 title 상태를 생성함.
    const [title, setTitle] = useState("");
    // useState로 description 상태를 생성함.
    const [description, setDescription] = useState("");
    // useState로 Date 상태를 생성함.
    // 초기값을 현재 날짜로 설정
    const [date, setDate] = useState(new Date());

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // portfolioOwnerId를 user_id 변수에 할당함.
        const user_id = portfolioOwnerId;

        // "award/create" 엔드포인트로 post요청함.
        await Api.post("award/create", {
            user_id: portfolioOwnerId,
            title,
            description,
            date,
        });

        // "awardlist/유저id" 엔드포인트로 get요청함.
        const res = await Api.get("awardlist", user_id);
        // awards를 response의 data로 세팅함.
        setAwards(res.data);
        // award를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
        setIsAdding(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
                <Form.Control
                    type="text"
                    placeholder="수상내역"
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
                    <DatePicker selected={date} onChange={(date) => setDate(date)} />
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

export default AwardAddForm;
