import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { useLocation } from "react-router-dom";

import mockgps from "../assets/images/mockgps.png";
import Category from "../components/UI/category/Category";

import "../styles/checkout.css";

const Order = () => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = cartTotalAmount;
  const shippingCost = "Grátis";

  const location = useLocation();
  const orderInfo = location.state && location.state.orderInfo;
  const [shippingInfo, paymentInfo] = orderInfo;

  if (!orderInfo) {
    return (
      <Helmet title="Pedido">
        <CommonSection title="Pedido" />
        <section>
          <Container>
            <Row>
              <Col>
                <h2 className="mb-4">Pedido ainda não realizado!</h2>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    );
  }

  return (
    <Helmet title="Pedido">
      <CommonSection title="Pedido" />
      <section>
        <Container>
          <Row>
            <Col>
              <h2 className="mb-4">Pedido Confirmado!</h2>
              <img
                src={mockgps}
                alt="Mock GPS"
                style={{ width: "100%", marginBottom: "60px" }}
              />
            </Col>
            <Row>
              <Col lg="12">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Imagem</th>
                      <th>Produto</th>
                      <th>Preço</th>
                      <th>Quantidade</th>
                      <th>Adicionais</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <Tr item={item} key={item.id} />
                    ))}
                  </tbody>
                </table>
                <div className="mt-4"></div>
              </Col>
            </Row>
            <Col lg="8" md="6" className="review__section">
              <h6 className="mb-4">Endereço de Entrega</h6>
              <ShippingInfoView shippingInfo={shippingInfo} />
              <h6 className="mt-4">Informações de Pagamento</h6>
              <PaymentInfoView paymentInfo={paymentInfo} />
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

            <Col lg="8" md="6" className="mt-5 pt-0">
              <Category />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const ShippingInfoView = ({ shippingInfo }) => (
  <>
    <p>
      <strong>Nome:</strong> {shippingInfo[0].name}
    </p>
    <p>
      <strong>Telefone:</strong> {shippingInfo[0].phone}
    </p>
    <p>
      <strong>Rua:</strong> {shippingInfo[0].street}
    </p>
    <p>
      <strong>Numero:</strong> {shippingInfo[0].streetNumber}
    </p>
    <p>
      <strong>Cidade:</strong> {shippingInfo[0].city}
    </p>
    <p>
      <strong>CEP:</strong> {shippingInfo[0].postalCode}
    </p>
  </>
);

const PaymentInfoView = ({ paymentInfo }) => {
  if (paymentInfo[0].type === "card") {
    return (
      <>
        <p>
          <strong>Número do Cartão:</strong> **** **** ****{" "}
          {paymentInfo[0].creditCard.slice(-4)}
        </p>
        <p>
          <strong>Validade:</strong> {paymentInfo[0].expirationDate}
        </p>
        <p>
          <strong>CVV:</strong>***
        </p>
        <p>
          <strong>CPF:</strong> {paymentInfo[0].cpf}
        </p>
        <p>
          <strong>Nome Completo:</strong> {paymentInfo[0].name}
        </p>
        <p>
          <strong>Endereço de Cobrança:</strong> {paymentInfo[0].address}
        </p>
      </>
    );
  } else if (paymentInfo[0].type === "pix") {
    return (
      <>
        <div className="mt-3">
          <h6>Pix</h6>
          <p>Pagamento em análise</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="mt-3">
          <h6>Dinheiro</h6>
          {paymentInfo[0]?.moneyChange === null ? (
            <p>Sem troco</p>
          ) : (
            <p>Troco para: {paymentInfo[0]?.moneyChange}</p>
          )}
        </div>
      </>
    );
  }
};

const Tr = (props) => {
  const { image01, title, price, quantity, selectedOptions } = props.item;

  return (
    <tr>
      <td className="text-center cart__img-box">
        <img src={image01} alt="" />
      </td>
      <td className="text-center">{title}</td>
      <td className="text-center">R${price}</td>
      <td className="text-center">{quantity}</td>
      <td className="text-center">
        <ul>
          {selectedOptions.map((option, index) => (
            <li key={index}>
              {option.name} (+R${option.price})
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

export default Order;
