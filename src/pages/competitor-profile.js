import React, { PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";

import Link from "gatsby-link";

import "../layouts/css/fcss.css";
import "../layouts/css/page.css";

import Nav from "../components/Nav";
import FormInput from "../components/FormInput";
import Switch from "../components/Switch";

import fire from "../fire";
import { connect } from "react-redux";

import _ from "lodash";

class CompetitorProfile extends PureComponent {
  constructor(props) {
    super(props);

    this.getUrlVars = this.getUrlVars.bind(this);

    this.state = {
      competitorId: "",
      bio: "",
      city: "",
      country: "",
      name: "",
      photo: "",
      state: "",
      talent: "",
      uploads: [],

      featureOneImage: "",
      featureTwoImage: "",
      featureThreeImage: ""
    };
  }

  componentDidMount() {
    var competitorId = this.getUrlVars()["competitor"];

    this.setState({
      competitorId: competitorId
    });

    // GET PROFILE INFO FOR THAT COMPETITOR..
    fire
      .database()
      .ref("competitors/" + competitorId)
      .once("value")
      .then(
        function(snapshot) {
          console.log("COMPETITOR SNAPSHOT", snapshot.val());

          this.setState({
            bio: snapshot.val().bio,
            city: snapshot.val().city,
            country: snapshot.val().country,
            name: snapshot.val().name,
            photo: snapshot.val().photo,
            state: snapshot.val().state,
            talent: snapshot.val().talent,
            uploads: snapshot.val().uploads
          });
        }.bind(this)
      );
  }

  getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function(m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  }

  render() {
    console.log("THIS STATE", this.state);

    if (!this.props.authenticated) {
      return <Redirect to="/login" />;
    }

    let featuredUploads =
      this.state.uploads &&
      Object.keys(this.state.uploads).map(
        function(key, idx) {
          if (idx <= 2) {
            return (
              <a key={key} className="hover hover-opacity" href={`/media?id=${key}`} ><div

                style={{
                  backgroundImage: `url(${this.state.uploads[key].photo})`
                }}
                className="competitor-profile-featured"
              /></a>
            );
          }
        }.bind(this)
      );

    let uploads =
      this.state.uploads &&
      Object.keys(this.state.uploads).map(
        function(key, idx) {
          return (
            <a key={key} href={`/media?id=${key}`} className="td-none fc-black hover hover-opacity"><div className="competitor-upload-list-item" >
              <div
                className="competitor-upload-list-item__photo"
                style={{
                  backgroundImage: `url(${this.state.uploads[key].photo})`
                }}
              />
              <div className="fx fx-j-c fx-a-c fx-col">
                <div className="t-sans m-t-8">{this.state.uploads[key].caption}</div>
                <div className="t-sans m-t-8 fc-red t-upper f-11">{this.state.uploads[key].contentType}</div>
              </div>
            </div></a>
          );
        }.bind(this)
      );

    return (
      <div className="m-b-100">
        <div className=" mx-992 m-t-100">
          <div
            style={{ backgroundImage: `url(${this.state.photo})` }}
            className="competitor-profile-photo m-b-20"
          />

          <div className="t-sans f-28 fw-500 m-b-10">{this.state.name}</div>
          <div className="t-sans fx fx-a-c">
            <i className="fa fa-map-marker" />
            <div className="p-l-14 fc-red">
              {this.state.city} {this.state.state} {this.state.country}
            </div>
          </div>

          <div className="fx fx-j-e">
            <button className="comment-button">Follow</button>
          </div>

          <div className="fx m-t-100 fx-j-a fx-s-b">
            {featuredUploads}
            <div className="competitor-profile-featured-sm">
              <div className="t-sans fw-500">
                + {parseInt(_.size(this.state.uploads)) - 3}
              </div>
            </div>
          </div>

          <div className="fx m-t-100 fx-j-a fx-a-c fx-j-c competitor-bio">
            <div className="t-sans">{this.state.bio}</div>
          </div>

          <div className="fx fx-col fx-a-c m-t-100 ">{uploads}</div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ userId, email, username, name, authenticated }) => {
  return { userId, email, username, name, authenticated };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: (userId, username, name, email) =>
      dispatch({
        type: `SET_CURRENT_USER`,
        userId,
        username,
        name,
        email
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetitorProfile);
