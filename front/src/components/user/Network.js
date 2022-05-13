import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Container,
	Row,
	InputGroup,
	Dropdown,
	DropdownButton,
	Button,
	FormControl,
} from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

function Network() {
	const navigate = useNavigate();
	const userState = useContext(UserStateContext);
	// useState 훅을 통해 users 상태를 생성함.
	const [users, setUsers] = useState([]);
	const [mode, setMode] = useState("Email");
	const [searchUser, setSearchUser] = useState("");

	const getUserPage = async () => {
		if (mode === "Email") {
			try {
				const res = await Api.get(`userlist?email=${searchUser}`);
				console.log(res);
				setUsers(res.data);
			} catch (err) {
				console.error(err);
				alert("오류가 발생했습니다.");
			}
		} else if (mode === "Nickname") {
			try {
				const res = await Api.get(`userlist?name=${searchUser}`);
				setUsers(res.data);
			} catch (err) {
				console.error(err);
				alert("오류가 발생했습니다.");
			}
		}
	};

	useEffect(() => {
		// 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
		if (!userState.user) {
			navigate("/login");
			return;
		}
		// "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
		Api.get("userlist").then((res) => {
			setUsers(res.data);
			console.log(res.data.map((v) => v.image));
		});
	}, [userState, navigate]);

	return (
		<Container fluid>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<InputGroup
					className="mb-5"
					style={{ backgroundColor: "white", width: "50%" }}
				>
					<DropdownButton
						variant="outline-secondary"
						title={mode}
						style={{ backgroundColor: "white" }}
					>
						<Dropdown.Item onClick={() => setMode("Email")}>
							Email
						</Dropdown.Item>
						<Dropdown.Item onClick={() => setMode("Nickname")}>
							Nickname
						</Dropdown.Item>
					</DropdownButton>
					<FormControl
						placeholder={`${mode}를 입력하여 유저를 검색할 수 있습니다.`}
						value={searchUser}
						onChange={(evt) => {
							setSearchUser(evt.target.value);
						}}
					/>
					<Button type="button" onClick={getUserPage}>
						Button
					</Button>
				</InputGroup>
			</div>
			<Row xs="auto" className="jusify-content-center">
				{users.map((user) => (
					<UserCard
						key={user.id}
						user={user}
						isNetwork
						isDisabled={true}
					/>
				))}
			</Row>
		</Container>
	);
}

export default Network;
