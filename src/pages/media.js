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

import _ from "lodash";

class Media extends PureComponent {
  constructor(props) {
    super(props);

    this.getUrlVars = this.getUrlVars.bind(this);
    this.saveComment = this.saveComment.bind(this);
    this.updateCommentLikes = this.updateCommentLikes.bind(this);
    this.upVote = this.upVote.bind(this);

    var u = fire.auth().currentUser;
    console.log("SIGNED IN USER", u);

    this.state = {
      //flags
      showCommentBox: false,

      // comment
      comment: "",
      hasLiked: false,

      //data
      mediaId: "",
      contentType: "Video",
      videoType: "Vimeo",
      videoId: "",
      photoURL: "",
      competitorType: "",
      description: "",
      caption: "",
      competitorName: "",
      competitorId: "",
      uploadDate: "",
      viewCount: 0,
      comments: [],
      totalLikes: 0,
    };
  }

  componentDidMount() {
    var mediaId = this.getUrlVars()["id"];

    this.setState({
      mediaId: mediaId
    });

    let competitorId = "";
    let competitorType = "";
    let viewCount = 0;

    fire
      .database()
      .ref("uploads/" + mediaId)
      .once("value")
      .then(
        function(snapshot) {
          console.log("MEDIA SNAPSHOT", snapshot.val());

          this.setState({
            contentType: snapshot.val().contentType,
            caption: snapshot.val().caption,
            competitorType: snapshot.val().competitorType,
            description: snapshot.val().description,
            photoURL: snapshot.val().photo,
            videoId: snapshot.val().videoURL,
            videoType: snapshot.val().videoType,
            competitorName: snapshot.val().competitorName,
            uploadDate: snapshot.val().uploadDate,
            viewCount: snapshot.val().viewCount,
            comments: snapshot.val().comments,
            competitorId: snapshot.val().competitorId,
            totalLikes: snapshot.val().totalLikes || 0
          });

          competitorId = snapshot.val().competitorId;
          competitorType = snapshot.val().competitorType;
          viewCount = snapshot.val().viewCount;

          var updates = {};
          updates["/uploads/" + mediaId + "/viewCount"] = parseInt(
            viewCount + 1
          );
          updates[
            "/competitors/" +
              competitorId +
              "/uploads/" +
              mediaId +
              "/viewCount"
          ] = parseInt(viewCount + 1);
          updates[
            competitorType + "-uploads/" + mediaId + "/viewCount"
          ] = parseInt(viewCount + 1);

          fire
            .database()
            .ref()
            .update(updates);
        }.bind(this)
      );


      // CHECK IF THE CURRENT USER HAS LIKE THIS VIDEO ALREADY..

      fire
        .database()
        .ref("users/" + this.props.userId + "/likes/" + mediaId)
        .once("value")
        .then(function(snapshot){
          console.log("HAS LIKED SNAP", snapshot.val());


          if ( snapshot.val() ) {
            this.setState({
              hasLiked: true
            })
          } else {
            this.setState({
              hasLiked: false
            })
          }



        }.bind(this))


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

  saveComment() {
    if (this.state.comment.trim() === "") {
      return;
    }

    var dateId = Date.now();

    var updates = {};

    const today = new Date();
    const commentDate =
      today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();

    updates[
      "/uploads/" + this.state.mediaId + "/comments/" + dateId + "/comment"
    ] = this.state.comment;
    updates[
      "/uploads/" + this.state.mediaId + "/comments/" + dateId + "/commenterId"
    ] = this.props.userId;
    updates[
      "/uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/commenterUsername"
    ] = this.props.username;
    updates[
      "/uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/commenterName"
    ] = this.props.name;
    updates[
      "/uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/commenterEmail"
    ] = this.props.email;
    updates[
      "/uploads/" + this.state.mediaId + "/comments/" + dateId + "/commentTime"
    ] = commentDate;
    updates[
      "/uploads/" + this.state.mediaId + "/comments/" + dateId + "/likes"
    ] = 0;

    updates[
      this.state.competitorType +
        "-uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/comment"
    ] = this.state.comment;
    updates[
      this.state.competitorType +
        "-uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/commenterId"
    ] = this.props.userId;
    updates[
      this.state.competitorType +
        "-uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/commenterUsername"
    ] = this.props.username;
    updates[
      this.state.competitorType +
        "-uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/commenterName"
    ] = this.props.name;
    updates[
      this.state.competitorType +
        "-uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/commenterEmail"
    ] = this.props.email;
    updates[
      this.state.competitorType +
        "-uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/commenterTime"
    ] = commentDate;
    updates[
      this.state.competitorType +
        "-uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/likes"
    ] = 0;

    updates[
      "/competitors/" +
        this.state.competitorId +
        "/uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/comment"
    ] = this.state.comment;
    updates[
      "/competitors/" +
        this.state.competitorId +
        "/uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/commenterId"
    ] = this.props.userId;
    updates[
      "/competitors/" +
        this.state.competitorId +
        "/uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/commenterUsername"
    ] = this.props.username;
    updates[
      "/competitors/" +
        this.state.competitorId +
        "/uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/commenterName"
    ] = this.props.name;
    updates[
      "/competitors/" +
        this.state.competitorId +
        "/uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/commenterEmail"
    ] = this.props.email;
    updates[
      "/competitors/" +
        this.state.competitorId +
        "/uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/commenterTime"
    ] = commentDate;
    updates[
      "/competitors/" +
        this.state.competitorId +
        "/uploads/" +
        this.state.mediaId +
        "/comments/" +
        dateId +
        "/likes"
    ] = 0;

    fire
      .database()
      .ref()
      .update(updates);

    fire
      .database()
      .ref("uploads/" + this.state.mediaId)
      .once("value")
      .then(
        function(snapshot) {
          console.log("MEDIA SNAPSHOT AFTER COMMENT", snapshot.val());

          this.setState({
            contentType: snapshot.val().contentType,
            caption: snapshot.val().caption,
            competitorType: snapshot.val().competitorType,
            description: snapshot.val().description,
            photoURL: snapshot.val().photo,
            videoId: "249124889",
            videoType: snapshot.val().videoType,
            competitorName: snapshot.val().competitorName,
            uploadDate: snapshot.val().uploadDate,
            viewCount: snapshot.val().viewCount,
            comments: snapshot.val().comments,
            competitorId: snapshot.val().competitorId,
            showCommentBox: false,
            totalLikes: snapshot.val().totalLikes || 0

          });
        }.bind(this)
      );
  }

  updateCommentLikes(commentId, likes) {
    const newLikes = parseInt(likes) + 1;

    var updates = {};

    updates[
      "/uploads/" + this.state.mediaId + "/comments/" + commentId + "/likes"
    ] = newLikes;
    updates[
      this.state.competitorType +
        "-uploads/" +
        this.state.mediaId +
        "/comments/" +
        commentId +
        "/likes"
    ] = newLikes;
    updates[
      "/competitors/" +
        this.state.competitorId +
        "/uploads/" +
        this.state.mediaId +
        "/comments/" +
        commentId +
        "/likes"
    ] = newLikes;

    fire
      .database()
      .ref()
      .update(updates);

    fire
      .database()
      .ref("uploads/" + this.state.mediaId)
      .once("value")
      .then(
        function(snapshot) {
          console.log("MEDIA SNAPSHOT AFTER COMMENT", snapshot.val());

          this.setState({
            contentType: snapshot.val().contentType,
            caption: snapshot.val().caption,
            competitorType: snapshot.val().competitorType,
            description: snapshot.val().description,
            photoURL: snapshot.val().photo,
            videoId: "249124889",
            videoType: snapshot.val().videoType,
            competitorName: snapshot.val().competitorName,
            uploadDate: snapshot.val().uploadDate,
            viewCount: snapshot.val().viewCount,
            comments: snapshot.val().comments,
            competitorId: snapshot.val().competitorId,
            showCommentBox: false,
            totalLikes: snapshot.val().totalLikes || 0

          });
        }.bind(this)
      );
  }

  upVote() {

    const newTotalCount = parseInt(this.state.totalLikes) + 1;


    fire
      .database()
      .ref()

      var updates = {};

      updates[
        "users/" + this.props.userId + "/likes/" + this.state.mediaId + "/totalLikes"
      ] = true;
      updates["/competitors/" + this.props.userId + "/uploads/" + this.state.mediaId + "/totalLikes"] = newTotalCount
      updates[this.state.competitorType + "-uploads/" + this.state.mediaId + "/totalLikes"] = newTotalCount
      updates["/uploads/" + this.state.mediaId + "/totalLikes"] = newTotalCount

      fire
        .database()
        .ref()
        .update(updates);


        this.setState({
          hasLiked: true,
          totalLikes: newTotalCount
        })


  }

  render() {
    console.log("THIS STATE", this.state);

    if (!this.props.authenticated) {
      return <Redirect to="/registration" />;
    }

    let comments =
      this.state.comments &&
      Object.keys(this.state.comments).map(
        function(key) {
          var d = new Date(key);

          console.log("UPLOAD DATE", d.toLocaleString());

          return (
            <div key={key} className="fx fx-col m-t-30 mx-992">
              <div className="t-sans f-13 ls-1  bb-solid-lgrey p-b-20 p-t-20 fx fx-a-s">
                <div className=" lh-18 fx fx-col">
                  <div> {this.state.comments[key].comment}</div>
                  <label className="t-sans f-11 m-t-4 ls-1  o-5">
                    {" "}
                    {this.state.comments[key].commenterUsername} @{" "}
                    {this.state.comments[key].commentTime}
                  </label>
                  <label
                    onClick={() =>
                      this.updateCommentLikes(
                        key,
                        this.state.comments[key].likes
                      )
                    }
                    className="t-sans f-11 m-t-4 ls-1 hover o-5"
                  >
                    <i className="fa fa-thumbs-up" />{" "}
                    {this.state.comments[key].likes}
                  </label>
                </div>
              </div>
            </div>
          );
        }.bind(this)
      );

    return (
      <div className="m-b-100">
        {this.state.showCommentBox ? (
          <div className="comment-modal">
            <div className="comment-modal__box">
              <div className="comment-modal__box-content">
                <div className="t-sans m-b-20">Leave a Comment</div>
                <textarea
                  onChange={e => this.setState({ comment: e.target.value })}
                />
                <div className="fx">
                  <button
                    onClick={() => this.saveComment()}
                    className="comment-button"
                  >
                    ADD COMMENT
                  </button>
                  <button
                    onClick={() => this.setState({ showCommentBox: false })}
                    className="comment-button"
                    style={{
                      backgroundColor: "#f5f5f5",
                      color: "black",
                      marginLeft: "12px"
                    }}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className=" mx-992 m-t-100">
          {this.state.contentType === "Video" &&
          this.state.videoType === "Vimeo" ? (
            <div className="embed-container">
              <iframe
                src={`https://player.vimeo.com/video/${
                  this.state.videoId
                }?title=0&byline=0&portrait=0`}
              />
            </div>
          ) : (
            ""
          )}

          {this.state.contentType === "Video" &&
          this.state.videoType === "YouTube" ? (
            <div className="embed-container">
            <iframe  src={`https://www.youtube.com/embed/${this.state.videoId}`} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          ) : (
            ""
          )}

          {this.state.contentType === "Photo" ? (
            <img
              style={{ height: "auto", width: "100%" }}
              src={this.state.photoURL}
            />
          ) : (
            ""
          )}
        </div>

        <div className="fx fx-col fx-j-s fx-a-s m-t-30 mx-992">
          <div className="media-title__bar">
            <div className="fx fx-col">
              <label className="t-sans f-28 ls-1 fw-500">
                {this.state.caption}
              </label>
              <label className="t-sans t-upper f-13 o-5 ls-1 m-t-8">
                {this.state.viewCount} Views
              </label>
            </div>
            <div>
              <label className="t-sans t-upper f-13 o-5 ls-1"> {
                !this.state.hasLiked ?
                  <div onClick={ ()=> this.upVote() }><i className="fa fa-thumbs-o-up"></i> {this.state.totalLikes}</div>
                : <div> <i className="fa fa-thumbs-up"></i> {this.state.totalLikes}</div> } </label>
            </div>
          </div>
        </div>

        <div className="fx fx-col fx-j-s fx-a-s mx-992 m-t-20 bb-solid-lgrey">
          <div className="profile-media-block">
            <div className="profile-photo--sm" />
            <div className="fx fx-col">
              <label className="t-sans f-13 ls-1 p-l-14">
                {this.state.competitorName}
              </label>
              <label className="t-sans f-11 m-t-4 ls-1 p-l-14 o-5">
                {this.state.uploadDate}
              </label>
            </div>
          </div>

          <div className="t-sans f-13 ls-1 m-t-8 p-l-64  p-b-20 lh-18 ">
            {this.state.description}
          </div>
        </div>

        {/* COMMENTS */}

        <div className="fx fx-s-b fx-a-c m-t-30 mx-992">
          <label className="t-sans t-upper f-13 o-5 ls-1">
            ({_.size(this.state.comments)}) COMMENTS
          </label>
          <button
            onClick={() => this.setState({ showCommentBox: true })}
            className="comment-button"
          >
            ADD COMMENT
          </button>
        </div>

        {comments}
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

export default connect(mapStateToProps, mapDispatchToProps)(Media);
