import {
  CurrentUserContext
} from "../../contexts/CurrentUserContext";
import React from "react";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;

  const cardDeleteButtonClassName = `elements__remove ${
    isOwn ? "" : "elements__remove_hidden"
  }`;

  const isLiked = props.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `elements__list-button ${
    isLiked ? "elements__list-button_active" : ""
  }`;
  function handleClick() {
    props.onCardClick(props);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="elements__list-item">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      {/* <div
        className="elements__list-image"
        style={{ backgroundImage: `url(${props.link})` }}
        onClick={handleClick}
      ></div> */}
      <img
        className="elements__list-image"
        src={props.link}
        onClick={handleClick}
        alt={props.name}
      />
      <div className="elements__flex-container">
        {/* <h2 className="elements__list-title">{card.name}</h2> */}

        <h2 className="elements__list-title">{props.name}</h2>
        <div className="elements__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          {/* <p className="elements__like-count">{card.likes.length}</p> */}

          <p className="elements__like-count">{props.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
export default Card;
