import React from "react";

const HouseInfo = ({ house }) => {
  const {
    title,
    guests,
    bedrooms,
    beds,
    baths,
    user,
    houseRules,
    houseType,
    description,
    services,
    amenities,
  } = house;
  return (
    <div className="HouseInfo">
      <div className="HouseInfo__header">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 className="HouseInfos__subtitle">
            {title && houseType} hosted by {user && user.firstName}
          </h2>

          <img
            src="../img/avatar.png"
            alt="owner"
            with="40px"
            height="40px"
            style={{ marginTop: "20px" }}
          />
        </div>
        <p
          className="HouseInfo__infos"
          style={{ color: "#222", marginLeft: "0px" }}
        >
          {guests} {guests === 1 ? "guest" : "guests"} • {bedrooms}{" "}
          {bedrooms === 1 ? "bedroom" : "bedrooms"} • {beds}
          {beds === 1 ? "bed" : "beds"} • {baths}{" "}
          {baths === 1 ? "bath" : "baths"}
        </p>
      </div>
      <br />
      <div className="HouseInfo__border"></div>
      <br />

      <div className="HouseInfo__details">
        <div className="HouseInfo__rules">
          <div className="HouseInfo__rules--title">
            <h3>House rules</h3>
          </div>
          <p style={{ color: "#222", marginLeft: "0px" }}>{houseRules}</p>
        </div>
        <br />
        <div className="HouseInfo__border"></div>
        <br />
        <div className="HouseInfo__description">
          <p style={{ color: "#222", marginLeft: "0px" }}>{description}</p>
        </div>
        <br />
        <div className="HouseInfo__border"></div>
        <br />
        <div className="HouseInfo__services">
          <h3>What this place offers</h3>
          {services &&
            services.map((service, i) => (
              <div key={i}>
                <p style={{ color: "#222", marginLeft: "0px" }}>{service}</p>
              </div>
            ))}
          {amenities &&
            amenities.map((amenity, i) => (
              <div key={i}>
                <p style={{ color: "#222", marginLeft: "0px" }}>{amenity}</p>
              </div>
            ))}
        </div>
      </div>
      <br />
    </div>
  );
};

export default HouseInfo;
