import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const InputGroup = ({
  error,
  placeholder,
  name,
  value,
  icon,
  type,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={e => onChange(e)}
      />
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
};

InputGroup.propTypes = {
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
