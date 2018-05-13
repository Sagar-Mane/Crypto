var mongodb = require('mongodb');
var connected=false;
var db;
var url = 'mongodb://sagarmane006:sagar123@cryptocluster-shard-00-00-qbrqn.mongodb.net:27017,cryptocluster-shard-00-01-qbrqn.mongodb.net:27017,cryptocluster-shard-00-02-qbrqn.mongodb.net:27017/test?ssl=true&replicaSet=CryptoCluster-shard-0&authSource=admin&retryWrites=true' ;
var MongoClient = mongodb.MongoClient;

exports.connect=function(url,callback)
{
		MongoClient.connect(url, function (err, client) {
		if (err) {
					console.log('Unable to connect to the mongoDB server. Error:', err);
				 }
		else {
				db=client.db('Crypto');
				console.log('Connection established to', url);
				connected=true;
				callback(db);
			 }
		});
};
exports.collection=function(name){
	 if (!connected) {
	      throw new Error('Must connect to Mongo before calling "collection"');
	    }
	 console.log("collection returned");
	  return db.collection(name);

};
