import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";


import "../layouts/css/fcss.css";
import "../layouts/css/page.css";


import { connect } from "react-redux";


class FormInput extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

    const inputClass = cx({
      'input-wrap': true,
      'input-wrap--error': this.props.hasError
    })

    return (
      <div className={inputClass}>
        <div className="input-label t-sans t-upper f-11 ls-1">
          <span>{this.props.labelTitle}</span>
        </div>
        <input onChange={(e) => this.props.setFieldValue(e.target.value) } type={this.props.type} />
      </div>
    );
  }
}

export default FormInput;
