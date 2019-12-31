import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Resources from './components/Resources';
import { Map } from './components/Map';
import FilterBar from './components/FilterBar';
import Slider from './components/Slider';
import { PropertyDetails } from './components/PropertyDetails';
import { AppProvider } from './AppContext';
import { getUrlParameter } from './utils';
import './App.scss';

const resources = {
  constants: '/api/constants',
};

const App = () => {
  const [searchValue, setSearchValue] = React.useState(getUrlParameter('listingId'));
  const [radius, setRadius] = React.useState(1000);

  const contextData = {
    listingId: searchValue,
    radius,
  };

  return (
    <Resources resources={resources}>
      <div className="container app-container">
        <AppProvider value={contextData}>
          <Row>
            <Col xs={12} sm={6} className="app-container__left-panel">
              <FilterBar defaultValue={searchValue} onChange={setSearchValue} />

              <Slider radius={radius} onChange={setRadius} />

              <div className="map-container">
                <Map listingId={searchValue} radius={radius} />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <PropertyDetails listingId={searchValue} />
            </Col>
          </Row>
        </AppProvider>
      </div>
    </Resources>
  );
};

export default App;
