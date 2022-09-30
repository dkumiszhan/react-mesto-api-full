import React from "react";
import logo from "../../images/Vector.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип место" />
      <div className="header__container">
        <span className="header__email">{props.email}</span>
        <Link to={props.link} className="header__text">
          {props.text}
        </Link>
        {props.isLoggedIn ? (
          <>
            <Link
              to={props.link}
              className="header__signout"
              onClick={props.onLogout}
            >
              {props.textQuit}
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>

      {/* <p className="header__text">{props.text}</p> */}
    </header>
  );
}

export default Header;
