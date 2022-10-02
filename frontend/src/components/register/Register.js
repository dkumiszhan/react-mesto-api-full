import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../header/Header";

function Login(props) {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onRegister(registerData);
  };

  return (
    <>
      <Header text="Войти" link="/sign-in" />
      <div className="login" onSubmit={handleSubmit}>
        <h2 className="login__title">Регистрация</h2>
        <form
          className="login__form"
          name="registerForm"
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
              value={registerData.email || ""}
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
              value={registerData.password}
              onChange={handleChange}
              required
            />
            <span className="description-input-error popup__error"></span>
            <input
              type="submit"
              className="popup__button-save popup__button-save_type_login"
              value="Зарегистрироваться"
            />
          </fieldset>
        </form>
        <Link to="/sign-in" className="register__link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
}

export default Login;
