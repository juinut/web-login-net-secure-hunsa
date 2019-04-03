import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import "../form.css";
import { toast } from "react-toastify";

class LoginForm extends Component {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };
  handleSubmit = e => {
    const { email, password } = this.state.data;
    this.setState({ email, password });
    e.preventDefault();
    this.doSubmit();
  };
  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);

      window.location = "/homepage";
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };
  toastTrolling = () => {
    toast.info("Poor you :)");
  };
  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active"> Sign In </h2>
          <Link className="inactive underlineHover" to="/register">
            Sign Up
          </Link>
          {/* <h2 className="inactive underlineHover">Sign Up </h2> */}

          <form onSubmit={this.handleSubmit}>
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
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>

          <div id="formFooter">
            <a className="underlineHover" href="#" onClick={this.toastTrolling}>
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
