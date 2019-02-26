var readObj = {}

// Query all characters

readObj.getCharacters = function(res, mysql, context, complete){
  mysql.pool.query("SELECT * FROM `Character`", function(error, results, fields){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.characters = results;
    complete();
  });
}

// Query all Equipment

readObj.getEquipment = function(res, mysql, context, complete){
  mysql.pool.query("SELECT * FROM Equipment", function(error, results, fields){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.equipment = results;
    complete();
  });
}

// Query all cities

readObj.getCities = function(res, mysql, context, complete){
  mysql.pool.query("SELECT * FROM City", function(error, results, fields){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.cities = results;
    complete();
  });
}

// Query all powers

readObj.getPowers = function(res, mysql, context, complete){
  mysql.pool.query("SELECT * FROM Power", function(error, results, fields){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.powers = results;
    complete();
  });
}

// Query all weaknesses

readObj.getWeaknesses = function(res, mysql, context, complete){
  mysql.pool.query("SELECT * FROM Weakness", function(error, results, fields){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.weaknesses = results;
    complete();
  });
}

// Query all character powers

readObj.getCharacterPowers = function(req, mysql, context, complete){
  mysql.pool.query("SELECT * FROM character_powers", function(error, results, fields){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.character_powers = results;
    complete();
  });
}

// Query all character weaknesses

readObj.getCharacterWeaknesses = function(req, mysql, context, complete){
  mysql.pool.query("SELECT * FROM character_weaknesses", function(error, results, fields){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.character_weaknesses = results;
    complete();
  });
}

// Query all friend relationships

readObj.getFriendRelationships = function(req, mysql, context, complete){
  mysql.pool.query("SELECT * FROM friend_relationship", function(error, results, fields){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.friendships = results;
    complete();
  });
}

// Query all rival relationships

readObj.getRivalRelationships = function(req, mysql, context, complete){
  mysql.pool.query("SELECT * FROM rival_relationship", function(error, results, fields){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.rivalries = results;
    complete();
  });
}

module.exports = readObj;
