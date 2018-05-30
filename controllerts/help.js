'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController


class HelpController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    helpHandler($) {
        let response = 'Welcome to 64idea.com help section.\n\nPut */* in chat area to see available commands.\n\nIf you need any help go to our site www.64idea.com/help for further assistance.'
        $.sendMessage(response,{ parse_mode: 'Markdown' });
    }


    get routes() {
        return {
            'helpCommand': 'helpHandler',
        }
    }
}

module.exports = HelpController;