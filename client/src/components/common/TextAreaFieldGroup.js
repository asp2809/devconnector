import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextAreaFieldGroup = ({
  error,
  placeholder,
  name,
  value,
  onChange,
  info
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={e => onChange(e)}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

TextAreaFieldGroup.defaultProps = {};

export default TextAreaFieldGroup;
