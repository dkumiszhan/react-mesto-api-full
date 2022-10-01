import React, { useEffect, useState } from "react";
import "./App.css";
import api from "../../utils/Api.js";
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
        setUserInfo({ email: response.email });
        setIsLoggedIn(true);
      })
      .then(() => updateCurrentUser())
      .then(() => loadInitialCards())
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn]);

  const onLogin = (data) => {
    return apiAuth
      .authorize(data)
      .then((jwt) => {
        setUserInfo({ email: data.email });
        setIsLoggedIn(true);
        localStorage.setItem("jwt", jwt.token);
        return jwt;
      })
      .then(() => updateCurrentUser())
      .then(() => loadInitialCards())
      .catch((err) => {
        console.log(err);
      });
  };

  const onLogout = (data) => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  };

  const onRegister = (data) => {
    return apiAuth
      .register(data)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setMessage("Вы успешно зарегистрировались!");
        setInfoPopupImage(successImage);
        setInfoPopupImageName("Рисунок успешной регистрации");
        console.log(infoPopupImage);
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
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
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => 
        {
          const newState = state.map((c) => (c._id === card._id ? newCard : c));
          return newState;
      });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {

    api
      .deleteCard(card._id)
      .then((newCards) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function loadInitialCards() {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
        return cards;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateCurrentUser() {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
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
    return api
      .setUserInfo({
        name: data.name,
        about: data.about,
      })
      .then((state) => {
        setCurrentUser(state);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
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
