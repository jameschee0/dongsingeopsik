const cheerio = require("cheerio"),
      request = require("request");

const init_url = "https://stu.dje.go.kr/sts_sci_md01_001.do?schulCode=G100000208&schulCrseScCode=4&schulKndScCode=04&schMmealScCode=2";

const MealParser = {};

MealParser.parse = () => {
  var result_data;
  console.log(''+init_url);
  result_data = doRequest(makeURL());
  return result_data;
}

function makeURL(){
  var result_url = init_url;
  return result_url;
}

function doRequest(url){
  var list = ["급식"]; //[8]monday [12]friday
  request(url, function(err, resp, html) {
      if (!err){
        const $ = cheerio.load(html);
        $('.tbl_type3 th:contains("중식")').parent().children().each(function () {
          //list.push($(this).text());
          var content = $(this).text();
          console.log(content+"///////");
        });
        return list[0];
    }else{
      return 'there was an error';
    }
  });
}

module.exports = MealParser;
