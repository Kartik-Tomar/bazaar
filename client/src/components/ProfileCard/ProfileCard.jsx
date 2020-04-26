import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { selectAuthInfo } from "../../Redux/auth/auth.selector";

class ProfileCard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="m-auto">
                <img
                  className="rounded-circle"
                  src={this.props.auth.user.image}
                  alt=""
                  style={{ width: "200px" }}
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">
                {this.props.auth.user.name}
              </h1>
              <p className="lead text-center">{this.props.auth.user.email}</p>
              <p>
                {this.props.auth.user.contactNo
                  ? `+91 ` + +this.props.auth.user.contactNo
                  : ""}
              </p>
              <p>
                {this.props.auth.user.city ? this.props.auth.user.city : ""}
              </p>
              <p>
                {this.props.auth.user.facebook ? (
                  <Link
                    to={this.props.auth.user.facebook}
                    className="text-white p-2"
                  >
                    <i className="fab fa-facebook fa-2x"></i>
                  </Link>
                ) : (
                  <i
                    className="fab fa-facebook fa-2x p-2"
                    style={{ color: "#bbbbbb" }}
                  ></i>
                )}
                {this.props.auth.user.youtube ? (
                  <Link
                    to={this.props.auth.user.youtube}
                    className="text-white p-2"
                  >
                    <i className="fab fa-youtube fa-2x"></i>
                  </Link>
                ) : (
                  <i
                    className="fab fa-youtube fa-2x p-2"
                    style={{ color: "#bbbbbb" }}
                  ></i>
                )}
                {this.props.auth.user.instagram ? (
                  <Link
                    to={this.props.auth.user.instagram}
                    className="text-white p-2"
                  >
                    <i className="fab fa-instagram fa-2x"></i>
                  </Link>
                ) : (
                  <i
                    className="fab fa-instagram fa-2x p-2"
                    style={{ color: "#bbbbbb" }}
                  ></i>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileCard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: selectAuthInfo(state),
});

export default connect(mapStateToProps)(withRouter(ProfileCard));
