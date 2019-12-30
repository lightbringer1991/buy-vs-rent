import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import './FilterBar.scss';

const FilterBar = ({ defaultValue, onChange }) => {
  const [value, setValue] = React.useState(defaultValue);
  const searchHandler = () => onChange(value);

  return (
    <div className="app-container__filter-bar">
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="realestate.com.au listing id"
      />
      <Button onClick={searchHandler}>Search</Button>
    </div>
  );
};

FilterBar.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default FilterBar;
