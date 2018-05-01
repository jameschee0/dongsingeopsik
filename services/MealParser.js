const cheerio = require("cheerio"),
      request = require("request");

const init_url = "https://stu.dje.go.kr/sts_sci_md01_001.do?schulCode=G100000208&schulCrseScCode=4&schulKndScCode=04&schMmealScCode=2";

const MealParser = {};

MealParser.parse = () => {
  console.log(''+init_url);
  return doRequest(makeURL(),function(err,data){
    console.log(data);
    return data;
  });
}

function makeURL(){
  var result_url = init_url;
  return result_url;
}

function doRequest(url,callback){
  request(url, function(err, resp, html) {
      var list = ["initial array"];
      if (!err){
      const $ = cheerio.load(html);
      $('.tbl_type3 th:contains("중식")').parent().children().each(function () {
        list.push($(this).text());
      });
      return callback(null,list);
    }
  });
}

module.exports = MealParser;
