//  Importing our module base for a slick OOP system.
import ModuleBase from "../ModuleBase";

//  Importing the config object since we need the prefix.
import Config from '../Config';

export default class AdminModule extends ModuleBase {
  constructor(client, moduleName) {
    super(client);

    this.moduleName = moduleName;
    this.config = { 
      "active": true,
      "ignore": true,
      "channels": []
    }
  }

  update(message, command, args) {
    if (!message.member.roles.find('id', '425722321328930827')) return;
    if (!this.command.startsWith(Config.Bot.prefix)) return;

    switch(command) {
      case '':
        break;

      default:
        message.channel.send('Sorry! Command not found');
        break;
    }
  }
}