const axios = require('axios')

class User {
    constructor(){
        this.name = '';
    }

    setName(name) {
        this.name = name
        return this.name
    }

    getName(){
        return this.name
    }

}

module.exports = User;