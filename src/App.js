//  Important stuff
import Discord from '../node_modules/discord.js';
import Database from './Database';
import Config from './Config';

//  Importing the Modules
import ModuleManager from './ModuleManager';
import ConfigModule from './modules/ConfigModule.js';

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

    client.on('guildMemberAdd', member => {
      setTimeout(() => {
        message.channel.send({embed: {
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
      }, 1000);
    });


/*
    this.initDatabase(database, () => {
      
      moduleManager.loadConfigurations();
      Config.GetBotConfig(() => client.login(Config.Bot.token));
    });

    client.on('ready', () => console.log('Nebula-development ready.'));

    client.on("message", async message => {
      
      if (message.author.bot) return;

      const args = message.content.slice('>').trim().split(/ +/g);
      const command = args.shift().toLowerCase();

      moduleManager.update(message, command, args);
      settingsManager.update(message, command, args);
    });

    client.on("guildMemberAdd", (member) => {});
  }


  //  Connects the bot to the database and gives is a callback on success.
  initDatabase(database, onSuccess) {
    database.connect(Config.mySQL)
    .then((reponse) => {
      console.log("Successfully connected to database: { host: " + Config.mySQL.host + ", database: " + Config.mySQL.database + " }");
      onSuccess();
    })
    .catch((error) => { console.log(error); });
  }
*/


  }
}