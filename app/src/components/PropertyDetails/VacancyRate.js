import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './VacancyRate.scss';

const explainPopover = (
  <Popover id="vacancy-rate-explanation">
    <Popover.Content>
      <Row><Col className="vacancy-rate-component--success">{'rate < 2'}</Col></Row>
      <Row><Col className="vacancy-rate-component--warning">{'2 <= rate < 3'}</Col></Row>
      <Row><Col className="vacancy-rate-component--danger">{'3 <= rate'}</Col></Row>
    </Popover.Content>
  </Popover>
);

const VacancyRate = ({ data }) => {
  if (!data) return null;
  const vacancyRate = data['Vacancy Rate'].data;
  const vacancyCount = data.Vacancies.data;

  const className = classnames('vacancy-rate-component', {
    'vacancy-rate-component--success': vacancyRate < 2,
    'vacancy-rate-component--warning': vacancyRate >= 2 && vacancyRate < 3,
    'vacancy-rate-component--danger': vacancyRate >= 3,
  });

  return (
    <OverlayTrigger overlay={explainPopover} placement="right">
      <div className={className}>
        {vacancyRate.toFixed(2)}% ({vacancyCount})
      </div>
    </OverlayTrigger>
  );
};

VacancyRate.propTypes = {
  data: PropTypes.shape({
    Vacancies: PropTypes.shape({ data: PropTypes.number }),
    'Vacancy Rate': PropTypes.shape({ data: PropTypes.number }),
  }),
};

export default VacancyRate;
