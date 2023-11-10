import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button, FormGroup, Label, Input } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/checkout.css";

const Review = () => {
  const orderInfo = []
  const navigate = useNavigate();

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const totalAmount = cartTotalAmount;
  const shippingCost = 'Grátis';

  const location = useLocation();
  const initialShippingInfo = location.state && location.state.shippingInfo;
  const initialPaymentInfo = location.state && location.state.paymentInfo;

  const [showProceedButton, setShowProceedButton] = useState(true);

  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  const [shippingInfo, setShippingInfo] = useState(initialShippingInfo);
  const [paymentInfo, setPaymentInfo] = useState(initialPaymentInfo);

  const handleEditShipping = () => {
    setIsEditingShipping(true);
  };

  const handleEditPayment = () => {
    setIsEditingPayment(true);
  };

  const handleSaveShipping = () => {
    setIsEditingShipping(false);
  };

  const handleSavePayment = () => {
    setIsEditingPayment(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    orderInfo.push(shippingInfo);
    orderInfo.push(paymentInfo);

    navigate("/order", { state: { orderInfo } });

  };

  return (
    <Helmet title="Revisar">
      <CommonSection title="Revisar" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6" className="review__section">
              <h6 className="mb-4">Endereço de Entrega</h6>
              {isEditingShipping ? (
                <EditShippingForm
                  shippingInfo={shippingInfo}
                  setShippingInfo={setShippingInfo}
                  onSave={() => { handleSaveShipping(); setShowProceedButton(true); }}
                />
              ) : (
                <ShippingInfoView shippingInfo={shippingInfo} />
              )}
              {!isEditingShipping && (
                <Button onClick={handleEditShipping} color="primary" className="addTOCart__btn">
                  Editar Endereço
                </Button>
              )}

              <h6 className="mt-4">Informações de Pagamento</h6>
              {isEditingPayment ? (
                <EditPaymentForm
                  paymentInfo={paymentInfo}
                  setPaymentInfo={setPaymentInfo}
                  onSave={() => { handleSavePayment(); setShowProceedButton(true); }}
                />
              ) : (
                <PaymentInfoView paymentInfo={paymentInfo} />
              )}
              {!isEditingPayment && (
                <Button onClick={handleEditPayment} color="primary" className="addTOCart__btn">
                  Editar Pagamento
                </Button>
              )}

              {!isEditingShipping && !isEditingPayment && showProceedButton && (
                <div className="d-flex mt-5">
                  <Button onClick={submitHandler} style={{ backgroundColor: '#F875AA', color: 'black' }}>
                    Finalizar Pedido
                  </Button>
                </div>
              )}
            </Col>

            <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal: <span>R$ {cartTotalAmount}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Entrega: <span>R$ {shippingCost}</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>R${totalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const ShippingInfoView = ({ shippingInfo }) => (
  <>
    <p><strong>Nome:</strong> {shippingInfo[0].name}</p>
    <p><strong>Telefone:</strong> {shippingInfo[0].phone}</p>
    <p><strong>Rua:</strong> {shippingInfo[0].street}</p>
    <p><strong>Numero:</strong> {shippingInfo[0].streetNumber}</p>
    <p><strong>Cidade:</strong> {shippingInfo[0].city}</p>
    <p><strong>CEP:</strong> {shippingInfo[0].postalCode}</p>
  </>
);

const PaymentInfoView = ({ paymentInfo }) => (
  <>
    <p><strong>Número do Cartão:</strong> {paymentInfo[0].creditCard}</p>
    <p><strong>Validade:</strong> {paymentInfo[0].expirationDate}</p>
    <p><strong>CVV:</strong> {paymentInfo[0].cvv}</p>
    <p><strong>CPF:</strong> {paymentInfo[0].cpf}</p>
    <p><strong>Nome Completo:</strong> {paymentInfo[0].name}</p>
    <p><strong>Endereço de Cobrança:</strong> {paymentInfo[0].address}</p>
  </>
);

const EditShippingForm = ({ shippingInfo, setShippingInfo, onSave }) => {
  const [editedShippingInfo, setEditedShippingInfo] = useState({ ...shippingInfo[0] });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div>
      <FormGroup>
        <Label for="name">Nome:</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={editedShippingInfo.name}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Telefone:</Label>
        <Input
          type="number"
          name="phone"
          id="phone"
          value={editedShippingInfo.phone}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="street">Rua:</Label>
        <Input
          type="text"
          name="street"
          id="street"
          value={editedShippingInfo.street}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="streetNumber">Número:</Label>
        <Input
          type="text"
          name="streetNumber"
          id="streetNumber"
          value={editedShippingInfo.streetNumber}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="city">Cidade:</Label>
        <Input
          type="text"
          name="city"
          id="city"
          value={editedShippingInfo.city}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="postalCode">CEP:</Label>
        <Input
          type="number"
          name="postalCode"
          id="postalCode"
          value={editedShippingInfo.postalCode}
          onChange={handleChange}
        />
      </FormGroup>

      <Button onClick={() => { setShippingInfo([editedShippingInfo]); onSave(); }} color="success">
        Salvar
      </Button>
    </div>
  );
};

const EditPaymentForm = ({ paymentInfo, setPaymentInfo, onSave }) => {
  const [editedPaymentInfo, setEditedPaymentInfo] = useState({ ...paymentInfo[0] });

  const formatExpirationDate = (input) => {
    const numericValue = input.replace(/\D/g, "");

    if (numericValue.length <= 2) {
      setEditedPaymentInfo((prevInfo) => ({
        ...prevInfo,
        expirationDate: numericValue,
      }));
    } else {
      const formattedDate =
        numericValue.slice(0, 2) + " / " + numericValue.slice(2, 4);
      setEditedPaymentInfo((prevInfo) => ({
        ...prevInfo,
        expirationDate: formattedDate,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "expirationDate") {
      formatExpirationDate(value);
    } else {
      setEditedPaymentInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }


  };

  return (
    <div>
      <FormGroup>
        <Label for="creditCard">Número do Cartão:</Label>
        <Input
          type="text"
          name="creditCard"
          id="creditCard"
          value={editedPaymentInfo.creditCard}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="expirationDate">Validade:</Label>
        <Input
          type="text"
          name="expirationDate"
          id="expirationDate"
          value={editedPaymentInfo.expirationDate}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="cvv">CVV:</Label>
        <Input
          type="number"
          name="cvv"
          id="cvv"
          value={editedPaymentInfo.cvv}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="cpf">CPF:</Label>
        <Input
          type="text"
          name="cpf"
          id="cpf"
          value={editedPaymentInfo.cpf}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="name">Nome Completo:</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={editedPaymentInfo.name}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="address">Endereço de Cobrança:</Label>
        <Input
          type="text"
          name="address"
          id="address"
          value={editedPaymentInfo.address}
          onChange={handleChange}
        />
      </FormGroup>

      <Button onClick={() => { setPaymentInfo([editedPaymentInfo]); onSave(); }} color="success">
        Salvar
      </Button>
    </div>
  );
};

export default Review;