module.exports = function(app,db) {
    app.get('/personal/auth', function(req,res){
        console.log(req.query);
        res.send(req.query);
    //   const collection = db.db("portal").collection("beer");
    //   collection.find({}).toArray(function(err, disks){
    //       if(err) return console.log(err);
    //       console.log(req.query);
    //       res.send(disks);
    //   });
    });
    app.get('/personal/register', function(req,res){
        console.log(req.query);
        res.send(req.query);
    //   const collection = db.db("portal").collection("beer");
    //   collection.find({}).toArray(function(err, disks){
    //       if(err) return console.log(err);
    //       console.log(req.query);
    //       res.send(disks);
    //   });
    });
  };
