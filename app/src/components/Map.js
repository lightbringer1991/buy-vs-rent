import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Map extends React.Component {
  static propTypes = {
    constants: PropTypes.object,
  };

  render() {
    const { constants } = this.props;
    if (!constants.googleMapApiKey) return null;

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: constants.googleMapApiKey }}
        defaultCenter={{ lat: -37.8175348, lng: 144.9328441 }}
        zoom={11}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  constants: state.resources.constants,
});

export default connect(mapStateToProps)(Map);
