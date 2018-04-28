//  Importing the ConfigService so that we can Query.
import ConfigService from "./services/ConfigService";

/*                Config 
 * 
 *  Provides information which the Bot can
 *  user for either the Database or Permissions.
 */
export default class Config {
  constructor() {
    Config.mySQL = {
      host: "localhost",
      user: "root",
      password: "",
      database: "nebula_dev"
    };

    Config.Bot = {};
  }

  /* 
   *  Retrieves the configuration for the Bot from the Database.
   */
  static RetrieveBotConfig() {
    //
    //  We return a new promised based on the information which we got.
    //
    return new Promise(function(resolve, reject) {
      ConfigService.getModuleConfiguration('main')
        .then(response => { Config.Bot = response; resolve(); })
        .catch(error => reject(error));
    });
  }

  /* 
   *  Updates the configuration for the Bot in the Database.
   */
  static UpdateBotConfig() {
    //
    //  We return a new promised based on the information which we got.
    //
    return new Promise(function(resolve, reject) {
      ConfigService.updateModuleConfiguration('main', JSON.stringify(Config.Bot))
        .then(response => { resolve(); })
        .catch(error => reject(error));
    });
  }
}