import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import AppContext from "../../context";

function Header(props) {
  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return (
    <div className={styles.header}>
      <Link to="/">
        <div>
          <h3 className="text-uppercase">Соседи в тренде</h3>
          <p>салон красоты</p>
        </div>
      </Link>
      <div>
        <ul className="clear d-flex">
          <li className="mr-30 cu-p">
            <a href="#do">Услуги</a>
          </li>
          <li className="mr-30 cu-p">
            <a href="#contact">Контакты</a>
          </li>
          <li onClick={props.onClickCart} className="mr-30 cu-p align-center">
            <img src="/img/cart.svg" alt="cart" />
            <span className="ml-10">{totalPrice} руб.</span>
          </li>
          <li className="cu-p">
            <Link to="/register">
              <img src="/img/user.svg" alt="user" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
