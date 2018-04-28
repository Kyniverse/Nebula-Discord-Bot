//  Importing our module base for a slick OOP system.
import ModuleBase from "../ModuleBase";

//  Importing Config for the Prefix.
import Config from '../Config';

//  Importing the Utility-Service for easy parsing.
import Utility from '../Utilities/IdParser';

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

    if (!user.roles.has(Config.Bot.roles.admin)) return;

    if (command === 'info' && args[0] !== undefined) {
      let info = undefined;
      let trimmedId = Utility.getTrimmedID(args[0]);

      if (Utility.doesUserExist(channel.guild, trimmedId)) {
        info = Utility.getUserInfo(channel.guild, trimmedId);
        channel.send(
          `**Name**: ${info.name}\n` + 
          `**ID**: ${info.id}\n` + 
          `**Join Date**: ${info.joinDate}`
        );
      } else if (Utility.doesRoleExist(channel.guild, trimmedId)) {
        info = Utility.getRoleInfo(channel.guild, trimmedId);
        channel.send(
          `**Name**: ${info.name}\n` + 
          `**ID**: ${info.id}`
        );
      } else channel.send('The given user or role could not be found!');      
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
}


