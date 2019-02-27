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
    function complete(){
      callBackCount++;
      if(callBackCount >= 2){
        console.log(context);
        res.render("character_relationships", context);
      }
    }
  });

  // Add new friendship

  router.post("/addFriendship", function(req, res){
    var mysql = req.app.get("mysql");
    var sql = "INSERT INTO `friend_relationship` (friend1_id, friend2_id) VALUES (?, ?)";
    var inserts = [req.body.friend1_id, req.body.friend2_id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }else{
        res.redirect("/character_relationships");
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

  return router;
}();
