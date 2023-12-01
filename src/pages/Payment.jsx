import React from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import Category from "../components/UI/category/Category";
import { useLocation } from "react-router-dom";

import "../styles/checkout.css";

const Payment = () => {
  const location = useLocation();
  const shippingInfo = location.state && location.state.shippingInfo;

  let typeObj = { icon: "payment", shippingInfo };

  return (
    <Helmet title="Pagamento">
      <CommonSection title="Pagamento" />
      <section>
        <Container>
          <Row className="justify-content-md-center mb-5" >
            <Col lg="8" md="6">
              <h3>Escolha a opção de pagamento desejada!</h3>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col lg="8" md="6">
              <Category {...typeObj} />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Payment;
