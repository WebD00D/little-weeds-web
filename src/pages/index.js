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

class IndexPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {

    };
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

  componentDidMount() {

  }





  render() {
    return (
      <div id="container">

        <Link to="/registration">Register for Little Weeds</Link>


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

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
