import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../fire";
import { Route, Redirect } from "react-router-dom";
import MapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import cx from "classnames";
import _ from "lodash";

import { connect } from "react-redux";

import "../layouts/css/fcss.css";

import CITIES from "../data/cities.json";

class Film extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    // check if user is signed in ..
    // end check if user is signed in..
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  componentDidMount() {}

  render() {
    return (
      <div className="mx-1200" id="container">
        <div className="hero-banner " style={{backgroundImage: `url(${require("../images/DR2.jpg")})`}}>
            <div className="f-38 t-sans fc-white absolute z-3 ls-2 fw-700">FILM</div>
        </div>
        <div className="page-containers">
          <div className="page--primary">


            <div className="main-feed">

            <div className="page--secondary__header">Latest </div>

              <div className="feed-item">
                <div className="feed-item__img"></div>
                <div className="fx fx-col p-l-14">
                  <div className="t-sans fc-red fw-700 f-11 t-upper m-b-4 ls-2">SURF </div>
                  <div className="t-sans f-22 fw-700 m-b-12">Lorem Ipsum Dolar Set Amit</div>
                  <div className="t-sans f-13 lh-22 m-b-12">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard..
                  </div>
                  <div className="t-sans o-5 t-upper f-11"><b>Sam Mcintosh</b> &mdash; 22 min ago</div>
                </div>
              </div>

              <div className="feed-item">
                <div className="feed-item__img"></div>
                <div className="fx fx-col p-l-14">
                  <div className="t-sans fc-red fw-700 f-11 t-upper m-b-4 ls-2">FILM </div>
                  <div className="t-sans f-22 fw-700 m-b-12">Lorem Ipsum Dolar Set Amit</div>
                  <div className="t-sans f-13 lh-22 m-b-12">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard..
                  </div>
                  <div className="t-sans o-5 t-upper f-11"><b>Sam Mcintosh</b> &mdash; 22 min ago</div>
                </div>
              </div>

              <div className="feed-item">
                <div className="feed-item__img"></div>
                <div className="fx fx-col p-l-14">
                  <div className="t-sans fc-red fw-700 f-11 t-upper m-b-4 ls-2">SHAPE </div>
                  <div className="t-sans f-22 fw-700 m-b-12">Lorem Ipsum Dolar Set Amit</div>
                  <div className="t-sans f-13 lh-22 m-b-12">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard..
                  </div>
                  <div className="t-sans o-5 t-upper f-11"><b>Sam Mcintosh</b> &mdash; 22 min ago</div>
                </div>
              </div>

              <div className="feed-item">
                <div className="feed-item__img"></div>
                <div className="fx fx-col p-l-14">
                  <div className="t-sans fc-red fw-700 f-11 t-upper m-b-4 ls-2">MODEL </div>
                  <div className="t-sans f-22 fw-700 m-b-12">Lorem Ipsum Dolar Set Amit</div>
                  <div className="t-sans f-13 lh-22 m-b-12">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard..
                  </div>
                  <div className="t-sans o-5 t-upper f-11"><b>Sam Mcintosh</b> &mdash; 22 min ago</div>
                </div>
              </div>

            </div> {/* END MAIN FEED */}

          </div>
          <div className="page--secondary">
            <div className="page--secondary__header">Mentor's Top 10</div>

            <div className="ranked-item">
                <div className="ranked-item__number">1</div>
                <div className="ranked-item__title">
                  Lorem Ipsum Dolar Set Amit Consectetur Ipiseum
                </div>
                <div className="ranked-item__photo"></div>
            </div>
            <div className="ranked-item">
                <div className="ranked-item__number">2</div>
                <div className="ranked-item__title">Lorem Ipsum Dolar Set Amit Consectetur Ipiseum</div>
                <div className="ranked-item__photo"></div>
            </div>
            <div className="ranked-item">
                <div className="ranked-item__number">3</div>
                <div className="ranked-item__title">Lorem Ipsum Dolar Set Amit Consectetur Ipiseum</div>
                <div className="ranked-item__photo"></div>
            </div>
            <div className="ranked-item">
                <div className="ranked-item__number">4</div>
                <div className="ranked-item__title">Lorem Ipsum Dolar Set Amit Consectetur Ipiseum</div>
                <div className="ranked-item__photo"></div>
            </div>
            <div className="ranked-item">
                <div className="ranked-item__number">5</div>
                <div className="ranked-item__title">Lorem Ipsum Dolar Set Amit Consectetur Ipiseum</div>
                <div className="ranked-item__photo"></div>
            </div>
            <div className="ranked-item">
                <div className="ranked-item__number">6</div>
                <div className="ranked-item__title">Lorem Ipsum Dolar Set Amit Consectetur Ipiseum</div>
                <div className="ranked-item__photo"></div>
            </div>
            <div className="ranked-item">
                <div className="ranked-item__number">7</div>
                <div className="ranked-item__title">Lorem Ipsum Dolar Set Amit Consectetur Ipiseum</div>
                <div className="ranked-item__photo"></div>
            </div>
            <div className="ranked-item">
                <div className="ranked-item__number">8</div>
                <div className="ranked-item__title">Lorem Ipsum Dolar Set Amit Consectetur Ipiseum</div>
                <div className="ranked-item__photo"></div>
            </div>
            <div className="ranked-item">
                <div className="ranked-item__number">9</div>
                <div className="ranked-item__title">Lorem Ipsum Dolar Set Amit Consectetur Ipiseum</div>
                <div className="ranked-item__photo"></div>
            </div>
            <div className="ranked-item">
                <div className="ranked-item__number">10</div>
                <div className="ranked-item__title">Lorem Ipsum Dolar Set Amit Consectetur Ipiseum</div>
                <div className="ranked-item__photo"></div>
            </div>

            <div className="side-ad t-sans">Advertisement</div>


            <div className="page--secondary__header">Featured Competitors</div>

            <div className="ranked-item fx-s-b">
                <div className="ranked-item__title fx-col">
                  <div className="fc-red f-11 m-b-4">SURF</div>
                  <div className="m-b-4"><b>Christian Bryant</b></div>
                  <div className="f-13">Lorem ipsum dolar set amit consectetur ipeset foretune eet em eset.</div>
                </div>
                <div className="ranked-item__photo"></div>
            </div>
            <div className="ranked-item fx-s-b">
                <div className="ranked-item__title fx-col">
                  <div className="fc-red f-11 m-b-4">MODEL</div>
                  <div className="m-b-4"><b>Christian Bryant</b></div>
                  <div className="f-13">Lorem ipsum dolar set amit consectetur ipeset foretune eet em eset.</div>
                </div>
                <div className="ranked-item__photo"></div>
            </div>
            <div className="ranked-item fx-s-b">
                <div className="ranked-item__title fx-col">
                  <div className="fc-red f-11 m-b-4">FILM</div>
                  <div className="m-b-4"><b>Christian Bryant</b></div>
                  <div className="f-13">Lorem ipsum dolar set amit consectetur ipeset foretune eet em eset.</div>
                </div>
                <div className="ranked-item__photo"></div>
            </div>
            <div className="ranked-item fx-s-b">
                <div className="ranked-item__title fx-col">
                  <div className="fc-red f-11 m-b-4">PHOTO</div>
                  <div className="m-b-4"><b>Christian Bryant</b></div>
                  <div className="f-13">Lorem ipsum dolar set amit consectetur ipeset foretune eet em eset.</div>
                </div>
                <div className="ranked-item__photo"></div>
            </div>
            <div className="ranked-item fx-s-b">
                <div className="ranked-item__title fx-col">
                  <div className="fc-red f-11 m-b-4">SHAPER</div>
                  <div className="m-b-4"><b>Christian Bryant</b></div>
                  <div className="f-13">Lorem ipsum dolar set amit consectetur ipeset foretune eet em eset.</div>
                </div>
                <div className="ranked-item__photo"></div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  userId,
  latitude,
  longitude,
  regions,
  mapZoom,
  citesByRegion,
  boardsByCity,
  allBoardsList,
  boardsToDisplay,
  account_username,
  selectedCity,
  regionHasNoBoards,
  selectedRegion,
  isSeller,
  userAuthenticated,
  accessGranted
}) => {
  return {
    userId,
    latitude,
    longitude,
    regions,
    mapZoom,
    citesByRegion,
    boardsByCity,
    allBoardsList,
    boardsToDisplay,
    account_username,
    selectedCity,
    regionHasNoBoards,
    selectedRegion,
    isSeller,
    userAuthenticated,
    accessGranted
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMapPosition: (latitude, longitude) =>
      dispatch({ type: `SET_MAP_POSITION`, latitude, longitude }),
    setCityData: city => dispatch({ type: `SET_CITY_DATA`, city }),
    setRegionData: region =>
      dispatch({ type: `SET_REGION_AND_CITIES`, region }),
    getAllBoards: boards => dispatch({ type: `GET_ALL_BOARDS`, boards }),
    getAllBoardsByRegion: boards =>
      dispatch({ type: `GET_ALL_BOARDS_BY_REGION`, boards }),
    getAllBoardsByCity: boards =>
      dispatch({ type: `GET_ALL_BOARDS_BY_CITY`, boards }),
    allowAccess: () => dispatch({ type: `ALLOW_ACCESS` }),
    setCurrentUser: (
      userId,
      username,
      email,
      hasNotifications,
      paypal_email,
      seller
    ) =>
      dispatch({
        type: `SET_CURRENT_USER`,
        userId,
        username,
        email,
        hasNotifications,
        paypal_email,
        seller
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Film);
