import get from 'lodash/get';
import { Circle, GoogleMap, LoadScript, Marker as GoogleMarker } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import houseIcon from '../../images/house.png';
import { getPropertyById } from '../../store/selectors';

// center at Melbourne CBD
const DEFAULT_CENTER = { lat: -37.8175348, lng: 144.9328441 };

class Map extends React.Component {
  static propTypes = {
    constants: PropTypes.object,
    listingId: PropTypes.string,
    property: PropTypes.object,
    radius: PropTypes.number,
  };

  render() {
    const { constants, property, radius } = this.props;
    if (!constants.googleMapApiKey) return null;

    let center = DEFAULT_CENTER;
    if (get(property, 'address.location')) {
      center = {
        lat: property.address.location.latitude,
        lng: property.address.location.longitude,
      };
    }

    const radiusOptions = {
      strokeColor: '#00FFE6',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#9AFFF6',
      fillOpacity: 0.35,
      clickable: false,
      draggable: false,
      editable: false,
      visible: true,
      radius,
      zIndex: 1
    };

    return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey={constants.googleMapApiKey}
      >
        <GoogleMap
          id='property-map'
          zoom={15}
          center={center}
          mapContainerStyle={{ height: '100%', width: '100%' }}
        >
          <Circle center={center} radius={radius} options={radiusOptions} />
          <GoogleMarker position={center} icon={houseIcon} />
        </GoogleMap>
      </LoadScript>
    );
  }
}

const mapStateToProps = (state, { listingId }) => ({
  constants: state.resources.constants,
  property: getPropertyById(state, listingId),
});

export default connect(mapStateToProps)(Map);
