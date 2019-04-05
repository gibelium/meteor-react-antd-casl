/** @format */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Abilities } from '../imports/casl/Abilities';
import { UserRoles } from '../imports/casl/UserRoles';

if (Meteor.isServer) {
  Meteor.startup(() => {
    // ##### Dummy users #####

    let user = Accounts.findUserByUsername('admin@demo.ger');
    if (!user) {
      Meteor.call('createNewUser', {
        username: 'admin@demo.ger',
        email: 'admin@demo.ger',
        password: 'admin',
        profile: {},
        name: 'Admin',
        roles: [UserRoles.ROLE_ADMIN, UserRoles.ROLE_MANAGER, UserRoles.ROLE_USER],
      });
    }

    user = Accounts.findUserByUsername('manager@demo.ger');
    if (!user) {
      Meteor.call('createNewUser', {
        username: 'manager@demo.ger',
        email: 'manager@demo.ger',
        password: 'manager',
        profile: {},
        name: 'Manager',
        roles: [UserRoles.ROLE_MANAGER, UserRoles.ROLE_USER],
      });
    }

    user = Accounts.findUserByUsername('user@demo.ger');
    if (!user) {
      Meteor.call('createNewUser', {
        username: 'user@demo.ger',
        email: 'user@demo.ger',
        password: 'user',
        profile: {},
        name: 'User',
        roles: [UserRoles.ROLE_USER],
      });
    }

    // ##### Accounts system configuration #####
    // TODO: Enable when everything is working properly

    // AccountsCommon.config({
    //   sendVerificationEmail: true,
    // });

    // ##### Publications #####

    // Publication for single user
    Meteor.publish('users.user', function() {
      if (this.userId) {
        return Meteor.users.find(
          {
            _id: this.userId,
          },
          {
            fields: {
              username: true,
              emails: true,
              name: true,
              roles: true,
              abilities: true,
            },
          }
        );
      } else {
        return this.ready();
      }
    });

    Meteor.publish(null, function() {
      return Meteor.users.find(
        {},
        {
          fields: {
            _id: true,
            username: true,
            emails: true,
            name: true,
            roles: true,
            abilities: true,
          },
        }
      );
    });
  });

  // ##### User administration logic #####

  // Customize user
  Accounts.onCreateUser((options, user) => {
    // Add custom field values
    user.name = options.name;
    user.roles = options.roles;
    user.civiUserId = options.civiUserId;
    user.civiApiKey = options.civiApiKey;
    user.createdOn = new Date();

    // Resolve and store abilities for user during creation
    user.abilities = Abilities.getAbilitiesForUser(user).rules;

    // We still want the default hook's 'profile' behavior.
    if (options.profile) {
      user.profile = options.profile;
    }
    return user;
  });

  Meteor.methods({
    // Create new user
    createNewUser(values) {
      check(values, Object);

      // Remove undefined password field because validation will fail if set to undefined
      if (values.password === undefined) {
        delete values.password;
      }

      // Create new user via Accounts API
      return Accounts.createUser(values);
    },
  });
}
