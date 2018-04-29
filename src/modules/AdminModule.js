//  Importing our module base for a slick OOP system.
import ModuleBase from "../ModuleBase";

//  Importing Config for the Prefix.
import Config from '../Config';

//  Importing the Utility-Service for easy parsing.
import Util from '../Utilities/IdParser';

/*                AdminModule 
 * 
 *  This module contains a few useful commands which
 *  Admins can use regarding management.
 */
export default class AdminModule extends ModuleBase {
  constructor(client, moduleName) {
    super(client, moduleName);
    this.config = { 
      "active": true,
      "usePrefix": true,
      "ignore": true,
      "channels": []
    }
  }

  /*         
   *    Update is called every time the modules is updated.
   */
  update(message, command, args) {
    super.update(message, command, args);
    let user = message.member;
    let channel = message.channel;

    if (!user.roles.has(Config.Bot.roles.admin)) {
      channel.send('You do not have the correct permissions to use this!');
      return;
    }

    if (command === 'info' && args[0] !== undefined) {
      //
      //  The info command retrieves informtion about either a user or 
      //  a role and prints it out in the chat, this could be usefull 
      //  for an numerous of reasons.
      //
      let info = undefined;
      let trimmedId = Util.getTrimmedID(args[0]);
      if (user.match(/[a-z]/)) { channel.send('The given argument can not contain letters and only numbers!'); }

      if (Util.doesUserExist(channel.guild, trimmedId)) {
        info = Util.getUserInfo(channel.guild, trimmedId);
        channel.send(
          `**Name**: ${info.name}\n` + 
          `**ID**: ${info.id}\n` + 
          `**Join Date**: ${info.joinDate}`
        );
      } else if (Util.doesRoleExist(channel.guild, trimmedId)) {
        info = Util.getRoleInfo(channel.guild, trimmedId);
        channel.send(
          `**Name**: ${info.name}\n` + 
          `**ID**: ${info.id}`
        );
      } else channel.send('The given user or role could not be found!');      
    }

    if (command === 'purge' && args[0] !== undefined) {
      //
      //  The purge command removes messages from any given channel.
      //  Usually, discord does not allow us to remove messages which
      //  are more than 2 weeks old but we can work around that.
      //
      if (args[0].match(/[a-z]/)) { channel.send('The given argument can not contain letters and only numbers!'); }
      let amount = parseInt(args[0]);

      //  Simple version of deleting everything.
      channel.bulkDelete(amount, true)
        .then(messages => {
          console.log(`Attempted to delete ${amount} message(s) requested by: ${user.displayName}`);
        })
        .catch(console.error);
    }
  }

  /*         
   *    showHelpMenu(); is called whenever the user types:
   *    'prefix + help + module-name'. All users.
   */
  showHelpMenu(channel) {
    channel.send({embed: {
      color: 0x78c811,
      author: {
        //  name of the author, we use the bot.
        name: this.client.user.username,

        //  avatar of the author, we use the bot.
        icon_url: this.client.user.avatarURL
      },
      title: `Command help menu for ${this.moduleName}`,
      description:  'Utility commands for admins.',
      fields: [{
          name: `${Config.Bot.prefix}info <@user | @role>`,
          value: 'Displays information about the given user or role.'
        }
      ],
      //  Displaying when this message was created.
      timestamp: new Date(),
      footer: {
        //  avatar of the author, we use the bot.
        icon_url: this.client.user.avatarURL,

        //  Displaying copyright message because we can.
        text: "© Nebula - Zurkloyd, Module - Zurkloyd"
      } 
    }});
  }

  /*         
   *    showConfigHelpMenu(); is called whenever the user types:
   *    'prefix + config + module-name'. Admins only.
   */
  showConfigHelpMenu(channel) { channel.send(`The requested module: **${this.moduleName}** does not have any configuration settings!`); }
}


