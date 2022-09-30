import React from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    //console.log("this is avatar ref");
    //console.log(avatarRef.current.value);
    props
      .onUpdateAvatar({
        avatar: avatarRef.current.value,
      })
      .then(() => {
        avatarRef.current.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name="edit-avatar"
      title="Обновить аватар"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        id="avatarLink"
        className="popup__input popup__input-edit-avatar popup__input_type_link"
        type="url"
        name="avatarLink"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
      />
      <span className="avatarLink-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
