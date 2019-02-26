module.exports = function(){
  var express         = require("express"),
      router          = express.Router(),
      queries         = require("../queries.js"),
      client_scripts  = [];

  // Display all powers, weaknesses, and power-weakness relationships

  router.get("/", function(req, res){
    var callBackCount = 0;
    var context = {};
    context.jsscripts = client_scripts;
    var mysql = req.app.get("mysql");
    queries.getPowers(res, mysql, context, complete);
    queries.getWeaknesses(res, mysql, context, complete);
    queries.getCharacterPowers(res, mysql, context, complete);
    queries.getCharacterWeaknesses(res, mysql, context, complete);
    function complete(){
      callBackCount++;
      if(callBackCount >= 4){
        res.send(context);
        // res.render("characters", context);
      }
    }
  });

  return router;
}();
