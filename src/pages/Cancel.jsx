import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

import '../styles/cancel.css'

const Cancel = () => {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const reasons = ["Item fora de estoque", "Mudei de ideia", "Preço muito alto"];

  const handleRadioChange = (reason) => {
    setSelectedReason(reason);
  };

  const handleOtherReasonChange = (event) => {
    setOtherReason(event.target.value);
  };

  const handleSubmit = () => {
  };

  return (
    <Helmet title="Cancelado">
      <CommonSection title="Cancelado" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <div className="Cancelado">
                <h6>Pedido cancelado! Se possível, conte-nos o que houve.</h6>
              </div>
              <Form className="mt-4" onSubmit={handleSubmit}>
                <FormGroup tag="fieldset">
                  {reasons.map((reason) => (
                    <FormGroup check key={reason}>
                      <Label check>
                        <Input
                          type="radio"
                          name="cancelReason"
                          checked={selectedReason === reason}
                          onChange={() => handleRadioChange(reason)}
                        />
                        {reason}
                      </Label>
                    </FormGroup>
                  ))}
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="cancelReason"
                        checked={selectedReason === "Outro motivo"}
                        onChange={() => handleRadioChange("Outro motivo")}
                      />
                      Outro motivo
                    </Label>
                  </FormGroup>
                  {selectedReason === "Outro motivo" && (
                    <FormGroup>
                      <Label for="otherReason">Especifique o motivo:</Label>
                      <Input
                        type="text"
                        id="otherReason"
                        value={otherReason}
                        onChange={handleOtherReasonChange}
                      />
                    </FormGroup>
                  )}
                </FormGroup>
                <Button color="primary" type="submit">
                  Enviar
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Cancel;