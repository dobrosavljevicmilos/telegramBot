'use strict'

const Telegram = require('telegram-node-bot')
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('618842473:AAG3b8qTzX28w2xFfCF2kI_Yeh-8aZfslf4',{ workers : 1 });

let IdeaController = require('./controllerts/idea');
let OtherwiseController = require('./controllerts/otherwise');
let AuthController = require('./controllerts/auth');
let HelpController = require('./controllerts/help');
let StartController = require('./controllerts/start');

let authController = new AuthController(tg);
let ideaController = new IdeaController(authController);
let helpController = new HelpController();
let startController = new StartController();


tg.router
    .when(new TextCommand('/start', 'startCommand'),startController)
    .when(new TextCommand('/add', 'addCommand'),ideaController)
    .when(new TextCommand('/list', 'listCommand'),ideaController)
    .when(new TextCommand('/auth', 'authCommand'),authController)
    .when(new TextCommand('/help', 'helpCommand'),helpController)
    .otherwise(new OtherwiseController());