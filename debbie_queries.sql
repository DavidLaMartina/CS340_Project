-- In all cases, colon : character is used to denote variables that will be 
-- passed into a wrapper function in the backend programming language

/* Queries for Friendships and Rivalries Web Page   */

-- Query for displaying friend_relationship table

SELECT * FROM friend_relationship;

-- Query to delete a row from the friend_relationship table
DELETE FROM friend_relationship WHERE id = :id_num_of_row_to_delete;

-- Query to insert into friend_relationship

INSERT INTO friend_relationship (friend1_id, friend2_id) VALUES (:character1_input, :character2_input);

-- Select query for displaying rival_relationship

SELECT * FROM rival_relationship;

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

SELECT * FROM character_powers;

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

SELECT * FROM character_weaknesses;

-- Query to delete a row from the character_weaknesses table

DELETE FROM character_weaknesses WHERE id = :id_num_of_row_to_delete;



