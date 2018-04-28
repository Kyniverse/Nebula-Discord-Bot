module.exports = {
  getTrimmedID(id) {
    if (id.length > 18) id = id.substring(2, id.length - 1);
    id = id.replace('&', '');
    return id;
  },

  /*
   *  Basic wrapper function to check if a User exists.
   */
  doesUserExist(guild, userId) { return guild.members.has(userId) },

  /*
   *  Basic wrapper function to check if a Role exists.
   */
  doesRoleExist(guild, roleId) { return guild.roles.has(roleId); },

  /*
   *  Retrieves the user by the given user ID
   */
  getUserInfo(guild, userId) {
    var user = guild.members.find('id', userId);
    return {
      name: user.displayName,
      id: user.id,
      joinDate: user.joinedAt
    }
  },

  /*
   *  Retrieves the role by the given role ID
   */
  getRoleInfo(guild, roleId) {
    var role = guild.roles.find('id', roleId);
    return {
      name: role.name,
      id: role.id,
    }
  }
}