import React, { PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";

import Link from "gatsby-link";

import "../layouts/css/fcss.css";
import "../layouts/css/page.css";

import Nav from "../components/Nav";
import FormInput from "../components/FormInput";
import RadioInput from "../components/RadioInput";
import Switch from "../components/Switch";

import fire from "../fire";
import { connect } from "react-redux";

import Dropzone from "react-dropzone";
import LoadImage from "blueimp-load-image";

class CompetitorRegistration extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSetFieldValue = this.handleSetFieldValue.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

    var u = fire.auth().currentUser;
    console.log("SIGNED IN USER", u);

    this.state = {
      email_error: false,
      password_error: false,

      errorMessage: "",
      imageLoading: false,
      avatar: "",
      city: "",
      state: "",
      country: "",
      talent: "",
      bio: "",
      isRegistered: false

    };
  }

  uploadPhoto(files) {
    console.log("LOAD IMAGE", LoadImage);

    let originalFile = files[0];

    this.setState({
      imageLoading: true
    });

    LoadImage(
      originalFile,
      function(img) {
        img.toBlob(
          function(blob) {
            console.log(blob);

            var url = URL.createObjectURL(blob);
            console.log("URL", url);
            this.setState({
              avatar: url
            });

            const dateTime = Date.now();
            const storageRef = fire
              .storage()
              .ref()
              .child(`photo-${dateTime}-${files[0].name}`);
            storageRef.put(blob).then(
              function(snapshot) {
                this.setState({
                  avatar: snapshot.metadata.downloadURLs[0],
                  imageLoading: false
                });
              }.bind(this)
            );
          }.bind(this)
        );
      }.bind(this),
      {
        orientation: true
      }
    );
  }


  handleRegister() {

    // set user node for 'isCompetitor' to true
    var updates = {}
    updates['/users/' + this.props.userId + "/isCompetitor"] = true;
    updates['/users/' + this.props.userId + "/competitorType"] = this.state.talent;


    updates['/competitors/' + this.props.userId + "/name"] = this.props.name;
    updates['/competitors/' + this.props.userId + "/photo"] = this.state.avatar;
    updates['/competitors/' + this.props.userId + "/city"] = this.state.city;
    updates['/competitors/' + this.props.userId + "/state"] = this.state.state;
    updates['/competitors/' + this.props.userId + "/country"] = this.state.country;
    updates['/competitors/' + this.props.userId + "/talent"] = this.state.talent;
    updates['/competitors/' + this.props.userId + "/bio"] = this.state.bio;


    updates[ this.state.talent + "/" + this.props.userId + "/name"] = this.props.name;
    updates[ this.state.talent + "/" + this.props.userId + "/photo"] = this.state.avatar;
    updates[ this.state.talent + "/" + this.props.userId + "/country"] = this.state.country;


    fire
    .database()
    .ref()
    .update(updates);


    this.setState({
      isRegistered: true
    })

  }

  handleSetFieldValue(name, value) {
    if (name === "City") {
      this.setState({
        city: value
      });
    }
    if (name === "State") {
      this.setState({
        state: value
      });
    }
    if (name === "Country") {
      this.setState({
        country: value
      });
    }
    if (name === "Talent") {
      this.setState({
        talent: value
      });
    }
    if (name === "Bio") {
      this.setState({
        bio: value
      });
    }
  }

  render() {
    console.log("THIS STATE", this.state);

    if (!this.props.authenticated) {
      return <Redirect to="/registration" />;
    }

    return (
      <div className="m-b-100">
        <div className="page-banner fx fx-j-c fx-a-c">
          <div className="t-sans t-upper f-28 ls-2 ">
            COMPETITOR REGISTRATION
          </div>
        </div>

        <div className="fx fx-col fx-j-s fx-a-s m-t-30 mx-600">
          <label className="t-sans t-upper f-13 o-5 ls-1">PROFILE PHOTO</label>
        </div>

        <div className="fx fx-a-c mx-600 fx-j-s">
          <div>
            <div className="fx fx-col fx-j-c fx-a-c m-t-20 mx-600">
              <Dropzone
                onDrop={this.uploadPhoto}
                className="photo-uploader"
                multiple={false}
              >
                <div className="t-sans">
                  {this.state.avatar ? (
                    <img style={{ maxWidth: "180px", width: '100%' }} src={this.state.avatar} />
                  ) : (
                    ""
                  )}
                </div>
              </Dropzone>
            </div>
          </div>
          <div className="fx fx-all fx-a-c fx-j-c t-sans f-11">
            DRAG AND DROP AN IMAGE OR CLICK TO SELECT A FILE
          </div>
        </div>

        <div>
          <div className="fx fx-col fx-j-s fx-a-s m-t-30 mx-600">
            <label className="t-sans t-upper f-13 o-5 ls-1">LOCATION</label>
          </div>

          <div className="fx fx-col fx-j-c fx-a-c  mx-600">
            <FormInput
              labelTitle="City"
              hasError={this.state.email_error}
              type="email"
              setFieldValue={value => this.handleSetFieldValue("City", value)}
            />
            <FormInput
              labelTitle="State"
              hasError={this.state.email_error}
              type="email"
              setFieldValue={value => this.handleSetFieldValue("State", value)}
            />
            <FormInput
              labelTitle="Country"
              hasError={this.state.email_error}
              type="email"
              setFieldValue={value =>
                this.handleSetFieldValue("Country", value)
              }
            />
          </div>

          <div className="fx fx-col fx-j-s fx-a-s m-t-30 mx-600">
            <label className="t-sans t-upper f-13 o-5 ls-1">YOUR TALENT</label>
          </div>

          <div className="fx fx-j-c fx-a-s mx-600 fx-col m-t-20">
            <RadioInput
              setFieldValue={value => this.handleSetFieldValue("Talent", value)}
              groupName="talent"
              label="Surf"
            />
            <RadioInput
              setFieldValue={value => this.handleSetFieldValue("Talent", value)}
              groupName="talent"
              label="Film"
            />
            <RadioInput
              setFieldValue={value => this.handleSetFieldValue("Talent", value)}
              groupName="talent"
              label="Creative"
            />
            <RadioInput
              setFieldValue={value => this.handleSetFieldValue("Talent", value)}
              groupName="talent"
              label="Photo"
            />
            <RadioInput
              setFieldValue={value => this.handleSetFieldValue("Talent", value)}
              groupName="talent"
              label="Model"
            />
          </div>

          <div className="fx fx-col fx-j-c fx-a-c  mx-600">
            <FormInput
              labelTitle="SHORT BIO"
              hasError={this.state.email_error}
              type="email"
              setFieldValue={value => this.handleSetFieldValue("Bio", value)}
            />
          </div>
        </div>

        <div className="fx fx-col fx-j-c m-t-30 mx-600">
          <button
            onClick={() => this.handleRegister()}
            className="button button__primary t-sans t-upper ls-1"
          >
            REGISTER
          </button>
        </div>

        <div className="fx fx-col fx-j-c m-t-30 mx-600">
          <div className="fx fx-a-c">
            <label className="t-sans f-13  ls-1  fc-red">
              {this.state.errorMessage}
            </label>
          </div>
        </div>


        <div className="fx fx-col fx-j-c m-t-30 mx-600">
          <div className="fx fx-a-c">
            <label className="t-sans f-13  ls-1  fc-green">
              {this.state.isRegistered ? "Registered!" : ""}
            </label>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  CompetitorRegistration
);
