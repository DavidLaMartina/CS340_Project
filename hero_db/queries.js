var queriesObj = {}

// Query all characters

queriesObj.getCharacters = function(res, mysql, context, complete){
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

queriesObj.getEquipment = function(res, mysql, context, complete){
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

queriesObj.getCities = function(res, mysql, context, complete){
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

queriesObj.getPowers = function(res, mysql, context, complete){
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

queriesObj.getWeaknesses = function(res, mysql, context, complete){
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

queriesObj.getCharacterPowers = function(req, mysql, context, complete){
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

queriesObj.getCharacterWeaknesses = function(req, mysql, context, complete){
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

queriesObj.getFriendRelationships = function(req, mysql, context, complete){
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

queriesObj.getRivalRelationships = function(req, mysql, context, complete){
  mysql.pool.query("SELECT * FROM rival_relationship", function(error, results, fields){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.rivalries = results;
    complete();
  });
}

module.exports = queriesObj;
