module.exports = function(){
  var express         = require("express"),
      router          = express.Router(),
      queries         = require("../queries.js"),
      client_scripts  = [];

  // Display all characters, equipment, and cities

  router.get("/", function(req, res){
    var callBackCount = 0;
    var context = {};
    context.jsscripts = client_scripts;
    var mysql = req.app.get("mysql");
    queries.getCharacters(res, mysql, context, complete);
    queries.getEquipment(res, mysql, context, complete);
    queries.getCities(res, mysql, context, complete);
    function complete(){
      callBackCount++;
      if(callBackCount >= 3){
        res.send(context);
        // res.render("characters", context);
      }
    }
  });

  return router;
}();
