/** @format */

import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from '../imports/ui/layouts/AppContainer.jsx';

Meteor.startup(() => {
  // Subscribe to single user collection
  const sub = Meteor.subscribe('users.user');

  const interval = setInterval(() => {
    if (sub.ready()) {
      clearInterval(interval);
      ReactDOM.render(<AppContainer />, document.getElementById('app'));
    }
  }, 333);
});
