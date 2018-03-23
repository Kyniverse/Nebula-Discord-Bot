export default class CommandCenter {
  constructor() {
    this.prefix = 'nightwatch ';
  }

  checkCommands(message) {    
    if (message.content.startsWith(this.prefix))
    {
      //  Trimming the message to receive the command.
      var command = message.content.substring(this.prefix.length);
    
      this.checkForPurge(message, command);

      //  Checking for the different command-types.
      switch (command) {
        case 'test':
          message.channel.send('I received the command!');
          break;
        case 'info':
          message.channel.send('\
Hello there! I am Nightwatch. A custom built \
bot by Zurkloyd for this server to aid with interaction and support \
for people!\
          ');
          break;
        case 'ping':
          message.channel.send('pong!');
          break;

        case 'name':
          message.channel.send('\
My name, Nightwatch, has been chosen because zurkloyd is a lazy bellend \
and could not think of anything better than \
("Hey! My bot watches the server at night while I am gone, let me call it nightwatch") \
Seriously man, think of something better...\
          ');
          break;
      }
    }
  }

  checkForPurge(message, command) {
    //  First things first, check if the user who requested the command
    //  is actually a moderator.
    if (!message.member.roles.has('425722321328930827')) return;

    //  Checking if the command starts with PURGE
    if (command.startsWith('purge')) {
      //  Trimming the message to get the numbers
      var amount = command.substring(6);

      //  Checking of the trimmed message contains any letters.
      if (amount.match(/[a-z]/)) return;

      //  Checking for the amount of messages.
      if (parseInt(amount) <= 100)
        message.channel.bulkDelete(parseInt(amount));
      else
        message.channel.send('Purging more than 100 messages is not allowed!');
    }
  }
}