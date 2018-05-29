'use strict'

const Telegram = require('telegram-node-bot')
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('618842473:AAG3b8qTzX28w2xFfCF2kI_Yeh-8aZfslf4',{ workers : 1 });

const PingController = require('./controllerts/ping');
const OtherwiseController = require('./controllerts/otherwise');

tg.router
    .when(new TextCommand('/ping', 'pingCommand'),new PingController())
    .otherwise(new OtherwiseController());