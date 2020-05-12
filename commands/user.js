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
        user.setUrl(JSON.parse(appjson.html()).props.initialProps['$pageUrl'])
        user.setName(username)


        console.log(
            'Username: ' + user.getName() + '\n'
            + 'User URL: ' + user.getUrl() + '\n'
            + 'User ID: ' + user.getId() + '\n'
            + 'Total Videos: ' + user.getTotalVideos()
        )

        
    }

}

module.exports =  url