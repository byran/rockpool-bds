DROP DATABASE IF EXISTS rockpool;
CREATE DATABASE rockpool;
USE rockpool;

CREATE TABLE survey_results (
  id int AUTO_INCREMENT PRIMARY KEY,
  species_id varchar(5) NOT NULL,
  survey_id varchar(5) NOT NULL
);

CREATE TABLE session (
  id int AUTO_INCREMENT PRIMARY KEY,
  date datetime NOT NULL,
  location varchar(20) NOT NULL,
  time_low_tide time NOT NULL,
  height_low_tide tinyint NOT NULL,
  weather varchar(50) NOT NULL,
  staff_id_administrator varchar(5) NOT NULL
);

CREATE TABLE survey (
  id int AUTO_INCREMENT PRIMARY KEY,
  tourist_id_1 varchar(5) NOT NULL,
  tourist_id_2 varchar(5) NOT NULL,
  tourist_id_3 varchar(5) NOT NULL,
  session_id varchar(5) NOT NULL,
  device_id smallint NOT NULL,
  staff_id_reviewer varchar(5) NOT NULL,
  species_group_id varchar(5) NOT NULL
);

CREATE TABLE species_group (
  id int AUTO_INCREMENT PRIMARY KEY,
  name varchar(20) NOT NULL
);

CREATE TABLE species (
  id int AUTO_INCREMENT PRIMARY KEY,
  name varchar(20) NOT NULL
);

CREATE TABLE species_group_entry (
  id int AUTO_INCREMENT PRIMARY KEY,
  species_group_id varchar(5) NOT NULL,
  species_id varchar(5) NOT NULL
);
