import React from "react";
import "../styles/Banner.css";

function Banner() {
  return (
    <div className="banner">
      <div className="banner__img">
        <img
          src="https://a0.muscache.com/im/pictures/7b8f9425-f5e7-4c9e-9d6d-b39fa2f6e651.jpg?im_q=highq&im_w=720"
          alt=""
        />
      </div>
      <div className="banner__container">
        <p>Not sure where to go? Perfect.</p>
        <div className="banner__container__button">
          <button>
            <span>I'm flexible</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
