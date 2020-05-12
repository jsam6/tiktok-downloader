const axios = require('axios')

class User {
    constructor(){
        this.userId = '';
        this.uniqueId = '';
        this.name = '';
        this.totalVideos = 0;
        this.url = '';
        this.secUid = '';
        this.appId = '';
    }

    // ID
    setId(id) {
        this.userId = id
        return this.userId
    }

    getId(){
        return this.userId
    }

    // URL
    setUrl(link) {
        this.url = 'www.tiktok.com' + link
        return this.url
    }

    getUrl(){
        return this.url
    }

    // Name
    setName(name) {
        this.name = name
        return this.name
    }

    getName(){
        return this.name
    }

    // Total Videos
    setTotalVideos(total) {
        this.totalVideos = total
        return this.totalVideos
    }

    getTotalVideos() {
        return this.totalVideos
    }

    // Unique ID
    setUniqueId(id) {
        this.uniqueId = id
        return this.uniqueId
    }

    getUniqueId(){
        return this.uniqueId
    }

    // SecUid
    setSecUid(id) {
        this.secUid = id
        return this.secUid
    }

    getSecUid(){
        return this.secUid
    }

    // AppId
    setAppId(id) {
        this.appId = id
        return this.appId
    }

    getAppId(){
        return this.appId
    }

}

module.exports = User;