import styles from "./Hero.module.scss";

function Hero () {
    return (
        <div className={styles.hero}>
        <div className="d-flex justify-between">
            <div>
            <h2 className="text-uppercase text-center">Соседи в тренде</h2>
            </div>
            <div className="">
              <img src="/img/hammam.jpeg" alt="hero" />
            </div>
        </div>
      </div>
    );
}

export default Hero;