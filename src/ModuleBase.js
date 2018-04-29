//  Importing the configuration service.
import ConfigService from './services/ConfigService';

//  Importing Config for the Prefix.
import Config from './Config';

/*                ModuleBase 
 * 
 *  Serves as a template for modules on which
 *  various integrations / interaction can be
 *  buildt ontop of.
 */
export default class ModuleBase {
  constructor (client, moduleName) {
    this.moduleName = moduleName;
    this.client = client;
    this.config = { 
      "active": true,
      "ignore": false,
      "usePrefix":true,
      "channels": []
    }

    this.defaultHelpMessage = true;
    this.defaultConfigMessage = true;
    this.logUsage = false;
  }

  /* 
   *  Template function for updating the module with a small
   *  check in order to see if the bot is configurated and
   *  to display run either the help or config system.
   */
  update(message, command, args) { 
    //  If the bot is not configurated, ignore this entire function.
    if (!Config.Bot.configurated) return;
    //  Check if the default help message requirements are met.
    if (this.defaultHelpMessage &&
        command === 'help' && 
        args.length >= 1 && 
        args[0] === this.moduleName) {
      this.showHelpMenu(message.channel);
    }
    
    //  Check if the default config message requirements are met.
    if (this.defaultConfigMessage)
    {
      if (!message.member.roles.has(Config.Bot.roles.admin)) return;
      if (command === 'config') {
        console.log('test');
        if (args.length === 1 && args[0] === this.moduleName) {
          this.showConfigHelpMenu(message.channel)
        } else if (args.length >= 1  && args[0] === this.moduleName) {
          this.handleConfig(message, command, args);
        }
      } 
    }
  }

  /* 
   *  Template function for showing the default help message.
   */
  showHelpMenu(channel) { 
    if (this.logUsage) console.log(`Displaying help menu for ${this.moduleName}`);
  }

  /* 
   *  Template function for showing the default help message.
   */
  showConfigHelpMenu(channel) {
    if (this.logUsage) console.log(`Displaying Config Help menu for ${this.moduleName}`)
  }

  /* 
   *  Template function for updating the configuration.
   */
  handleConfig(message, command, args) {
    if (this.logUsage) console.log(`Displaying Config menu for ${this.moduleName}`);
  }

  /* 
   *  Loads the current module's configuration from the Database.
   *                    Do not overwrite!
   */
  loadConfig() {
    //
    //  Firstly, we check if the current module's name is not empty.
    //  After that, we retrieve the data from the Database. If the
    //  data does not exist, we push the default config which is
    //  defined in the constructor to the database.  
    //
    if (this.moduleName.length === 0) return;
    ConfigService.getModuleConfiguration(this.moduleName)
      .then(response => { 
        this.config = response; 
      })
      .catch(error => {
        ConfigService.createModuleConfiguration(this.moduleName, JSON.stringify(this.config))
          .catch(error => console.error(error))
      });
  }

  /* 
   *  Writes the current module's configuration to the Database.
   *                    Do not overwrite!
   */
  writeConfig() {
    //
    //  Firstly, we check if the current module's name is not empty.
    //  After that, we write the changes that we have made to this
    //  modules configuration to the database.
    //
    if (this.moduleName.length === 0) return;
    ConfigService.updateModuleConfiguration(this.moduleName, JSON.stringify(this.config))
      .catch(error => console.error(error));
  }
}