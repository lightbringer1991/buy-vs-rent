import compact from 'lodash/compact';
import get from 'lodash/get';
import map from 'lodash/map';
import sum from 'lodash/sum';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import BriefPropertyDetails from '../BriefPropertyDetails';
import { getNearbySoldProperties } from '../../store/selectors';
import { formatAddress } from '../helpers';
import './AveragePrice.scss';

const MAX_PROPERTY_COUNT = 5;

const AveragePrice = ({ properties }) => {
  const priceData = compact(values(properties).map(({ price }) => {
    if (!price) return 0;
    return parseFloat(price.display.replace(/\$|,/g, ''));
  }));
  const averageData = priceData.length === 0 ? 0 : sum(priceData) / priceData.length;

  return (
    <Table className="average-price-component" bordered size="sm">
      <thead>
        <tr>
          <th>Address</th>
          <th>Sold Date</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {map(properties, (property) => {
          const popoverData = (
            <Popover id={property.listingId}>
              <Popover.Content>
                <BriefPropertyDetails property={property} />
              </Popover.Content>
            </Popover>
          );

          return (
            <tr key={property.listingId}>
              <td className="average-price-component__address">
                <OverlayTrigger overlay={popoverData} trigger={['click']}>
                  <span>{formatAddress(property.address)}</span>
                </OverlayTrigger>
              </td>
              <td>{get(property, 'dateSold.display')}</td>
              <td>{get(property, 'price.display', 'N/A')}</td>
            </tr>
          );
        })}

        <tr>
          <td colSpan="2">Average</td>
          <td>${averageData.toLocaleString()}</td>
        </tr>
      </tbody>
    </Table>
  );
};

AveragePrice.propTypes = {
  listingId: PropTypes.string,
  radius: PropTypes.number,
  properties: PropTypes.object,
};

export const mapStateToProps = (state, { listingId, radius }) => ({
  properties: getNearbySoldProperties(state, { listingId, radius, maxPropertyCount: MAX_PROPERTY_COUNT }),
});

export default connect(mapStateToProps)(AveragePrice);
