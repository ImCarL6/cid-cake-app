import React from "react";

import { ListGroup } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import CartItem from "./CartItem";

import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../../../store/shopping-cart/cartUiSlice";

import "../../../styles/shopping-cart.css";

const Carts = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const location = useLocation();

  const currentPath = location.pathname;
  const pathSegments = currentPath.split('/');

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  return (
    <div className="cart__container">
      <ListGroup className="cart">
        <div className="cart__close">
          <span onClick={toggleCart}>
            <i class="ri-close-fill"></i>
          </span>
        </div>

        <div className="cart__item-list">
          {cartProducts.length === 0 ? (
            <h6 className="text-center mt-5">Nenhum produto adicionado</h6>
          ) : (
            cartProducts.map((item, index) => (
              <CartItem item={item} key={index} />
            ))
          )}
        </div>

        <div className="cart__bottom d-flex align-items-center justify-content-between">
          <h6>
            Subtotal : <span>R${totalAmount}</span>
          </h6>
          <button>
            <Link to={pathSegments[1] === 'payment' ? '/payment' : '/checkout'} onClick={toggleCart}>
              Finalizar
            </Link>
          </button>
        </div>
      </ListGroup>
    </div>
  );
};

export default Carts;
