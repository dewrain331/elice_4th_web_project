import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
// recoil 사용
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  gallerysState,
  isAddingState,
  pageState,
  totalPageState,
} from "./GalleryAtom";
// 기간 선택을 위한 react-datepicker 라이브러리 및 css import
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PER_PAGE = 3;

function GalleryAddForm({ portfolioOwnerId }) {
  // useState로 title 상태를 생성함.
  const [title, setTitle] = useState("");
  // useState로 description 상태를 생성함.
  const [description, setDescription] = useState("");
  // useState로 from_date, to_date 상태를 생성함.
  // 초기값을 현재 날짜로 설정
  const today = new Date();
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  // recoil 적용
  const setGallerys = useSetRecoilState(gallerysState);
  const setIsAdding = useSetRecoilState(isAddingState);
  const [page, setPage] = useRecoilState(pageState);
  const setTotalPage = useSetRecoilState(totalPageState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const userId = portfolioOwnerId;

    // "gallery/create" 엔드포인트로 post요청함.
    // date의 타입을 object에서 string으로 변환하여 전달
    try {
      await Api.post("gallery/create", {
        userId,
        title,
        description,
        fromDate: fromDate.toJSON(),
        toDate: toDate.toJSON(),
      });
    } catch (error) {
      console.error(error);
    }

    // "gallerylist/유저id?page={현재 페이지}&?perPage={데이터 수}"로 GET 요청하고,
    // response의 data로 totalPage와 gallerys를 세팅함.
    try {
      const res = await Api.get(
        "gallerylist",
        `${userId}?page=${page}&perPage=${PER_PAGE}`
      );
      const { totalPage, gallerys } = res.data;
      setPage(totalPage);
      setTotalPage(totalPage);
      setGallerys(gallerys);
    } catch (error) {
      console.error(error);
    }

    // gallery를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

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
        <Col className="col-3">
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
          />
        </Col>
        <Col className="col-3">
          <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
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

export default GalleryAddForm;
