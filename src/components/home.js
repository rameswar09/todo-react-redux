import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./header";
import Bucket from "./bucket";
import Modal from "./modal";

import * as homeAction from "../store/actions/home_action";
import "../css/home.css";
const _ = require("lodash");

class AppHome extends Component {
  componentDidMount() {
    this.props.getAll();
  }

  state = {
    isModalRequired: false,
    editData: {},
    key: "create",
  };

  handelModalToggle = () => {
    let key = this.state.key;
    key = key === "create" ? "edit" : "create";
    this.setState({
      isModalRequired: !this.state.isModalRequired,
      key,
    });
  };

  handleCreateBukcet = (name, id, isMarked) => {
    let data = {
      name: name,
      code: id,
      marked: isMarked,
    };

    if (!_.isEmpty(data.name)) {
      this.props.upsertBucket(data);
    }
    this.setState({
      isModalRequired: !this.state.isModalRequired,
      key: "create",
    });
  };

  handleEditBucket = (id) => {
    let getBucketData = _.find(this.props.appData.bucketData, { code: id });

    this.setState({
      editData: getBucketData,
      isModalRequired: !this.state.isModalRequired,
      key: "edit",
    });
  };
  render() {
    console.log(window.location.pathname);
    let mappedBucket = null;

    if (!_.isEmpty(this.props.appData.bucketData)) {
      let bucketData = this.props.appData.bucketData;
      let location = window.location.pathname;
      if (location === "/important") {
        bucketData = _.filter(bucketData, (eachBucket) => {
          if (eachBucket.marked_as_imp === true) {
            return eachBucket;
          }
        });
      }
      mappedBucket = _.map(bucketData, (eachBucket) => {
        let bucketId = _.get(eachBucket, "code", "");
        let bucketDetails = _.get(this.props.appData.todoData, [bucketId], []);
        return (
          <Bucket
            bucket={eachBucket}
            todo={bucketDetails}
            edit={this.handleEditBucket}
          />
        );
      });
    }
    return (
      <div>
        <Header isModalRequired={this.handelModalToggle} />
        <div className="main-container-wrapper">
          <div className="main-container">{mappedBucket}</div>
        </div>
        {this.state.isModalRequired ? (
          <Modal
            isCloseModal={this.handelModalToggle}
            createBucket={this.handleCreateBukcet}
            editDetails={this.state.editData}
            modalKey={this.state.key}
          />
        ) : null}
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
  return {
    getAll: () => dispatch(homeAction.getAllForHome()),
    upsertBucket: (data) => dispatch(homeAction.createAndUpdateBucket(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppHome);
