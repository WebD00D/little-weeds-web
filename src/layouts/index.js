import React, { PureComponent } from "react";

import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";

import Nav from "../components/Nav";


import fire from '../fire';

import { connect } from "react-redux";

const Counter = ({ count, increment }) => (
  <div>
    <p>Count: {count} </p>
    <button onClick={increment}>Increment</button>
  </div>
)

const mapStateToProps = ({ count }) => {
  return { count }
}

const mapDispatchToProps = dispatch => {
  return { increment: () => dispatch({ type: `INCREMENT` }) }
}

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter)

class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Helmet
          title="Little Weeds"
          meta={[
            { name: "description", content: "Sample" },
            { name: "keywords", content: "sample, something" }
          ]}
        />
        {/* <Navbar /> */ }
        <div className="nav-container">
        <Nav />
        {this.props.children()}
      </div>
      </div>
    );
  }
}


TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
