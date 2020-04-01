var express = require("express");
var app = express();
var request = require("request")
var cors = require("cors");
const cron = require("node-cron");


var final = [];

var counter = 0;

var url = "https://www.bloomberg.com/markets2/api/datastrip/USDTHB%3ACUR"

var listener = app.listen(process.env.PORT, function() {
// var listener = app.listen(88, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Authorization, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.get("/", async function(req, res) {
  counter++;
  console.log(counter);
  console.log(req.headers);
  res.send(doStuff());
});

function doStuff() {
  request({
  headers: {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'max-age=0',
    'connection': 'keep-alive',
    'accept-encoding': 'deflate, br',
    // 'content-length': '906',
    'Content-Security-Policy': 'frame-ancestors \'self\'',
    'Content-Security-Policy': 'upgrade-insecure-requests',
    'Content-Type': 'application/json; charset=utf-8',
    'ETag': 'W/"89a-KBsWsjJGIThVti3Qa/eLJczRY+c"',
    'Server': 'nginx',
    'Strict-Transport-Security': 'max-age=15552000; includeSubDomains',
    'Vary': 'Origin, Accept-Encoding',
    'X-Cache': 'HIT',
    'X-Cache-Hits': '1',
    'Accept-Ranges':'bytes',
    'X-Content-Security-Policy':'frame-ancestors \'self\'',
    'X-Content-Type-Options':'nosniff',
    'X-DNS-Prefetch-Control':'on',
    'X-Download-Options':'noopen',
    'X-Frame-Options':'SAMEORIGIN',
    'X-Powered-By':'Express',
    'X-WebKit-CSP':'frame-ancestors \'self\'',
    'X-XSS-Protection':'1; mode=block',
    'Fastly-Restarts':'1',
    'Content-Encoding':'gzip',
    'X-Served-By':'cache-sin18030-SIN',
    'Age':'140',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
  },
      url: url,
      json: true
  }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          console.log(response) // Print the json response
          var result = JSON.parse(JSON.stringify(response));
          // console.log(result.body[0]);
          final = [];
          final.push(result.body[0])
          // final.amount = result.body[0].price;
          // final.change = result.body[0].priceChange1Day;
          // final.percent = result.body[0].percentChange1Day;
      }
      // console.log(final);
  })
  
  return final;
}
