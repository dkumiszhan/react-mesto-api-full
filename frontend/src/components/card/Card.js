import {
  CurrentUserContext,
  currentUser,
} from "../../contexts/CurrentUserContext";
import React from "react";

function Card(props) {
  // console.log(props);
  //props.likes[0]._id
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  //const isOwn = props.likes[0]._id === currentUser._id;
  //const isOwn = true;

  const cardDeleteButtonClassName = `elements__remove ${
    isOwn ? "" : "elements__remove_hidden"
  }`;

  const isLiked = props.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__list-button ${
    isLiked ? "elements__list-button_active" : ""
  }`;
  function handleClick() {
    // card.onCardClick(card);
    props.onCardClick(props);
  }

  function handleLikeClick() {
    // card.onCardClick(card);
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    // card.onCardClick(card);
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
        // src={card.link}
        onClick={handleClick}
        // alt={card.name}
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
