import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchHouses } from "../actions";
import { connect } from "react-redux";
import { GOOGLE_MAP_API } from "../configs/dev";

import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 48.856614,
        longitude: 2.3522219,
        zoom: 8,
      },
      position: {
        lat: null,
        lng: null,
      },

      selectedMarker: false,
    };
    this.handleMarkerInfo = this.handleMarkerInfo.bind(this);
  }
  componentDidMount() {
    // this.props.fetchHouses();
    // const geocoder = new window.google.maps.Geocoder();
    // this.props.houses.forEach((house) => {
    //   return new Promise((resolve, reject) => {
    //     geocoder.geocode({ address: house.address }, (result, status) => {
    //       if (status === "OK") {
    //         const geometry = result[0].geometry.location;
    //         const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
    //         this.setState({
    //           position: {
    //             lat: coordinates.lat,
    //             lng: coordinates.lng,
    //           },
    //         });
    //         resolve(coordinates);
    //         this.state.markers.push(this.state.position);
    //         console.log(this.state.markers);
    //       } else {
    //         reject("ERROR");
    //       }
    //     });
    //   });
    // });
    // this.props.houses.forEach((house) => {
    //   Geocode.fromAddress(house.address).then(
    //     (response) => {
    //       const { lat, lng } = response.results[0].geometry.location;
    //       this.setState({
    //         position: {
    //           lat: lat,
    //           lng: lng,
    //         },
    //       });
    //       this.state.markers.push(this.state.position);
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
    // }); //here
  }

  handleMarkerInfo = (marker, event) => {
    this.setState({ selectedMarker: marker });
  };

  render() {
    const { viewport } = this.state;
    const { houses } = this.props;

    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          className="map"
          defaultZoom={12}
          defaultCenter={{ lat: viewport.latitude, lng: viewport.longitude }}
        >
          <div>
            {props.markers.map((house, i) => {
              const onClick = props.onClick.bind(this, house);
              return (
                <Marker
                  position={{
                    lat: house.location[0],
                    lng: house.location[1],
                  }}
                  key={i}
                  onClick={onClick}
                >
                  {/* {visible && ( */}
                  {props.selectedMarker === house && (
                    <InfoWindow>
                      <div>
                        <img
                          src={house.image}
                          alt=""
                          width="100%"
                          height="182px"
                        />
                        <p style={{ color: "#222", marginLeft: "0px" }}>
                          {house.title}
                        </p>
                        <p style={{ color: "#222", marginLeft: "0px" }}>
                          {house.subtitle}
                        </p>
                        <p style={{ color: "#222", marginLeft: "0px" }}>
                          <span style={{ fontWeight: "bold" }}>
                            {house.price}
                          </span>
                          € / night
                        </p>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              );
            })}
          </div>
        </GoogleMap>
      ))
    );

    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={houses}
        onClick={this.handleMarkerInfo}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API}&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

Map.propTypes = {
  fetchHouses: PropTypes.func.isRequired,
  houses: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    houses: state.houses.houses,
  };
};

export default connect(mapStateToProps, { fetchHouses })(Map);
