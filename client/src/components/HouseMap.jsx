import React, { Component } from "react";
import { MapWithAMarker } from "../components/GoogleMap";
import { GOOGLE_MAP_API } from "../configs/dev";

class HouseMap extends Component {
  render() {
    const { location } = this.props;

    return (
      <div>
        <MapWithAMarker
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API}&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `360px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          location={location}
        />
      </div>
    );
  }
}

export default HouseMap;
