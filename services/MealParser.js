const cheerio = require("cheerio"),
      request = require("request");

const init_url = "https://stu.dje.go.kr/sts_sci_md01_001.do?schulCode=G100000208&schulCrseScCode=4&schulKndScCode=04&schMmealScCode=2";

const MealParser = {};

MealParser.parse = () => {
  var result;
  console.log(''+init_url);
  doRequest(makeURL());
}

function makeURL(){
  var result = init_url;
  return result;
}

function doRequest(url){
  request(url, function(err, resp, html) {
      if (!err){
        const $ = cheerio.load(html);
        console.log(html);
    }
  });
  console.log('request working');
}

module.exports = MealParser;
