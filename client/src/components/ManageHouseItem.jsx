import React, { Component } from "react";
import toast, { Toaster } from "react-hot-toast";
import { deleteHouse } from "../actions/";
import { connect } from "react-redux";
import { TrashIcon } from "@heroicons/react/solid";

import { Link, withRouter } from "react-router-dom";

class ManageHouseItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: false,
    };
    this.showDeleteMessage = this.showDeleteMessage.bind(this);
    this.hideDeleteMessage = this.hideDeleteMessage.bind(this);
    this.deleteHouse = this.deleteHouse.bind(this);
  }

  showDeleteMessage = () => {
    this.setState({ confirmDelete: true });
  };

  hideDeleteMessage = () => {
    this.setState({ confirmDelete: false });
  };

  deleteHouse = async () => {
    const { house } = this.props;
    await this.props.deleteHouse(house._id, this.props.history);
    await toast.success("Your house has been succesfully deleted.");
  };

  render() {
    const { house } = this.props;
    const {
      image,
      subtitle,
      houseType,
      town,
      country,
      title,
      guests,
      bedrooms,
      beds,
      baths,
    } = house;
    const { confirmDelete } = this.state;

    return (
      <>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="houseItem">
          <div className="houseItem__img">
            <Link
              to={"/houses/" + house._id}
              style={{ textDecoration: "none", color: "#222" }}
            >
              {" "}
              <img src={image} alt="" />{" "}
            </Link>
          </div>
          <div className="houseItem__container">
            <div className="houseItem__info">
              <p>
                {" "}
                {subtitle || houseType} in {town}, {country}
              </p>
            </div>
            <h4>{title}</h4>
            <div className="houseItem__border"></div>
            <p className="houseItem__description">
              {" "}
              {guests} {guests === 1 ? "guest" : "guests"} • {bedrooms}{" "}
              {bedrooms === 1 ? "bedroom" : "bedrooms"} • {beds}
              {beds === 1 ? "bed" : "beds"} • {baths}{" "}
              {baths === 1 ? "bath" : "baths"}
            </p>

            <div>
              <p className="houseItem__price">
                {!confirmDelete && (
                  <div>
                    <TrashIcon
                      className="houseItem__button--delete"
                      onClick={this.showDeleteMessage}
                    />
                  </div>
                )}
                {confirmDelete && (
                  <div>
                    <p
                      style={{
                        color: "red",
                        fontSize: "14px",
                        marginRight: "14px",
                      }}
                    >
                      Delete this item?
                    </p>{" "}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <button
                        style={{ fontWeight: 800 }}
                        className="houseItem__button--confirm"
                        onClick={this.deleteHouse}
                      >
                        Yes
                      </button>{" "}
                      <button
                        style={{ fontWeight: 800, backgroundColor: "#008489" }}
                        onClick={this.hideDeleteMessage}
                        className="houseItem__button--back"
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(null, { deleteHouse })(withRouter(ManageHouseItem));
