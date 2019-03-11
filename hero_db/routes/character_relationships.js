module.exports = function(){
  var express         = require("express"),
      router          = express.Router(),
      read            = require("../queries/read.js"),
      client_scripts  = ["script_relationship.js"];

  // Display all friendships and rivalries

  router.get("/", function(req, res){
    var callBackCount = 0;
    var context = {};
    context.jsscripts = client_scripts;
    var mysql = req.app.get("mysql");
    read.getFriendRelationships(res, mysql, context, complete);
    read.getRivalRelationships(res, mysql, context, complete);
    read.getCharacters(res, mysql, context, complete);
    function complete(){
      callBackCount++;
      if(callBackCount >= 3){
        //console.log(context);
        res.render("character_relationships", context);
      }
    }
  });
  // check for a duplicate friendship 
  function checkDuplicateFriendship(res, mysql, friend1_id, friend2_id, check, complete){ 
    var context = {}

    var sql = "SELECT * FROM `friend_relationship` WHERE (friend1_id = ? AND friend2_id = ?) OR (friend1_id = ? AND friend2_id = ?)";
    //SELECT * FROM `friend_relationship` WHERE (friend1_id = 6 AND friend2_id = 7) OR (friend1_id = 7 AND friend2_id = 6)
    var inserts = [friend1_id, friend2_id, friend2_id, friend1_id];
    console.log("here are the inserts " + inserts);
    mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();

      }
      else{
        //check to see if there is an empty query
        // if the query is empty, this means that the relationship does not exist. 
        if(results[0]){

          context.id = results[0].id;
          //the relationship does not exit, go ahead and create it. 
          console.log("The relationship exists.  Do not create it");
          //check.value will be set to true
          check.value = "false";
        }
        //console.log("Here is context.id " + context.id);
      //check to see if context.id = null or undefined
        else{
        //the relationship does not exist.  Set check.value to true 
          check.value = "true";
          console.log("Looks like this relationship does not exist");
          console.log("Set check to true and create the relationship");
        }
      complete();
      }

    });
  }


  // Add new friendship

  router.post("/addFriendship", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO `friend_relationship` (friend1_id, friend2_id) VALUES (?, ?)";
    var inserts = [req.body.friend1_id, req.body.friend2_id];
    var callbackCount = 0;
    //create a check object so that check.value can be passed by reference
    //set check.vaue to false
    var check = {value: "false"};
    function complete(){
      console.log("Entering complete");
      callbackCount++;
      if(callbackCount >= 1 && check.value == "false"){
        //if check.value is false then we just redirect back to the character_relationships page
        // a new friend relationship WILL NOT be created. 
        res.redirect("/character_relationships");
      }
      // otherwise, if the check.value is true then we are going to create the new relationship.
      else if (callbackCount >= 1 && check.value == "true"){
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
          if(error){
            res.write(JSON.stringify(error));
            res.end();
          }else{
            res.redirect("/character_relationships");
          }
        });
      }
    }
    checkDuplicateFriendship(res, mysql, req.body.friend1_id, req.body.friend2_id, check, complete)
  });

  // Delete friendship

  router.delete("/deleteFriendship/:id", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "DELETE FROM `friend_relationship` WHERE id = ?";
    var inserts = [req.params.id];
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

  // Add new rivalry

  router.post("/addRivalry", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO `rival_relationship` (rival1_id, rival2_id) VALUES (?, ?)";
    var inserts = [req.body.rival1_id, req.body.rival2_id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }else{
        res.redirect("/character_relationships");
      }
    });
  });

  // Delete rivalry

  router.delete("/deleteRivalry/:id", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "DELETE FROM `rival_relationship` WHERE id = ?";
    var inserts = [req.params.id];
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
