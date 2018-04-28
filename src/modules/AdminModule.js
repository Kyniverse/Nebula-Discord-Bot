//  Importing our module base for a slick OOP system.
import ModuleBase from "../ModuleBase";

//  Importing Config for the Prefix.
import Config from '../Config';

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

    if (!user.roles.has(Config.Bot.roles.admin)) return;
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
      description:  'Description of this config menu',
      fields: [{
          name: 'Name of this field',
          value: 'The value of this field'
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


