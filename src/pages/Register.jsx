import React, { useRef, useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../styles/home.css";


const Register = () => {
  const navigate = useNavigate();
  const signupNameRef = useRef();
  const signupEmailRef = useRef();
  const signupPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const [registerEmail, setRegisterEmail] = useState(null);

  const handlePasswordChange = () => {
    const password = signupPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    setPasswordsMatch(password === confirmPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = signupEmailRef.current.value;

    if (!passwordsMatch) {
      return;
    }

    try {
      const response = await axios.post(
        "https://z0vlzp3ki1.execute-api.sa-east-1.amazonaws.com/dev/register",
        {
          name: signupNameRef.current.value,
          username: email,
          password: signupPasswordRef.current.value,
        }
      );

      if (response.status === 200) {
        setRegisterEmail(email);
        setRegistrationStatus("success");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setRegistrationStatus("conflict");
      } else {
        setRegistrationStatus("error");
      }
    }

    setPasswordsMatch(true);
  };

  useEffect(() => {
    if (registrationStatus === "success" && registerEmail) {
      setTimeout(() => {
        navigate("/login", { state: { username: registerEmail } });
      }, 2000);
    }
  }, [registrationStatus, registerEmail, navigate]);

  return (
    <Helmet title="Signup">
      <CommonSection title="Registrar" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              {registrationStatus === "success" ? (
                <div className="confirmation__message">
                  <h4>Registro efetuado!.</h4>
                </div>
              ) : registrationStatus === "error" ? (
                <div className="confirmation__message error">
                  <h4>Erro durante registro, tente novamente.</h4>
                </div>
              ) : registrationStatus === "conflict" ? (
                <div className="confirmation__message conflict">
                  <h4>Email já registrado.</h4>
                </div>
              ) : (
                <form className="form mb-5" onSubmit={submitHandler}>
                  <div className="form__group">
                    <input
                      type="text"
                      placeholder="Nome completo"
                      required
                      ref={signupNameRef}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      ref={signupEmailRef}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Senha"
                      required
                      ref={signupPasswordRef}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Confirme a sua senha"
                      required
                      ref={confirmPasswordRef}
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
                    Cadastrar
                  </button>
                </form>
              )}
              <Link to="/login">Já possuí uma conta? Entre aqui</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
