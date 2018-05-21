import React, { PureComponent } from "react";
import Link from "gatsby-link";

import "../layouts/css/fcss.css";
import "../layouts/css/page.css";

import fire from "../fire";
import { connect } from "react-redux";

class Nav extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="navigation">
          <div className="navigation--top">
            <div className="navigation--top-left">
              <i className="fa fa-search" />
            </div>
            <a href="/"><img
              className="navigation__logo"
              src={require("../images/logo.png")}
            /></a>
            <div className="navigation--top-right">
              <span className="fc-red t-sans f-13 m-r-4">
                Subscribe
              </span>
              <span className="f-13 t-italic o-5 m-r-22">to Little Weeds </span>
              <button className="button__primary button__sm">Join</button>
              <i className="fa fa-bars m-l-22" />
            </div>
          </div>
        </div>
        <div className="navigation">
          <div className="navigation--bottom">
            <Link className="t-sans t-upper td-none f-13 fc-black ls-2 m-h-22" to="/surf">SURF</Link>
            <Link className="t-sans t-upper td-none f-13 fc-black ls-2 m-h-22" to="/film">FILM</Link>
            <Link className="t-sans t-upper td-none f-13 fc-black ls-2 m-h-22" to="/shape">SHAPE</Link>
            <Link className="t-sans t-upper td-none f-13 fc-black ls-2 m-h-22" to="/photo">PHOTO</Link>
            <Link className="t-sans t-upper td-none f-13 fc-black ls-2 m-h-22" to="/model">MODEL</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
