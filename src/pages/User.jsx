import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { selectUser } from "../store/user/userSlice";
import { setUser } from "../store/user/userSlice";
import Cookies from "js-cookie";
import AddressManager from "../pages/Addresses";
import axios from "axios";

import "../styles/user.css";

const User = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      const userUsername = Cookies.get("userLogin");
      const userToken = Cookies.get("userAuth");

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
            const userName = Cookies.get("userName");
            dispatch(setUser({ username: userUsername, name: userName }));
          }
        } catch (error) {
          dispatch(setUser());
          console.error("User verification failed: log again", error);
        }
      }
    };

    verifyUser();
  }, [dispatch]);

  const logout = () => {
    dispatch(setUser());
    Cookies.remove("userLogin");
    Cookies.remove("userName");
    Cookies.remove("userAuth");
    setLoggedOut(true);
  };

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
                <Button
                  type="submit"
                  className="addTOCart__btn mt-3 mb-5"
                  color="danger"
                  onClick={logout}
                >
                  Logout
                </Button>
                <AddressManager />
              </Col>
            ) : (
              <Col lg="8" md="6" className="user__section">
                {loggedOut ? (
                  <h4>Usuário deslogado!</h4>
                ) : (
                  <h4>Usuário não encontrado!</h4>
                )}
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default User;
