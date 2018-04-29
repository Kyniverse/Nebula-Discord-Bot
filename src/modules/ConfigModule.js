//  Importing our module base for a slick OOP system.
import ModuleBase from "../ModuleBase";

//  Importing Config for the Prefix.
import Config from '../Config';

//  Importing the ModuleManager purely for saving.
import ModuleManager from '../ModuleManager';

/*                ConfigModule 
 * 
 *  Object which takes care of all the channels / roles
 *  that need to be set for the bot in order to make sure
 *  that everything will function properly.
 */
export default class ConfigModule extends ModuleBase {
  constructor(client, moduleName, moduleManager) {
    super(client, moduleName);
    this.config = {
      "active":true,
      "ignore":true,
      "usePrefix":true,
      "channels":[]
    }

    //  Local declaration of ModuleManager.
    this.ModuleManager = moduleManager;

    this.defaultHelpMessage = false;
    this.defaultConfigMessage = false;
    this.logUsage = false;

    //  When starting the bot, we are going to run down a quick
    //  check to see if the configuration is still in tact.
    //  If not, we request that the user needs to set it.
    //  Delaying this for a second gives the applications
    //  enough time to establish a connection to the database.
    setTimeout(() => {
      this.checkForBotConfig();
    }, 1000);
  }

  /* 
   *  Updates the current Module.
   */
  update(message, command, args) {
    //
    //  In order to properly set the configuration for this bot, we have
    //  to make sure that either the owner of the server or the creator
    //  of this bot is using the commands.
    //
    //  Storing the ID of the user who just typed and the 
    //  channel ID for easier referencing.
    let user = message.member;
    let channel = message.channel;

    //  Checking if something matches.
    if (user.id !== message.guild.ownerID &
        user.id !== Config.Bot.creator.id &
        user.roles.has(Config.Bot.roles.admin)) {
      // If the user does not have any permissions, display a fancy message.
      channel.send(
        'Sorry champ! It looks like you do not have the ' + 
        'required permissions to use this!'
      );
      return; //  Return and terminate this function.
    }

    if (command === 'setup') {
      this.handleSetup(channel, args);
    } else {
      if (!Config.Bot.configurated) this.checkForBotConfig(channel);
    }

    //
    //  Right here we do a bulky check to see if a few things match up.
    //  The first thing we check is to see if the bot as been configurated.
    //  After that, check for permissions and then the correct usage of
    //  the config command.
    //
    //  When using {prefix}config, we display a list with all modules.
    //  When using {prefix}config + module-name, we check if it exists,
    //  if not, display a message.
    //
    if(Config.Bot.configurated) {
      if (command === 'config') {
        if (user.roles.has(Config.Bot.roles.admin)) {
          if (args.length === 0) {
            this.displayGlobalConfigMessage(channel);
          } else if (args.length === 1) {
            if (args[0] === 'save') {
              this.ModuleManager.saveModuleConfigurations();
            } else {
              if (!this.ModuleManager.doesModuleExist(args[0])) {
                message.channel.send("I'm sorry but the given module could not be found. Module: " + args[0]);
              }
            }
          } else {
            channel.send(`Incorrect usage of command: ${command}`);
          }
        } else {
          channel.send('you do not have permission to use this.');
        }
      }
    }
  }

  /* 
   *  Checks of all the configurations 
   */
  checkForBotConfig(channel) {
    //
    //  Checking if the entire configuration for the bot is correct
    //  so that if we are going to launch various modules, everything
    //  will work as expected and we wont run into any problems later on.
    //
    let done = true;
    //
    //  The first thing we are going to check is the roles. If none of the
    //  roles are set, display an error message.
    //
    for (const key in Config.Bot.roles) {
      if (Config.Bot.roles.hasOwnProperty(key)) {
        if (Config.Bot.roles[key] === '') {
          Config.Bot.configurated = false;
          done = false;

          if (channel === undefined) return;
          channel.send(
            `Configuration for role: **${key}** has not been set, ` + 
            `please configure my settings first! using **${Config.Bot.prefix}setup** !`
          );
          return;
        }
      }
    }
    //
    //  The second thing we are checking here is so see if the required channels
    //  are assigned. If not, display an error message.
    //
    for (const key in Config.Bot.channels) {
      if (Config.Bot.channels.hasOwnProperty(key)) {
        if (Config.Bot.channels[key] === '') {
          Config.Bot.configurated = false;
          done = false;

          if (channel === undefined) return;
          channel.send(
            `Configuration for channel: **${key}** has not been set, ` + 
            `please configure my settings first! using **${Config.Bot.prefix}setup** !`
          );
          return;
        }
      }
    }
    //  
    //  If everything is good to go, display a small message to let the user know that everything
    //  has been set and that he should save it.
    //
    if (done) {
      Config.Bot.configurated = true;
      if (channel === undefined) return;
      channel.send('Everything is set! If you have unsaved changes, please use >setup save.');
    }
  }

  /* 
   *  Handles the configuration of the bot for setting roles / permissions.
   */
  handleSetup(channel, args) {
    //
    //  For configurating the bot, we use this function to check
    //  the arguments and then apply them towards the config.
    //  A smart thing to do here is to also check if the input
    //  matches an ID of Discord's standards
    //
    if (args.length === 2) {
      if (args[1].length !== 18) {
        channel.send(`The ID you entered is an invalid length!: **${args[1]}**`);
      }
      
      if (args[1].match(/^[0-9]+$/) === null) {
        channel.send(`The ID you entered contains invalid characters!: **${args[1]}**`);
        return;
      }

      switch(args[0]) {
        case 'admin':
        //  Doing some checks before writing the data.
          if (this.checkIsRole(channel, args[1])) {
            Config.Bot.roles.admin = args[1];
            channel.send(`Admin role set to: **${args[1]}**`);
          } else channel.send(`The given ID is not a role ID!: **${args[1]}**`);
          break;
        case 'officer':
        //  Doing some checks before writing the data.  
          if (this.checkIsRole(channel, args[1])) {
            Config.Bot.roles.officer = args[1];
            channel.send(`Officer role set to: *${args[1]}*`);
          } else channel.send(`The given ID is not a role ID!: **${args[1]}**`);
          break;
        case 'verified':
        //  Doing some checks before writing the data.
          if (this.checkIsRole(channel, args[1])) {
            Config.Bot.roles.verified = args[1];
            channel.send(`Verified role set to: *${args[1]}*`);
          } else channel.send(`The given ID is not a role ID!: **${args[1]}**`);
          break;
        case 'join':
        //  Doing some checks before writing the data.
          if (this.checkIsChannel(channel, args[1])) {
            Config.Bot.channels.join = args[1];
            channel.send(`Join Channel set to: *${args[1]}*`);
          } else channel.send(`The given ID is not a role ID!: **${args[1]}**`);
          break;
        case 'initiation':
        //  Doing some checks before writing the data.
          if (this.checkIsChannel(channel, args[1])) {
            Config.Bot.channels.initiation = args[1];
            channel.send(`Initiation Channel set to: *${args[1]}*`);
          } else channel.send(`The given ID is not a role ID!: **${args[1]}**`);
          break;
        default: 
        //  Deffault message.
        channel.send(`Incorrect command usage or argument: **${args[0]}**`);
          break;
      }
    } else if (args.length === 1) {
      if (args[0] === 'save') {
        Config.UpdateBotConfig()
          .catch(error => console.error(error));
        channel.send('Writing config to Database.');
      } else {
        channel.send(`Incorrect command usage or argument: **${args[0]}**`);  
      }
    } else if (args.length === 0) {
      this.displayHelpMessage(channel);
    } else {
      channel.send(`Incorrect command usage or argument: **${args[0]}**`);
    }

    this.checkForBotConfig(channel);
  }

  /* 
   *  Displays the help message for when the configuration is not finished.
   */
  displayHelpMessage(channel) {
    //
    //  Not much to say here other than that we are
    //  displaying a fancy message which shows the
    //  various commands you have.
    //
    channel.send({embed: {
      color: 0x78c811,
      author: {
        name: this.client.user.username,
        icon_url: this.client.user.avatarURL
      },
      title: 'Nebula Configuration View',
      description:  'Please use the following commands to configure Nebula',
      fields: [{
          name: 'admin <@role> | ' + Config.Bot.roles.admin,
          value: 'Sets the ID of the moderator role.'
        },
        {
          name: 'officer <@role> | ' + Config.Bot.roles.officer,
          value: "Sets the ID of the officer role."
        },
        {
          name: 'verified <@role> | ' + Config.Bot.roles.verified,
          value: 'Sets the ID of the verified role.'
        },
        {
          name: 'join <@channel> | ' + Config.Bot.channels.join,
          value: 'Sets the ID of the join channel.'
        },
        {
          name: 'initiation <@channel> | ' + Config.Bot.channels.initiation,
          value: 'Sets the ID of the initiation channel.'
        },
        {
          name: 'save',
          value: 'Saves the current changes towards the database.'
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: this.client.user.avatarURL,
        text: "© Zurkloyd"
      } 
    }});
  }

  /* 
   *  Displays the global config menu which lists all the modules.
   */
  displayGlobalConfigMessage(channel) {
    //
    //  We just embed a simple message here which lists all the currently
    //  'installed' modules which the bot contains.
    //
    let modules = this.ModuleManager.getAllModuleNames();

    channel.send({embed: {
      color: 0x78c811,
      author: {
        name: this.client.user.username,
        icon_url: this.client.user.avatarURL
      },
      title: 'Nebula Configuration View',
      description:  'Please use the following commands to configure Nebula.\n' +
                    `NOTE: All commands start with ${Config.Bot.prefix}config!`,
      fields: [{
          name: 'Installed modules',
          value: modules
        }, 
        {
          name: 'Save',
          value: 'Saves the changes done to each module to the database.'
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: this.client.user.avatarURL,
        text: "© Zurkloyd"
      } 
    }});
  }

  /* 
   *  Extremely simple check to see if the current ID is actually a role.
   */
  checkIsRole(channel, id) {
    if (channel.guild.roles.has(id)) return true;
    return false;
  }

  /* 
   *  Extremely simple check to see if the current ID is actually a channel.
   */
  checkIsChannel(channel, id) {
    if (channel.guild.channels.has(id)) return true;
    return false;
  }
}