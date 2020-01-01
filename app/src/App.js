import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Resources from './components/Resources';
import { Map } from './components/Map';
import FilterBar from './components/FilterBar';
import Slider from './components/Slider';
import { PropertyDetails } from './components/PropertyDetails';
import Footer from './components/Footer';
import { AppProvider } from './AppContext';
import { getUrlParameter } from './utils';
import './App.scss';
import SuburbDetails from "./components/PropertyDetails/SuburbDetails";

const resources = {
  constants: '/api/constants',
};

const App = ({ property }) => {
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
          <Row className="app-container__content">
            <Col xs={12} sm={6} className="app-container__left-panel">
              <FilterBar defaultValue={searchValue} onChange={setSearchValue} />

              <Slider radius={radius} onChange={setRadius} />

              <div className="map-container">
                <Map listingId={searchValue} radius={radius} />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <Accordion defaultActiveKey={0}>
                <Card className="app-container-left-panel-accordion">
                  <Accordion.Toggle as={Card.Header} eventKey={0}>
                    Property Details
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={0}>
                    <Card.Body>
                      <PropertyDetails listingId={searchValue} radius={radius} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <Accordion defaultActiveKey={0}>
                <Card className="app-container-left-panel-accordion">
                  <Accordion.Toggle as={Card.Header} eventKey={0}>
                    Suburb Profile
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={0}>
                    <Card.Body>
                      <SuburbDetails listingId={searchValue} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        </AppProvider>

        <Footer />
      </div>
    </Resources>
  );
};

export default App;
