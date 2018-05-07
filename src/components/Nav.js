import React, { PureComponent } from "react";
import Link from "gatsby-link";

import "../layouts/css/fcss.css";

import fire from "../fire";
import { connect } from "react-redux";

const styles = {
  navbar: {
    height: "85px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "30px",
    paddingRight: "30px"
  },
  logo: { height: "65px" },
  navRow: { display: "flex", alignItems: "center" }
};

class Nav extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.navbar}>
        <div style={styles.navRow}>
          <img style={styles.logo} src={require("../images/logo.png")} />
          <Link
            className="t-sans t-upper f-11 td-none fc-black m-l-22"
            to="/surf"
          >
            Surf
          </Link>
          <Link
            className="t-sans t-upper f-11 td-none fc-black m-l-22"
            to="/film"
          >
            Film
          </Link>
          <Link
            className="t-sans t-upper f-11 td-none fc-black m-l-22"
            to="/photo"
          >
            Photo
          </Link>
          <Link
            className="t-sans t-upper f-11 td-none fc-black m-l-22"
            to="/model"
          >
            Model
          </Link>
          <Link
            className="t-sans t-upper f-11 td-none fc-black m-l-22"
            to="/creative"
          >
            Creative
          </Link>
        </div>
        <div>
          <Link
            className="t-sans t-upper f-11 td-none fc-black m-l-22"
            to="/registration"
          >
            Authentication
          </Link>
        </div>
      </div>
    );
  }
}

export default Nav;
