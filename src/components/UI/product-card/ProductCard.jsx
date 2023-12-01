import React, { useState } from "react";

import "../../../styles/product-card.css";

import { Link } from "react-router-dom";

import Popup from "../cart/Popup.jsx";  

const ProductCard = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const { id, title, image01, price } = props.item;

  return (
    <div className="product__item">
      <Link to={`/foods/${id}`}>
        <div className="product__img">
          <img src={image01} alt="product-img" className="w-50" />
        </div>
      </Link>

      <div className="product__content">
        <h5 className="product__name">
          <Link to={`/foods/${id}`}>{title}</Link>
        </h5>
        <div className="product__details d-flex flex-column align-items-center justify-content-end">
          <div className="product__info d-flex align-items-center justify-content-between ">
            <span className="product__price">R${price}</span>
            <button className="addTOCart__btn">
              <Link to={`/foods/${id}`}>+ Carrinho</Link>
            </button>
          </div>
          <Popup
            showPopup={showPopup}
            item={props.item}
            onClose={() => setShowPopup(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
