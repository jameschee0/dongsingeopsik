'use strict';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
// Imports dependencies and set up http server
const
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  https = require("https"),
  Template = require('./Template'),
  MealParser = require('./MealParser'),
  app = express().use(body_parser.json()); // creates express http server

const template = new Template();

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {
    setupAPI();
    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);


      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender ID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {

        handlePostback(sender_psid, webhook_event.postback);
      }

    });
    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {

  /** UPDATE YOUR VERIFY TOKEN **/

  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Check if a token and mode were sent
  if (mode && token) {

    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

function handleMessage(sender_psid, received_message) {
  let response;

  // Checks if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    if(received_message.text==='오늘의 아침'){
      MealParser.sendMeal(sender_psid,1);
    }else if (received_message.text==='오늘의 점심') {
      MealParser.sendMeal(sender_psid,2);
    }else if (received_message.text==='오늘의 저녁') {
      MealParser.sendMeal(sender_psid,3);
    }
  }else{
    response = template.standardResponse();
    response.text = "에러가 났네요 다시 선택해 주세요!";
    callSendAPI(sender_psid, response);
  }
  // Send the response message
}

function handlePostback(sender_psid, received_postback) {
  console.log('ok')
   let response;
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'GET_MENU_BRE') {
    MealParser.sendMeal(sender_psid,1);
  }else if (payload === 'GET_MENU_LUN') {
    MealParser.sendMeal(sender_psid,2);
  }else if (payload === 'GET_MENU_DIN') {
    MealParser.sendMeal(sender_psid,3);
  }else if (payload === "GET_STARTED_PAYLOAD") {
    response = template.standardResponse();
    response.text = "동신과학고 여러분 안녕하세요 급식충입니다. 아래 버튼을 눌러 오늘의 메뉴를 확인하세요";
    callSendAPI(sender_psid, response);
  }else{
    response = template.standardResponse();
    response.text = "에러가 났네요 다시 선택해 주세요!";
    callSendAPI(sender_psid, response);
  }
  // Send the message to acknowledge the postback
}

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

function setupAPI(){
  request({
    url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json:{
      "get_started":{
      "payload":"GET_STARTED_PAYLOAD"
        }
      }
    }, function(error, response, body) {
    if (error) {
        console.log('Error sending messages: ', error)
    } else if (response.body.error) {
        console.log('Error: ', response.body.error)
    }
  })
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messenger_profile",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": template.persistentMenu()
  }, (err, res, body) => {
    if (!err) {
      console.log('persistentMenu added')
    } else {
      console.error("Unable to add persistentMenu" + err);
    }
  });
}
