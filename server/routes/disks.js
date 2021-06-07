module.exports = function(app,db) {
    app.get('/disks', function(req,res){
      const collection = db.db("portal").collection("beer");
      collection.find({}).toArray(function(err, disks){
          if(err) return console.log(err);
          res.send(disks);
      });
    });
    app.get('/disks/all', function(req,res){
      const collection = db.db("diplom").collection("disks");
      collection.find({}).toArray(function(err, disks){
          if(err) return console.log(err);
          console.log('/disks/all');
          res.send(disks);
      });
    });
    app.get('/personal/disks', function(req,res){
      const collection = db.db("diplom").collection("disks");
      collection.find({}).limit( 5 ).toArray(function(err, disks){
          if(err) return console.log(err);
          console.log('/personal/disks');
          res.send(disks);
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
  