module.exports = function(){
  var express         = require("express"),
      router          = express.Router(),
      read            = require("../queries/read.js"),
      client_scripts  = [];

  // Home / index render
  router.get("/", function(req, res){
    res.render("index");
  });

  return router;
}();
