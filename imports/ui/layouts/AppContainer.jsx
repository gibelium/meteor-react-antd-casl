/** @format */

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { App } from './App.jsx';

export const AppContainer = withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(App);
