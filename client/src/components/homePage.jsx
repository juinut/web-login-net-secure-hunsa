import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
class HomePage extends Component {
  state = {};
  render() {
    const { name } = this.props.user;

    return (
      <div>
        <h1>Hi {name}</h1>
        <Link to="/logout">Log out</Link>
      </div>
    );
  }
}

export default HomePage;
