var mongo=require('./mongoDB');
var url = 'mongodb://sagarmane006:sagar123@cryptocluster-shard-00-00-qbrqn.mongodb.net:27017,cryptocluster-shard-00-01-qbrqn.mongodb.net:27017,cryptocluster-shard-00-02-qbrqn.mongodb.net:27017/test?ssl=true&replicaSet=CryptoCluster-shard-0&authSource=admin&retryWrites=true' ;
const rp = require('request-promise');
const cheerio = require('cheerio');

setInterval(function(){
  var d=new Date();
  console.log('Current time interval', d.toLocaleTimeString());
  cryptoAnalytics();
}, 1000*60*30)

async function cryptoAnalytics () {
  var result = await getData();
  for(let i=0;i<7;i++){
    var title= Object.keys(result[i]).toString()
    var data = {
      'Timestamp':Date.now(),
      'percentage_value': Object.values(result[i]).toString()
    }
    updateHistory(title, data)
  }
  var other_total=0;
  for(let i=7;i<result.length;i++){
    other_total= other_total+parseFloat(Object.values(result[i]).toString());
  }
  var title= 'Other'
  var data = {
    'Timestamp':Date.now(),
    'percentage_value': other_total+'%'
  }
  updateHistory(title, data)
}
//cryptoAnalytics();

function getData() {
  const options = {
    uri: `https://coinmarketcap.com/currencies/volume/24-hour`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  return new Promise((resolve, reject) => {
    rp(options)
      .then(($) => {
        var items=[];
        $('.volume-header').each(function(i, elem) {
          var element= $(this).text();
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
        resolve(items);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  });
}

function updateHistory(title, data) {
  mongo.connect(url,function(){
    var collection=mongo.collection('crypto_analytics');
    collection.update({'name':title}, {$push:{'history':data}},function(err,result){
      if(err){
        console.log(err);
      }
      else{
        console.log("data inserted into the db");
      }
    });
  });
}
