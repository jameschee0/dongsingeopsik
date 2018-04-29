class Template{

  //basic text message template //usage: this.basic_text("hello world!");
  basicText (message){
    var response;
    response = {
      "text": message
    }
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
          "title":"오늘의 급식",
          "type":"postback",
          "payload":"GET_MENU_PAYLOAD"
        }
      ]
    }
  ]
}
  return response;
  }
}



module.exports = Template
