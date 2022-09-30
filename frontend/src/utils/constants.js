const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(
  ".popup__input_type_description"
);
const buttonPen = document.querySelector(".profile__button-pen");
const buttonAdd = document.querySelector(".profile__button-add");
const cardsContainer = document.querySelector(".elements__list");
const formEditProfile = document.querySelector(".popup__inputs_type_edit");
const formAddCard = document.querySelector(".popup__inputs_type_add");
const formEditAvatar = document.querySelector(
  ".popup__inputs_type_edit-avatar"
);
const selectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const editAvatarButton = document.querySelector(".profile__button-avatar");

export {
  inputName,
  inputDescription,
  buttonPen,
  buttonAdd,
  cardsContainer,
  formEditProfile,
  formAddCard,
  formEditAvatar,
  selectors,
  editAvatarButton,
};
