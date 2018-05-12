const rp = require('request-promise');
const cheerio = require('cheerio');
var fs = require('fs');
var count=1;

exports.cryptoByVolumeTraded = async function (req, res){
  console.log('testing query', req.query.page, req.query.count);
  var page = req.query.page;
  var count = req.query.count;
  if(page == undefined){
    page = 1;
  }
  if(count == undefined){
    count = 10;
  }

  if(fs.existsSync('data.json')){
    const p1 = new Promise((resolve, reject) => {
      fs.readFile('data.json', function(err, res){
        var data = JSON.parse(res);
        console.log(data.Timestamp);
        var time_diff = Date.now()-data.Timestamp;
        var mins=(time_diff/1000)/60;
        console.log(mins);
        if(mins<10){
          var result=[];
          //console.log("len= ",data.data.length);
          for(let i=(page*count)-count; i<(page*count);i++){
            if(data.data[i]!=null){
              result.push(data.data[i]);
            }
          }
          test={
            'Total_records': data.Total_records,
            'data': data.data
          }
          resolve (test);
        }
        else {
          var data = createDataJson(page, count);
          data.then((response) => {
            resolve(response);
          })
        }
      });
    });
    p1.then((response) => {
      //var data= JSON.parse(response.data);
      res.status(200).send(response);
    })
  }
  else {
    var result= await createDataJson(page, count);
    res.status(200).send(result);
  }
}

function createDataJson(page, count){
  const options = {
    uri: `https://coinmarketcap.com/currencies/volume/24-hour`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  return new Promise((resolve, reject) => {
    rp(options)
      .then(($) => {
        var data=$('.volume-header').text();
        //console.log(data);
        var items=[];
        var test_items=[];
        $('.volume-header-container').each(function(i, elem) {
          var element= $(this).text();
          test_items[i]=element;
          var pattern1 = /[a-zA-Z_ ]+/;
          var pattern2= /\d+.\d+%/;
          if(element.match(pattern2)){
            var i2=element.match(pattern2).toString();
          }
          else {
            i2="";
          }
          var i1=element.match(pattern1).toString();
          var item={};

          if(i2=='0.00%' || i2=="" || i1==" "){
            //console.log(i2);
          }
          else{
            item[i1]=i2;
            items.push(item);
          }
        });
        var json={
          'Timestamp': Date.now(),
          'Total_records': items.length,
          'data':items
        }
        json=JSON.stringify(json)
        fs.writeFileSync('data.json', json, 'utf8', function(err,res){
          console.log('Error', err);
        });
        var result=[];
        for(let i=(page*count)-count; i<(page*count);i++){
          if(items[i]!=null){
            result.push(items[i]);
          }
        }
        var test = {
          'Total_records': items.length,
          'data': items
        };
        //console.log(result);
        resolve(test);
        //res.status(200).send(items);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  });

}
