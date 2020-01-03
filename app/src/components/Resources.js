import map from 'lodash/map';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { updateResource } from '../store/actions';

class Resources extends React.Component {
  static propTypes = {
    resources: PropTypes.object,
    updateResource: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  state = {
    isPromiseResolved: false,
  };

  componentDidMount() {
    Promise.all(map(this.props.resources, (resourceUri, resourceName) => {
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}${resourceUri}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then(({ data }) => this.props.updateResource(resourceName, data))
    })).then(() => this.setState({ isPromiseResolved: true }));
  }

  render() {
    return this.state.isPromiseResolved ? this.props.children : 'Loading...';
  }
}

export default connect(null, { updateResource })(Resources);
