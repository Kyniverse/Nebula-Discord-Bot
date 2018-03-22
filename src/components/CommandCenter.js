export default class CommandCenter {
  constructor() {
    this.prefix = 'nightwatch ';
  }

  checkCommands(message) {    
    if (message.content.startsWith(this.prefix))
    {
      //  Trimming the message to receive the command.
      var command = message.content.substring(this.prefix.length);
      
      //  Checking for the different command-types.
      switch (command) {
        case '-test':
          message.channel.send('Test command!');
          break;
        case 'ping':
          message.channel.send('pong!');
          break;
      }
    }
  }
}