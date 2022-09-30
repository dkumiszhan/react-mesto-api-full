import React, { useState } from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";
import {
  CurrentUserContext,
  currentUser,
} from "../../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props
      .onUpdateUser({
        name,
        about: description,
      })
      .then(() => {
        //console.log(name);
        setName("");
        setDescription("");
        //console.log(name);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    //<>
    <PopupWithForm
      isOpen={props.isOpen}
      name="profile"
      title="Редактировать профиль"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        className="popup__input popup__input-edit popup__input_type_name"
        type="text"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleNameChange}
        required
      />
      <span className="name-input-error popup__error"></span>
      <input
        id="description-input"
        className="popup__input popup__input-edit popup__input_type_description"
        type="text"
        name="description"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleDescriptionChange}
        required
      />
      <span className="description-input-error popup__error"></span>
    </PopupWithForm>
    //</>
  );
}

export default EditProfilePopup;
