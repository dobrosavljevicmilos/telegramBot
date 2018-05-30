'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController

// var auth = {};

class AuthController extends TelegramBaseController {
    constructor(tg) {
        super();
        this.tg = tg;
        this.auth = {};
    }
    
    /**
     * @param {Scope} $
     */
    // const 

    authHandler($) {
        const userId =  $.chatId;
        this.tg.api.sendMessage(userId, 'Hi')

        if (this.checkIsAuth(userId)) {
            this.tg.api.sendMessage(userId,`You are already auth ${this.auth[userId].email}.`)
            return;
        }


        const form = {
            email: {
                q: 'Send me your email',
                error: 'Sorry, wrong email format',
                validator: (message, callback) => {
                    if(isEmailValid(message.text)) {
                        callback(true, message.text) //you must pass the result also
                        return
                    }
        
                    callback(false)
                }
            },
            password: {
                q: 'Send me password',
                error: 'sorry, wrong input',
                validator: (message, callback) => {
                    if(message.text) {
                        callback(true,message.text)
                        return
                    }
        
                    callback(false)
                }
            }
        }
        
        $.runForm(form, (result) => {
            console.log(result);
            this.auth[userId] = result;

            $.sendMessage(`Thank you for log in ${result.email}.\n You can now continue using 64idea`);
            console.log(this.auth);
        })


        // if (auth['']) {
            
        // }

        
    }


    checkIsAuth(userId){

        if (userId in this.auth) {
            // if (this.auth[userId].username !== undefined) {
            //     return true;
            // }
            return true;

        } else {
            return false;
        }
    }
    

    get routes() {
        return {
            'authCommand': 'authHandler',
        }
    }

    

}

function isEmailValid(email) {
	var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}

module.exports = AuthController;