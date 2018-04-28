module.exports = {
  GetUserInfo(guild, userId) {
    let userId = undefined;
    if (userId.length !== 18) userId.substring(2, userId.length - 1);
    let user = guild.members.find('id', userId);
    return {
      name: user.displayName,
      id: user.id,
      joinDate: user.joinDate
    }
  },

  GetRoleInfo(guild, roleId) {
    let roleId = undefined;
    if (roleId.length !== 18) roleId.substring(2, roleId.length - 1);
    let role = guild.members.find('id', roleId);
    return {
      name: role.name,
      id: role.id,
    }
  }
}