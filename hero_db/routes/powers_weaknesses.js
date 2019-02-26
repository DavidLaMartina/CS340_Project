module.exports = function(){
  var express         = require("express"),
      router          = express.Router(),
      read            = require("../queries/read.js"),
      client_scripts  = [];

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

  return router;
}();
