import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

import RequireAuth from "./protectedRoutes";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./Redux/auth/auth-actions";
import { getMyProducts } from "./Redux/product/product-action";
import { getWishlist } from "./Redux/wishlist/wishlist-action";

import MainHeader from "./components/MainHeader/MainHeader.component";
import HomePage from "./pages/HomePage/Homepage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import SignUpPage from "./pages/LoginSignUpPage/SignUpPage";
import LoginPage from "./pages/LoginSignUpPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import MyAdsPage from "./pages/MyAdsPage/MyAdsPage";
import PostAdPage from "./pages/PostAdPage/PostAdPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import EditMyAdPage from "./pages/EditMyAdPage/EditMyAdPage";
import WishlistPage from "./pages/WishlistPage/WishlistPage";

class App extends React.Component {
  componentDidMount() {
    // Check for token
    if (localStorage.jwtToken) {
      // Set token to Auth header
      setAuthToken(localStorage.jwtToken);
      // Decode jwt token
      const decode = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      this.props.setCurrentUser(decode);
      // Add My products to state
      axios
        .get(`/api/users/current/${decode.id}`)
        .then((user) => this.props.getMyProducts(user.data.myProducts));
      // Add My Wishlist products to state
      axios
        .get(`/api/users/current/${decode.id}`)
        .then((user) => this.props.getWishlist(user.data.myWishlist));
    }
  }

  render() {
    return (
      <Router>
        <MainHeader />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/results" component={ResultsPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route path="/product" component={ProductPage} />
        <Route exact path="/dashboard" component={RequireAuth(DashboardPage)} />
        <Route
          exact
          path="/editprofile"
          component={RequireAuth(EditProfilePage)}
        />
        <Route exact path="/myads" component={RequireAuth(MyAdsPage)} />
        <Route exact path="/wishlist" component={RequireAuth(WishlistPage)} />
        <Route exact path="/editmyad" component={RequireAuth(EditMyAdPage)} />
        <Route exact path="/postad" component={RequireAuth(PostAdPage)} />
        <footer className="bg-dark text-white mt-5 p-4 text-center">
          Copyright &copy; 2020 Bazaar
        </footer>
      </Router>
    );
  }
}

App.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  getMyProducts: PropTypes.func.isRequired,
  getWishlist: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (userData) => dispatch(setCurrentUser(userData)),
  getMyProducts: (data) => dispatch(getMyProducts(data)),
  getWishlist: (data) => dispatch(getWishlist(data)),
});

export default connect(null, mapDispatchToProps)(App);
