import React, { useState, useEffect } from "react";
import products from "../assets/fake-data/products";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import "../styles/product-details.css";
import ProductCard from "../components/UI/product-card/ProductCard";
import Popup from "../components/UI/cart/Popup";

const FoodDetails = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [tab, setTab] = useState("desc");
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = products.find((product) => product.id === id);
  const [previewImg, setPreviewImg] = useState(product.image01);
  const { title, price, category, desc, image01 } = product;

  const relatedProduct = products.filter(
    (item) => category === item.category && item.id !== id
  );

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    const index = selectedOptions.indexOf(option);

    if (index === -1) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      const updatedOptions = [...selectedOptions];
      updatedOptions.splice(index, 1);
      setSelectedOptions(updatedOptions);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = price;

    selectedOptions.forEach((option) => {
      switch (option) {
        case "Café preto":
          totalPrice += 2;
          break;
        case "Cappuccino":
          totalPrice += 3;
          break;
        case "Suco Natural":
          totalPrice += 4;
          break;
        default:
          break;
      }
    });

    return totalPrice;
  };

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        price: calculateTotalPrice(),
        image01,
        selectedOptions
      })
    );

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 1250);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setPreviewImg(product.image01);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title="Product-details">
      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product__images ">
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(product.image01)}
                >
                  <img src={product.image01} alt="" className="w-50" />
                </div>
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(product.image02)}
                >
                  <img src={product.image02} alt="" className="w-50" />
                </div>

                <div
                  className="img__item"
                  onClick={() => setPreviewImg(product.image03)}
                >
                  <img src={product.image03} alt="" className="w-50" />
                </div>
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={previewImg} alt="" className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{title}</h2>
                <p className="product__price">
                  {" "}
                  Preço: <span>${calculateTotalPrice()}</span>
                </p>
                <p className="category mb-5">
                  Categoria:{" "}
                  <span>
                    {category === "Cake"
                      ? "Bolo"
                      : category === "Pie"
                      ? "Torta"
                      : "Cupcake"}
                  </span>
                </p>

                <div className="options mb-3">
                  <div className="option">
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => handleOptionChange("Café preto")}
                      />
                      Café preto {'(+R$ 2)'}
                    </label>
                  </div>
                  <div className="option">
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => handleOptionChange("Cappuccino")}
                      />
                      Cappuccino {'(+R$ 3)'}
                    </label>
                  </div>
                  <div className="option">
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => handleOptionChange("Suco Natural")}
                      />
                      Suco Natural {'(+R$ 4)'}
                    </label>
                  </div>
                  {/* Add more options as needed */}
                </div>

                <button onClick={addItem} className="addTOCart__btn">
                  + Carrinho
                </button>
                <Popup
                  showPopup={showPopup}
                  item={product}
                  onClose={() => setShowPopup(false)}
                />
              </div>
            </Col>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h6
                  className={` ${tab === "desc" ? "tab__active" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Descrição
                </h6>
                <h6
                  className={` ${tab === "rev" ? "tab__active" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Opiniões
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content">
                  <p>{desc}</p>
                </div>
              ) : (
                <div className="tab__form mb-3">
                  <div className="review pt-5">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">Ótimo</p>
                  </div>

                  <div className="review">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">Excelente</p>
                  </div>

                  <div className="review">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">Muito bom!</p>
                  </div>
                  <form className="form" onSubmit={submitHandler}>
                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Nome completo"
                        onChange={(e) => setEnteredName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Insira o seu email"
                        onChange={(e) => setEnteredEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <textarea
                        rows={5}
                        type="text"
                        placeholder="Conte-nos o que achou!"
                        onChange={(e) => setReviewMsg(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="addTOCart__btn">
                      Enviar
                    </button>
                  </form>
                </div>
              )}
            </Col>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">Recomendados</h2>
            </Col>

            {relatedProduct.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
