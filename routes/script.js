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
    count = 20;
  }

  if(fs.existsSync('data.json')){
    const p1 = new Promise((resolve, reject) => {
      fs.readFile('data.json', function(err, res){
        var data = JSON.parse(res);
        console.log(data.Timestamp);
        var time_diff = Date.now()-data.Timestamp;
        var mins=(time_diff/1000)/60;
        console.log(mins);
        if(mins<1){
          var result=[];
          //console.log("len= ",data.data.length);
          for(let i=(page*count)-count; i<=(page*count);i++){
            if(data.data[i]!=null){
              result.push(data.data[i]);
            }
          }
          result={
            'data': result
          }
          resolve (result);
        }
        else {
          var data = createDataJson(page, count);
          data.then((response) => {
            var result={
              'data': response
            }
            resolve(result);
          })
        }
      });
    });
    p1.then((response) => {
      console.log('check this carefully', response.data);
      console.log(response.data.length)
      //var data= JSON.parse(response.data);
      console.log('check here',result);
      res.status(200).send(response.data);
    })
  }
  else {
    var result= await createDataJson(page, count);
    res.status(200).send(result.result);
  }
}

function createDataJson(page, count){
  console.log('another function');
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
          'data':items
        }
        console.log("total records=",items.length);
        json=JSON.stringify(json)
        fs.writeFileSync('data.json', json, 'utf8', function(err,res){
          console.log('hello', err);
        });
        var result=[];
        console.log('page', page);
        console.log('count', count);
        for(let i=(page*count)-count; i<=(page*count);i++){
          if(items[i]!=null){
            result.push(items[i]);
          }
        }
        //console.log(result);
        resolve(result);
        //res.status(200).send(items);
      })
      .catch((err) => {
        console.log(err);
      });
  });

}
