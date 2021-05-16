module.exports = function(app,db) {
    app.get('/disks', function(req,res){
      const collection = db.db("portal").collection("beer");
      collection.find({}).toArray(function(err, beers){
          if(err) return console.log(err);
          res.send(beers);
      });
    });
    app.get('/beer/style', function(req,res){
      let styleFind = req.query.style;
      console.log(req.query.style);
      const collection = db.db("portal").collection("beer");
      collection.find({'style':{$regex:styleFind,$options:"$i"}}).toArray(function(err, beers){
          if(err) return console.log(err);
          res.send(beers);
      });
    });
  };
  