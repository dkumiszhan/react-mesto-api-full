import React from "react";
import Header from "../header/Header.js";
import Main from "../main/Main.js";
import Footer from "../footer/Footer.js";
import ImagePopup from "../imagePopup/ImagePopup";
import {
  CurrentUserContext
} from "../../../src/contexts/CurrentUserContext";
import EditProfilePopup from "../editProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../editAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../addPlacePopup/AddPlacePopup";

function Cards({
  currentUser,
  handleEditAvatarClick,
  handleAddPlaceClick,
  handleEditProfileClick,
  handleCardClick,
  cards,
  handleCardLike,
  handleCardDelete,
  selectedCard,
  closeAllPopups,
  isEditAvatarPopupOpen,
  handleUpdateAvatar,
  isAddPlacePopupOpen,
  handleAddPlaceSubmit,
  isEditProfilePopupOpen,
  handleUpdateUser,
  email,
  onLogout,
  isLoggedIn,
}) {
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="body">
          <Header
            textQuit="Выйти"
            link=""
            email={email}
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
          />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          {selectedCard && (
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          )}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          ></AddPlacePopup>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          ></EditProfilePopup>
        </div>
      </CurrentUserContext.Provider>
      ;
    </>
  );
}

export default Cards;
