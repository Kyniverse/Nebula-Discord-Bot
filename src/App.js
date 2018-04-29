//  Important stuff
import Discord from '../node_modules/discord.js';
import Database from './Database';
import Config from './Config';

//  Importing the Modules
import ModuleManager from './ModuleManager';
import ConfigModule from './modules/ConfigModule.js';
import AdminModule from './modules/AdminModule.js';
import InitiationModule from './modules/InitiationModule.js';

//  Main app.
export default class App {
  constructor() {

    //  Initializing a few important objects which the bot requires to properly function.
    let client = new Discord.Client();
    let database = new Database();
    let config = new Config();
    let moduleManager = new ModuleManager();

    //  Adding the different modules to the Bot
    moduleManager.addModule(new ConfigModule(client, 'config', moduleManager));
    moduleManager.addModule(new AdminModule(client, 'admin'));
    moduleManager.addModule(new InitiationModule(client, 'initiation'));

    //  Connecting to the database and on success, connecting the bot to the Discord-API.
    database.connect(Config.mySQL)
      .then((reponse) => {
        console.log(`Successfully connected to Database: { host: ${Config.mySQL.host}, database: ${Config.mySQL.database}}`);

        //  Since our modules are already loaded, we can load in their configuration files now.
        moduleManager.loadConfigurations();

        //  Retrieve the config for the bot from the Database and connect it to the Discord-API.
        Config.RetrieveBotConfig()
          .then(() => { client.login(Config.Bot.token); })
          .catch(error => console.error);
      }).catch(console.error);

    client.on('ready', () => console.log('Nebula-DEV is ready.'));
    client.on("message", async message => {
      if (message.author.bot) return;

      moduleManager.update(message);
    });

    /*
     *  guildMemberAdd(); is called whenever a new person joins
     *  the discord server.
     */
    client.on('guildMemberAdd', member => {
      //
      //  Before displaying a welcome message and tagging
      //  the user, we are first checking if the welcome
      //  channel is actually assigned.
      //
      if (Config.Bot.channels.join !== '') return;
      if (!member.guild.available) return;
      let joinChannel = member.guild.channels.find('id', Config.Bot.channels.join);

      setTimeout(() => {
        joinChannel.send({embed: {
          color: 0x78c811,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          title: 'Welcome message~!',
          description:  "Hello <@" + member.id + "> and welcome to the server! " +
                        "We hope that you will enjoy your stay and that you will have fun :heart_exclamation: " + 
                        "Please read the rules which are located in the <#425772170438901760> channel!",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Zurkloyd"
          }  
        }});
      }, 500);
    });
  }
}