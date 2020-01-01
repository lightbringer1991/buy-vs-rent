import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { formatAddress } from './helpers';
import './BriefPropertyDetails.scss';

const BriefPropertyDetails = ({ property }) => (
  <div className="property-details-brief">
    <Row><Col className="property-details-brief__price">{get(property, 'price.display')}</Col></Row>
    <Row><Col className="property-details-brief__address">{formatAddress(property.address)}</Col></Row>
    <Row>
      <Col dangerouslySetInnerHTML={{ __html: get(property, 'landSize.display', 'Unknown land size') }}/>
    </Row>
    <Row>
      <Col className="property-details-brief__forward">
        {get(property, '_links.prettyUrl.href') ? (
          <a target="_blank" rel="noopener noreferrer" href={property._links.prettyUrl.href}>
            To realestate.com.au
          </a>
        ) : null}
      </Col>
    </Row>
  </div>
);

BriefPropertyDetails.propTypes = {
  property: PropTypes.object,
};

export default BriefPropertyDetails;
