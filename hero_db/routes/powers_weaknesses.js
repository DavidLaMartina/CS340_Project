module.exports = function(){
  var express         = require("express"),
      router          = express.Router(),
      read            = require("../queries/read.js"),
      client_scripts  = ["script.js"];

  // Display all powers, weaknesses, and power-weakness relationships

  router.get("/", function(req, res){
    var callBackCount = 0;
    var context = {};
    context.jsscripts = client_scripts;
    var mysql = req.app.get("mysql");
    read.getPowers(res, mysql, context, complete);
    read.getWeaknesses(res, mysql, context, complete);
    read.getCharacterPowers(res, mysql, context, complete);
    read.getCharacterWeaknesses(res, mysql, context, complete);
    function complete(){
      callBackCount++;
      if(callBackCount >= 4){
        console.log(context);
        res.render("characters", context);
      }
    }
  });

  // Create new power

  router.post("/addPower", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO `Power` (power_type, power_magnitude) VALUES (?, ?)";
    var inserts = [req.body.power_type, req.body.power_magnitude];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }else{
        res.redirect("/powers_weaknesses");
      }
    });
  });

  // Create new weakness

  router.post("/addWeakness", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO `Weakness` (weakness_type, weakness_magnitude) VALUES (?, ?)";
    var inserts = [req.body.weakness_type, req.body.weakness_magnitude];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }else{
        res.redirect("/powers_weaknesses");
      }
    });
  });

  // Create new power-character relationship

  router.post("/addCharacterPower", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO `character_powers` (power_id, character_id) VALUES (?, ?)";
    var inserts = [req.body.power_id, req.body.character_id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }else{
        res.redirect("/powers_weaknesses");
      }
    });
  });

  // Create new weakness-character relationship

  router.post("/addCharacterWeakness", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO `character_weaknesses` (weakness_id, character_id) VALUES (?, ?)";
    var inserts = [req.body.weakness_id, req.body.character_id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }else{
        res.redirect("/powers_weaknesses");
      }
    });
  });

  return router;
}();
