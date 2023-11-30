import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";

import categoryImg01 from "../../../assets/images/category-01.png";
import categoryImg02 from "../../../assets/images/category-02.png";
import categoryImg03 from "../../../assets/images/category-03.png";
import categoryImg04 from "../../../assets/images/category-04.png";
import categoryImg05 from "../../../assets/images/category-05.png";
import categoryImg06 from "../../../assets/images/category-06.png";
import categoryImg07 from "../../../assets/images/category-07.png";
import categoryImg08 from "../../../assets/images/category-08.png";
import pix from "../../../assets/images/pix.png"
import money from "../../../assets/images/money.png"
import card from "../../../assets/images/credit-card.png"

import "../../../styles/category.css";

const categoryDataHome = [
  {
    display: "Cupcakes",
    imgUrl: categoryImg01,
  },
  {
    display: "Bolos",
    imgUrl: categoryImg02,
  },
  {
    display: "Cafés",
    imgUrl: categoryImg03,
  },
  {
    display: "Tortas",
    imgUrl: categoryImg04,
  },
];

const categoryDataOrder = [
  {
    display: "Confirmar recebimento",
    imgUrl: categoryImg08,
  },
  {
    display: "Ligar",
    imgUrl: categoryImg05,
  },
  {
    display: "Mudar pedido",
    imgUrl: categoryImg06,
  },
  {
    display: "Cancelar",
    imgUrl: categoryImg07,
  },
];

const categoryDataPayment = [
  {
    display: "Pix",
    imgUrl: pix,
  },
  {
    display: "Cartão",
    imgUrl: card,
  },
  {
    display: "Dinheiro",
    imgUrl: money,
  }
];

const Category = (type) => {
  let arr;
  if (type.icon === "home") arr = categoryDataHome;
  else if (type.icon === "payment") arr = categoryDataPayment
  else arr = categoryDataOrder;

  const navigate = useNavigate();

  const handleButtonClick = (display) => {
    if (display === "Confirmar recebimento") {
      navigate("/confirm");
    } else if (display === "Cancelar") {
      navigate("/cancel");
    } else if (display === "Pix") {
      navigate("/payment/pix", { state: { shippingInfo: type.shippingInfo } });
    }
    else if (display === "Cartão") {
      navigate("/payment/card", { state: { shippingInfo: type.shippingInfo } });
    }
    else if (display === "Dinheiro") {
      navigate("/payment/money", { state: { shippingInfo: type.shippingInfo } });
    }
  };

  return (
    <Container>
      <Row>
        {arr.map((item, index) => (
          <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={index}>
            <div
              className="category__item d-flex align-items-center gap-3"
              onClick={() => handleButtonClick(item.display)}
            >
              <div className="category__img">
                <img src={item.imgUrl} alt="category__item" />
              </div>
              <h6>{item.display}</h6>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Category;
