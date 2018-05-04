class Template{

  //basic text message template //usage: this.basic_text("hello world!");
  basicText (message){
    var response;
    response = {
      "text": message
    }
    return response;
  }

  standardResponse(){
    var response = {
      "text":"default",
      "quick_replies":[
        {
        "content_type":"text",
        "title":"오늘의 아침",
        "payload":"GET_MENU_BRE"
        },
        {
        "content_type":"text",
        "title":"오늘의 점심",
        "payload":"GET_MENU_LUN"
        },
        {
        "content_type":"text",
        "title":"오늘의 저녁",
        "payload":"GET_MENU_DIN"
        }
      ]};
    return response;
  }

  persistentMenu(){
    var response;
    response={
  "persistent_menu":[
    {
      "locale":"ko_KR",
      "composer_input_disabled": true,
      "call_to_actions":[
        {
        "content_type":"text",
        "title":"오늘의 아침",
        "payload":"GET_MENU_BRE"
        },
        {
        "content_type":"text",
        "title":"오늘의 점심",
        "payload":"GET_MENU_LUN"
        },
        {
        "content_type":"text",
        "title":"오늘의 저녁",
        "payload":"GET_MENU_DIN"
        }
      ]
    }
  ]
}
  return response;
  }
}



module.exports = Template
