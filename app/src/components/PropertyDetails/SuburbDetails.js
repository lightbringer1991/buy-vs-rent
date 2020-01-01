import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getPropertyById, getSuburbByPostcode } from '../../store/selectors';
import VacancyRate from './VacancyRate';

const SuburbDetails = ({ suburb }) => (
  <div className="suburb-details-component">
    <Row className="property-details__field">
      <Col xs={4}>Vacancy Rate</Col>
      <Col className="property-details__data" xs={8}>
        <VacancyRate data={get(suburb, 'vacancyRate')} />
      </Col>
    </Row>
  </div>
);

SuburbDetails.propTypes = {
  listingId: PropTypes.string,
  suburb: PropTypes.object,
};

export const mapStateToProps = (state, { listingId }) => {
  const property = getPropertyById(state, { listingId });
  return {
    suburb: getSuburbByPostcode(state, { postcode: get(property, 'address.postcode') }),
  };
};

export default connect(mapStateToProps)(SuburbDetails);
