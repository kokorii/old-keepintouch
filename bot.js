const TelegramBot = require('node-telegram-bot-api');
const getJSON = require('get-json');

// replace the value below with the Telegram token you receive from @BotFather
const getToken = (function(){
    const token = process.env.TELEGRAM_TOKEN;
    return function() {
        return token;
    };
})();

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(getToken(), {polling: true});
console.log(getToken);

// Listener (handler) for telegram's /label event
bot.onText(/\/label/, function(msg, match){
  const chatId = msg.chat.id;
  const url = match.input.split(' ')[1];

  if (url === undefined) {
      bot.sendMessage(
          chatId,
          'Please provide URL of article!',
      );
    return;
  }

  bot.sendMessage(
    chatId,
    'this is callback data',
    {
        reply_markup: {
            inline_keyboard: [[
                {
                    text: 'Opt1',
                    callback_data: 'Opt1'
                },
                {
                  text: 'Opt2',
                  callback_data: 'Opt2'
                },
                {
                    text: 'Other',
                    callback_data: 'other'
                }
            ]]
        }
    });
});

// Listener (handler) for callback data from /label command
bot.on('callback_query', function(query) {
  const message = query.message;
  const category = query.data;

  bot.sendMessage(message.chat.id,`clicked ${category}`);
});
