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

bot.onText(/\/start/, function(msg){
    const chatId = msg.chat.id;
    
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId,`\"${chatId}\"님, 안녕하세요.`);
    
});

bot.onText(/\/new/, function(msg, match){
    const chatId = msg.chat.id;
    const user_msg = match.input.split(' ')[1];

    console.log(typeof match.input);
    console.log(match.input.slice(5));
    
    if (user_msg === undefined) {
        bot.sendMessage(
            chatId,
            '저장할 메세지가 비어있어요!',
        );
      return;
    }

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId,`\"${match.input.slice(5)}\"가 저장되었습니다. 하루 한 번 저장된 메세지중 하나를 보내드릴게요.`);
    
});

// Listener (handler) for telegram's /test event
bot.onText(/\/test/, function(msg, match){
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
