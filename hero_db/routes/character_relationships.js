module.exports = function(){
  var express         = require("express"),
      router          = express.Router(),
      read            = require("../queries/read.js"),
      client_scripts  = [];

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
        res.render("characters", context);
      }
    }
  });

  return router;
}();
