import React from "react";
import success from "../../images/Union.svg";
import fail from "../../images/Fail.svg";

function InfoTooltip(props) {
  const successText = "Вы успешно зарегистрировались!";
  const failText = "Что-то пошло не так! Попробуйте ещё раз.";
  return (
    <div className={`popup ${props.isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container popup__container_place_login">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        />
        <img
          className="login__image"
          alt={props.infoImageName}
          src={props.infoImage}
        />
        <h2 className="infotooltip__title">{props.message}</h2>
        {/* {props.isLoggedIn ? (
          <>
            <img
              className="login__image"
              //alt={props.card.name}
              src={success}
            />
            <h2 className="infotooltip__title">{successText}</h2>
          </>
        ) : (
          <>
            <img
              className="login__image"
              //alt={props.card.name}
              src={fail}
            />
            <h2 className="infotooltip__title">{failText}</h2>
          </>
        )} */}
      </div>
    </div>
  );
}

export default InfoTooltip;
