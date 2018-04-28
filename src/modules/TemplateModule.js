//  Importing our module base for a slick OOP system.
import ModuleBase from "../ModuleBase";

//  Importing Config for the Prefix.
import Config from '../Config';

/*                TemplateModule 
 * 
 *  This module doesn't do anything besides serving
 *  as a template on how to write modules for this
 *  discord bot.
 */
export default class TemplateModule extends ModuleBase {
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
  }


  /*         
   *    Update is called every time the modules is updated.
   */
  update(message, command, args) {
    //
    //  When the module is added to the manager, Update will run
    //  depending on a few settings which are set in the Config.
    //  Make sure to call the base class!
    //
    super.update(message, command, args);

    if (message.content === 'test') {
      message.channel.send('received message for: ' + this.moduleName);
    }
  }

  /*         
   *    showHelpMenu(); is called whenever the user types:
   *    'prefix + help + module-name'. All users.
   */
  showHelpMenu(channel) {
    //
    //  Show your help message here, I would recommend an embed!
    //  Calling the base-class is not required.
    //
    
    //super.showHelpMenu(channel);

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

  /*         
   *    showConfigHelpMenu(); is called whenever the user types:
   *    'prefix + config + module-name'. Admins only.
   */
  showConfigHelpMenu(channel) {
    //
    //  Show your help message here, I would recommend an embed!
    //  Calling the base class is not required.
    //

    //super.showConfigHelpMenu(channel);

    channel.send({embed: {
      color: 0x78c811,
      author: {
        //  name of the author, we use the bot.
        name: this.client.user.username,

        //  avatar of the author, we use the bot.
        icon_url: this.client.user.avatarURL
      },
      title: `Config help menu for ${this.moduleName}`,
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

  /*         
   *    handleConfig(); is called whenever the user types:
   *    'prefix + config + module-name + <anything>'. Admins only.
   *    This function is purely to handle configurations.   
   */
  handleConfig(message, command, args) {
    //
    //  Handle your configurations here by checking the arguments.
    //  Calling the base class is not required
    //

    //super.handleConfig(message, command, args);
  }
}


