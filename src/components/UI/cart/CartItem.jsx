import React, { useState } from "react";
import { ListGroupItem } from "reactstrap";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

import "../../../styles/cart-item.css";

const CartItem = ({ item, selectedOptions }) => {
  const { id, title, price, image01, quantity, totalPrice } = item;

  const dispatch = useDispatch();
  const [modificationMode, setModificationMode] = useState(false);
  const [modifiedOptions, setModifiedOptions] = useState([]);

  const toggleModificationMode = () => {
    setModificationMode(!modificationMode);
    setModifiedOptions([...selectedOptions]); // Copy the selectedOptions to modifiedOptions
  };

  const incrementItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        image01,
        selectedOptions,
      })
    );
  };

  const decreaseItem = () => {
    dispatch(cartActions.removeItem(id));
  };

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(id));
  };

  const availableOptions = [
    { name: "Café preto", price: 2 },
    { name: "Cappuccino", price: 3 },
    { name: "Suco natural", price: 4 },
  ];

  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <img src={image01} alt="product-img" />

        <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div>
            <h6 className="cart__product-title">{title}</h6>
            <p className=" d-flex align-items-center gap-5 cart__product-price">
              {quantity}x <span>R${totalPrice}</span>
            </p>
            {Array.isArray(selectedOptions) && selectedOptions.length > 0 && (
              <div className="selected-options">
                <p>Opções:</p>
                <ul>
                  {selectedOptions.map((option, index) => (
                    <li key={index}>
                      {option.name} (+R${option.price})
                    </li>
                  ))}
                </ul>
                <button onClick={toggleModificationMode}>
                  Modificar Opções
                </button>
              </div>
            )}
            <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
              <span className="increase__btn" onClick={incrementItem}>
                <i className="ri-add-line"></i>
              </span>
              <span className="quantity">{quantity}</span>
              <span className="decrease__btn" onClick={decreaseItem}>
                <i className="ri-subtract-line"></i>
              </span>
            </div>
          </div>

          <span className="delete__btn" onClick={deleteItem}>
            <i className="ri-close-line"></i>
          </span>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;
