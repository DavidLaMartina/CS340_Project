var express     = require("express"),
    mysql       = require("./dbcon.js"),
    bodyParser  = require("body-parser");

var app         = express(),
    handlebars  = require("express-handlebars").create({defaultLayout: "main"});

app.engine("handlebars", handlebars.engine);
app.use(bodyParser.urlencoded({extended: true}));
app.use("/static", express.static("public"));
app.use("/", express.static("public"));
app.set("view engine", "handlebars");
app.set("port", process.argv[2]);
app.set("mysql", mysql);

// Requiring routes -- enables use of express.Router()
app.use("/characters", require("./routes/characters.js"));
app.use("/powers_weaknesses", require("./routes/powers_weaknesses.js"));
app.use("/character_relationships", require("./routes/character_relationships.js"));

app.use(function(req, res){
  res.status(400);
  res.render("404");
});
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render("500");
});
app.listen(app.get("port"), function(){
  console.log("Express started on http://localhost:" + app.get("port") + "; press Ctrl-C to terminate");
});
