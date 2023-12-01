import React from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

const Confirm = () => {
  return (
    <Helmet title="Confirmado">
      <CommonSection title="Confirmado" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <div className="Confirmado">
                <h6>Recebimento confirmado! Bom apetite! </h6>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Confirm;
