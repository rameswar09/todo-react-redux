import React from "react";
import "../css/header.css";
import { BiMessageSquareAdd } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <div className="header-wrapper">
      <div className="titile-wrapper">
        <p className="title-name">
          <i>To-Do</i>
        </p>
      </div>
      <div className="user-section-wrapper">
        <div className="nav-wrapper">
          <div className="btn-div">
            <Link to="/home">
              <button className="header-btn">Home</button>
            </Link>
          </div>
          <div className="btn-div">
            <Link to="/important">
              <button className="header-btn">Important</button>
            </Link>
          </div>
          <div
            className="add-bucket-wrapper"
            onClick={() => props.isModalRequired()}
          >
            <BiMessageSquareAdd size="30" />
          </div>
          <div className="user-ion">
            <BiUserCircle size="30" />
          </div>
        </div>
        <div className="user-ion-wrapper"></div>
      </div>
    </div>
  );
}
