import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Resources from './components/Resources';
import Map from './components/Map';
import './App.scss';

const resources = {
  constants: '/api/constants',
};

const App = () => (
  <Resources resources={resources}>
    <div className="container app-container">
      <Row>
        <Col xs={12} sm={6}>
          <div className="map-container">
            <Map />
          </div>
        </Col>
        <Col xs={12} sm={6}></Col>
      </Row>
    </div>
  </Resources>
);

export default App;
