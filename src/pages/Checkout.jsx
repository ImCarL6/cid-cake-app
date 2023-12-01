import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Cookies from "js-cookie";
import Helmet from "../components/Helmet/Helmet";
import axios from "axios";
import { setUser } from "../store/user/userSlice";
import { Link } from "react-router-dom";

import AddressManager from "./Addresses";

import "../styles/checkout.css";

const Checkout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = "Grátis";

  const totalAmount = cartTotalAmount;

  const obj = { checkout: true };

  const userUsername = Cookies.get("userLogin");
  const userToken = Cookies.get("userAuth");

  useEffect(() => {
    const checkAuthentication = async () => {
      if (userUsername && userToken) {
        try {
          const response = await axios.post(
            "https://z0vlzp3ki1.execute-api.sa-east-1.amazonaws.com/dev/verify",
            {
              username: userUsername,
              token: userToken,
            }
          );

          if (response.status === 200) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("User verification failed: log again", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [userUsername, userToken]);

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            {isAuthenticated === true ? (
              <Col lg="8" md="6">
                <AddressManager checkout={obj.checkout} />
              </Col>
            ) : (
              <Col lg="8" md="6">
                <div className="checkout__bill text-center">
                  <p className="mb-4">
                    Por favor, entre na sua conta ou registre-se para continuar.
                  </p>
                  <div className="d-flex justify-content-center gap-5 mt-3">
                    <Button color="success">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="ml-4" color="success">
                      <Link to="/register">Registrar</Link>
                    </Button>
                  </div>
                </div>
              </Col>
            )}

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

export default Checkout;
