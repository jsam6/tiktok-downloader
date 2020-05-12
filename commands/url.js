const axios = require('axios')
const cheerio = require('cheerio')
var https = require('https');
const fs = require('fs');

const constant = require('../src/constant')

const User = require('../lib/User')

const url = {
    async download (link, cb) {
            // 'https://www.tiktok.com/@aileenchristineee/video/6823846072973249797'
            let user = new User();
            let url = link

            // Get username
            let username = url.match(/\@(\w+)\//)
            if (!username) return console.log('Cannot find user')
            user.setName(username[1])



            let video = await axios.get(url, {headers: constant.headers})

            // parse html content into cheerio for scraping
            const $ = cheerio.load(video.data)
            const vidObj = $('#videoObject')
            let js = JSON.parse(vidObj.html())
            const contentUrl = js.contentUrl // Get URL to video source
            
            // save video to lcoal folder
            const publicDir = `./public`
            const destinationDir = `./public/${user.getName()}`
            // Check if folder exist, else create
            if (!fs.existsSync(destinationDir)){
                fs.mkdirSync(destinationDir);
            }
            const fileName = fs.createWriteStream(`${destinationDir}/${Date.now()}.mp4`);

            var request = https.get(contentUrl, function(resp) {
                console.log('downloading....')
                //save it
                resp.pipe(fileName);
                fileName.on('finish', function() {
                    fileName.close(cb);  // close() is async, call cb after close completes.
                });
                console.log('success')
            }).on('error', function(err) { // Handle errors
                fs.unlink(destinationDir); // Delete the fileName async. (But we don't check the result)
                if (cb) cb(err.message);
            });
    }

}

module.exports =  url