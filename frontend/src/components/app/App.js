import React, { useEffect, useState } from "react";
import logo from "../../images/Vector.svg";
import "./App.css";
import Header from "../header/Header.js";
import Main from "../main/Main.js";
import Footer from "../footer/Footer.js";
import PopupWithForm from "../popupWithForm/PopupWithForm";
import ImagePopup from "../imagePopup/ImagePopup";
import {
  CurrentUserContext,
  currentUser,
} from "../../../src/contexts/CurrentUserContext";
import api from "../../utils/Api.js";
import EditProfilePopup from "../editProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../editAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../addPlacePopup/AddPlacePopup";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/Register";
import InfoTooltip from "../infoTooltip/InfoTooltip";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import * as apiAuth from "../../utils/apiAuth.js";
import Cards from "../cards/Cards";
import successImage from "../../images/Union.svg";
import errorImage from "../../images/Fail.svg";

function App() {
  const [infoPopupImage, setInfoPopupImage] = useState("");
  const [infoPopupImageName, setInfoPopupImageName] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isRegisteredSuccess, setIsRegisteredSuccess] = useState(false);
  // const [isRegisteredError, setIsRegisteredError] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }

    apiAuth
      .getContent(jwt)
      .then((response) => {
        console.log("apiAuth.getContent working");

        console.log(`user email is ${response.data.email}`);
        setUserInfo({ email: response.data.email });
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    // console.log(isLoggedIn);
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn]);

  const onLogin = (data) => {
    // console.log("onLogin");
    return apiAuth
      .authorize(data)
      .then((jwt) => {
        // console.log(data);
        //setUserInfo({ email, password });
        setUserInfo({ email: data.email });
        setIsLoggedIn(true);
        localStorage.setItem("jwt", jwt.token);
        // console.log(jwt);
        //history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onLogout = (data) => {
    // console.log("onLogout");
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  };

  const onRegister = (data) => {
    // console.log("onRegister");
    return apiAuth
      .register(data)
      .then(() => {
        // history.push("/sign-in");
        setIsInfoTooltipOpen(true);
        // setIsRegisteredSuccess(true);
        setMessage("Вы успешно зарегистрировались!");
        setInfoPopupImage(successImage);
        setInfoPopupImageName("Рисунок успешной регистрации");
        // infoPopupImage = { successImage };
        console.log(infoPopupImage);
        // infoPopupImageName = "Рисунок успешной регистрации";
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        // setIsRegisteredError(true);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        //infoPopupImage = { errorImage };

        //infoPopupImageName = "Рисунок неудачной регистрации";
        setInfoPopupImage(errorImage);
        setInfoPopupImageName("Рисунок неудачной регистрации");
      });
  };

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});

  // main js part
  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    // console.log("card deleted");
    // const isOwn = card.owner._id === currentUser._id;

    api
      .deleteCard(card._id)
      .then((newCards) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        console.log(cards);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // end of main js

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        console.log(res);
        //console.log(res.name);
        setCurrentUser(res);
        //console.log(currentUser);
        // console.log(typeof res);
        // setUserName(res.name);
        // setUserDescription(res.about);
        // setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardClick(card) {
    // console.log("card clicked");
    // console.log(card);
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    // const popupEditAvatar = document.querySelector(".popup_place_edit-avatar");
    // popupEditAvatar.classList.add("popup_is-opened");
  }

  function handleEditProfileClick() {
    // console.log(true);

    setIsEditProfilePopupOpen(true);

    // const popupEditProfile = document.querySelector(".popup_place_profile");
    // popupEditProfile.classList.add("popup_is-opened");
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);

    // const popupAddPlace = document.querySelector(".popup_place_add-card");
    // popupAddPlace.classList.add("popup_is-opened");
  }

  function closeAllPopups() {
    if (isAddPlacePopupOpen) {
      setIsAddPlacePopupOpen(false);
    }
    if (isEditProfilePopupOpen) {
      setIsEditProfilePopupOpen(false);
    }
    if (isEditAvatarPopupOpen) {
      setIsEditAvatarPopupOpen(false);
    }
    setSelectedCard(null);
    if (isInfoTooltipOpen) {
      setIsInfoTooltipOpen(false);
      // setIsRegisteredSuccess(false);
      // setIsRegisteredError(false);
      // console.log("set isInfoTooltipOpen to false ");
      // console.log(isInfoTooltipOpen);
    }
  }

  const isOpen =
    isInfoTooltipOpen ||
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleUpdateUser(data) {
    //console.log("updating user");
    return api
      .setUserInfo({
        name: data.name,
        about: data.about,
      })
      .then((state) => {
        //console.log(state);
        setCurrentUser(state);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    //console.log("updating avatar");
    //console.log("this is data");
    //console.log(data.avatar);
    return api
      .setUserAvatar({
        avatar: data.avatar,
      })
      .then((state) => {
        setCurrentUser(state);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    //console.log("handle add place submit");
    //console.log(data);
    return api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Switch>
        <Route path="/sign-in">
          <Login onLogin={onLogin} />
        </Route>
        <Route path="/sign-up">
          <Register onRegister={onRegister} />
          {/* {isRegisteredSuccess && ( */}
          <InfoTooltip
            message={message}
            infoImage={infoPopupImage}
            infoImageName={infoPopupImageName}
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
          />
        </Route>

        <ProtectedRoute
          exact
          path="/"
          isLoggedIn={isLoggedIn}
          userData={userInfo}
          onLogout={onLogout}
          component={Cards}
          currentUser={currentUser}
          handleEditAvatarClick={handleEditAvatarClick}
          handleAddPlaceClick={handleAddPlaceClick}
          handleEditProfileClick={handleEditProfileClick}
          handleCardClick={handleCardClick}
          cards={cards}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
          selectedCard={selectedCard}
          closeAllPopups={closeAllPopups}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          handleUpdateAvatar={handleUpdateAvatar}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          handleAddPlaceSubmit={handleAddPlaceSubmit}
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          handleUpdateUser={handleUpdateUser}
          email={userInfo.email}
        />

        <Route>
          {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>
    </>
    //
  );
}

export default App;
