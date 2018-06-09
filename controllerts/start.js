'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController

var request = require('request');



class StartController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    startHandler($) {

        const userId = $.chatId;
        $.sendMessage(`Hi there.\nPls auth yourself first`, { parse_mode: 'Markdown' });

        let tryAgain = true;

        // while (tryAgain) {
            // console.info("TEST1");
            const form = {
                email: {
                    q: 'What is your email?',
                    error: 'Sorry, wrong email format',
                    validator: (message, callback) => {
                        if (isEmailValid(message.text)) {
                            callback(true, message.text) //you must pass the result also
                            return
                        }

                        callback(false)
                    }
                },
                password: {
                    q: 'What is your password?',
                    error: 'sorry, wrong input',
                    validator: (message, callback) => {
                        if (message.text) {
                            callback(true, message.text)
                            return
                        }

                        callback(false)
                    }
                }
            }

            $.runForm(form, (result) => {
                console.log(result);

                let areCredentialsValid = this.checkCredentials(result, userId);

                if (areCredentialsValid) {
                    $.sendMessage(`Thank you for log in ${result.email}.\n You can now continue using 64idea`);
                    tryAgain = false;
                }

            })
        
            // if (tryAgain) {
            //     $.sendMessage(`Wrong credentials. Trying again..`, { parse_mode: 'Markdown' });
            //     this.startHandler($)
            // } else {
            //     return;
            // }

    }

    checkCredentials(result, userId){
        console.info("Checking user credentials for user:" + result.email + " for user:" + userId);
        const url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDlLG5IwKRID_yvJHIMCdB-zn5yujgEicw";

        let payload_data = {
            email: "idrazovic@gmail.com",
            password: "Musmula.92",
            returnSecureToken: true
        }

        var data = {
            url: url,
            json: true,
            body: JSON.stringify(payload_data)
        }

        request.post(data, function(error, httpResponse, body){
            console.log('Response from server:')
            console.log(body);

            if (!error && httpResponse.statusCode == 200) {
                console.log(body)
                return true;
            }else{
                console.error("ERROR:"+error);
            }
            
        });
    }

    // checkCredentials(result, userId) {
    //     let isValid = false;

    //     console.info("Checking user credentials:" + result + " for user:" + userId);
    //     var xhttp = new XMLHttpRequest();
    //     xhttp.setRequestHeader("Content-type", "application/json");

    //     xhttp.open("POST", url, false);
    //     xhttp.onload = function () {
    //         if (this.status == 200) {
    //             let re = JSON.parse(this.responseText); //this -> xhttp

    //             console.log("Response from firebase for login:" + re);

    //             if (re['registered'] == 'true') {
    //                 isValid = true;
    //             }
    //         }
    //     };
    //     xhttp.onerror = function (e) {
    //         console.error(xttp.statusText);
    //     };

        

    //     xhttp.send(JSON.stringify(payload));
    // }







    get routes() {
        return {
            'startCommand': 'startHandler',
        }
    }
}

function isEmailValid(email) {
	var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}


module.exports = StartController;