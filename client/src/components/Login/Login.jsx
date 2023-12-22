import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss"; // Adjust the path based on your project structure

const Login = ({ setUserAuthenticated, onCloseLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5001/auth/login", {
        email,
        password,
      });

      console.log(response.data);

      // Set user authentication status to true
      setUserAuthenticated(true);

      // Redirect to app.js (adjust the path as needed)
      navigate("/app");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className={styles.avtoriz}>
      <div className={styles.dark}>
        <div className={styles.popap}>
          <img
            onClick={() => {
              onCloseLogin();
            }}
            className="cu-p"
            src="/img/x.svg"
            alt="close"
          />
          <h2>Вход</h2>
          <form>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </form>
          <p className={styles.notRegistered}>
            Не зарегистрированы?{" "}
            <Link to="/register" className={styles.registerLink}>
              Зарегистрируйтесь
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
