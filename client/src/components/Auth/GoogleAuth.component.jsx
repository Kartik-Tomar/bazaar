import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { googleLogin } from "../../Redux/auth/auth-actions";
import "./googleAuth.style.scss";

class GoogleAuth extends Component {
  responseGoogle = (response) => {
    const data = {
      id: response.profileObj.googleId,
      name: response.profileObj.name,
      email: response.profileObj.email,
      image: response.profileObj.imageUrl,
    };
    this.props.googleLogin(data);
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <GoogleLogin
          clientId="774983211870-m6j8ocp25dmndcdk2a643v5vmfad8e4s.apps.googleusercontent.com"
          render={(renderProps) => (
            <div className="google-btn" onClick={renderProps.onClick}>
              <div className="google-icon-wrapper">
                <img
                  className="google-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="google"
                />
              </div>
              <p className="btn-text">
                <b>Sign in with google</b>
              </p>
            </div>
          )}
          buttonText="Login With Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          className="signInButton"
        />
      </div>
    );
  }
}

GoogleAuth.protoTypes = {
  googleLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  googleLogin: (userData) => dispatch(googleLogin(userData)),
});

export default connect(null, mapDispatchToProps)(GoogleAuth);
