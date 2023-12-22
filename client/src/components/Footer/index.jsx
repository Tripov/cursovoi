import styles from "./Footer.module.scss";

function Footer () {
    return(
        <div id="contact" className={styles.footer}>
        <div>
          <img className="ml-10" src="/img/insta.png" alt="insta" /> 
          <img className="ml-10" src="/img/vk.png" alt="vk" />
          <img className="ml-10" src="/img/youtube.png" alt="youtube" />
        </div>
        <div className="clear d-flex align-center ">
            <a href="tel:89639165144" className="ml-20">8 (963) 916-51-44</a>
            <a className="ml-20" href="mail:kissamara2019@mail.ru">Email: kissamara2019@mail.ru</a>
            <p className="ml-20">ул. Ерошевского, 31</p>
        </div>
      </div>
    );
}

export default Footer;