import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";

function Projects({ portfolioOwnerId, isEditable }) {
    //useState로 projects 상태를 생성함.
    const [projects, setProjects] = useState([]);
    //useState로 isAdding 상태를 생성함.
    const [isAdding, setIsAdding] = useState(false);
    //useState로 totalPage, page 상태를 생성함.
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);


    useEffect(() => {
        // "projectlist/유저id?page={현재 페이지}&?perPage={한 페이지에 담길 데이터 수}"로 GET 요청하고, response의 data로 projects를 세팅함.
        Api.get("projectlist", `${portfolioOwnerId}?page=${page}&perPage=3`)
            .then((res) => {
                const { totalPage, projects } = res.data;
                setTotalPage(totalPage);
                setProjects(projects);
            });
    }, [portfolioOwnerId, page]);

    return (
        <Card>
            <Card.Body>
                <Card.Title>프로젝트</Card.Title>
                {projects.map((project) => (
                    <Project
                        key={project.id}
                        project={project}
                        setProjects={setProjects}
                        isEditable={isEditable}
                        page={page}
                    />
                ))}
                <Col className="text-center">
                    <Button variant="secondary"
                        type="submit"
                        className="me-3"
                        onClick={() => setPage((prev) => (prev - 1))}
                        disabled={page === 1}
                    >
                        {"<"}
                    </Button>
                    <Button variant="outline-secondary" size="sm" disabled>
                        {page}/{totalPage}
                    </Button>
                    <Button variant="secondary"
                        onClick={() => setPage((prev) => (prev + 1))}
                        disabled={page === totalPage}
                    >
                        {">"}
                    </Button>
                </Col>
                {isEditable && (
                    <Row className="mt-3 text-center mb-4">
                        <Col sm={{ span: 20 }}>
                            <Button onClick={() => setIsAdding(true)}>+</Button>
                        </Col>
                    </Row>
                )}
                {isAdding && (
                    <ProjectAddForm
                        portfolioOwnerId={portfolioOwnerId}
                        setProjects={setProjects}
                        setIsAdding={setIsAdding}
                        page={page}
                    />
                )}
            </Card.Body>
        </Card >
    );
}

export default Projects;
