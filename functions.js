const fs = require("fs");
const ytdl = require("ytdl-core");
const yt = require('youtube-search-without-api-key');

function inputStr(ctx, cmd) {
    return ctx.message.text.replace(`/${cmd}`, "");
};

function downAndSendSong(ctx, result) {
    const link = result.url
    const title = result.title
    const filename = result.title.replace("/", "")+".mp3"
    const file = fs.createWriteStream(filename);
    ytdl(
        link,
        {
            filter: "audioonly"
        }
    )
     .pipe(
         file
     );
     file.on(
         "finish",
         async function () {
             file.close();
             ctx.replyWithAudio({source: filename}, {title: title});
             await new Promise(r => setTimeout(r, 2000));
             fs.unlink(filename, function(err) {console.error(err)});
         }
     );
};

async function searchMusic(name) {
    const result = await yt.search(name);
    return result[0];
};

exports.functions = {inputStr: inputStr, downAndSendSong: downAndSendSong, searchMusic: searchMusic}

