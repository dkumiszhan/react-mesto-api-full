import React from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    props
      .onAddPlace({
        name: name,
        link: link,
      })
      .then(() => {
        setName("");
        setLink("");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name="add-card"
      title="Новое место"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        minLength="2"
        maxLength="30"
        id="name"
        className="popup__input popup__input-add popup__input_type_title"
        type="text"
        name="title"
        placeholder="Название"
        onChange={handleNameChange}
        value={name}
      />
      <span className="name-error popup__error"></span>
      <input
        required
        id="link"
        className="popup__input popup__input-add popup__input_type_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        onChange={handleLinkChange}
        value={link}
      />
      <span className="link-error popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
