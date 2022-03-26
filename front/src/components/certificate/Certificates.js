import { useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";
import { useRecoilState } from "recoil";
import {
  isAddingState,
  pageState,
  allPageState,
  certsState,
  PER_PAGE,
} from "./CertAtom";
import "../Components.css";

const Certificates = ({ portfolioOwnerId, isEditable }) => {
  // RecoilStates
  const [isAdding, setIsAdding] = useRecoilState(isAddingState);
  const [page, setPage] = useRecoilState(pageState);
  const [allPage, setAllPage] = useRecoilState(allPageState);
  const [certificates, setCertificates] = useRecoilState(certsState);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (page === 0) {
          setPage(1);
        }
        const res = await Api.get(
          "certificatelist",
          `${portfolioOwnerId}?page=${page}&perPage=${PER_PAGE}`
        );
        const { total, certificates } = res.data;
        setAllPage(total);
        setCertificates(certificates);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [portfolioOwnerId, page, allPage, setPage, setAllPage, setCertificates]);

  return (
    <Card.Body className="portfolioBG" style={{ borderRadius: "10px" }}>
      <Card.Title className="portfolioBG">자격증</Card.Title>
      {certificates.map((v) => (
        <Certificate key={v.id} certificate={v} isEditable={isEditable} />
      ))}
      {isEditable && (
        <Row className="mt-3 text-center mb-4">
          <Col sm={{ span: 20 }} className="portfolioBG">
            <Button onClick={() => setIsAdding(true)}>+</Button>
          </Col>
        </Row>
      )}
      {isAdding && <CertificateAddForm portfolioOwnerId={portfolioOwnerId} />}
      <Row className="mt-3 text-center mb-4">
        <Col className="portfolioBG">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="me-3"
          >
            {"<"}
          </Button>
          <Button variant="outline-secondary" size="sm" disabled={true}>
            {Math.ceil(allPage / PER_PAGE) === 0 ? 0 : page} /{" "}
            {Math.ceil(allPage / PER_PAGE)}
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= Math.ceil(allPage / PER_PAGE)}
            className="ms-3"
          >
            {">"}
          </Button>
        </Col>
      </Row>
    </Card.Body>
  );
};

export default Certificates;
