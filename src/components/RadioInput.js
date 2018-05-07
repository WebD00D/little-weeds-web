import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";


import "../layouts/css/fcss.css";
import "../layouts/css/page.css";


import { connect } from "react-redux";


class RadioInput extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

    const inputClass = cx({
      'input-wrap': true,
      'input-wrap--error': this.props.hasError
    })

    return (
      <div className="m-b-10">
      <input  onChange={(e) => this.props.setFieldValue(this.props.label)} type="radio" id={this.props.label} name={this.props.groupName}  />
      <label className="t-sans t-upper f-13 ls-1" htmlFor={this.props.label}>{this.props.label}</label>
      </div>
    );
  }
}

export default RadioInput;
