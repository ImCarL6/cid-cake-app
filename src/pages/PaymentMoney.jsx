import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/checkout.css";

const PaymentMoney = () => {
  const [moneyChange, setMoneyChange] = useState("");
  const [shouldMoneyChange, setShouldMoneyChange] = useState("");

  const paymentInfo = [];
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const totalAmount = cartTotalAmount;
  const shippingCost = "Grátis";

  const location = useLocation();
  const shippingInfo = location.state && location.state.shippingInfo;

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const userPaymentInfo = {
      type: 'money',
      moneyChange: shouldMoneyChange === "sim" ? moneyChange : null,
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
                    value={shouldMoneyChange}
                    onChange={(e) => setShouldMoneyChange(e.target.value)}
                  >
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>

                {shouldMoneyChange === "sim" && (
                  <div className="form__group">
                    <input
                      type="number"
                      placeholder="Troco para:"
                      required
                      onChange={(e) => setMoneyChange(e.target.value)}
                    />
                  </div>
                )}

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

export default PaymentMoney;