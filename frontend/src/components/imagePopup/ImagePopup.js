import React from "react";

function ImagePopup(props) {
  return (
    <div className="popup popup_place_show-card popup_is-opened">
      <div className="popup__container popup__container_place_show-card">
        <button
          className="popup__close popup__close_place_show-card"
          type="button"
          onClick={props.onClose}
        />
        <img
          className="popup__image"
          alt={props.card.name}
          src={props.card.link}
        />
        <h2 className="popup__title popup__title_place_show-card">
          {props.card.name}
        </h2>
      </div>
    </div>
  );
}

export default ImagePopup;
