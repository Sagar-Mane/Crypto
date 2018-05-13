var mongo=require('./mongoDB');
var url = 'mongodb://sagarmane006:sagar123@cryptocluster-shard-00-00-qbrqn.mongodb.net:27017,cryptocluster-shard-00-01-qbrqn.mongodb.net:27017,cryptocluster-shard-00-02-qbrqn.mongodb.net:27017/test?ssl=true&replicaSet=CryptoCluster-shard-0&authSource=admin&retryWrites=true' ;

exports.analytics = function (req,res){
  console.log('Reporting from analytics function');
  mongo.connect(url,function(){
		var collection=mongo.collection('crypto_analytics');

    collection.find().toArray(function(err, result){
      if(err){
        console.log(err);
        res.status(500).send(err);
      }
      else if(result.length>0){
        var response=[];
        console.log(result[0].history.length);
        console.log((parseFloat(result[7].history[0].percentage_value)).toFixed(2));
        for(let i=0;i<result.length;i++){
          var title = result[i].name;
          var data= {
            'name': result[i].name,
            'history':[]
          }
            for(let j=result[i].history.length-1;j>result[i].history.length-6;j--){
              data.history.push(result[i].history[j])
              //console.log(result[i].name ,result[i].history[j]);
            }
            response.push(data);
        }
        res.status(200).send(response);
      }
    });
});
}
