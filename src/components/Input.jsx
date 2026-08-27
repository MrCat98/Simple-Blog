import { forwardRef } from "react";
import PropTypes from "prop-types";

const Input = forwardRef(({ label, error, ...props }, ref) => {
  return (
    <label className="input">
      {label && <span>{label}</span>}
      <input ref={ref} {...props} />
      {error && <span className="field-error">{error}</span>}
    </label>
  );
});

Input.displayName = "Input";

Input.propTypes = {
  label: PropTypes.node,
  error: PropTypes.node,
};

export default Input;
