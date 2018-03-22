import PromiseMySql from 'promise-mysql';

export default class Database {

  constructor(){

  }

  connect(config){
    return new Promise ((resolve, reject) => {
      PromiseMySql.createConnection(config)
        .then((response) => { module.exports.db = response; resolve(response); })
        .catch((err) => { reject(err); });
    })
  }

}