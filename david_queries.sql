-- In all cases, colon : character is used to denote variables that will be
-- passed into a wrapper function in the backend programming language

-- SELECT queries to grab entire table contents for display in character, equipment
-- and city tables
SELECT * FROM Character;
SELECT * FROM Equipment;
SELECT * FROM City;

-- INSERT queries for Character, Equipment, and City tables
INSERT INTO Character (character_name, real_first_name, real_last name, city, role, mentor_id)
VALUES (:cInput, :rfnInput, :rlnInput, :ciInput, :rInput, :mInput);

INSERT INTO Equipment (equipment_name, description, material, character_id)
VALUES (:enInput, :dInput, :mInput, :cInput);

INSERT INTO City (city_name, real_city)
VALUES (:cInput, :rInput);

-- UPDATE query for Character table
UPDATE Character SET character_name = :cnInput,
                     real_first_name = :rfnInput,
                     real_last_name = :rlnInput,
                     city = :cInput,
                     role = :rInput,
                     mentor_id = :mInput
WHERE id = :iInput;


-- DELETE query for Character, Equipment, and City tables
DELETE FROM Character WHERE id = :iInput
DELETE FROM Equipment WHERE id = :iInput
DELETE FROM City WHERE id = :iInput
