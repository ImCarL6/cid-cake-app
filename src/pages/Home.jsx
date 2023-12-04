import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col } from "reactstrap";

import heroImg from "../assets/images/hero.png";
import "../styles/hero-section.css";

import Category from "../components/UI/category/Category.jsx";
import { setUser } from "../store/user/userSlice";

import "../styles/home.css";

import products from "../assets/fake-data/products.js";

import foodCategoryImg01 from "../assets/images/cupcake.png";
import foodCategoryImg02 from "../assets/images/cake.png";
import foodCategoryImg03 from "../assets/images/pie.png";

import ProductCard from "../components/UI/product-card/ProductCard.jsx";

const Home = () => {
  const [category, setCategory] = useState("ALL");
  const [allProducts, setAllProducts] = useState(products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let typeObj = { icon: "home" };

  useEffect(() => {
    if (category === "ALL") {
      setAllProducts(products);
    }

    if (category === "CUPCAKE") {
      const filteredProducts = products.filter(
        (item) => item.category === "Cupcake"
      );

      setAllProducts(filteredProducts);
    }

    if (category === "CAKE") {
      const filteredProducts = products.filter(
        (item) => item.category === "Cake"
      );

      setAllProducts(filteredProducts);
    }

    if (category === "PIE") {
      const filteredProducts = products.filter(
        (item) => item.category === "Pie"
      );

      setAllProducts(filteredProducts);
    }

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
  }, [category, navigate, dispatch]);

  return (
    <Helmet title="Início">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content  ">
                <h5 className="mb-3">Entrega fácil e rápida!</h5>
                <h1 className="mb-4 hero__title">
                  <span>Aproveite!</span> <br /> O melhor <span>cupcake</span>{" "}
                  da região chegou!
                </h1>

                <p>Se delicie com os renomados docinhos da Cid Cakes!</p>

                <Link
                  to="/foods"
                  className="hero__btns d-flex align-items-center gap-5 mt-4"
                >
                  <button className="order__btn d-flex align-items-center justify-content-between">
                    Peça um agora <i className="ri-arrow-right-s-line"></i>
                  </button>
                </Link>

                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-car-line"></i>
                    </span>{" "}
                    Frete grátis
                  </p>

                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-shield-check-line"></i>
                    </span>{" "}
                    Segurança certificada
                  </p>
                </div>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Category {...typeObj} />
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2>Mais Pedidos</h2>
            </Col>

            <Col lg="12">
              <div className="food__category d-flex align-items-center justify-content-center gap-4">
                <button
                  className={`all__btn  ${
                    category === "ALL" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("ALL")}
                >
                  Todos
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "CUPCAKE" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("CUPCAKE")}
                >
                  <img src={foodCategoryImg01} alt="" />
                  Cupcake
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "CAKE" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("CAKE")}
                >
                  <img src={foodCategoryImg02} alt="" />
                  Bolo
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "PIE" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("PIE")}
                >
                  <img src={foodCategoryImg03} alt="" />
                  Torta
                </button>
              </div>
            </Col>

            {allProducts.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
