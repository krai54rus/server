module.exports = function(app,db) {
    app.get('/personal/auth', function(req,res){
      const collection = db.db("diplom").collection("personal");
      collection.findOne({login:req.query.login},function(err, user){
          if(err) return console.log(err);
            if (user) {
                if (user.password == req.query.password) {
                    res.send({status:'OK',result:user});
                }else{
                    res.send({status:'ERROR',result:'Пароли не совпадают'});
                }
            }else{
                res.send({status:'ERROR',result:'Пользователь не найден'});
            }
      });
    });
    app.post('/personal/register', function(req,res){
        const collection = db.db("diplom").collection("personal");
        collection.findOne({login:req.body.login}, function(err, user){
            if(err) return console.log(err);
            if (user) {
                res.send({status:'ERROR',result:'Пользователь уже существует'});
            }else{
                const newUser = collection.insertOne(req.body);
                res.send({status:'OK',result:req.body});
            }
        });
    });
     // Обновление полей
    app.post('/personal/update', function(req,res){
        const collection = db.db("diplom").collection("personal");
        collection.findOneAndUpdate(
            {login:req.body.login},              // критерий выборки
            { $set: {name: req.body.name , phone: req.body.phone, email: req.body.email} }, // параметр обновления
            {                           // доп. опции обновления
                returnOriginal: false
            },
            function(err, result){
                console.log(result.value);
                if (result.ok) {
                    res.send(result.value);
                }
            }
        );
    });

    // Диски
    app.get('/personal/disks', function(req,res){
        const collection = db.db("diplom").collection("personal");
        collection.findOne({login:req.query.login},function(err, user){
            if(err) return console.log(err);
              if (user) {
                  if (user.disks && user.disks.length) {
                    res.send(user.disks);
                  }else{
                    res.send([]);
                  }
              }else{
                  res.send({status:'ERROR',result:'Пользователь не найден'});
              }
        });
      });
      app.post('/personal/disks', function(req,res){
        const collection = db.db("diplom").collection("personal");
        collection.findOneAndUpdate(
            {login:req.body.login},              // критерий выборки
            { $push: { disks: req.body.disk } }, // параметр обновления
            {                           // доп. опции обновления
                returnOriginal: false
            },
            function(err, result){
                console.log(result.value.disks);
                if (result.ok) {
                    res.send(result.value.disks);
                }
            }
        );
      });

      //Гараж
      app.get('/personal/garage', function(req,res){
        const collection = db.db("diplom").collection("personal");
        collection.findOne({login:req.query.login},function(err, user){
            if(err) return console.log(err);
              if (user) {
                  if (user.garage && user.garage.length) {
                    res.send(user.garage);
                  }else{
                    res.send([]);
                  }
              }else{
                  res.send({status:'ERROR',result:'Пользователь не найден'});
              }
        });
      });
      app.post('/personal/garage', function(req,res){
        const collection = db.db("diplom").collection("personal");
        collection.findOneAndUpdate(
            {login:req.body.login},              // критерий выборки
            { $addToSet: { garage: req.body.garage } }, // параметр обновления
            {                           // доп. опции обновления
                returnOriginal: false
            },
            function(err, result){
                console.log(result.value.garage);
                if (result.ok) {
                    res.send(result.value.garage);
                }
            }
        );
      });
  };
