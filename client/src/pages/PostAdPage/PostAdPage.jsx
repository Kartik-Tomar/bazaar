import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import axios from "axios";
import { Link } from "react-router-dom";

import { selectAuthInfo } from "../../Redux/auth/auth.selector";
import { selectProductInfo } from "../../Redux/product/product-selector";

class PostAdPage extends Component {
  constructor() {
    super();
    this.state = {
      image: [],
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.product.errors) {
      this.setState({ errors: nextProps.auth.errors });
    }
  }

  handleSubmit = (event) => {
    document.getElementById("saveButton").innerHTML = `<span
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
  ></span>${" "}Loading...`;
    event.preventDefault();

    const newProduct = new FormData(event.target);
    axios
      .post("/api/products/addproduct", newProduct)
      .then((res) => this.props.history.push("/myads"))
      .catch((err) => this.setState({ errors: err.response.data }));
  };
  handleChange = (event) => {
    const { value } = event.target;
    let newState = this.state;
    newState.image.push(value);
    this.setState(newState);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="add-product mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Your Product</h1>
              <p className="lead text-center">
                Give good description for better sales.
              </p>
              <form
                enctype="multipart/form-data"
                id="postad"
                onSubmit={this.handleSubmit}
              >
                <input
                  type="text"
                  value={this.props.auth.user.id}
                  name="id"
                  readOnly
                  hidden
                />
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.title,
                    })}
                    placeholder="Title"
                    name="title"
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                  <small className="form-text text-muted">
                    Add Title (max 20 words)
                  </small>
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="category"
                  >
                    <option value="Automobile">Automobile</option>
                    <option value="Real-Estate">Real Estate</option>
                    <option value="Electronics" selected>
                      Electronics
                    </option>
                    <option value="Fashion">Fasion</option>
                    <option value="Pet">Pet</option>
                    <option value="Furniture">Furniture</option>
                  </select>
                  <small className="form-text text-muted">
                    Select Category
                  </small>
                </div>
                <div className="form-group">
                  <select className="form-control form-control-lg" name="city">
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
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
                      <h5>₹</h5>
                    </span>
                  </div>
                  <input
                    type="number"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.price,
                    })}
                    placeholder="Enter Amount"
                    name="price"
                  />
                  {errors.price && (
                    <div className="invalid-feedback">{errors.price}</div>
                  )}
                </div>
                <small className="form-text text-muted mb-4">Enter Price</small>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control", {
                      "is-invalid": errors.description,
                    })}
                    rows="3"
                    placeholder="Add Description (max 100 words)"
                    name="description"
                    form="postad"
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                  <small className="form-text text-muted">
                    Add Description (max 100 words)
                  </small>
                </div>
                <div>
                  <h2>Select Images</h2>
                  <div className="form-group">
                    <br />
                    <div class="input-group">
                      <div class="custom-file">
                        <input
                          type="file"
                          class={classnames("custom-file-input", {
                            "is-invalid": errors.image1,
                          })}
                          id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01"
                          name="image"
                          onChange={this.handleChange}
                        />
                        <label class="custom-file-label" for="inputGroupFile01">
                          {!this.state.image[0]
                            ? "Choose Image"
                            : this.state.image[0]}
                        </label>
                      </div>
                    </div>
                    {errors.image1 && (
                      <small className="form-text text-danger">
                        {errors.image1}
                      </small>
                    )}
                    <small className="form-text text-muted">
                      Primary Photo
                    </small>
                  </div>
                  {/*  */}
                  <div className="form-group">
                    <br />
                    <div class="input-group">
                      <div class="custom-file">
                        <input
                          type="file"
                          class="custom-file-input"
                          id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01"
                          name="image"
                          onChange={this.handleChange}
                        />
                        <label class="custom-file-label" for="inputGroupFile01">
                          {!this.state.image[1]
                            ? "Choose Image"
                            : this.state.image[1]}
                        </label>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="form-group">
                    <br />
                    <div class="input-group">
                      <div class="custom-file">
                        <input
                          type="file"
                          class="custom-file-input"
                          id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01"
                          name="image"
                          onChange={this.handleChange}
                        />
                        <label class="custom-file-label" for="inputGroupFile01">
                          {!this.state.image[2]
                            ? "Choose Image"
                            : this.state.image[2]}
                        </label>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                </div>

                <br />
                <div className="d-flex justify-content-around">
                  <button className="btn btn-info col-5" id="saveButton">
                    Save
                  </button>
                  <Link to="/" className="btn btn-secondary col-5">
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

PostAdPage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: selectAuthInfo(state),
  product: selectProductInfo(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostAdPage));
