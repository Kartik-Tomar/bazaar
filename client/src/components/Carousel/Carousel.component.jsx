import React, { Component } from "react";
import { Link } from "react-router-dom";

import DummyImage2 from "../../assets/dummyimages/shopping1.jpeg";
import Logo from "../../assets/logo/logo-black.png";

class Carousel extends Component {
  render() {
    return (
      <div>
        {!window.matchMedia("(max-width: 500px)").matches ? (
          <div
            className="jumbotron"
            style={{
              background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), 
      url(${DummyImage2})`,
            }}
          >
            <div className="container">
              <div className="text-right">
                <img src={Logo} alt="logo" style={{ width: "70%" }} />
              </div>
              <h3
                className="display-4 text-right my-3 text-white mb-3 mr-3"
                style={{ fontFamily: `'Kalam', cursive` }}
              >
                बेच... कुछ भी, कभी भी
              </h3>
              <p className="text-right">
                <Link to="/postad">
                  <button
                    className="btn btn-outline-info btn-lg col-6"
                    role="button"
                  >
                    <span className="text-white">Sell Now »</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div
            className="jumbotron"
            style={{
              background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), 
      url(${DummyImage2})`,
              backgroundPosition: "right",
            }}
          >
            <div className="container">
              <div className="text-center">
                <img src={Logo} alt="logo" style={{ width: "100%" }} />
              </div>
              <h3
                className="display-5 text-center my-3 text-white"
                style={{ fontFamily: `'Kalam', cursive` }}
              >
                बेच... कुछ भी, कभी भी
              </h3>
              <p className="text-center">
                <Link to="/postad">
                  <button
                    className="btn btn-outline-info btn-lg col-6"
                    role="button"
                  >
                    <span className="text-white">Sell Now »</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
      // <div
      //   className="jumbotron"
      //   style={
      //     !window.matchMedia("(max-width: 500px)").matches
      //       ? {
      //           background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),
      // url(${DummyImage2})`,
      //         }
      //       : {
      //           background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),
      // url(${DummyImage2})`,
      //           backgroundPosition: "right",
      //         }
      //   }
      // >
      //   <div className="container">
      //     <div className="text-right">
      //       <img src={Logo} alt="logo" style={{ width: "70%" }} />
      //     </div>
      //     <h3 className="display-4 text-right my-3 text-white">
      //       A perfect online market
      //     </h3>
      //     <p className="text-right">
      //       <Link to="/postad">
      //         <button
      //           className="btn btn-outline-info btn-lg col-6"
      //           role="button"
      //         >
      //           <span className="text-white">Sell Now »</span>
      //         </button>
      //       </Link>
      //     </p>
      //   </div>
      // </div>
      // <div
      //   id="carouselExampleIndicators"
      //   className="carousel slide"
      //   data-ride="carousel"
      //   style={{ height: "60vh" }}
      // >
      //   <ol className="carousel-indicators">
      //     <li
      //       data-target="#carouselExampleIndicators"
      //       data-slide-to="0"
      //       className="active"
      //     ></li>
      //     <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      //     <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      //   </ol>
      //   <div className="carousel-inner" style={{ height: "60vh" }}>
      //     <div className="carousel-item active">
      //       <img src={DummyImage2} className="tales img-fluid" alt="..." />
      //     </div>
      //     <div className="carousel-item" style={{ height: "60vh" }}>
      //       <img src={DummyImage2} className="tales img-fluid" alt="..." />
      //     </div>
      //     <div className="carousel-item" style={{ height: "60vh" }}>
      //       <img src={DummyImage2} className="tales img-fluid" alt="..." />
      //     </div>
      //   </div>
      //   <a
      //     className="carousel-control-prev"
      //     href="#carouselExampleIndicators"
      //     role="button"
      //     data-slide="prev"
      //     style={{ height: "60vh" }}
      //   >
      //     <span
      //       className="carousel-control-prev-icon"
      //       aria-hidden="true"
      //     ></span>
      //     <span className="sr-only">Previous</span>
      //   </a>
      //   <a
      //     className="carousel-control-next"
      //     href="#carouselExampleIndicators"
      //     role="button"
      //     data-slide="next"
      //     style={{ height: "60vh" }}
      //   >
      //     <span
      //       className="carousel-control-next-icon"
      //       aria-hidden="true"
      //     ></span>
      //     <span className="sr-only">Next</span>
      //   </a>
      // </div>
    );
  }
}
export default Carousel;
