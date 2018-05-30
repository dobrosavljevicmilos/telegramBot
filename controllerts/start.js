'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController


class StartController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    startHandler($) {
        $.sendMessage(`Hi there.\nPut / in chat to start`,{ parse_mode: 'Markdown' });
    }


    get routes() {
        return {
            'startCommand': 'startHandler',
        }
    }
}

module.exports = StartController;