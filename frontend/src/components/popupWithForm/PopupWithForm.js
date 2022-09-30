import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_place_${props.name} ${
        props.isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className={`popup__container popup__container_place_${props.name}`}>
        <button
          className={`popup__close popup__close_place_${props.name}`}
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className={`popup__title popup__title_${props.name}`}>
          {props.title}
        </h2>
        <form
          className={`popup__inputs popup__inputs_type_${props.name}`}
          onSubmit={props.onSubmit}
          name={props.name}
        >
          <fieldset className="popup__fieldset">
            {props.children}
            <input type="submit" className="popup__button-save" value="Да" />
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
