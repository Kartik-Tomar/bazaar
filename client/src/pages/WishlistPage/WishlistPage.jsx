import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

import { selectAuthInfo } from "../../Redux/auth/auth.selector";
import { getWishlist } from "../../Redux/wishlist/wishlist-action";
import { selectWishlistInfo } from "../../Redux/wishlist/wishlist-selector";

import ProductCard from "../../components/ProductCard/ProductCard.component";

class WishlistPage extends Component {
  componentDidMount() {
    axios
      .get(`/api/users/current/${this.props.auth.user.id}`)
      .then((user) => this.props.getWishlist(user.data.myWishlist));
  }

  onClick = (event) => {
    this.props.history.push(`/product/?id=${event.target.id}`);
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

  timeout = () => {
    setTimeout(() => {
      if (this.props.wishlist.myWishlist.length === 0) {
        if (document.getElementById("loaderChild")) {
          document.getElementById("loaderChild").remove();
          document.getElementById(
            "loader"
          ).innerHTML = `<h1 class="display-4">No Items in Wishlist</h1>`;
        }
      }
    }, 2000);
  };

  render() {
    return (
      <div>
        <div className="wishlist mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                  Go Back / Dashboard
                </Link>
                <h1 className="display-3 text-center">My Wishlist</h1>
                <p className="lead text-center">
                  Contact the seller soon before the product is sold out
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />
        {this.props.wishlist.myWishlist.length === 0 ? (
          <div
            className="d-flex justify-content-center"
            id="loader"
            onClick={this.timeout()}
          >
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
              id="loaderChild"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="row col-11 container-fluid justify-content-start mx-auto">
          {this.props.wishlist.myWishlist.length > 0
            ? this.props.wishlist.myWishlist.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  onClick={this.onClick}
                  onRemove={this.onRemove}
                />
              ))
            : ""}
        </div>
      </div>
    );
  }
}

WishlistPage.propTypes = {
  getWishlist: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: selectAuthInfo(state),
  wishlist: selectWishlistInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  getWishlist: (data) => dispatch(getWishlist(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WishlistPage));
