import { h, Component } from "preact";
import { connect } from "mobx-preact";
import login from "./img/sign-in-alt.svg";
import logout from "./img/sign-out-alt.svg";

@connect(["store"])
class Controls extends Component {
  handleSignup = e => {
    e.preventDefault();
    this.props.store.openModal("signup");
  };

  handleLogin = e => {
    e.preventDefault();
    this.props.store.openModal("login");
  };

  handleLogout = e => {
    e.preventDefault();
    this.props.store.openModal("user");
  };

  handleButton = e => {
    e.preventDefault();
    this.props.store.openModal(this.props.store.user ? "user" : "login");
  };

  render() {
    const { user } = this.props.store;

    if (this.props.mode === "button") {
      return (
        <a
          className="netlify-identity-button btn btnIcon"
          href="#"
          onClick={this.handleButton}
        >
          {this.props.image ||
            (user ? "<img src={login} />" : "<img src={logout} />")}
        </a>
      );
    }

    if (user) {
      return (
        <ul className="netlify-identity-menu">
          <li className="netlify-identity-item netlify-identity-user-details">
            Logged in as{" "}
            <span className="netlify-identity-user">
              {user.user_metadata.name || user.email}
            </span>
          </li>
          <li className="netlify-identity-item">
            <a
              className="netlify-identity-logout"
              href="#"
              onClick={this.handleLogout}
            >
              <img src={logout} className="btn btnIcon" alt="logout" />
            </a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="netlify-identity-menu">
        <li className="netlify-identity-item">
          <a
            className="netlify-identity-signup"
            href="#"
            onClick={this.handleSignup}
          >
            Sign up
          </a>
        </li>
        <li className="netlify-identity-item">
          <a
            className="netlify-identity-login"
            href="#"
            onClick={this.handleLogin}
          >
            <img src={login} className="btn btnIcon" alt="login" />
          </a>
        </li>
      </ul>
    );
  }
}

export default Controls;
