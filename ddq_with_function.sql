/*This function would be used to impose a constraint in MariaDB versions of 10.21 or higher
  Our current MariaDB is 10.1.22 */
DROP FUNCTION IF EXISTS mentorRole;
DELIMITER $$
CREATE FUNCTION mentorRole(m INT)RETURNS BOOLEAN
BEGIN
	DECLARE result1 BOOLEAN;
    SELECT role INTO result1 FROM `Character` WHERE character_id = m;
	RETURN result1;
END;

$$
DELIMITER ;

/* Data Definition Query for Superhero Database */
/* Group 16 David LaMartina and Deborah Kretzschmar*/

/* Adding in to ensure dropping one table before another will not
   result in a foreign key error */
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS character_powers;
DROP TABLE IF EXISTS character_weaknesses;
DROP TABLE IF EXISTS rival_relationship;
DROP TABLE IF EXISTS friend_relationship;
DROP TABLE IF EXISTS Equipment;
DROP TABLE IF EXISTS `Character`;
DROP TABLE IF EXISTS City;
DROP TABLE IF EXISTS `Power`;
DROP TABLE IF EXISTS Weakness;

SET FOREIGN_KEY_CHECKS = 1;

/* Create the table City */
CREATE TABLE City(
city_id int NOT NULL AUTO_INCREMENT,
city_name varchar(100) NOT NULL,
real_city boolean NOT NULL DEFAULT true,
PRIMARY KEY (city_id)
);

/* Create the table Character. */
CREATE TABLE `Character`(
 character_id int NOT NULL AUTO_INCREMENT,
 character_name varchar(100) NOT NULL,
 real_first_name varchar(100),
 real_last_name varchar(100),
 city int DEFAULT NULL,
 role boolean NOT NULL,
 mentor_id int CHECK(mentorRole(mentor_id) = role AND character_id != mentor_id),
 PRIMARY KEY (character_id),
 CONSTRAINT fk_Character_City
	FOREIGN KEY (city) REFERENCES City(city_id)
	ON DELETE SET NULL ON UPDATE CASCADE,
 CONSTRAINT fk_Character_Character
	FOREIGN KEY (mentor_id) REFERENCES `Character`(character_id)
	ON DELETE SET NULL ON UPDATE CASCADE
);

/* Create the table Power */
CREATE TABLE `Power` (
  power_id int NOT NULL AUTO_INCREMENT,
  power_type varchar(100) NOT NULL,
  power_magnitude tinyInt CHECK(power_magnitude > 0 AND power_magnitude < 11),
  PRIMARY KEY (power_id)
) ;

/* Create the table Weakness */
CREATE TABLE Weakness (
	weakness_id int NOT NULL AUTO_INCREMENT,
	weakness_type varchar(100) NOT NULL,
    weakness_magnitude tinyInt CHECK(weakness_magnitude > 0 AND weakness_magnitude < 11),
  PRIMARY KEY (`weakness_id`)

);

/* Create the table Equipment */
CREATE TABLE Equipment(
 equipment_id int NOT NULL AUTO_INCREMENT,
 equipment_name varchar(100) NOT NULL,
 description varchar(100) NOT NULL,
 material varchar(100),
 character_id int NOT NULL,
 PRIMARY KEY (equipment_id),
 CONSTRAINT fk_Equipment_Character
	FOREIGN KEY (character_id) REFERENCES `Character`(character_id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

/* Create the table character_power */
CREATE TABLE character_powers(
 id int NOT NULL AUTO_INCREMENT,
 power_id int NOT NULL,
 character_id int NOT NULL,
 PRIMARY KEY (id),
 CONSTRAINT fk_character_powers_Power
	FOREIGN KEY (power_id) REFERENCES Power(power_id)
	ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT fk_character_powers_Character
	FOREIGN KEY (character_id) REFERENCES `Character`(character_id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

/* Create the table character_weakness
   Since this relation was many to many
   table cascades on delete or update  */
CREATE TABLE character_weaknesses(
 id int NOT NULL AUTO_INCREMENT,
 weakness_id int NOT NULL,
 character_id int NOT NULL,
 PRIMARY KEY (id),
 CONSTRAINT fk_character_weaknesses_Weakness
	FOREIGN KEY (weakness_id) REFERENCES Weakness(weakness_id)
	ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT fk_character_weaknesses_Character
	FOREIGN KEY (character_id) REFERENCES `Character`(character_id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

/* Create the table rival_relationship
   Since this table was bridge for many to
   many, it cascades on delete or update */
CREATE TABLE rival_relationship(
 id int NOT NULL AUTO_INCREMENT,
 rival1_id int NOT NULL,
 rival2_id int NOT NULL CHECK (rival1_id < rival2_id),
 PRIMARY KEY (id),
 CONSTRAINT fk_rival_relationship_Character
	FOREIGN KEY (rival1_id) REFERENCES `Character`(character_id)
	ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT fk_rival_relationship1_Character
	FOREIGN KEY (rival2_id) REFERENCES `Character`(character_id)
	ON DELETE CASCADE ON UPDATE CASCADE
);

/* Create the table friend_relationship
   Since this table is bridge for many to
   many relationship, it cascades on delete
   or update*/
CREATE TABLE friend_relationship(
 id int NOT NULL AUTO_INCREMENT,
 friend1_id int NOT NULL,
 friend2_id int NOT NULL CHECK (friend1_id < friend2_id),
 PRIMARY KEY (id),
 CONSTRAINT fk_friend_relationship_Character
	FOREIGN KEY (friend1_id) REFERENCES `Character`(character_id)
	ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT fk_friend_relationship1_Character
	FOREIGN KEY (friend2_id) REFERENCES `Character`(character_id)
	ON DELETE CASCADE ON UPDATE CASCADE
);
/*ADD SAMPLE DATA TO ALL THE TABLES */
/* Seed data for the table City */
INSERT INTO City (city_name, real_city) VALUES
  ('Gotham City', 0),
  ('Metropolis', 0),
  ('Argo City', 0),
  ('Star City', 0),
  ('Gateway City', 0),
  ('Coast City', 0),
  ('Opal City', 0),
  ('Midway City', 0),
  ('Central City', 0),
  ('London', 1),
  ('Seoul', 1),
  ('Wakanda', 0),
  ('Johannesburg', 1),
  ('Alberta', 1),
  ('Queens', 1),
  ('Long Island', 1),
  ('New York City', 1);

/* Insert data into Character table */
INSERT INTO `Character`(character_name, real_first_name, real_last_name, city, role, mentor_id) VALUES
  ('Batman', 'Bruce', 'Wayne', 1, 1, NULL),
  ('Robin', 'Dick', 'Grayson', 1,1,1),
  ('Green Arrow', 'Oliver', 'Queen', 5, 1, NULL),
  ('Brick', 'Daniel', 'Brickwell', 5, 0, NULL),
  ('Loki', NULL, NULL, NULL, 0, NULL),
  ('Thor', NULL, NULL, NULL, 1, NULL),
  ('Wonder Woman', 'Diana', 'Prince', NULL, 1, NULL),
  ('Lex Luthor', NULL, NULL, 2, 0, NULL),
  ('Superman', 'Clark', 'Kent', 1, 1, NULL),
  ('The Joker', 'Jack', 'Napier', 1, 0, Null),
  ('Bob the Goon', NULL, NULL,1, 0, 10 ),
  ('Wolferine', 'James', 'Howlett', NULL, 1, NULL),
  ('Dare Devil', 'Matt', 'Murdock',3, 1, NULL) ;

/* Insert data into the Power table */
INSERT INTO Power (power_type, power_magnitude) VALUES
  ('x-ray vision', 10),
  ('super strength', 5),
  ('super strength', 10),
  ('flight', 5),
  ('genius-level intellect', 10);
  
/* Insert data into the Weakness table */
INSERT INTO Weakness(weakness_type, weakness_magnitude) VALUES
  ('Kryptonite', 10),
  ("Wonder Woman's Lasso", 10),
  ('Thor letting go of Hammer', 8),
  ('Muramasa Blade', 10),
  ('Noise Pollution', 8);
  
/* Insert data into the Equipment table */
INSERT INTO Equipment (equipment_name, description, material, character_id) VALUES
  ('Batmobile', "Batman's heavily armored and weaponized car", 'steel', 1),
  ('Truth Lasso', 'Lasso makes people tell the truth', 'Gold', 7),
  ("Thor's Hammer", 'Hammer', 'Iron', 6),
  ("Wolverine's Skeleton", 'Endoskeleton', 'Adamantium', 12);
  
/* Insert data into the rival_relationship table */
INSERT INTO rival_relationship(rival1_id, rival2_id) VALUES (5, 6),(8, 9), (1, 10) ;

/* Insert data into the friend_relationship table */
INSERT INTO friend_relationship (friend1_id, friend2_id) VALUES (6, 7), (1, 9), (10, 11);

/* Insert seed data into the character_powers table */
INSERT INTO character_powers (power_id, character_id) VALUES (1, 9), (3, 9), (2, 7), (4, 9), (5, 8);

/* Insert seed data into the character_powers table */
INSERT INTO character_weaknesses (weakness_id, character_id) VALUES (1, 9), (2, 7), (3, 6), (5, 13);
