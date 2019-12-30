import PropTypes from 'prop-types';
import { default as RcSlider } from 'rc-slider';
import React from 'react';
import './Slider.scss';

const Slider = ({ radius, onChange }) => (
  <div className="slider-component">
    <RcSlider className="slider-component__slider" min={500} max={2000} defaultValue={radius} step={100} onChange={onChange} />
    <div className="slider-component__display">{radius}m</div>
  </div>
);

Slider.propTypes = {
  radius: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default Slider;
