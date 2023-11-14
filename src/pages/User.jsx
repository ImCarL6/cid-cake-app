import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Col
} from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { selectUser } from "../store/user/userSlice";

import "../styles/user.css";

const User = () => {
  const user = useSelector(selectUser);

  return (
    <Helmet title="Usuário">
      <CommonSection title="Usuário" />
      <section>
        <Container>
          <Row>
            {user ? (
              <Col lg="8" md="6" className="user__section">
                <h4>Nome: {user?.name}</h4>
                <h4>Email: {user?.username}</h4>
              </Col>
            ) : (
              <Col lg="8" md="6" className="user__section">
                <h4>Usuário não encontrado!</h4>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default User;
