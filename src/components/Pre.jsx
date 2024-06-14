import React from "react";
import PropTypes from "prop-types";
import logo from "../Assets/images/17kassets/17kStudio.png"; // Adjust the path as necessary

function Pre({ load }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-100 ${load ? "block" : "hidden"}`}
    >
      <img src={logo} alt="Loading..." className="w-24 animate-growShrink" />
    </div>
  );
}

Pre.propTypes = {
  load: PropTypes.bool,
};

Pre.defaultProps = {
  load: false,
};

export default Pre;
