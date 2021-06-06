module.exports = function(app,db) {
    app.get('/constructor', function(req,res){
      const collection = db.db("diplom").collection("disks");
      collection.find({}).toArray(function(err, beers){
          if(err) return console.log(err);
          res.send(beers);
      });
    });
  };
  