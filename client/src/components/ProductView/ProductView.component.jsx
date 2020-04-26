import React, { Component } from "react";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { selectAuthInfo } from "../../Redux/auth/auth.selector";
import { selectWishlistInfo } from "../../Redux/wishlist/wishlist-selector";

class ProductView extends Component {
  state = {
    productData: {},
    user: {},
  };

  componentDidMount() {
    const value = queryString.parse(this.props.history.location.search);
    axios
      .get(`/api/products/singleproduct/${value.id}`)
      .then((product) => {
        axios
          .get(`/api/users/current/${product.data.user}`)
          .then((user) => this.setState({ user: user.data }));
        this.setState({ productData: product.data });
      })
      .catch((err) => this.props.history.push("/"));
  }

  onDelete = (event) => {
    document.getElementById(event.target.id).innerHTML = `<span
  class="spinner-border spinner-border-sm"
  role="status"
  aria-hidden="true"
></span>${" "}Loading...`;
    axios
      .post(`/api/products/deleteproduct`, {
        id: event.target.id,
        userId: event.target.getAttribute("userid"),
      })
      .then((res) => this.props.history.push("/myads"))
      .catch((err) => console.log(err));
  };

  onWishlist = (event) => {
    if (this.props.auth.isAuthenticated) {
      axios
        .post("/api/users/addtowishlist", {
          id: this.props.auth.user.id,
          proId: event.target.id,
        })
        .then((res) => this.props.history.push("/wishlist"))
        .catch((err) => console.log(err));
    } else {
      this.props.history.push("/login");
    }
  };

  onRemove = (event) => {
    document.getElementById(event.target.id).innerHTML = `<span
  class="spinner-border spinner-border-sm"
  role="status"
  aria-hidden="true"
></span>${" "}Loading...`;
    let data = { id: this.props.auth.user.id, proId: event.target.id };
    axios
      .post("/api/users/deleteproductfromwishlist", data)
      .then((res) => {
        localStorage.removeItem("persist:root");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  render() {
    let myWish = false;
    let product = this.state.productData;
    let user = this.state.user;
    this.props.wishlist.myWishlist.map((val) => {
      if (val._id === product._id) {
        myWish = true;
      }
    });
    return (
      <Fragment>
        {/* main component */}
        <main className="mt-5 pt-4">
          <div className="container dark-grey-text mt-5">
            {/* <!--Grid row--> */}
            <div className="row wow fadeIn">
              {/* <!--Grid column--> */}
              <div className="col-md-8 mb-4 text-center my-auto">
                {/* <!-- carousel --> */}
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="0"
                      className="active"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="1"
                    ></li>
                  </ol>
                  <div className="carousel-inner">
                    {!product.photos
                      ? ""
                      : product.photos.map((photo, index) => (
                          <div
                            key={index}
                            className={
                              index === 0
                                ? "carousel-item active"
                                : "carousel-item "
                            }
                          >
                            <img
                              className="d-block w-100"
                              src={photo}
                              alt={index}
                            />
                          </div>
                        ))}
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
                {/* <!-- carousel --> */}
              </div>
              {/* <!--Grid column--> */}

              {/* <!--Grid column--> */}
              <div className="col-md-4 mb-4">
                {/* <!--Content--> */}
                <div className="p-4 mt-5">
                  <h1 className="font-weight-bold mb-4 display-4">
                    ₹ {product.price}
                  </h1>
                  <h2 className="font-weight-bold mb-5">{product.title}</h2>

                  <table className="table md-5">
                    <tbody>
                      <tr>
                        <th scope="row">
                          <i className="fas fa-list-alt"></i>
                        </th>
                        <td>Category</td>
                        <td>{product.category}</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <i className="fas fa-map-marker-alt"></i>
                        </th>
                        <td>Location</td>
                        <td>{product.city}</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <i className="far fa-calendar-alt"></i>
                        </th>
                        <td>Date</td>
                        <td>{Date(product.date).slice(0, 15)}</td>
                      </tr>
                    </tbody>
                  </table>
                  {this.props.auth.user.id === this.state.productData.user ? (
                    <div>
                      <button
                        className="btn btn-danger mt-3"
                        onClick={this.onDelete}
                        id={product._id}
                        userid={user._id}
                      >
                        <i
                          className="fas fa-trash"
                          style={{ color: "#ffffff" }}
                        ></i>
                        {` `}delete
                      </button>
                      <Link to={`/editmyad/?id=${product._id}`}>
                        <button className="btn btn-primary mt-3 ml-3">
                          <i
                            className="fas fa-edit"
                            style={{ color: "#ffffff" }}
                          ></i>
                          {` `}edit
                        </button>
                      </Link>
                    </div>
                  ) : myWish ? (
                    <button
                      className="btn btn-danger mt-3"
                      type="submit"
                      onClick={this.onRemove}
                      id={product._id}
                    >
                      <i
                        className="fas fa-trash"
                        style={{ color: "#ffffff" }}
                      ></i>
                      {` `}Remove from Wishlist
                    </button>
                  ) : (
                    <button
                      className="btn btn-info mt-3"
                      type="submit"
                      onClick={this.onWishlist}
                      id={product._id}
                    >
                      <i
                        className="fas fa-heart"
                        style={{ color: "#ffffff" }}
                      ></i>
                      {` `}Add to Wishlist
                    </button>
                  )}
                </div>
                {/* <!--Content--> */}
              </div>
              {/* <!--Grid column--> */}
            </div>
            {/* <!--Grid row--> */}

            <hr />

            {/* <!--Grid row--> */}
            <div className="row d-flex justify-content-center wow fadeIn">
              {/* <!--Grid column--> */}
              <div className="col-md-6 text-center">
                <h4 className="my-4 h4">Description</h4>

                <p>{product.description}</p>
              </div>
              {/* <!--Grid column--> */}
            </div>
            {/* <!--Grid row--> */}

            {/* <!--Grid row--> */}
            <div className="d-flex justify-content-center mt-5">
              <div className="card card-body bg-info text-white mb-3 col-md-6">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 text-center">
                      <img
                        className="rounded-circle"
                        src={
                          !user.image
                            ? "https://www.gravatar.com/avatar/anything?s=200&d=mm"
                            : user.image
                        }
                        style={{ width: "150px" }}
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h2 className="text-center">Seller Info</h2>
                      <h4 className="text-center">
                        {!user.name
                          ? "You have to be logged to see the user info"
                          : ""}
                      </h4>
                      <h4 className="text-center">{user.name}</h4>
                      <p className="text-center">{user.email}</p>
                      <p className="text-center">
                        {!user.contactNo ? `` : `+91 ${user.contactNo}`}
                      </p>
                      <p className="text-center">
                        {!user.city ? `` : `${user.city}`}
                      </p>
                      <p className="text-center">
                        {user.facebook ? (
                          <Link to={user.facebook} className="text-white p-2">
                            <i className="fab fa-facebook fa-2x"></i>
                          </Link>
                        ) : (
                          <i
                            className="fab fa-facebook fa-2x p-2"
                            style={{ color: "#bbbbbb" }}
                          ></i>
                        )}
                        {user.youtube ? (
                          <Link to={user.youtube} className="text-white p-2">
                            <i className="fab fa-youtube fa-2x"></i>
                          </Link>
                        ) : (
                          <i
                            className="fab fa-youtube fa-2x p-2"
                            style={{ color: "#bbbbbb" }}
                          ></i>
                        )}
                        {user.instagram ? (
                          <Link to={user.instagram} className="text-white p-2">
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
            </div>
          </div>
          {/* <!--Grid row--> */}
        </main>
        {/* <!--Main layout--> */}
      </Fragment>
    );
  }
}

ProductView.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: selectAuthInfo(state),
  wishlist: selectWishlistInfo(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductView));
