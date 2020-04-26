import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

import { selectProductInfo } from "../../Redux/product/product-selector";
import { getMyProducts } from "../../Redux/product/product-action";
import { selectAuthInfo } from "../../Redux/auth/auth.selector";

import ProductCard from "../../components/ProductCard/ProductCard.component";

class MyAdsPage extends Component {
  componentDidMount() {
    axios
      .get(`api/users/current/${this.props.auth.user.id}`)
      .then((user) => this.props.getMyProducts(user.data.myProducts));
  }

  onClick = (event) => {
    this.props.history.push(`/product/?id=${event.target.id}`);
  };

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
      .then((res) => {
        localStorage.removeItem("persist:root");
        window.location.reload();
      });
  };

  timeout = () => {
    setTimeout(() => {
      if (this.props.product.myProducts.length === 0) {
        if (document.getElementById("loaderChild")) {
          document.getElementById("loaderChild").remove();
          document.getElementById(
            "loader"
          ).innerHTML = `<h1 class="display-4">No Items for Sale</h1>`;
        }
      }
    }, 2000);
  };

  render() {
    return (
      <div>
        <div className="my-ads mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                  Go Back / Dashboard
                </Link>
                <h1 className="display-4 text-center">My Ads</h1>
                <p className="lead text-center">
                  Give good description for better sales.
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />
        {this.props.product.myProducts.length === 0 ? (
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
          {this.props.product.myProducts.length > 0
            ? this.props.product.myProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  onClick={this.onClick}
                  onDelete={this.onDelete}
                />
              ))
            : ""}
        </div>
      </div>
    );
  }
}

MyAdsPage.propTypes = {
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: selectProductInfo(state),
  auth: selectAuthInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  getMyProducts: (data) => dispatch(getMyProducts(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyAdsPage));
