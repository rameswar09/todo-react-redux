import React, { Component } from "react";
import "../css/bucket.css";
import { GrEdit } from "react-icons/gr";
import Todo from "./todo";
import { render } from "react-dom";
import { connect } from "react-redux";
import * as homeAction from "../store/actions/home_action";

const _ = require("lodash");
class Bucket extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    bucketId: "",
    todo_content: "",
  };

  handleChangeTodo = (e, bucketId) => {
    // console.log(e.target.value);
    // console.log(bucketId);
    this.setState({
      todo_content: e.target.value,
    });
  };
  handleCreateTodo = (todoContent, bucketCode) => {
    let obj = {
      todoContent,
      bucketCode,
    };
    if(!_.isEmpty(todoContent)){
      this.props.createTodo(obj);
    }
    this.setState({
      todo_content: "",
    });
  };
  handleDeleteTodo = (todoId, bucketId) => {
    console.log(todoId);
    console.log(bucketId);
    let obj = {
      todoId,
      bucketId,
    };
    this.props.deleteTodo(obj);
  };
  handleMarkTodo = (todoId, bucketId,isMarked) => {
    let obj = {
      todoId,
      bucketId,
      markedValue:!isMarked
    };
    this.props.updateTodo(obj);
  };
  render() {
    let bucketName = _.get(this.props.bucket, "name", "");
    let bucketCode = _.get(this.props.bucket, "code", "");

    let toDomapped = null;

    if (!_.isEmpty(this.props.todo)) {
      toDomapped = _.map(this.props.todo, (eachTodo) => {
        return (
          <Todo
            details={eachTodo}
            bucketId={bucketCode}
            delete={this.handleDeleteTodo}
            marked={this.handleMarkTodo}
          />
        );
      });
    }
    return (
      <div className="bucket-wrapper">
        <div className="name-edit-section">
          <div>{bucketName}</div>
          <div className="edit-btn" onClick={()=>this.props.edit(bucketCode)}>
            <GrEdit />
          </div>
        </div>
        <div className="todo-list-wrapper">{toDomapped}</div>
        <div className="create-todo">
          <div className="create-todo-input-wrapper">
            <input
              className="create-todo-input"
              type="text"
              name="name"
              value={this.state.todo_content}
              onChange={(e) => this.handleChangeTodo(e, bucketCode)}
            />
            <button
              className="create-todo-btn"
              onClick={(e) =>
                this.handleCreateTodo(this.state.todo_content, bucketCode)
              }
            >
              Create To do
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.home,
  };
};

const mapDispatchToProps = (dipatch) => {
  return {
    createTodo: (data) => dipatch(homeAction.createTodo(data)),
    deleteTodo: (data) => dipatch(homeAction.deleteTodo(data)),
    updateTodo: (data) => dipatch(homeAction.updateTodo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bucket);
