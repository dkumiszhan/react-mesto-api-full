import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import PopupWithForm from "../popupWithForm/PopupWithForm";

function Login(props) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setMessage("");
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      return;
    }

    props.onLogin(loginData);
    // .catch((err) => setMessage(err.message || "Что-то пошло не так"));
  };

  return (
    <>
      <Header text="Регистрация" link="/sign-up" />
      <div className="login" onSubmit={handleSubmit}>
        <h2 className="login__title">Вход</h2>
        <form
          className="login__form"
          name="loginForm"
          //   onSubmit={props.onSubmit}
          //   name={props.name}
        >
          <fieldset className="popup__fieldset">
            <input
              id="email-input"
              className="popup__input popup__input_type_login"
              type="email"
              name="email"
              placeholder="Email"
              minLength="2"
              maxLength="40"
              value={loginData.email || ""}
              onChange={handleChange}
              required
            />
            <span className="name-input-error popup__error"></span>
            <input
              id="password-input"
              className="popup__input popup__input_type_login"
              type="password"
              name="password"
              placeholder="Пароль"
              minLength="2"
              maxLength="200"
              value={loginData.password}
              onChange={handleChange}
              required
            />
            <span className="description-input-error popup__error"></span>
            <input
              type="submit"
              className="popup__button-save popup__button-save_type_login"
              value="Войти"
            />
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default Login;
