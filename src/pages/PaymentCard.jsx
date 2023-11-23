import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/checkout.css";

const PaymentCard = () => {
  const [selectedPaymentType, setSelectedPaymentType] = useState("credito"); // Default to "credito"
  const [enterCreditCard, setEnterCreditCard] = useState("");
  const [enterExpirationDate, setEnterExpirationDate] = useState("");
  const [enterCVV, setEnterCVV] = useState("");
  const [enterCPF, setEnterCPF] = useState("");
  const [enterFullName, setEnterFullName] = useState("");
  const [enterBillingAddress, setEnterBillingAddress] = useState("");

  const paymentInfo = [];
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const totalAmount = cartTotalAmount;
  const shippingCost = "Grátis";

  const location = useLocation();
  const shippingInfo = location.state && location.state.shippingInfo;

  const navigate = useNavigate();

  const formatExpirationDate = (input) => {
    const numericValue = input.replace(/\D/g, "");

    if (numericValue.length <= 2) {
      setEnterExpirationDate(numericValue);
    } else {
      const formattedDate =
        numericValue.slice(0, 2) + " / " + numericValue.slice(2, 4);
      setEnterExpirationDate(formattedDate);
    }
  };

  const handleExpirationDateChange = (e) => {
    formatExpirationDate(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userPaymentInfo = {
      type: 'card',
      paymentType: selectedPaymentType,
      creditCard: enterCreditCard,
      expirationDate: enterExpirationDate,
      cvv: enterCVV,
      cpf: enterCPF,
      name: enterFullName,
      address: enterBillingAddress,
    };

    paymentInfo.push(userPaymentInfo);

    navigate("/review", { state: { paymentInfo, shippingInfo } });
  };

  return (
    <Helmet title="Pagamento">
      <CommonSection title="Pagamento" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Informações do Pagamento</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <select
                    value={selectedPaymentType}
                    onChange={(e) => setSelectedPaymentType(e.target.value)}
                  >
                    <option value="credito">Crédito</option>
                    <option value="debito">Débito</option>
                  </select>
                </div>

                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Número do cartão"
                    required
                    onChange={(e) => setEnterCreditCard(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Validade"
                    required
                    value={enterExpirationDate}
                    onChange={handleExpirationDateChange}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="CVV"
                    required
                    onChange={(e) => setEnterCVV(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="CPF"
                    required
                    onChange={(e) => setEnterCPF(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Nome Completo"
                    required
                    onChange={(e) => setEnterFullName(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Endereço de Cobrança"
                    required
                    onChange={(e) => setEnterBillingAddress(e.target.value)}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  <span onClick={submitHandler}>Prosseguir</span>
                </button>
              </form>
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

export default PaymentCard;
