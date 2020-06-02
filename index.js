const {Client, MessageEmbed, Collection} = require('discord.js');
const bot = new Client();
const prefix = '~'
const token = 'NzE3MzE1MTEwMjg0MTY1MTgw.XtYhyw.zMpE_k3uJ5hhvFPEe_MOd6IIUxs';

const cheerio = require('cheerio');
const request = require('request');


bot.on('ready', () => {
    console.log('Beep Boop! BOT online')
})

const image = message => {
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "food",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    }
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });

}

bot.on('message', message => {
    let args = message.content.substring(prefix.length).split(' ');

    switch (args[0]) {
        case 'namaste':
            message.channel.send('Namaste ji 🙏')
            break;
        case 'image':
            image(message)
            break;
        case 'help':
            const embed = new MessageEmbed()
            .setTitle('Help')
            .setColor('#E44236')
            .setDescription('Make sure to use the help commmand');
            message.author.send(embed);
            break;
        default:
            break;
    }
})

bot.login(token);