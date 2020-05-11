const inquirer = require('inquirer')
const colors = require('colors')
const {isRequired} = require('../utils/validation')

const user = {
    async set () {
        const keyManager = new KeyManager();
        const input = await inquirer.prompt([
            {
                type: 'input' ,
                name: 'key',
                message: 'Enter API key'.green + 'https://nomics.com',
                validate: isRequired
            }
        ]);

        const key = keyManager.setKey(input.key)

        if (key) {
            console.log('API ket set'.blue)
        }
    },

    show () {
        try {
            const keyManager = new KeyManager();
            const key = keyManager.getKey();

            console.log('Current API key: ', key.yellow)

            return key;
        } catch (err) {
            console.log(err.message.red)
        }
    },

}

module.exports =  key