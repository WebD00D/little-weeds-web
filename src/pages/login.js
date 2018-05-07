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

class Registration extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSignin = this.handleSignin.bind(this);
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

      email_error: false,
      password_error: false,

      errorMessage: ""
    };
  }

  handleSignin() {

    let email = this.state.email;
    let password = this.state.password;

    let error = false;


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

    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        function(user) {
          fire
            .database()
            .ref("users/" + user.uid)
            .once("value")
            .then(
              function(snapshot) {
                console.log("SIGN IN SNAPSHOT", snapshot.val());
              //  document.cookie = "boardgrab_user" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              //  document.cookie = `boardgrab_user=${user.uid}`;
              //  localStorage.setItem('boardgrab_user', user.uid);

                this.props.setCurrentUser(
                  user.uid,
                  snapshot.val().username,
                  snapshot.val().name,
                  snapshot.val().email,
                );
              }.bind(this)
            );
        }.bind(this)
      )
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("LOGIN ERROR", errorCode, errorMessage);
        this.setState({
          errorMessage: errorMessage
        })
        // ...
      }.bind(this));


  }

  handleSetFieldValue(name, value) {

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


  }

  render() {
    console.log("THIS STATE", this.state);


    if (this.props.authenticated ) {
      return <Redirect to="/" />;
    }

    return (
      <div className="m-b-100">
        <div className="page-banner fx fx-j-c fx-a-c">
          <div className="t-sans t-upper f-28 ls-2 ">Sign In</div>
        </div>

        <div className="fx fx-col fx-j-c fx-a-c m-t-30 mx-600">

          <FormInput
            labelTitle="Username"
            hasError={this.state.email_error}
            type="email"
            setFieldValue={value => this.handleSetFieldValue("Email", value)}
          />
          <FormInput
            labelTitle="Password"
            hasError={this.state.password_error}
            type="password"
            setFieldValue={value => this.handleSetFieldValue("Password", value)}
          />
        </div>

        <div className="fx fx-col fx-j-c m-t-30 mx-600">
          <button
            onClick={() => this.handleSignin()}
            className="button button__primary t-sans t-upper ls-1"
          >
            Sign In
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

const mapStateToProps = ({ userId, email, username, name, authenticated }) => {
  return { userId, email, username, name, authenticated };
};


const mapDispatchToProps = dispatch => {
  return {

    setCurrentUser: (
      userId,
      username,
      name,
      email,

    ) =>
      dispatch({
        type: `SET_CURRENT_USER`,
        userId,
        username,
        name,
        email,
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
