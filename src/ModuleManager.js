//  Importing Config for the Prefix.
import Config from './Config';

/*                ModuleManager 
 * 
 *  Handles the collection of  modules with updating
 *  based on a few basic configuration settings.
 */
export default class ModuleManager {
  constructor () { this.modules = []; }

  /* 
   *  Loads in the configuration for each module.
   */
  loadConfigurations() { this.modules.forEach(module => { module.loadConfig(); }); }

  /* 
   *  Adds a module to the manager for handling.
   */
  addModule(module) { this.modules.push(module); }

  /* 
   *  Updates all the modules which are currently in the list.
   */
  update(message) {
    //
    //  First thing to do is to filter the incomming message so that it's going to be
    //  easier to use it. By slicing and splitting it, the args objects goes from
    //  "OwO whats this" to [ OwO | whats | this ].
    //
    const args = message.content.slice(Config.Bot.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    //
    //  While looping through all the modules, we first check if the current
    //  module is activated. After that, checking if we should ignore the
    //  channels from the channel-list or not and based on that, a few
    //  more checks regarding the usage of the prefix.
    //
    //  The commenst are a bit overboard but hey, it helped a lot with 
    //  getting the correct update loop :p
    //
    this.modules.forEach(module => {
      // Is this module activated so that we can update it?
      if (module.config.active) {
        //  Should we ignore the channels of the given model?
        if (module.config.ignore) {
          //  Should we filter the current message on the prefix?
          if (module.config.usePrefix) {
            //  Checking of the current message contains the prefix
            if (message.content.indexOf(Config.Bot.prefix) === 0) {
              //  Update the current module.
              module.update(message, command, args);
            }
          } else {
            //  If not using the prefix, just update the module.
            module.update(message, command, args);
          }
        } else {
          //  However, if we are NOT ignoring the channels, loop through them.
          for (var i = module.config.channels.length - 1; i >= 0 ; i--) {
            //  Checking of the channel ID's match
            if (module.config.channels[i] === message.channel.id) {
              //  Should we filter the current message on the prefix?
              if (module.config.usePrefix) {
                //  Checking of the current message contains the prefix
                if (message.content.indexOf(Config.Bot.prefix) === 0) {
                  //  Update the current module.
                  module.update(message, command, args);
                }
              } else {
                //  If not using the prefix, just update the module.
                module.update(message, command, args);
              }
            }
          }
        }
      }
    });
  }

  /* 
   *  Saves the configuration for each module towards the database.
   */
  saveModuleConfigurations() { this.modules.forEach(module => { module.writeConfig(); }); }

  /* 
   *  Checks if a given module exists
   */
  doesModuleExist(moduleName) {
    if (this.modules.length > 1) {
      for (let index = 1; index < modules.length; index++) {
        if (args[0] === this.modules[index].moduleName) return true;
      }
    }

    return false;
  }

  /* 
   *  Returns all the active modules in a list.
   */
  getAllModuleNames() {
    let modules = 'No modules installed!';

    if (this.modules.length > 1) {
      modules = '';
      for (let index = 1; index < this.modules.length; index++) {
        modules += this.modules[index].moduleName + '\n';
      }
    }

    return modules;
  }
}