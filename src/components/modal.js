import React, { Component } from "react";
import { connect } from "react-redux";
import * as homeAction from "../store/actions/home_action";
import "../css/modal.css";
import { GiCancel } from "react-icons/gi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
const _ = require("lodash");

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    bucketName: this.props.modalKey === "edit" ? this.props.editDetails.name : "",
    bukcetId: this.props.modalKey === "edit" ? this.props.editDetails.code : "",
    isMarked:
      this.props.modalKey === "edit" ? this.props.editDetails.marked_as_imp : false,
  };

  handleChangeBucketName = (e) => {
    this.setState({
      bucketName: e.target.value,
    });
  };
  handleChangeMarked = () => {
    this.setState({
      isMarked: !this.state.isMarked,
    });
  };

  render() {
    let obj = {};

    if (this.state.isMarked) {
      obj = {
        "background-color": "green",
        color: "white",
        "border-radius": "50%",
      };
    }
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-name-and-cancel">
            <div className="modal-bucket-name">Bucket Name</div>
            <div onClick={() => this.props.isCloseModal()}>
              <GiCancel />
            </div>
          </div>

          <div className="modal-details-content">
            <div className="modal-bucket-name-input">
              <input
                className="modal-name-input"
                type="text"
                name="name"
                onChange={(e) => this.handleChangeBucketName(e)}
                value={this.state.bucketName}
              />
            </div>
            <div
              className="modal-marked-as-imp"
              onClick={this.handleChangeMarked}
            >
              <span>Marked As Important </span>
              <IoIosCheckmarkCircleOutline size="40" style={obj} />
            </div>
            <div
              className="modal-save"
              onClick={() =>
                this.props.createBucket(
                  this.state.bucketName,
                  this.state.bukcetId,
                  this.state.isMarked
                )
              }
            >
              <button className="modal-save-btn">Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appData: state.home,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
