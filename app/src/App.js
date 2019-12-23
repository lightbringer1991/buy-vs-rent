import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Slider from 'rc-slider';
import Resources from './components/Resources';
import Map from './components/Map';
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
              <div className="app-container__search-box">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="realestate.com.au listing id"
                />
                <Button>Search</Button>
              </div>

              <Slider className="app-container__radius-slider" min={500} max={2000} defaultValue={radius} step={500} onChange={setRadius} />

              <div className="map-container">
                <Map />
              </div>
            </Col>
            <Col xs={12} sm={6}></Col>
          </Row>
        </AppProvider>
      </div>
    </Resources>
  );
};

export default App;
