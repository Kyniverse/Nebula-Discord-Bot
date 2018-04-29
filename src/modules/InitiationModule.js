//  Importing our module base for a slick OOP system.
import ModuleBase from "../ModuleBase";

//  Importing Config for the Prefix.
import Config from '../Config';

//  Importing the Utility-Service for easy parsing.
import Util from '../Utilities/IdParser';

/*                InitiationModule 
 * 
 *  This module doesn't do anything besides serving
 *  as a template on how to write modules for this
 *  discord bot.
 */
export default class InitiationModule extends ModuleBase {
  constructor(client, moduleName) {
    //
    //  Right here we initialize this module given
    //  the client object and the ModuleName. The client
    //  object could be usefull for when you need to do
    //  some checks regarding the bot itself and the moduleName
    //  is required for the module to be added to the database.
    //
    //  The rest are just configuration settings. Below is the basics
    //  which need to be present. However, you can add as much
    //  to it as you'd like.
    //
    super(client, moduleName);
    this.config = { 
      "active": true,
      "usePrefix": true,  
      "ignore": false,
      "channels": []
    }

    //  Bellow are extra settings you could override
    //  but is not recommended. Disabling the default help
    //  and config messages will force you to completely 
    //  write your own checking system.

    /*
    this.defaultHelpMessage = true;
    this.defaultConfigMessage = true;
    this.logUsage = false;
    */

    this.inProgress = false;
  }

  /*         
   *    Update is called every time the modules is updated.
   */
  update(message, command, args) {
    super.update(message, command, args);
    let user = message.member;
    let channel = message.channel;
    
    if (command === 'init' && args[0] !== undefined) {
      if (args[0] === 'start' && args[1] !== undefined) {
        let user = Util.getTrimmedID(args[1]);
        if (user.match(/[a-z]/)) { channel.send('The given argument can not contain letters and only numbers!'); }
      } else if (args[0] === 'end') {
        channel.send('Initiation Ended. Clearing channel in 5 seconds...');
      }
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
      description:  'Description of this config menu',
      fields: [{
          name: `${Config.Bot.prefix}init start <@user>`,
          value: 'Starts the initiation procedure for the target user.'
        },
        {
          name: `${Config.Bot.prefix}init end`,
          value: 'Ends the initiation procedure and resets the channel.'
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