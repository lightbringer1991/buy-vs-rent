import { Marker as GoogleMarker, InfoWindow } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import BriefPropertyDetails from '../BriefPropertyDetails';
import { obtainPropertyById } from '../../store/actions';
import { getPropertyById } from '../../store/selectors';
import soldIcon from '../../images/sold.png';

const Marker = ({ listingId, property, type, status, getPropertyById }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const markerRef = React.useRef(null);

  if (!property.address.location) return null;

  const markerIcon = soldIcon;
  const position = {
    lat: property.address.location.latitude,
    lng: property.address.location.longitude,
  };

  const clickHandler = () => {
    getPropertyById(listingId, true);
    setIsOpen(true);
  };

  // position the popover on top of the marker
  const popoverPosition = {
    ...position,
    lat: position.lat + 0.0005,
  };

  return (
    <React.Fragment>
      <GoogleMarker
        ref={markerRef}
        position={position}
        icon={markerIcon}
        onClick={clickHandler}
      />

      {isOpen && (
        <InfoWindow
          position={popoverPosition}
          onCloseClick={() => setIsOpen(false)}
        >
          <div className="marker-component__popover">
            {property.title ? (
              <BriefPropertyDetails property={property} />
            ) : 'Loading'}
          </div>
        </InfoWindow>
      )}
    </React.Fragment>
  );
};

Marker.propTypes = {
  listingId: PropTypes.string.isRequired,
  property: PropTypes.object,
  type: PropTypes.oneOf(['property', 'amenity']),
  status: PropTypes.oneOf(['sold', 'available']),
  getPropertyById: PropTypes.func.isRequired,
};

Marker.defaultProps = {
  type: 'property',
  status: 'sold',
};

export const mapStateToProps = (state, { listingId }) => ({
  property: getPropertyById(state, { listingId }),
});

export default connect(mapStateToProps, { getPropertyById: obtainPropertyById })(Marker);
