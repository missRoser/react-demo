import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

class Button extends Component {
  render() {
    const {
      onClick,
      className = 'btn btn-default',
      children,
    } = this.props;

    return (
      <button
        onClick = {onClick}
        className = {className}
        type="button"
      >{children}</button>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Button;