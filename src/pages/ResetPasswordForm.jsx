import React, { useRef, useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";

import "../styles/home.css";

const ResetPasswordForm = () => {
  const resetEmailRef = useRef();
  const resetTokenRef = useRef();
  const resetPasswordRef = useRef();
  const resetConfirmPasswordRef = useRef();
  const location = useLocation();

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [resetPasswordStatus, setResetPasswordStatus] = useState(null);

  const handlePasswordChange = () => {
    const password = resetPasswordRef.current.value;
    const confirmPassword = resetConfirmPasswordRef.current.value;

    setPasswordsMatch(password === confirmPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      return;
    }

    try {
      const response = await axios.post(
        "https://z0vlzp3ki1.execute-api.sa-east-1.amazonaws.com/dev/reset",
        {
          username: resetEmailRef.current.value,
          password: resetPasswordRef.current.value,
          token: resetTokenRef.current.value,
        }
      );

      if (response.status === 200) {
        setResetPasswordStatus("success");
      }
    } catch (error) {
      setResetPasswordStatus("error");
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const email = queryParams.get("email");

    if (token && email) {
      resetTokenRef.current.value = token;
      resetEmailRef.current.value = email;
    }
  }, [location.search]);

  return (
    <Helmet title="Restaurar a Senha">
      <CommonSection title="Resetar a Senha" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              {resetPasswordStatus === "success" ? (
                <div className="confirmation__message">
                  <p>Senha alterada com sucesso!.</p>
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
                  <div className="form__group">
                    <input
                      type="text"
                      placeholder="Token"
                      required
                      ref={resetTokenRef}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Senha"
                      required
                      ref={resetPasswordRef}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Confirme sua senha"
                      required
                      ref={resetConfirmPasswordRef}
                      onChange={handlePasswordChange}
                    />
                    {!passwordsMatch && (
                      <p className="text-danger">As senhas não coincidem.</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="addTOCart__btn"
                    disabled={!passwordsMatch}
                  >
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

export default ResetPasswordForm;
