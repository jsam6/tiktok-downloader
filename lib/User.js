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



    // async getPriceData(coinOption, curOption) {
    //     try{
    //         //Formatter for currency
    //         const formatter = new Intl.NumberFormat('en-US', {
    //             style: 'currency',
    //             currency: curOption
    //         })

    //         let resp = await axios.get(`${this.baseUrl}?key=${this.apiKey}&ids=${coinOption}&convert=${curOption}`)

    //         let output = ''

    //         resp.data.forEach( coin => {
    //             output += `Coin: ${coin.symbol.yellow} (${coin.name}) | Price: ${formatter.format(coin.price).green} | Rank: ${coin.rank.blue}\n`
    //         })

    //         return output;
            
    //     } catch (err) {
    //         handleAPIError(err)
    //     }
    // }

}


function handleAPIError(err) {
    if (err.response.status == 401) {
        throw new Error('Your API key is invalid - Go to https://nomics.com');
    } else if (err.response.status == 404) {
        throw new Error('Your API is not responding');
    } else {
        throw new Error('Something is not working');
    }
}

module.exports = User;