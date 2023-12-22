import styles from "./Register.module.scss";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css";

const Register = ({ onCloseReg, setUserAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/registration",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      // Display successful notification
      toast.success("Регистрация прошла успешно");

      // Close the registration component
      onCloseReg();

      // Authenticate the user (assuming your API returns some token or user info)
      setUserAuthenticated(true);

      // Redirect to app.js (adjust the path as needed)
      navigate("/app");
    } catch (error) {
      console.error("Registration failed:", error.message);

      // Display error notification
      toast.error("Ошибка при регистрации");
    }
  };
  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.avtoriz}>
      <div className={styles.dark}>
        <div className={styles.popap}>
          <Link to="/">
            <img
              onClick={() => onCloseReg()} // Close the registration component
              className="cu-p"
              src="/img/x.svg"
              alt="close"
            />
          </Link>
          <h2>Регистрация</h2>
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
            <button onClick={handleRegister}>Register</button>
          </form>
          <div>
            <p>
              Уже есть аккаунт?{" "}
              <span className={styles.loginLink} onClick={navigateToLogin}>
                Войти
              </span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default Register;
