'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController

const firebaseEndpointURL = "https://us-central1-idea-75af2.cloudfunctions.net/telegramUserId";

class OtherwiseController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    handle($) {

        
        var xhttp = new XMLHttpRequest();
        xhttp.setRequestHeader("Content-type", "application/json");
        
        xhttp.open("POST", firebaseEndpointURL, false);
        xhttp.onload = function() {
            if (this.status == 200) {
                let re = JSON.parse(this.responseText); //this -> xhttp

                console.log("Response from firebase for login:" + re);

                if(re['status'] == 'OK'){
                    isValid = true;
                }
            }
        };
        xhttp.onerror = function(e){
            console.error(xttp.statusText);
        };

        let payload = {"test" : "123"};
        xhttp.send();







        // $.sendMessage('Sorry,wrong command.. List command at /help')
    }
}

module.exports = OtherwiseController;