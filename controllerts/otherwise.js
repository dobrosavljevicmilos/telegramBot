'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController


class OtherwiseController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    handle($) {
        $.sendMessage('Sorry,wrong command.. List command at /help')
    }
}

module.exports = OtherwiseController;