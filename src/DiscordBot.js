import Discord from '../node_modules/discord.js';

//  Components
import CommandCenter from './components/CommandCenter';

export default class DiscordBot {
  constructor() {

    //  Settings up the local objects.
    let client = new Discord.Client();
    let commandCenter = new CommandCenter();

    client.on('ready', () => {
      console.log('Nightwatch is ready!');
    });

    client.on("message", (message) => {
      commandCenter.checkCommands(message);
    });

    client.login("NDI2NDMyNjA2OTE0MjE1OTM2.DZWHwA.xh_0cX3jO0P3e_CRMiGUOjbCDq0");
  }
}