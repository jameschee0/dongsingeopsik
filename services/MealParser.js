class MealParser{
  const cheerio = require('cheerio');
  const request = require('request');

  const init_url = "https://stu.dje.go.kr/sts_sci_md01_001.do?schulCode=G100000208&schulCrseScCode=4&schulKndScCode=04&schMmealScCode=2";

  makeURL()=>{
    var result = this.init_url;
    return result;
  }

  doRequest(url)=>{
    request(url, function(err, resp, html) {
        if (!err){
          const $ = cheerio.load(html);
          console.log(html);
      }
    });
  }

  parse()=>{
    doRequest(makeURL());
  }

module.exports = MealParser;
