module.exports = function(){
var express         = require("express"),
    router          = express.Router(),
    read            = require("../queries/read.js"),
    client_scripts  = ["script_character.js"];

  // Get specific character entry

  function getCharacter(res, mysql, context, character_id, complete){
    var sql = "SELECT * FROM `Character` WHERE character_id = ?";
    var inserts = [character_id];
    mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }else{
        context.character = results[0];
        complete();
      }
    });
  }

  // Display all characters, equipment and cities

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

  // Filter by city

  router.get("/filter/:city", function(req, res){
    var callbackCount = 0;
    var context = {};
    context.jsscripts = client_scripts;

    // Display specifically filtered city in the drop-down, if exists
    context.filtered_city = req.params.city;
    
    var mysql = req.app.get("mysql");
    read.getCharactersByCity(req.params.city, res, mysql, context, complete);
    read.getEquipment(res, mysql, context, complete);
    read.getCities(res, mysql, context, complete);
    function complete(){
      callbackCount++;
      if(callbackCount >= 3){
        res.render("characters", context);
      }
    }
  })

  // Create new character

  router.post("/addCharacter", function(req, res){
    console.log(req.body.character_name);
    console.log(req.body);
    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO `Character` (character_name, real_first_name, real_last_name, city, role, mentor_id) VALUES (?, ?, ?, ?, ?, ?)";
    if(req.body.role === "TRUE"){
      var role = true;
    }else{
      var role = false;
    }
    var inserts = [req.body.character_name, req.body.real_first_name, req.body.real_last_name, req.body.city || null, role, req.body.mentor_id || null];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }else{
        res.redirect("/characters");
      }
    });
  });

  // Delete character

  router.delete("/deleteCharacter/:character_id", function(req, res){
    var mysql = req.app.get("mysql");
    console.log(req.params);
    var sql = "DELETE FROM `Character` WHERE character_id = ?";
    var inserts = [req.params.character_id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      }else{
        res.status(202).end();
      }
    });
  });

  // Route to update view for a specific character

  router.get("/:character_id", function(req, res){
    var callBackCount = 0;
    var context = {};
    context.jsscripts = ["selectedCity.js", "selectedMentor.js", "selectedRole.js", "script_character.js"];
    var mysql = req.app.get("mysql");
    getCharacter(res, mysql, context, req.params.character_id, complete);
    read.getEquipment(res, mysql, context, complete);
    read.getCities(res, mysql, context, complete);
    read.getCharacters(res, mysql, context, complete);
    function complete(){
      callBackCount++;
      if(callBackCount >= 4){
        console.log(context);
        res.render("update-character", context);
      }
    }
  });

  // Update character entry

  router.put("/:character_id", function(req, res){
    var mysql = req.app.get("mysql");
    if (req.body.role === "TRUE"){
      var role = true;
    }else{
      var role = false;
    }
    var sql = "UPDATE `Character` SET character_name=?, real_first_name=?, real_last_name=?, city=?, role=?, mentor_id=? WHERE character_id=?";
    var inserts = [req.body.character_name, req.body.real_first_name, req.body.real_last_name, req.body.city || null, role, req.body.mentor_id || null, req.params.character_id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        console.log(error);
        res.write(JSON.stringify(error));
        res.end();
      }else{
        res.status(200);
        res.end();
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

  // Delete equipment

  router.delete("/deleteEquipment/:equipment_id", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "DELETE FROM `Equipment` WHERE equipment_id = ?";
    var inserts = [req.params.equipment_id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      }else{
        res.status(202).end();
      }
    });
  });

  // Create new city

  router.post("/addCity", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO `City` (city_name, real_city) VALUES (?, ?)";
    if(req.body.real_city === "TRUE"){
      var real_city = true;
    }else{
      var real_city = false;
    }
    var inserts = [req.body.city_name, real_city];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }else{
        res.redirect("/characters");
      }
    });
  });

  // Delete city

  router.delete("/deleteCity/:city_id", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "DELETE FROM `City` WHERE city_id = ?";
    var inserts = [req.params.city_id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      }else{
        res.status(202).end();
      }
    });
  });

  return router;
}();
