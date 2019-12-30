import PropTypes from 'prop-types';
import React from 'react';
import './Walkscore.scss';

const Walkscore = ({ walkscore, logo_url, more_info_icon, help_link }) => {
  return (
    <div className="walkscore-component">
      <a href="https://www.walkscore.com/how-it-works/" target="_blank" rel="noopener noreferrer">
        <img className="walkscore-component__logo" src={logo_url} alt="What's your Walk Score?" />
      </a>
      &nbsp;
      <div className="walkscore-component__score">{walkscore}</div>
      &nbsp;
      <span id="walkscore-component__helper">
        <a href={help_link} target="_blank" rel="noopener noreferrer">
          <img src={more_info_icon} alt="More info icon" width="13" height="13" />
        </a>
      </span>
    </div>
  );
};

// prop type list is generally what is returned from the API
Walkscore.propTypes = {
  walkscore: PropTypes.number.isRequired,
  logo_url: PropTypes.string,
  more_info_icon: PropTypes.string,
  help_link: PropTypes.string,
};

export default Walkscore;
