import React from "react";

function InfoTooltip(props) {
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
      </div>
    </div>
  );
}

export default InfoTooltip;
