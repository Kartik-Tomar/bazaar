import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { selectAuthInfo } from "../../Redux/auth/auth.selector";
import { editProfile } from "../../Redux/auth/auth-actions";

class EditProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      image: "",
      city: "",
      contactNo: "",
      facebook: "",
      youtube: "",
      instagram: "",
    };
  }

  componentDidUpdate(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    this.setState({
      id: this.props.auth.user.id,
      name: this.props.auth.user.name,
      city: this.props.auth.user.city,
      contactNo: this.props.auth.user.contactNo,
      facebook: this.props.auth.user.facebook,
      youtube: this.props.auth.user.youtube,
      instagram: this.props.auth.user.instagram,
    });
  }

  handleSubmit = (event) => {
    document.getElementById("saveButton").innerHTML = `<span
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
  ></span>${" "}Loading...`;
    event.preventDefault();

    const newUser = {
      id: this.state.id,
      name: this.state.name,
      city: this.state.city,
      contactNo: this.state.contactNo,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    };
    const data = { newUser: newUser, history: this.props.history };
    this.props.editProfile(data);
  };

  handleSubmitPhoto = (event) => {
    document.getElementById("inputGroupFileAddon01").innerHTML = `<span
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
  ></span>${" "}Loading...`;
    event.preventDefault();

    const newPhoto = new FormData(event.target);
    const data = { newUser: newPhoto, history: this.props.history };
    this.props.editProfile(data);
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="create-profile mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back / Dashboard
              </Link>
              <h1 className="display-3 text-center my-2">Edit Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>

              {/* Edit Profile Picture */}
              <form
                onSubmit={this.handleSubmitPhoto}
                encType="multipart/form-data"
              >
                <div className="form-group">
                  <div>
                    <img
                      className="rounded-circle"
                      src={this.props.auth.user.image}
                      alt="my"
                      style={{ width: "200px" }}
                    />
                  </div>
                  <br />
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <button type="submit" className="btn btn-info" disabled>
                        Change Profile Picture
                      </button>
                    </div>
                    <div className="custom-file">
                      <input
                        type="text"
                        value={this.state.id}
                        name="id"
                        readOnly
                        hidden
                      />
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        name="image"
                        onChange={this.handleChange}
                        required
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                      >
                        {this.state.image === ""
                          ? "Choose file"
                          : this.state.image}
                      </label>
                    </div>
                  </div>
                  <small className="form-text text-muted">
                    Change Your Profile Picture
                  </small>
                </div>
                <button
                  type="submit"
                  className="btn btn-info mb-5"
                  id="inputGroupFileAddon01"
                >
                  Save your Profile Picture
                </button>
              </form>

              {/* Edit Profile */}
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="My Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                  />
                  <small className="form-text text-muted">
                    Enter Your Name
                  </small>
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleChange}
                  >
                    <option value=""></option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai"> Mumbai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                  <small className="form-text text-muted">
                    Select your city
                  </small>
                </div>
                <div className="input-group mb-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <h5>+91</h5>
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Contact Number"
                    name="contactNo"
                    value={this.state.contactNo}
                    onChange={this.handleChange}
                  />
                </div>
                <small className="form-text text-muted mb-4">
                  Enter Your Contact Number
                </small>

                <div className="mb-3">
                  <button type="button" className="btn btn-light" disabled>
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fab fa-facebook"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Facebook Page URL"
                    name="facebook"
                    value={this.state.facebook}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fab fa-youtube"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="YouTube Channel URL"
                    name="youtube"
                    value={this.state.youtube}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fab fa-instagram"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Instagram Page URL"
                    name="instagram"
                    value={this.state.instagram}
                    onChange={this.handleChange}
                  />
                </div>
                <br />
                <div className="d-flex justify-content-around">
                  <button
                    id="saveButton"
                    type="submit"
                    className="btn btn-info col-5"
                    onClick={this.onButtonClick}
                  >
                    Save
                  </button>
                  <Link className="btn btn-secondary col-5" to="/dashboard">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfilePage.propTypes = {
  editProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: selectAuthInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  editProfile: (userData) => dispatch(editProfile(userData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfilePage));
