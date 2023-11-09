import React, {useState} from "react";

import "../../../styles/product-card.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import Popup from '../cart/Popup.jsx'

const ProductCard = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const { id, title, image01, price } = props.item;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        image01,
        price,
      })
    );

    setShowPopup(true);

    // Close the popup after a certain time (e.g., 3 seconds)
    setTimeout(() => {
      setShowPopup(false);
    }, 1250);
  };

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={image01} alt="product-img" className="w-50" />
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/foods/${id}`}>{title}</Link>
        </h5>
        <div className=" d-flex align-items-center justify-content-between ">
          <span className="product__price">R${price}</span>
          <button className="addTOCart__btn" onClick={addToCart}>
            + Carrinho
          </button>
          <Popup showPopup={showPopup} item={props.item} onClose={() => setShowPopup(false)} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
