const axios = require("axios");
const request = require('request');

const fs = require("fs")

const { Telegraf, Markup } = require("telegraf");
const inputStr = require("./functions.js").functions.inputStr;

const downAndSendSong = require("./functions.js").functions.downAndSendSong;
const searchMusic = require("./functions.js").functions.searchMusic;

const bot = new Telegraf("2090823500:AAF3R8ERmALkx0seexQEL5JGRmzSrPdBytU")
exports.bot = bot

bot.command("k", ctx => {
    request({
        url: 'https://nekos.life/api/v2/img/neko',
        json: true
      }, function(error, response, body) {
        ctx.replyWithPhoto(body.url, {
            caption: "oi",
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "oi",
                            url: "https://google.com",
                        },
                        {
                            text: "callback HAHA",
                            callback_data: "walledit",
                        },
                    ],
                ],
            },
        });
    })
});

bot.action("oi", ctx => {
    ctx.reply("Helou evriuan");
});

bot.command("song", async ctx => {
   ctx.reply("`Processando...`", {parse_mode: "Markdown"});
   const result = await searchMusic(inputStr(ctx, "song"));
   downAndSendSong(ctx, result);
});

bot.command("oi", ctx => {
    ctx.replyWithAudio({source: './oi.mp3'}, {title: "Helou"});
});
bot.command("str", ctx => {
    let text = inputStr(ctx, "str");
    if (text) {
        ctx.reply(text);
    }
    else {
        ctx.reply("fnix é guei");
    }
});

bot.action('walledit', ctx => {
//  console.log(ctx.update),
  axios.get('https://nekos.life/api/v2/img/wallpaper')
    .then(res => {
      let lass = res.data.url;
      request(lass).pipe(fs.createWriteStream("image.png"));
      ctx.editMessageMedia({
        type: "photo",
        media: lass,
        reply_markup: JSON.stringify({"inline_keyboard": [[{text: "oi",url: "https://google.com"},{text: "callback HAHA",callback_data: "walledit"}]]})
      })
    })
})
