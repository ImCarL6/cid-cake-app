import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/res-logo.png";

import "../../styles/footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const navHome = () => {navigate('/home')}

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="4" sm="6">
            <div className=" footer__logo text-center">
              <img src={logo} alt="logo" onClick={navHome}/>
              <h5>Cid Cakes</h5>
              <p>
                Os seus sonhos mais doces se realizam aqui!
              </p>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title text-center">Horários</h5>
            <ListGroup className="deliver__time-list">
              <ListGroupItem className=" delivery__time-item border-0 ps-0 text-center">
                <span>Segunda - Sábado</span>
                <p>09:00 - 18:00</p>
              </ListGroupItem>

              <ListGroupItem className=" delivery__time-item border-0 ps-0 text-center">
                <span>Domingo</span>
                <p>10:00 - 17:00</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title text-center">Contato</h5>
            <ListGroup className="deliver__time-list text-center">
              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <p>Localização: Caraguatatuba, Centro, São Paulo</p>
              </ListGroupItem>
              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <span>Telefone: 12997799432</span>
              </ListGroupItem>

              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <span>Email: CidCake@gmail.com</span>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title text-center">Se inscreva</h5>
            <p className="text-center">Ofertas e Descontos!</p>
            <div className="newsletter text-center">
              <input type="email" placeholder="Insira o seu email" className="text-center" />
              <span>
                <i className="ri-send-plane-line"></i>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
