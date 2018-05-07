import React, { PureComponent } from "react";
import Link from "gatsby-link";

import "../layouts/css/fcss.css";
import "../layouts/css/page.css";

import Nav from "../components/Nav";
import FormInput from "../components/FormInput";
import Switch from "../components/Switch";

import fire from "../fire";
import { connect } from "react-redux";

class Registration extends PureComponent {
  constructor(props) {
    super(props);

    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleSetFieldValue = this.handleSetFieldValue.bind(this);

    var u = fire.auth().currentUser;
    console.log("SIGNED IN USER", u);

    this.state = {
      uid: "",
      name: "",
      username: "",
      email: "",
      password: "",
      subscribeToNewsletter: true,

      name_error: false,
      username_error: false,
      email_error: false,
      password_error: false,

      errorMessage: ""
    };
  }

  handleRegistration() {
    let name = this.state.name;
    let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;

    let error = false;

    if (name.trim() === "") {
      error = true;
      this.setState({
        name_error: true
      });
    } else {
      this.setState({
        name_error: false
      });
    }

    if (username.trim() === "") {
      error = true;
      this.setState({
        username_error: true
      });
    } else {
      this.setState({
        username_error: false
      });
    }

    if (email.trim() === "") {
      error = true;
      this.setState({
        email_error: true
      });
    } else {
      this.setState({
        email_error: false
      });
    }

    if (password.trim() === "") {
      error = true;
      this.setState({
        password_error: true
      });
    } else {
      this.setState({
        password_error: false
      });
    }

    if (error) {
      return;
    }

    let db = fire.database();

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(user) {
        // set user info..
        fire
          .database()
          .ref(`users/${user.uid}`)
          .set({
            name: name,
            username: username,
            email: email
          })
          .then(function() {
            // set shop info

            // subscribe user to our newsletter..
            console.log("SUBSCRIBE TO NEWSLETTER HERE..")

          });
      })
      .catch(
        function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;

          if (error.code === "auth/email-already-in-use") {
            this.setState({
              errorMessage: "This email is already in use."
            });
          }
        }.bind(this)
      );
  }

  handleSetFieldValue(name, value) {
    if (name === "Name") {
      this.setState({
        name: value
      });
    }
    if (name === "Email") {
      this.setState({
        email: value
      });
    }
    if (name === "Password") {
      this.setState({
        password: value
      });
    }

    if (name === "Username") {
      this.setState({
        username: value
      });
    }
  }

  render() {
    console.log("THIS STATE", this.state);
    return (
      <div className="m-b-100">
        <div className="page-banner fx fx-j-c fx-a-c">
          <div className="t-sans t-upper f-28 ls-2 ">Registration</div>
        </div>

        <div className="fx fx-col fx-j-c fx-a-c m-t-30 mx-600">
          <label className="t-sans t-upper f-13 o-5 ls-1">General Info</label>
          <FormInput
            labelTitle="Name"
            hasError={this.state.name_error}
            type="text"
            setFieldValue={value => this.handleSetFieldValue("Name", value)}
          />
          <FormInput
            labelTitle="Username"
            hasError={this.state.username_error}
            type="text"
            setFieldValue={value => this.handleSetFieldValue("Username", value)}
          />
          <FormInput
            labelTitle="Email"
            hasError={this.state.email_error}
            type="email"
            setFieldValue={value => this.handleSetFieldValue("Email", value)}
          />
        </div>

        <div className="fx fx-col fx-j-c fx-a-c m-t-30 mx-600">
          <label className="t-sans t-upper f-13 o-5 ls-1">
            Create a Password
          </label>
          <FormInput
            labelTitle="Password"
            hasError={this.state.password_error}
            type="password"
            setFieldValue={value => this.handleSetFieldValue("Password", value)}
          />
        </div>

        <div className="fx fx-col fx-j-c m-t-30 mx-600">
          <div className="fx fx-a-c">
            <Switch />
            <label className="t-sans f-13 o-5 ls-1 m-l-22">
              Subscribe me to the STAB newsletter
            </label>
          </div>
        </div>

        <div className="fx fx-col fx-j-c m-t-30 mx-600">
          <button
            onClick={() => this.handleRegistration()}
            className="button button__primary t-sans t-upper ls-1"
          >
            Register
          </button>
        </div>

        <div className="fx fx-col fx-j-c m-t-30 mx-600">
          <div className="fx fx-a-c">
            <label className="t-sans f-13  ls-1  fc-red">
              {this.state.errorMessage}
            </label>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userId }) => {
  return { userId };
};

export default connect(mapStateToProps)(Registration);
