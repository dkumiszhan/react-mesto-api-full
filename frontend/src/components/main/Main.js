import Card from "../card/Card.js";
import editImage from "../../images/pen.svg";
import {
  CurrentUserContext,
} from "../../contexts/CurrentUserContext";
import React from "react";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <button
            type="button"
            className="profile__button-avatar"
            onClick={onEditAvatar}
          >
            <div
              className="profile__avatar-container"
              style={{ backgroundImage: `url(${currentUser.avatar || ''})` }}
            >
              <img
                className="profile__pic"
                src={editImage}
                alt="картинка редактировать"
              />
            </div>
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__description">{currentUser.about}</p>
            <button
              type="button"
              className="profile__button-pen"
              onClick={onEditProfile}
            ></button>
          </div>
        </div>

        <button
          type="button"
          className="profile__button-add"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((item) => {
            return (
              <Card
                card={item}
                key={item._id}
                onCardClick={onCardClick}
                name={item.name}
                link={item.link}
                likes={item.likes}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
