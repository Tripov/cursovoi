import styles from "./Sale.module.scss";

function Sale () {
    return(
        <div className={styles.sale}>
          <div className="">
            <img width={300} height={300} src="/img/sale.jpeg" alt="sale" />
          </div>
          <div className="ml-30">
            <h3 className=""><span>Скидка 15%</span> на любые услуги, если придёте вдвоём.</h3>
            <h3 className="mt-20 mb-20"><span>Скидка 20%</span> на подарочный сертификат или на любую услугу ко Дню рождения!</h3>
            <h3 className=""><span>Скидка 25%</span>при покупке абонемента из 10 сеансов на любые СПА услуги.</h3>
          </div>
      </div>
    );
}

export default Sale;