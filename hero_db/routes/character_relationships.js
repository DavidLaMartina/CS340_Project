module.exports = function(){
  var express         = require("express"),
      router          = express.Router(),
      queries         = require("../queries.js"),
      client_scripts  = [];

  // Display all friendships and rivalries

  router.get("/", function(req, res){
    var callBackCount = 0;
    var context = {};
    context.jsscripts = client_scripts;
    var mysql = req.app.get("mysql");
    queries.getFriendRelationships(res, mysql, context, complete);
    queries.getRivalRelationships(res, mysql, context, complete);
    function complete(){
      callBackCount++;
      if(callBackCount >= 2){
        res.send(context);
        // res.render("characters", context);
      }
    }
  });

  return router;
}();
