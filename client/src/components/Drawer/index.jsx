import styles from "./Drawer.module.scss";
import Info from "../info.jsx"
import React from "react";
import AppContext from "../../context";
import axios from "axios";
function Drawer({onClose, onRemove, items = []}) {
  const [isOrederComplate, setIsOrderComplate]= React.useState(false);
  const [setOrderId]= React.useState(null);
  const {cartItems, setCartItems} = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)


  const onClickOrder = async() => {
    try {
      const {data} = await axios.post('', cartItems)
    setOrderId(data.id);
    setIsOrderComplate(true);
    setCartItems([]);
    } catch (error) {
      alert('Не удалось офрмить заказ')
    }
  };

    return (
        <div className={styles.overlay}>
          <div className={styles.drawer}>
            <h2 className="mb-30 d-flex justify-between">Корзина <img onClick={onClose} className="removeBtn cu-p" src="/img/x.svg" alt="close" /></h2>
            
            
              {items.length > 0 ? (
                <div className="d-flex flex-column flex">
                  <div className={styles.items}>
                    {items.map((obj) => (
                      <div key={obj.id} className={styles.cartItem}>
                        <div className="mr-20 flex">
                          <p className="mb-5">{obj.title}</p>
                          <b>{obj.price} руб.</b>
                        </div>
                        <img
                          onClick={() => onRemove(obj.id)}
                          className={styles.removeBtn}
                          src="img/x.svg"
                          alt="Remove"
                        />
                      </div>
                    ))}
                  </div>
                  <div className={styles.cartTotalBlock}>
                    <ul>
                      <li>
                        <span>Итого:</span>
                        <div></div>
                        <b>{totalPrice} руб. </b>
                      </li>
                      <li>
                        <span>Налог 5%:</span>
                        <div></div>
                        <b>{totalPrice / 100 * 5} руб. </b>
                      </li>
                    </ul>
                    <button onClick={onClickOrder} className={styles.greenButton}>
                      Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
                    </button>
                  </div>
                </div>
              ):(<Info title={isOrederComplate ? "Заказ офрмлен":"Корзина пуста"} description={isOrederComplate ? "Заказ отправился в базу данных" : "Добавьте хотя бы одну услугу"} image={isOrederComplate ? "/img/complete-order.jpg": "/img/empty-cart.jpg"}/>
              )

            }
            
          </div>
        </div>
    );
}

export default Drawer;