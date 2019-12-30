import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { obtainPropertyById } from './store/actions';

const initialData = {
  listingId: null,
  radius: 1000, // 1000 metres
};

const { Provider, Consumer } = React.createContext(initialData);

class _AppProvider extends React.Component {
  static propTypes = {
    value: PropTypes.shape({
      listingId: PropTypes.string,
      radius: PropTypes.number,
    }),
    getPropertyById: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { value } = this.props;

    if (!_.isEmpty(value.listingId)) {
      this.props.getPropertyById(value.listingId);
    }
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (value.listingId !== prevProps.value.listingId) {
      this.props.getPropertyById(value.listingId);
    }
  }

  render() {
    return <Provider {...this.props} />;
  }
}

export const AppProvider = connect(null, { getPropertyById: obtainPropertyById })(_AppProvider);

export const AppConsumer = Consumer;
