import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";

import "../layouts/css/fcss.css";
import "../layouts/css/page.css";


import { connect } from "react-redux";


class Switch extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      on: true
    }
  }


  render() {

    var switchClass = cx({
      'switch': true,
      'switch--on': this.state.on,
      'switch--off': !this.state.on
    });

    var switchControlClass = cx({
      'switch__control': true,
      'switch__control--on': this.state.on,
      'switch__control--off': !this.state.on
    })

    var switchIconClass = cx({
      'fa': true,
      'f-11': true,
      'fa-check': this.state.on,
      'fa-close': !this.state.on
    })

    return (
      <div onClick={()=> this.setState({ on: !this.state.on })} className={switchClass}>
        <div className={switchControlClass}>
          <i className={switchIconClass}></i>
        </div>
      </div>
    );
  }
}

export default Switch;
