class MealParser{
  constructor(height, width) {
    var cheerio = require('cheerio'),
        request = require('request');
    this.init_url = "https://stu.dje.go.kr/sts_sci_md01_001.do?schulCode=G100000208&schulCrseScCode=4&schulKndScCode=04&schMmealScCode=2";
  }

  parse(){
    var result;
    console.log('url: '+this.init_url);
  }

  doRequest(url){
    request(url, function(err, resp, html) {
        if (!err){
          const $ = cheerio.load(html);
          console.log(html);
      }
    });
  }

  makeURL(){
    var result = this.init_url;
    return result;
  }
}
module.exports = MealParser;
