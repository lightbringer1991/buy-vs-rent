import get from 'lodash/get';
import map from 'lodash/map';
import pick from 'lodash/pick';
import classnames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Walkscore from './Walkscore';
import AveragePrice from './AveragePrice';
import { getPropertyById } from '../../store/selectors';
import { formatAddress } from '../helpers';
import './PropertyDetails.scss';

const formatFeatures = ({ generalFeatures }) => {
  const generalData = pick(generalFeatures, ['bedrooms', 'bathrooms', 'parkingSpaces']);

  return (
    <React.Fragment>
      {map(generalData, (feature, key) => (
        <Row key={key}><Col>{feature.label}</Col></Row>
      ))}
    </React.Fragment>
  );
};

const PropertyDetails = ({ property, radius }) => {
  if (!property) return null;

  const hasLandSize = !!get(property, 'landSize.display');
  return (
    <div className="property-details">
      <Row className="property-details__field">
        <Col className="property-details__data" xs={{ span: 8, offset: 4 }}>
          <a target="_blank" rel="noopener noreferrer" href={get(property, 'statementOfInformation.href')}>Statement of Information</a> <br />
          <a target="_blank" rel="noopener noreferrer" href={get(property, '_links.prettyUrl.href')}>Listing URL</a>
        </Col>
      </Row>
      <Row className="property-details__field">
        <Col xs={4}>Address</Col>
        <Col className="property-details__data" xs={8}>{formatAddress(property.address)}</Col>
      </Row>
      <Row className="property-details__field">
        <Col xs={4}>Title</Col>
        <Col className="property-details__data" xs={8}>{property.title}</Col>
      </Row>
      <Row className="property-details__field">
        <Col xs={4}>Listing Agent</Col>
        <Col className="property-details__data" xs={8}>
          <Row><Col>{property.lister.name}</Col></Row>
          <Row><Col>{property.lister.phoneNumber}</Col></Row>
          <Row><Col>{property.lister.email}</Col></Row>
        </Col>
      </Row>
      <Row className="property-details__field">
        <Col xs={4}>Description</Col>
        <Col className="property-details__data" xs={8} dangerouslySetInnerHTML={{ __html: property.description }} />
      </Row>
      <Row className="property-details__field">
        <Col xs={4}>Land</Col>
        <Col
          className={classnames('property-details__data', { 'property-details__data--empty': !hasLandSize })}
          xs={8}
          dangerouslySetInnerHTML={{ __html: get(property, 'landSize.display', 'N/A') }}
        />
      </Row>
      <Row className="property-details__field">
        <Col xs={4}>Price</Col>
        <Col className="property-details__data" xs={8}>{property.price.display}</Col>
      </Row>
      <Row className="property-details__field">
        <Col xs={4}>Features</Col>
        <Col className="property-details__data" xs={8}>{formatFeatures(property)}</Col>
      </Row>
      <Row className="property-details__field">
        <Col xs={4}>Walkscore</Col>
        <Col className="property-details__data" xs={8}>
          <Walkscore {...property.walkScore} />
        </Col>
      </Row>
      <Row className="property-details__field">
        <Col xs={4}>Nearest Sold Properties</Col>
        <Col className="property-details__data property-details__data-average-price" xs={8}>
          <AveragePrice listingId={property.listingId} radius={radius} />
        </Col>
      </Row>
    </div>
  );
};

export const mapStateToProps = (state, { listingId }) => ({
  property: getPropertyById(state, { listingId }),
});

export default connect(mapStateToProps)(PropertyDetails);
