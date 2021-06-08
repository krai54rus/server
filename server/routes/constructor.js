module.exports = function(app,db) {
    app.get('/constructor', function(req,res){
      const collAuto = db.db("diplom").collection("auto");
      const collDisks = db.db("diplom").collection("disks");
      const marka = req.query.marka;
      const model = req.query.model;
      let diskSize = '';
      if (marka) {
        //
        let resMarka = collAuto.findOne({name:marka},function(err, markaObj){
            if(err) return console.log(err);
            console.log(marka);
            if (markaObj) {
              const resModel = markaObj.models.filter(modelObj=> modelObj.name == model);
              console.log(resModel[0]);
              diskSize = resModel[0].size;
              console.log(diskSize);
            }
            collDisks.find({size: diskSize}).toArray(function(err, disks){
              if(err) return console.log(err);
              //console.log(disks);
              res.send(disks);
          });
        });
      }
      // res.send(resMarka);
      // collection.find({}).toArray(function(err, disks){
      //     if(err) return console.log(err);
      //     res.send(disks);
      // });
    });
  };
