/** @format */

import { AbilityBuilder } from '@casl/ability';
import { UserRoles } from './UserRoles';

class Abilities {
  static getAbilitiesForUser(user) {
    return AbilityBuilder.define((can, cannot) => {
      if (user.roles.includes(UserRoles.ROLE_ADMIN)) {
        can('access', 'admin-content');
        can('access', 'manager-content');
      } else if (user.roles.includes(UserRoles.ROLE_MANAGER)) {
        can('access', 'manager-content');
      } else if (user.roles.includes(UserRoles.ROLE_USER)) {
        // yet no permissions
      }
    });
  }
}

export { Abilities };
