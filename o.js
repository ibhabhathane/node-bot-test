const request = require('request');
const { Telegraf } = require("telegraf");
const bot = new Telegraf("2090823500:AAF3R8ERmALkx0seexQEL5JGRmzSrPdBytU")
  
bot.command("k", (ctx) =>
    request({
        url: 'https://nekos.life/api/v2/img/neko',
        json: true
      }, function(error, response, body) {
        ctx.replyWithPhoto(body.url);
    })
);

bot.launch()

