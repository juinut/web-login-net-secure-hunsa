import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import HomePage from "./components/homePage";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import auth from "./services/authService";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      jwt: null,
      isLoaded: false
    };
  }
  componentDidMount() {
    try {
      // const jwt = localStorage.getItem("token");
      // const user = jwtDecode(jwt);
      // console.log(user);
      // this.setState({ user });
      const user = auth.getCurrentUser();
      this.setState({ user, isLoaded: true });
    } catch (e) {}
  }
  render() {
    const { user, isLoaded } = this.state;
    console.log(user);

    return (
      <React.Fragment>
        <ToastContainer />
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          {/* <Route path="/homepage" component={HomePage} /> */}

          <Route
            path="/homepage"
            render={props => {
              if (!user) return <Redirect to="/login" />;
              return <HomePage {...props} user={user} />;
            }}
          />

          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/login" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
