const cheerio = require("cheerio"),
      request = require("request");

const init_url = "https://stu.dje.go.kr/sts_sci_md01_001.do?schulCode=G100000208&schulCrseScCode=4&schulKndScCode=04&schMmealScCode=";
const response_message = {
  "text":"ey!!",
  "quick_replies":[
    {
    "content_type":"text",
    "title":"오늘의 아침",
    "payload":"GET_MENU_PAYLOAD"
    },
    {
    "content_type":"text",
    "title":"오늘의 점심",
    "payload":"GET_MENU_PAYLOAD"
    },
    {
    "content_type":"text",
    "title":"오늘의 저녁",
    "payload":"GET_MENU_PAYLOAD"
    }
  ]
  }
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const MealParser = {};

MealParser.sendMeal = (sender_psid,type) =>{
  console.log(''+init_url);
  parse(makeURL(type),makeString(type),function(err,data){
    console.log(data);
    var d = new Date();
    var index = d.getDay()+2;
    if(data[index].length>0){
      callSendAPI(sender_psid, makeResponse(data[index]));
    }else{
      callSendAPI(sender_psid, makeResponse("급식이 없습니다"));
    }
  });
}

function parse(url,query,callback){
  request(url, function(err, resp, html) {
      var list = ["initial array"];
      if (!err){
      const $ = cheerio.load(html);
      $(query).parent().children().each(function () {
        list.push($(this).text());
      });
      callback(null,list);
    }
  });
}

function makeString(type){
  var first = '.tbl_type3 th:contains("';
  var last = '")';
  if(type===1){
    return '.tbl_type3 th:contains("조식")'
  }else if (type===2) {
    return '.tbl_type3 th:contains("중식")'
  }else if (type===3) {
    return '.tbl_type3 th:contains("석식")'
  }
}

function makeURL(type){
  var result_url = init_url+type;
  return result_url;
}

function makeResponse(data){
  response_message.text = data;
  return response_message;
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

module.exports = MealParser;
