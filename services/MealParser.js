const cheerio = require("cheerio"),
      request = require("request");

const init_url = "https://stu.dje.go.kr/sts_sci_md01_001.do?schulCode=G100000208&schulCrseScCode=4&schulKndScCode=04&schMmealScCode=2";

const MealParser = {};
var list = ["initial array"];
var ongoing = true;
MealParser.parse = () => {
  console.log(''+init_url);
  request(makeURL(), function(err, resp, html) {
      if (!err){
      const $ = cheerio.load(html);
      $('.tbl_type3 th:contains("중식")').parent().children().each(function () {
        list.push($(this).text());
      });
      console.log(list);
      ongoing = false;
    }
  });
  while(ongoing){
  }
  return list[4];
}

function makeURL(){
  var result_url = init_url;
  return result_url;
}

module.exports = MealParser;
