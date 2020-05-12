const axios = require('axios')
const cheerio = require('cheerio')
var https = require('https');
const fs = require('fs');

const constant = require('../src/constant')

const User = require('../lib/User')

const url = {
    async download (username) {
        let user = new User();
        let url = `${constant.baseUrl}/@${username}`
        let resp;
        try {
            resp = await axios.get(url, {headers: constant.headers})
        } catch (err) {
            console.log(err.response.status)
            return console.log('username entered does not exist')
        }
        const $ = cheerio.load(resp.data)
        const appjson = $('#__NEXT_DATA__')
        // console.log( JSON.parse(appjson.html()).props.initialProps)

        user.setTotalVideos( JSON.parse(appjson.html()).props.pageProps.userInfo.stats.videoCount)
        user.setId( JSON.parse(appjson.html()).props.pageProps.userInfo.user.id)
        user.setUniqueId( JSON.parse(appjson.html()).props.pageProps.userInfo.user.uniqueId)
        user.setSecUid( JSON.parse(appjson.html()).props.pageProps.userInfo.user.secUid)
        user.setUrl(JSON.parse(appjson.html()).props.initialProps['$pageUrl'])
        user.setAppId(JSON.parse(appjson.html()).props.initialProps['$appId'])
        user.setName(username)


        console.log(
            'Username: ' + user.getName() + '\n'
            + 'User URL: ' + user.getUrl() + '\n'
            + 'User ID: ' + user.getId() + '\n'
            + 'Total Videos: ' + user.getTotalVideos()
        )

        let videoListUrl = constant.userVideoListUrl

        let replacements = {
            "%USERID%": user.getId(),
            "%SECUID%": user.getSecUid(),
            "%APPID%": user.getAppId(),
            "%VERIFY%": constant.verifyFp,
            "%SIGNATURE%": constant.signature,
            "%COUNT%": 30,
        }
        videoListUrl = videoListUrl.replace(/%\w+%/g, function(all) {
            return replacements[all] || all;
        });

        // Get List of Videos
        let vListResp = await axios.get(videoListUrl, {headers: constant.headers})
        console.log(vListResp.data)
        let vData = []
        for (const i of vListResp.data.items) {
            let obj = {}
            obj['id'] = i.id
            obj['createTime'] = i.createTime
            obj['downloadAddr'] = i.video.downloadAddr
            vData.push(obj)
        }


        // save video to lcoal folder
        const publicDir = `./public`
        const destinationDir = `./public/${user.getName()}`
        // Check if folder exist, else create
        if (!fs.existsSync(publicDir)){
            fs.mkdirSync(publicDir);
        } else if (!fs.existsSync(destinationDir)){
            fs.mkdirSync(destinationDir);
        }
        for (const x in vData) {
            const fileName = fs.createWriteStream(`${destinationDir}/${vData[x].id}.mp4`);
            var request = https.get(vData[x].downloadAddr, function(resp) {
                console.log(`downloading....    [${x+1}/${vData.length}]`)
                //save it
                resp.pipe(fileName);
                fileName.on('finish', function() {
                    fileName.close();
                });
                console.log('success')
            }).on('error', function(err) { // Handle errors
                fs.unlink(destinationDir); // Delete the fileName async. (But we don't check the result)
                console.log(err.message)
            });
        }
        
    }

}

module.exports =  url