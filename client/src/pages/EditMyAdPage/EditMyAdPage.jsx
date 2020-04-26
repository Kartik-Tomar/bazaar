import React, { Component } from "react";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

import { selectAuthInfo } from "../../Redux/auth/auth.selector";

class EditMyAdPage extends Component {
  state = {
    productData: {},
    user: {},
    image: [],
    errors: {},
  };

  componentDidMount() {
    const value = queryString.parse(this.props.history.location.search);
    axios
      .get(`/api/products/singleproduct/${value.id}`)
      .then((product) => {
        axios
          .get(`/api/users/current/${product.data.user}`)
          .then((user) => this.setState({ user: user.data }));
        this.setState({
          productData: product.data,
        });
      })
      .catch((err) => this.props.history.push("/"));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const newProduct = new FormData(event.target);
    axios
      .post("/api/products/editproduct", newProduct)
      .then((res) => this.props.history.push("/myads"))
      .catch((err) => this.setState({ errors: err.response.data }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let pro = this.state.productData;
    pro[name] = value;
    this.setState({ productData: pro });
  };
  handleChangePhoto = (event) => {
    const { value } = event.target;
    let newState = this.state;
    newState.image.push(value);
    this.setState(newState);
  };

  render() {
    let product = this.state.productData;
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
                  value={product._id}
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
                    value={product.title}
                    onChange={this.handleChange}
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
                    value={product.category}
                    onChange={this.handleChange}
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
                  <select
                    className="form-control form-control-lg"
                    name="city"
                    value={product.city}
                    onChange={this.handleChange}
                  >
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
                    value={product.price}
                    onChange={this.handleChange}
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
                    value={product.description}
                    onChange={this.handleChange}
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
                  <h6 className="text-danger">
                    Note: If you are selecting images, you have to select all
                    the images again
                  </h6>
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
                          onChange={this.handleChangePhoto}
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
                          onChange={this.handleChangePhoto}
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
                          onChange={this.handleChangePhoto}
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
                  <button className="btn btn-info col-5">Save</button>
                  <button className="btn btn-secondary col-5">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditMyAdPage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: selectAuthInfo(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditMyAdPage));
