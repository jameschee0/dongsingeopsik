const cheerio = require("cheerio"),
      request = require("request");

const init_url = "https://stu.dje.go.kr/sts_sci_md01_001.do?schulCode=G100000208&schulCrseScCode=4&schulKndScCode=04&schMmealScCode=2";

const MealParser = {};

MealParser.parse = () => {
  var result;
  console.log(''+init_url);
  result = doRequest(makeURL());
  return result;
}

function makeURL(){
  var result = init_url;
  return result;
}

function doRequest(url){
  var list = []; //[8]monday [12]friday
  request(url, function(err, resp, html) {
      if (!err){
        const $ = cheerio.load(html);
        $('.tbl_type3 td:contains(중식)').parent().find('td').each(function (index, element) {list.push($(element).text());
        });
        console.log(html);
    }
  });
  console.log(list);
  return ''+list[8];
}

module.exports = MealParser;
