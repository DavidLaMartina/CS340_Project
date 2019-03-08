var readObj = {}

// Query all Characters, using LEFT JOIN to include actual city name and mentor name

readObj.getCharacters = function(res, mysql, context, complete){
  mysql.pool.query(
    "SELECT c1.character_id, c1.character_name, c1.real_first_name, c1.real_last_name, ci.city_name, c1.role, c2.character_name AS `mentor_name` FROM" +
      "`Character` c1 LEFT JOIN " +
      "`City` ci ON c1.city = ci.city_id LEFT JOIN" +
      "`Character` c2 ON c1.mentor_id = c2.character_id",
    function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }
      context.characters = results;
      complete();
    });
}

readObj.getCharactersByCity = function(city_id, res, mysql, context, complete){
  var sql = "SELECT c1.character_id, c1.character_name, c1.real_first_name, c1.real_last_name, ci.city_name, c1.role, c2.character_name AS `mentor_name` FROM" +
    "`Character` c1 LEFT JOIN " +
    "`City` ci ON c1.city = ci.city_id LEFT JOIN " +
    "`Character` c2 ON c1.mentor_id = c2.character_id " +
    "WHERE ci.city_id = ?";
  var inserts = [city_id];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields){
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
  mysql.pool.query(
    "SELECT equipment_id, equipment_name, description, material, character_name FROM " +
      "`Equipment` e LEFT JOIN " +
      "`Character` c ON e.character_id = c.character_id",
    function(error, results, fields){
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

readObj.getCharacterPowers = function(res, mysql, context, complete){
  mysql.pool.query(
    "SELECT cp.id, p.power_type, p.power_magnitude, c.character_name FROM " +
    "character_powers cp LEFT JOIN " +
    "Power p ON p.power_id = cp.power_id LEFT JOIN " +
    "`Character` c ON cp.character_id = c.character_id", function(error, results, fields){
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
  mysql.pool.query("SELECT cw.id, w.weakness_type, w.weakness_magnitude, c.character_name FROM "+
    "character_weaknesses cw LEFT JOIN " +
    "Weakness w ON cw.weakness_id = w.weakness_id LEFT JOIN" +
    "`Character` c ON cw.character_id = c.character_id", function(error, results, fields){
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
  mysql.pool.query("SELECT fr.id, c1.character_name AS friend1_name, c2.character_name AS friend2_name FROM " +
    "friend_relationship fr LEFT JOIN " +
    "`Character` c1 ON fr.friend1_id = c1.character_id LEFT JOIN" +
    "`Character` c2 ON fr.friend2_id = c2.character_id", function(error, results, fields){
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
  mysql.pool.query("SELECT rr.id, c1.character_name AS rival1_name, c2.character_name AS rival2_name FROM " +
    "rival_relationship rr LEFT JOIN " +
    "`Character` c1 ON rr.rival1_id = c1.character_id LEFT JOIN " +
    "`Character` c2 ON rr.rival2_id = c2.character_id", function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }
      context.rivalries = results;
      complete();
    });
}

module.exports = readObj;
