import React from "react";
import styles from "./CardSpa.module.scss"

function CardSpa ({ id, title, p, price, onPlus, added = false}){

    const [isAdded, setIsAdded]= React.useState(added);

    const onClickPlus = () => {
        setIsAdded(!isAdded);
        onPlus({id, title, p, price});
    }

    return(
        <div className="pl-50 pr-50">
        <div  className={styles.cardSpa}>
            <div className="">
                <p>{title}</p>
                <p>{p}</p>
            </div>
            <div className="d-flex align-center">
                <b className="mr-30 ">{price} руб.</b>
                <img className="mr-10" src="/img/edit.svg" alt="edit" />
                <img onClick={onClickPlus} src={isAdded ? "img/btn-checed.svg": "/img/plus.svg"} alt="+" />
            </div>
        </div>
    </div>
    );
}

export default CardSpa;