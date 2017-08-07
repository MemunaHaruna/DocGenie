import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description - displays the input text field in all forms
 * @export
 * @class InputField
 * @extends {React.Component}
 */
const InputField = ({
  type, name, id, value, placeholder, onChange, className,
  divClass }) => {
  return (
    <div className={divClass}>
      <input
        className={className}
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
};

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  divClass: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputField;
