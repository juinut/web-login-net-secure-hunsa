import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as userService from "../services/userService";
import "../form.css";
import { toast } from "react-toastify";
class RegisterForm extends Component {
  state = {
    data: { username: "", email: "", password: "" },
    errors: {}
  };
  handleSubmit = e => {
    const { username, email, password } = this.state.data;
    this.setState({ username, email, password });
    e.preventDefault();
    this.doSubmit();
  };
  doSubmit = async () => {
    try {
      await userService.register(this.state.data);
      window.location = "/login";
    } catch (error) {
      console.log(error);
      toast.error("Maybe password is too short");
    }
  };
  //   onChange = e => {
  //     const { name, value } = e.target;
  //     const { username, email } = this.state.data;

  //     this.setState({
  //       [name]: value
  //     });
  //   };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };
  render() {
    const { data, errors } = this.state;
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <Link className="inactive underlineHover" to="/login">
            Sign In
          </Link>
          {/* <h2 className="inactive underlineHover"> Sign In </h2> */}
          <h2 className="active">Sign Up </h2>

          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="fadeIn second"
              name="username"
              placeholder="username"
              onChange={this.handleChange}
            />
            <input
              type="text"
              className="fadeIn second"
              name="email"
              placeholder="email"
              onChange={this.handleChange}
            />
            <input
              type="password"
              className="fadeIn third"
              name="password"
              placeholder="password"
              onChange={this.handleChange}
            />
            <input type="submit" className="fadeIn fourth" value="Sign Up" />
          </form>

          <div id="formFooter">
            <a className="underlineHover" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
