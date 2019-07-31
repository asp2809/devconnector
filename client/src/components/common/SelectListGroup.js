import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const SelectListGroup = ({ error, name, value, onChange, info, options }) => {
  const selectList = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={e => onChange(e)}
      >
        {selectList}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
};

SelectListGroup.propTypes = {
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

SelectListGroup.defaultProps = {};

export default SelectListGroup;
