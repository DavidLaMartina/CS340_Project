
    // Display specifically filtered city in the drop-down, if exists
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

  function checkRoleAndName(res, mysql, mentor_id, character_name, role, check, complete){
    var context = {}

    var sql = "SELECT * FROM `Character` WHERE character_id = ?";
    var inserts = [mentor_id];
    mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();

      }
      else{
          //put the mentor's name in context.character
          context.character = results[0].character_name;
          //put the mentor's role in context.role
          context.role = results[0].role;
          //first we check to see if the roles are the same
          if(context.role != role)
          {
            //the roles were not the same so this character will not be created.
            //check.value will be set to false
            check.value = false;
            complete();
          }
          else{
          //the roles were the same but now we need to check the names
          // and make sure they are not the same
          //first we convert the names to lower case
            if(context.character.toLowerCase() === character_name.toLowerCase()){
              check.value = false;
            }
            else{
              //check.value is set to true because the roles are the same and names are different.
              check.value = true;
            }
        complete();
      }
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
    read.getCharactersMin(res, mysql, context, complete);
    function complete(){
      callbackCount++;
      if(callbackCount >= 4){
        res.render("characters", context);
      }
    }
  })

  // Search by alias

  router.get("/search/:search_string", function(req, res){
    var callbackCount = 0;
    var context = {}
    context.jsscripts = client_scripts;

    // Display searched term
    context.searched_term = req.params.search_string;

    var mysql = req.app.get("mysql");
    read.getCharactersWithNameLike(req.params.search_string, res, mysql, context, complete);
    read.getEquipment(res, mysql, context, complete);
    read.getCities(res, mysql, context, complete);
    read.getCharactersMin(res, mysql, context, complete);
    function complete(){
      callbackCount++;
      if(callbackCount >= 4){
        res.render("characters", context);
      }
    }
  })

  // Create new character

  router.post("/addCharacter", function(req, res){
    var callbackCount = 0;
    //create a check object so that check.value can be passed by reference
    //set check.vaue to false
    var check = {value: false};

    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO `Character` (character_name, real_first_name, real_last_name, city, role, mentor_id) VALUES (?, ?, ?, ?, ?, ?)";
    //had to change this back to "TRUE because the characters.handlebars sets role to "TRUE"
    if(req.body.role === "TRUE"){
      var role = true;
    }else{
      var role = false;
    }
  //we only need to do a check if a mentor_id is submitted when trying to create a character.
  if(req.body.mentor_id){
    //call the checkRoleAndName function
    checkRoleAndName(res, mysql, req.body.mentor_id, req.body.character_name, role, check, complete);

    function complete(){
      callbackCount++;
      if(callbackCount >= 1 && check.value == false){
        //if check.value is false then we just redirect back to the Character page
        // a new character WILL NOT be created.
        req.flash("error", "Characters must have the same role as their mentor or they cannot be mentors to themselves.");
        res.redirect("/characters");
      }
      // otherwise, if the check.value is true then we are going to create the new Character.
      else if (callbackCount >= 1 && check.value == true){
        var inserts = [req.body.character_name, req.body.real_first_name, req.body.real_last_name, req.body.city || null, role, req.body.mentor_id || null];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
          if(error){
            res.write(JSON.stringify(error));
            res.end();
          }
          else{
            res.redirect("/characters");
          }
        });
      }
    }
  }
  //the user did not enter a mentor_id so we can insert the Character.
  else{
    var inserts = [req.body.character_name, req.body.real_first_name, req.body.real_last_name, req.body.city || null, role, req.body.mentor_id || null];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }else{
      res.redirect("/characters");
    }
    });
  }
  });

  // Delete character

  router.delete("/deleteCharacter/:character_id", function(req, res){
    var mysql = req.app.get("mysql");
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
        res.render("update-character", context);
      }
    }
  });

  // Update character entry

  router.put("/:character_id", function(req, res){
    var callbackCount = 0;
    //create a check object so that check.value can be passed by reference
    //set check.vaue to false
    var check = {value: false};

    var mysql = req.app.get("mysql");
    var sql = "UPDATE `Character` SET character_name=?, real_first_name=?, real_last_name=?, city=?, role=?, mentor_id=? WHERE character_id=?";
    //Had to set this back to "TRUE" because the the handlebars file sets the ROLE to "TRUE"
    if (req.body.role === "TRUE"){
      var role = true;
    }else{
      var role = false;
    }
    //we only need to do a check if a mentor_id is submitted when trying to create a character.
    if(req.body.mentor_id){
    //call the checkRoleAndName function
      checkRoleAndName(res, mysql, req.body.mentor_id, req.body.character_name, role, check, complete);

      function complete(){
        callbackCount++;
        if(callbackCount >= 1 && check.value == false){
          //if check.value is false then we just redirect back to the Character page
          // a new character WILL NOT be created.
          req.flash("error", "Characters must have the same role or they cannot be mentors to themselves.");
          //res.redirect("./characters");
          res.end();
        }
        // otherwise, if the check.value is true then we are going to create the new Character.
        else if (callbackCount >= 1 && check.value == true){
          var inserts = [req.body.character_name, req.body.real_first_name, req.body.real_last_name, req.body.city || null, role, req.body.mentor_id || null, req.params.character_id];
          sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
              res.write(JSON.stringify(error));
              res.end();
            }
            else{
              res.status(200);
              res.end();
            }
          });
        }
      }
    }
    else{
      var inserts = [req.body.character_name, req.body.real_first_name, req.body.real_last_name, req.body.city || null, role, req.body.mentor_id || null, req.params.character_id];
      sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }else{
          res.status(200);
          res.end();
        }
      });
    }
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
    if(req.body.real_city === true){
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
