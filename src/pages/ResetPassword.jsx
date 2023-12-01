import React, { useRef, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";

import "../styles/home.css";

const ResetPassword = () => {
  const resetEmailRef = useRef();

  const [resetPasswordStatus, setResetPasswordStatus] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    

    try {
      const response = await axios.post(
        "https://z0vlzp3ki1.execute-api.sa-east-1.amazonaws.com/dev/token",
        {
          username: resetEmailRef.current.value,
        }
      );

      if (response.status === 200) {
        setResetPasswordStatus("success");
      }
    } catch (error) {
      setResetPasswordStatus("error");
    }
  };

  return (
    <Helmet title="Restaurar a Senha">
      <CommonSection title="Resetar a Senha" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              {resetPasswordStatus === "success" ? (
                <div className="confirmation__message">
                  <p>Email enviado! cheque a sua caixa de spam!.</p>
                </div>
              ) : resetPasswordStatus === "error" ? (
                <div className="confirmation__message error">
                  <p>Email inválido.</p>
                </div>
              ) : (
                <form className="form mb-5" onSubmit={submitHandler}>
                  <div className="form__group">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      ref={resetEmailRef}
                    />
                  </div>
                  <button type="submit" className="addTOCart__btn">
                    Enviar
                  </button>
                </form>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ResetPassword;
