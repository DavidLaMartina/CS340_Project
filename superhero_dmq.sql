/* Data Manipulation Queries for Group 16
   David LaMartina and Deborah Kretzschmar */
 -- In all cases, colon : character is used to denote variables that will be
-- passed into a wrapper function in the backend programming language

-- SELECT queries for characters page (Character, Equipment, City tables)

-- Character - get all entries --
SELECT c1.character_id, c1.character_name, c1.real_first_name, c1.real_last_name, ci.city_name, c1.role, c2.character_name AS `mentor_name` FROM
  `Character` c1 LEFT JOIN
  `City` ci ON c1.city = ci.city_id LEFT JOIN
  `Character` c2 ON c1.mentor_id = c2.character_id;

-- Character - entries filtered by city --
SELECT c1.character_id, c1.character_name, c1.real_first_name, c1.real_last_name, ci.city_name, c1.role, c2.character_name AS `mentor_name` FROM
  `Character` c1 LEFT JOIN
  `City` ci ON c1.city = ci.city_id LEFT JOIN
  `Character` c2 ON c1.mentor_id = c2.character_id
  WHERE ci.city_id = ?;

-- Character - entries matching search term --
SELECT c1.character_id, c1.character_name, c1.real_first_name, c1.real_last_name, ci.city_name, c1.role, c2.character_name AS `mentor_name` FROM
  `Character` c1 LEFT JOIN
  `City` ci ON c1.city = ci.city_id LEFT JOIN
  `Character` c2 ON c1.mentor_id = c2.character_id
  WHERE c1.character_name LIKE '%?%'

-- Equipment - get all entries --
SELECT equipment_id, equipment_name, description, material, character_name FROM
  `Equipment` e LEFT JOIN
  `Character` c ON e.character_id = c.character_id;

-- City - get all entries --
SELECT * FROM City;

-- INSERT queries for Character, Equipment, and City tables
INSERT INTO `Character` (character_name, real_first_name, real_last name, city, role, mentor_id)
VALUES (:cInput, :rfnInput, :rlnInput, :ciInput, :rInput, :mInput);

INSERT INTO Equipment (equipment_name, description, material, character_id)
VALUES (:enInput, :dInput, :mInput, :cInput);

INSERT INTO City (city_name, real_city)
VALUES (:cInput, :rInput);

-- UPDATE query for Character table
UPDATE `Character` SET character_name = :cnInput,
                     real_first_name = :rfnInput,
                     real_last_name = :rlnInput,
                     city = :cInput,
                     role = :rInput,
                     mentor_id = :mInput
WHERE id = :iInput;

-- DELETE query for Character, Equipment, and City tables
DELETE FROM `Character` WHERE id = :iInput
DELETE FROM Equipment WHERE id = :iInput
DELETE FROM City WHERE id = :iInput


/* Queries for Friendships and Rivalries Web Page   */

-- Query for displaying friend_relationship table

SELECT fr.id, c1.character_name AS friend1_name, c2.character_name AS friend2_name FROM
  friend_relationship fr LEFT JOIN
  `Character` c1 ON fr.friend1_id = c1.character_id LEFT JOIN
  `Character` c2 ON fr.friend2_id = c2.character_id;

-- Query to delete a row from the friend_relationship table
DELETE FROM friend_relationship WHERE id = :id_num_of_row_to_delete;

-- Query to insert into friend_relationship

INSERT INTO friend_relationship (friend1_id, friend2_id) VALUES (:character1_input, :character2_input);

-- Select query for displaying rival_relationship

SELECT rr.id, c1.character_name AS rival1_name, c2.character_name AS rival2_name FROM
  rival_relationship rr LEFT JOIN
  `Character` c1 ON rr.rival1_id = c1.character_id LEFT JOIN
  `Character` c2 ON rr.rival2_id = c2.character_id;


-- Query to delete a row from the rival_relationship

DELETE FROM rival_relationship WHERE id = :id_num_of_row_to_delete;

-- Query to insert a row into the rival_relationship

INSERT INTO rival_relationship(rival1_id, rival2_id) VALUES (:character1_input,:character2_input);

/* Queries for Powers and Weaknesses Web Page */

-- Query to add a power to the Power table
INSERT INTO Power (power_type, power_magnitude) VALUES (:power_type_input,:magnitude_input);

-- Query to show the content of the Power table

SELECT * FROM Power;

-- Query to display the current character_power table

SELECT cp.id, p.power_type, p.power_magnitude, c.character_name FROM
  character_powers cp LEFT JOIN
  Power p ON p.power_id = cp.power_id LEFT JOIN
  `Character` c ON cp.character_id = c.character_id;

-- Query to insert a row into the character_powers table
INSERT INTO character_powers (power_id, character_id) VALUES (:power_id_input, :character_id_input);

-- Query to delete a row from the characters_power table

DELETE FROM character_powers WHERE id = :id_num_of_row_to_delete;

-- Query to add a weakness to the Weakness table

INSERT INTO Weakness(weakness_type, weakness_magnitude) VALUES (:weakness_type_input, :magnitude_input);

-- Query to show the content of the Weakness table

SELECT * FROM Weakness;

-- Query to add to the character_weaknesses table
INSERT INTO character_weaknesses (weakness_id, character_id) VALUES (:input_weakness_id,:input_character_id);

-- Query to show the content of the character_weaknesses table

SELECT cw.id, w.weakness_type, w.weakness_magnitude, c.character_name FROM
  character_weaknesses cw LEFT JOIN
  Weakness w ON cw.weakness_id = w.weakness_id LEFT JOIN
  `Character` c ON cw.character_id = c.character_id;

-- Query to delete a row from the character_weaknesses table

DELETE FROM character_weaknesses WHERE id = :id_num_of_row_to_delete;
