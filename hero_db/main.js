var express       = require("express"),
    session       = require("express-session"),
    cookieParser  = require("cookie-parser"),
    flash         = require("connect-flash")
    mysql         = require("./dbcon.js"),
    bodyParser    = require("body-parser");

var app         = express(),
    handlebars  = require("express-handlebars").create({defaultLayout: "main"});

app.engine("handlebars", handlebars.engine);
app.use(bodyParser.urlencoded({extended: true}));
app.use("/static", express.static("public"));
app.use("/", express.static("public"));
app.set("view engine", "handlebars");
app.set("port", process.argv[2]);
app.set("mysql", mysql);

// Make flash messages work
app.use(cookieParser('secret'));
app.use(session({cookie: {maxAge: 60000}}));
app.use(flash());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})

// Requiring routes -- enables use of express.Router()
app.use("/", require("./routes/index.js"));
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
