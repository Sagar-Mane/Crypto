var express = require('express');
var app =  express();
var bodyParser = require('body-parser');
var cors = require('cors');
var script = require("./routes/script");

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.get('/cryptoByVolumeTradedPast24Hours', script.cryptoByVolumeTraded);

app.listen(3000, function(){
  console.log('Express server listening at localhost port 3000')
})
