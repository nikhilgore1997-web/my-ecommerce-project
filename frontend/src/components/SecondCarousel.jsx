// src/components/SecondCarousel.jsx
import React from "react";

const SecondCarousel = () => {
  return (
    <div className="container mt-4">
      <div
        id="secondCarousel"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#secondCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#secondCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#secondCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              src="https://m.media-amazon.com/images/G/31/img24/Fashion/AF/BAU/Winterflip/Unrec/tophero/PC/Clearance_Store._CB542298117_.jpg"
              className="d-block w-100"
              alt="Clearance Store"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="https://m.media-amazon.com/images/G/31/img24/Fashion/AF/BAU/Winterflip/Unrec/tophero/PC/Deals_on_1_lakh_styles._CB542298117_.jpg"
              className="d-block w-100"
              alt="Deals on 1 lakh styles"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://m.media-amazon.com/images/G/31/img24/Fashion/AF/BAU/Winterflip/Unrec/tophero/PC/Coupons._CB542298117_.jpg"
              className="d-block w-100"
              alt="Coupons"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#secondCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#secondCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default SecondCarousel;
