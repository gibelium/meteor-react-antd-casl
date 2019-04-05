/** @format */

import '../styles/pages/NotFoundPage.less';
import React, { Component } from 'react';
import { Message } from '../components/Message.jsx';

class NotFoundPage extends Component {
  render() {
    return (
      <div className="page not-found">
        <div className="content-scrollable">
          <Message title="Page not found... :-(" />
        </div>
      </div>
    );
  }
}

export { NotFoundPage };
