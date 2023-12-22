import React from "react";
import styles from "./Card.module.scss";

function Card(props) {
  const handleClick = () => {
    props.onClickPrice(props.id);
    props.onCloseCart();
  };

  return (
    <div className={styles.cards}>
      <div id="do" className={styles.card}>
        <div className="text-center">
          <img
            width={200}
            height={200}
            style={{ borderRadius: 20 }}
            src={props.imageUrl}
            alt=""
          />
        </div>
        <h3 className="text-center">{props.title}</h3>
        <p className="text-center">{props.p}</p>
        <button onClick={handleClick} className="text-uppercase ml-30">
          Узнать цены
        </button>
      </div>
    </div>
  );
}

export default Card;
