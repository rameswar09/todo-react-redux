import React from "react";
import "../css/bucket.css";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
const _ = require("lodash");

export default function Bucket(props) {
  let todoName = _.get(props.details, "name", "");
  let todoCode = _.get(props.details, "code", "");
  let isMarked = _.get(props.details, "marked", false);
  let obj = {};

  if (isMarked) {
    obj = {
      "background-color": "green",
      color: "white",
    };
  }

  return (
    <div className="todo-box">
      <div className="todo-content">{todoName}</div>
      <div className="mark-as-done-wrapper">
        <div
          className="mark-as-done"
          style={obj}
          onClick={() => props.marked(todoCode, props.bucketId,isMarked)}
        >
          <IoIosCheckmarkCircleOutline size="25" />
        </div>
        <div className="todo-delete" onClick={() => props.delete(todoCode, props.bucketId)}>
          <RiDeleteBin5Line size="20" />
        </div>
      </div>
    </div>
  );
}
