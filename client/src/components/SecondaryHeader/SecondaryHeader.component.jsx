import React, { Component } from "react";
import { Link } from "react-router-dom";

class SecondaryHeader extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-sm bg-light   border border-dark  navbar-light nav-fill "
          style={{ height: "5vh" }}
        >
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="collapse_target"
            hidden
          ></button>
          <div className="collapse navbar-collapse">
            <Link
              to="/results/?category=Automobile"
              className="nav-item nav-link text-body"
            >
              Automobiles
            </Link>
            <Link
              to="/results/?category=Real-Estate"
              className="nav-item nav-link text-body"
            >
              Real Estate
            </Link>
            <Link
              to="/results/?category=Electronics"
              className="nav-item nav-link text-body"
            >
              Electronics
            </Link>
            <Link
              to="/results/?category=Fashion"
              className="nav-item nav-link text-body"
            >
              Fashion
            </Link>
            <Link
              to="/results/?category=Pet"
              className="nav-item nav-link text-body"
            >
              Pet
            </Link>
            <Link
              to="/results/?category=Furniture"
              className="nav-item nav-link text-body"
            >
              Furniture
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default SecondaryHeader;
