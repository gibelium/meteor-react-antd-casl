/** @format */

import '../styles/components/Message.less';

import PropTypes from 'prop-types';
import React from 'react';

const Message = ({ title, subtitle }) => (
  <div className="wrapper-message">
    {title ? <div className="title-message">{title}</div> : null}
    {subtitle ? <div className="subtitle-message">{subtitle}</div> : null}
  </div>
);

Message.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

Message.defaultProps = {
  subtitle: '',
};

export { Message };
