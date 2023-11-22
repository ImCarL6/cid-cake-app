import React, { useRef, useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { setUser } from "../store/user/userSlice";
import { Container, Row, Col } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

import "../styles/home.css";

const Login = () => {
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();

  const dispatch = useDispatch();

  const location = useLocation();
  const loginEmail = location.state && location.state.username;

  const [loginStatus, setLoginStatus] = useState(null);

  try {
    useEffect(() => {
      if (loginEmail) {
        loginEmailRef.current.value = loginEmail;
      }
    }, [loginEmail]);
  } catch (e) {
    console.log(e);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://z0vlzp3ki1.execute-api.sa-east-1.amazonaws.com/dev/login",
        {
          username: loginEmailRef.current.value,
          password: loginPasswordRef.current.value,
        }
      );

      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        setLoginStatus("success");

        Cookies.set("userLogin", response.data.user.username);
        Cookies.set("userName", response.data.user.name);
        Cookies.set("userAuth", response.data.token);
      }
    } catch (error) {
      setLoginStatus("error");
    }
  };

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              {loginStatus === "success" ? (
                <div className="confirmation__message">
                  <p>Login efetuado.</p>
                </div>
              ) : loginStatus === "error" ? (
                <div className="confirmation__message error">
                  <p>O login/senha é inválido.</p>
                </div>
              ) : (
                <form className="form mb-5" onSubmit={submitHandler}>
                  <div className="form__group">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      ref={loginEmailRef}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Senha"
                      required
                      ref={loginPasswordRef}
                    />
                  </div>
                  <button type="submit" className="addTOCart__btn">
                    Login
                  </button>
                  <div className="mt-3 ">
                  <Link to="/reset-password">Esqueceu sua senha?</Link>
                  </div>
                </form>
              )}
              <Link to="/register">Criar conta</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
