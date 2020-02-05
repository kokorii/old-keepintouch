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
    const user_name = msg.from.first_name;

    // send a message 
    bot.sendMessage(chatId,`${user_name}님, 안녕하세요.\n 하루 한 번 저장된 메세지 중 하나를 보내드릴게요.\n \"\/new 저장 할 이야기\"로 메세지를 저장하세요.`);
    
});

bot.onText(/\/new/, function(msg, match){
    const chatId = msg.chat.id;
    const user_msg = match.input.slice(5);

    if (user_msg === "" | user_msg === undefined) {
        bot.sendMessage(
            chatId,
            '저장할 메세지가 비어있어요!',
        );
      return;
    }

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId,` \"${user_msg}\"\n 메세지를 저장했습니다.`);
    
});

var moment = require('moment');

console.log(moment("12-25-1995", "MM-DD-YYYY").toDate()); 
console.log(moment("2020-02-05 4:30", "YYYY-MM-DD HH:mm").toDate()); 
console.log(moment(new Date()));

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
