const decryptCaesar = require('@shreyravi/decrypt-caesar');
const shift = process.env.CAESAR_SHIFT || 3;

function decryptor(messages){
    let arr = [];
    for(let message of messages){
        let index = 0;
        for(let str of message){
            if(str == ''){
                index++;
                continue;
            }
            arr[index] = str;
            index++;
        }
    }
    return decryptCaesar(arr.join(' '))[25 - shift];
}

module.exports = decryptor;
