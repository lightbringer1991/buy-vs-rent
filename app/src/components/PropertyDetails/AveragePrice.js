import compact from 'lodash/compact';
import get from 'lodash/get';
import map from 'lodash/map';
import sum from 'lodash/sum';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { getNearbySoldProperties } from '../../store/selectors';
import { formatAddress } from '../helpers';

const MAX_PROPERTY_COUNT = 5;

const AveragePrice = ({ listingId, properties }) => {
  const priceData = compact(values(properties).map(({ price }) => {
    if (!price) return 0;
    return parseFloat(price.display.replace(/\$|,/g, ''));
  }));
  const averageData = priceData.length === 0 ? 0 : sum(priceData) / priceData.length;

  return (
    <React.Fragment>
      <Table bordered size="sm">
        <thead>
          <tr>
            <th>Address</th>
            <th>Sold Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {map(properties, (property) => (
            <tr key={property.listingId}>
              <td>
                <a target="_blank" rel="noopener noreferrer" href={get(property, '_links.prettyUrl.href')}>
                  {formatAddress(property.address)}
                </a>
              </td>
              <td>{get(property, 'dateSold.display')}</td>
              <td>{get(property, 'price.display', 'N/A')}</td>
            </tr>
          ))}

          <tr>
            <td colSpan="2">Average</td>
            <td>${averageData.toLocaleString()}</td>
          </tr>
        </tbody>
      </Table>
    </React.Fragment>
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
