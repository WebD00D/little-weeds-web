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

class Surf extends PureComponent {
  constructor(props) {
    super(props);

    var u = fire.auth().currentUser;
    console.log("SIGNED IN USER", u);

    this.state = {
      email_error: false,
      password_error: false,

      uploads: []
    };
  }

  componentDidMount() {
    // GATHER ALL SURF ENTRIES..

    fire
      .database()
      .ref("Surf-uploads/")
      .once("value")
      .then(
        function(snapshot) {
          console.log("SURF MEDIA UPLOADS..", snapshot.val());
          this.setState({
            uploads: snapshot.val()
          });
        }.bind(this)
      );
  }

  render() {
    console.log("THIS STATE", this.state);

    let uploads =
      this.state.uploads &&
      Object.keys(this.state.uploads).map(function(key) {
        console.log("SURF UPLOAD KEY", key);

        let bg = this.state.uploads[key].photo;

        let totalLikes = 0;

        if ( this.state.uploads[key].totalLikes ) {
          totalLikes = this.state.uploads[key].totalLikes;
        }


        return (
          <a href={`/media?id=${key}`} key={key} className="upload-list-item t-sans td-none fc-black">
            <div
              className="upload-list-item__bg"
              style={{
                backgroundImage: `url(${bg})`
              }}
            />
            <div className="p-l-14 upload-list-item__meta">
                <div className="f-16 m-b-10">{this.state.uploads[key].caption}</div>
                <div className="f-13 m-b-10">{this.state.uploads[key].description.substring(0,100)}...</div>
                <div className="f-11 o-5 m-b-10">{ this.state.uploads[key].competitorName } on {this.state.uploads[key].uploadDate}</div>
                <div className="f-11 o-5 fx">
                    <div className="meta-piece">
                      <i className="fa fa-eye p-r-4"></i>
                      {this.state.uploads[key].viewCount}
                    </div>
                    <div className="meta-piece">
                        <i className="fa fa-comment p-r-4"></i>
                        {_.size(this.state.uploads[key].comments)}
                    </div>
                    <div className="meta-piece">
                      <i className="fa fa-thumbs-up p-r-4"></i> {totalLikes}
                    </div>



                </div>
            </div>
          </a>
        )
      }.bind(this));

    if (!this.props.authenticated) {
      return <Redirect to="/registration" />;
    }

    return (
      <div className="m-b-100">
        <div className="page-banner fx fx-j-c fx-a-c m-b-100">
          <div className="t-sans t-upper f-28 ls-2 ">SURF</div>
        </div>

        <div className="upload-list-container">



          {_.reverse(uploads)}




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

export default connect(mapStateToProps, mapDispatchToProps)(Surf);
