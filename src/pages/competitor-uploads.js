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



class CompetitorUploads extends PureComponent {
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
      imgToUse: "",

      caption: "",
      description: "",
      contentType: false,
      videoType: "",
      videoURL: "",

      isUploaded: false,
      uploadDisabled: false,
      uploadText: "UPLOAD"
    };
  }

  uploadPhoto(files) {
    console.log("LOAD IMAGE", LoadImage);

    let originalFile = files[0];

    this.setState({
      imageLoading: true,
      uploadDisabled: true,
      uploadText: "LOADING..."
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
                  imgToUse: snapshot.metadata.downloadURLs[0],
                  imageLoading: false,
                  uploadDisabled: false,
                  uploadText: "UPLOAD"
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

    // avatar
    //
    // caption
    //
    // contentType
    //
    // description
    //
    // videoType
    //
    // videoURL


    const uploadID = Date.now();

    const today = new Date();
    const uploadDate = today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();

    var updates = {};

    updates["/uploads/" + uploadID + "/photo"] = this.state.imgToUse;
    updates["/uploads/" + uploadID + "/caption"] = this.state.caption;
    updates["/uploads/" + uploadID + "/contentType"] = this.state.contentType;
    updates["/uploads/" + uploadID + "/description"] = this.state.description;
    updates["/uploads/" + uploadID + "/videoType"] = this.state.videoType;
    updates["/uploads/" + uploadID + "/videoURL"] = this.state.videoURL;
    updates["/uploads/" + uploadID + "/competitorType"] = this.props.competitorType;
    updates["/uploads/" + uploadID + "/viewCount"] = 0;
    updates["/uploads/" + uploadID + "/competitorName"] = this.props.name;
    updates["/uploads/" + uploadID + "/uploadDate"] = uploadDate;
    updates["/uploads/" + uploadID + "/competitorId"] = this.props.userId;


    updates[this.props.competitorType + "-uploads/" + uploadID + "/photo"] = this.state.imgToUse;
    updates[this.props.competitorType + "-uploads/" + uploadID + "/caption"] = this.state.caption;
    updates[this.props.competitorType + "-uploads/" + uploadID + "/contentType"] = this.state.contentType;
    updates[this.props.competitorType + "-uploads/" + uploadID + "/description"] = this.state.description;
    updates[this.props.competitorType + "-uploads/" + uploadID + "/videoType"] = this.state.videoType;
    updates[this.props.competitorType + "-uploads/" + uploadID + "/videoURL"] = this.state.videoURL;
    updates[this.props.competitorType + "-uploads/" + uploadID + "/competitorType"] = this.props.competitorType;
    updates[this.props.competitorType + "-uploads/" + uploadID + "/viewCount"] = 0;
    updates[this.props.competitorType + "-uploads/" + uploadID + "/competitorName"] = this.props.name;
    updates[this.props.competitorType + "-uploads/" + uploadID + "/uploadDate"] = uploadDate;
    updates[this.props.competitorType + "-uploads/" + uploadID + "/competitorId"] = this.props.userId;


    updates["/competitors/" + this.props.userId + "/uploads/" + uploadID + "/photo"] = this.state.imgToUse;
    updates["/competitors/" + this.props.userId + "/uploads/" + uploadID + "/caption"] = this.state.caption;
    updates["/competitors/" + this.props.userId + "/uploads/" + uploadID + "/contentType"] = this.state.contentType;
    updates["/competitors/" + this.props.userId + "/uploads/" + uploadID + "/description"] = this.state.description;
    updates["/competitors/" + this.props.userId + "/uploads/" + uploadID + "/videoType"] = this.state.videoType;
    updates["/competitors/" + this.props.userId + "/uploads/" + uploadID + "/videoURL"] = this.state.videoURL;
    updates["/competitors/" + this.props.userId + "/uploads/" + uploadID + "/competitorType"] = this.props.competitorType;
    updates["/competitors/" + this.props.userId + "/uploads/" + uploadID + "/viewCount"] = 0;
    updates["/competitors/" + this.props.userId + "/uploads/" + uploadID + "/competitorName"] = this.props.name;
    updates["/competitors/" + this.props.userId + "/uploads/" + uploadID + "/uploadDate"] = uploadDate;
    updates["/competitors/" + this.props.userId + "/uploads/" + uploadID + "/competitorId"] = this.props.userId;

    fire
      .database()
      .ref()
      .update(updates);

    this.setState({
      isUploaded: true
    });
  }

  handleSetFieldValue(name, value) {
    if (name === "Caption") {
      this.setState({
        caption: value
      });
    }

    if (name === "ContentType") {
      this.setState({
        contentType: value
      });
    }

    if (name === "Description") {
      this.setState({
        description: value
      });
    }
    if (name === "VideoType") {
      this.setState({
        videoType: value
      });
    }
    if (name === "VideoURL") {
      this.setState({
        videoURL: value
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
          <div className="t-sans t-upper f-28 ls-2 ">UPLOAD CONTENT</div>
        </div>

        <div className="fx fx-col fx-j-s fx-a-s m-t-30 mx-600">
          <label className="t-sans t-upper f-13 o-5 ls-1">
            CONTENT DETAILS
          </label>
        </div>

        <div className="fx fx-col fx-j-c fx-a-c  mx-600">
          <FormInput
            labelTitle="Caption"
            hasError={this.state.email_error}
            type="text"
            setFieldValue={value => this.handleSetFieldValue("Caption", value)}
          />
          <FormInput
            labelTitle="Description"
            hasError={this.state.email_error}
            type="text"
            setFieldValue={value =>
              this.handleSetFieldValue("Description", value)
            }
          />
        </div>

        <div className="fx fx-col fx-j-s fx-a-s m-t-30 mx-600">
          <label className="t-sans t-upper f-13 o-5 ls-1">MEDIA TYPE</label>
        </div>

        <div className="fx fx-j-c fx-a-s mx-600 fx-col m-t-20">
          <RadioInput
            setFieldValue={value =>
              this.handleSetFieldValue("ContentType", value)
            }
            groupName="contentType"
            label="Photo"
          />
          <RadioInput
            setFieldValue={value =>
              this.handleSetFieldValue("ContentType", value)
            }
            groupName="contentType"
            label="Video"
          />
        </div>

        {this.state.contentType === "Photo" ? (
          <div className="fx fx-col fx-j-s fx-a-s m-t-30 mx-600">
            <label className="t-sans t-upper f-13 o-5 ls-1">
              UPLOAD YOUR PHOTO
            </label>
            <div className="fx fx-a-c fx-j-s">
              <div>
                <div className="fx fx-col fx-j-c fx-a-c m-t-20 ">
                  <Dropzone
                    onDrop={this.uploadPhoto}
                    className="photo-uploader photo-uploader--large"
                    multiple={false}
                  >
                    <div className="t-sans">
                      {this.state.avatar ? (
                        <img
                          style={{ maxWidth: "280px", width: "100%" }}
                          src={this.state.avatar}
                        />
                      ) : (
                        ""
                      )}

                      {this.state.avatar ? (
                        ""
                      ) : (
                        <div className="fx fx-all fx-a-c fx-j-c t-sans f-11 ">
                          DRAG AND DROP YOUR IMAGE <br /> OR CLICK TO SELECT A
                          FILE
                        </div>
                      )}
                    </div>
                  </Dropzone>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {this.state.contentType === "Video" ? (
          <div className="fx fx-col fx-j-s fx-a-s m-t-30 mx-600">
            <label className="t-sans t-upper f-13 o-5 ls-1">
              Video Details
            </label>

            <div className="fx fx-a-s  fx-col m-t-20">
              <RadioInput
                setFieldValue={value =>
                  this.handleSetFieldValue("VideoType", value)
                }
                groupName="videoType"
                label="YouTube"
              />
              <RadioInput
                setFieldValue={value =>
                  this.handleSetFieldValue("VideoType", value)
                }
                groupName="videoType"
                label="Vimeo"
              />
            </div>

            <FormInput
              labelTitle="Video ID"
              hasError={this.state.email_error}
              type="text"
              setFieldValue={value =>
                this.handleSetFieldValue("VideoURL", value)
              }
            />
            <small className="m-t-20 o-5">
              <code><b>Grab the bolded part of your Video Link:</b></code><br /><br />
              <code>
                YouTube Ex:
                https://www.youtube.com/watch?v=<b>yvIGiTwFnn8</b>
              </code>
              <br />
              <code>
                Vimeo Ex:
                https://vimeo.com/<b>225408543</b>
              </code>
            </small>

            {this.state.videoType === "YouTube" && this.state.videoURL ? (
              <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                <iframe
                  className="m-t-30"
                  style={{ maxWidth: "300px" }}
                  src={`https://www.youtube.com/embed/${this.state.videoURL}`}
                  frameborder="0"

                />
              </div>
            ) : (
              ""
            )}

            {this.state.videoType === "Vimeo" && this.state.videoURL ? (
              <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                <iframe
                  className="m-t-30"
                  style={{ maxWidth: "300px" }}
                  src={`https://player.vimeo.com/video/${this.state.videoURL}`}
                  frameborder="0"

                />
              </div>
            ) : (
              ""
            )}


              <label className="t-sans t-upper f-13 o-5 ls-1">
                VIDEO THUMBNAIL
              </label>
              <div className="fx fx-a-c fx-j-s">
                <div>
                  <div className="fx fx-col fx-j-c fx-a-c m-t-20 ">
                    <Dropzone
                      onDrop={this.uploadPhoto}
                      className="photo-uploader photo-uploader--large"
                      multiple={false}
                    >
                      <div className="t-sans">
                        {this.state.avatar ? (
                          <img
                            style={{ maxWidth: "280px", width: "100%" }}
                            src={this.state.avatar}
                          />
                        ) : (
                          ""
                        )}

                        {this.state.avatar ? (
                          ""
                        ) : (
                          <div className="fx fx-all fx-a-c fx-j-c t-sans f-11 ">
                            DRAG AND DROP YOUR IMAGE <br /> OR CLICK TO SELECT A
                            FILE
                          </div>
                        )}
                      </div>
                    </Dropzone>
                  </div>
                </div>
              </div>


          </div>
        ) : (
          ""
        )}

        <div className="fx fx-col fx-j-c m-t-30 mx-600">
          <button
            onClick={() => this.handleRegister()}
            disabled={this.state.uploadDisabled}
            className="button button__primary t-sans t-upper ls-1"
          >
            {this.state.uploadText}
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
              {this.state.isUploaded ? "Upload Successful!" : ""}
            </label>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userId, email, username, name, authenticated, competitorType }) => {
  return { userId, email, username, name, authenticated, competitorType };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: (userId, username, name, email) =>
      dispatch({
        type: `SET_CURRENT_USER`,
        userId,
        username,
        name,
        email,

      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetitorUploads);
