//  Importing the Database object.
import { db } from '../Database';

//  Importing the Config file.
import Config from '../Config';

/*                ConfigService 
 * 
 *  Serves are a communication layer between
 *  the bot and the database in order to retrieve,
 *  update or set information towards the database.
 */
export default class ConfigService {

  /* 
   *  Retrieves the given module's configuration from the Database.
   */
  static getModuleConfiguration(moduleName) {
    //
    //  For this function, we run a query and return a promise
    //  based on that query. This makes everything somewhat more
    //  event based and a bit more friendly to work with.
    //
    return new Promise(function(resolve, reject) {
      db.query('SELECT json FROM modules WHERE name=?', [moduleName])
        .then(response => {
          if (response.length !== 1)  {
            reject(new Error(`Could not retrieve ${moduleName} from the Database.`));
          }
            
          else resolve(JSON.parse(response[0].json));
        }).catch(error => reject(error));
    });
  }
  
  /* 
   *  Writes the given module's configuration to the Database.
   */
  static createModuleConfiguration(moduleName, config) {
    //
    //  For this function, we run a query and return a promise
    //  based on that query. This makes everything somewhat more
    //  event based and a bit more friendly to work with.
    //
    return new Promise(function(resolve, reject) {
      db.query('INSERT INTO modules (name, json) VALUES (?, ?)', [moduleName, config])
        .then(response => {
          if (response === undefined) 
            reject(new Error(`Could not write the config for ${moduleName} into the Database.`));
          else resolve();
        }).catch(error => reject(error));
    });
  }

  /* 
   *  Writes the given module's configuration to the Database.
   */
  static updateModuleConfiguration(moduleName, config) {
    //
    //  For this function, we run a query and return a promise
    //  based on that query. This makes everything somewhat more
    //  event based and a bit more friendly to work with.
    //
    return new Promise(function(resolve, reject) {
      db.query(`UPDATE modules SET json=? WHERE name="${moduleName}"`, [config])
        .then(response => {
          if (response === undefined) 
            reject(new Error(`Something went wrong Updating ${moduleName} in the Database`));
          else resolve();
        }).catch(error => reject(error));
    });
  }
}