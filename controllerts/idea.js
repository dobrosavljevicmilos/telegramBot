'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController


class IdeaController extends TelegramBaseController {

    constructor(authController){
        super();
        this.authController = authController;
    }

    /**
     * @param {Scope} $
     */
    addHandler($) {

        const userId =  $.chatId;

        if (!this.isAuth(userId)) {
            $.sendMessage('Sorry, pls auth first at /auth');
            return;
        }

        let idea = $.message.text.split(' ').slice(1).join(' ');

        if (!idea) {
            return $.sendMessage('Sorry, pls insert some idea');
        }

        $.getUserSession('ideas')
            .then( ideas => {
                if (!Array.isArray(ideas)) {
                    $.setUserSession('ideas',[idea])
                } else {
                    $.setUserSession('ideas' , ideas.concat([idea]));
                    console.log(idea);
                }
                $.sendMessage('Added new idea');
            });
    }

    listHandler($){

        // const ideas = $.getUserSession('ideas');

        // if (!ideas) {
        //     $.sendMessage( this.getFormatedIdeas(ideas), { parse_mode: 'Markdown' });
        // } else {
        //     $.sendMessage('..such.. empty.. ideas..');
        // }
        const userId =  $.chatId;

        if (!this.isAuth(userId)) {
            $.sendMessage('Sorry, pls auth first at /auth');
            return;
        }


        $.getUserSession('ideas').then( ideas => {
            
            if(isEmpty(ideas)){
                $.sendMessage('such.. empty.. list..');
            }else{
                $.sendMessage( this.getFormatedIdeas(ideas), { parse_mode: 'Markdown' });
            }

        });


    }

    get routes() {
        return {
            'addCommand': 'addHandler',
            'listCommand': 'listHandler'
        }
    }

    getFormatedIdeas(ideasList){
        let response = '*Your ideas:*\n\n';

        // if (!ideasList) {
            
        // }

        ideasList.forEach(element => {
            response += `- ${element}\n`;
        });
        return response;
    }

    isAuth(userId){
        console.log('testing auth');
        console.log(`userId: ${userId}`);
        // console.log(`auth obj: ${this.auth}`);

        if (!(userId in this.authController.auth)) {
            return false;
        }else{
            return true;
        }
    }


}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}


module.exports = IdeaController;