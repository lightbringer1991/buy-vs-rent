import { Marker as GoogleMarker } from '@react-google-maps/api';
import React from 'react';
import PropTypes from 'prop-types';
import soldIcon from '../../images/sold.png';

const Marker = ({ property, type, status }) => {
  if (!property.address.location) return null;

  const markerIcon = soldIcon;
  const position = {
    lat: property.address.location.latitude,
    lng: property.address.location.longitude,
  };

  return (<GoogleMarker position={position} icon={markerIcon} />);
};

Marker.propTypes = {
  property: PropTypes.object,
  type: PropTypes.oneOf(['property', 'amenity']),
  status: PropTypes.oneOf(['sold', 'available']),
};

Marker.defaultProps = {
  type: 'property',
  status: 'sold',
};

export default Marker;
