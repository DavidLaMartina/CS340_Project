module.exports = function(){
  var express         = require("express"),
      router          = express.Router(),
      read            = require("../queries/read.js"),
      client_scripts  = ["script_character.js"];

  // Display all characters, equipment, and cities

  router.get("/", function(req, res){
    var callBackCount = 0;
    var context = {};
    context.jsscripts = client_scripts;
    var mysql = req.app.get("mysql");
    read.getCharacters(res, mysql, context, complete);
    read.getEquipment(res, mysql, context, complete);
    read.getCities(res, mysql, context, complete);
    function complete(){
      callBackCount++;
      if(callBackCount >= 3){
        console.log(context);
        res.render("characters", context);
      }
    }
  });

  // Create new character

  router.post("/addCharacter", function(req, res){
    console.log(req.body.character_name);
    console.log(req.body);
    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO `Character` (character_name, real_first_name, real_last_name, city, role, mentor_id) VALUES (?, ?, ?, ?, ?, ?)";
    var inserts = [req.body.character_name, req.body.real_first_name, req.body.real_last_name, req.body.city, req.body.role, req.body.mentor_id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }else{
        res.redirect("/characters");
      }
    });
  });

  // Create new equipment
  router.post("/addEquipment", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO `Equipment` (equipment_name, description, material, character_id) VALUES (?, ?, ?, ?)";
    var inserts = [req.body.equipment_name, req.body.description, req.body.material, req.body.character_id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }else{
        res.redirect("/characters");
      }
    })
  })

  // Create new city

  router.post("/addCity", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO `City` (city_name, real_city) VALUES (?, ?)";
    var inserts = [req.body.city_name, req.body.real_city];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }else{
        res.redirect("/characters");
      }
    });
  });

  return router;
}();
