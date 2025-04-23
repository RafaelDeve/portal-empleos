DROP DATABASE IF EXISTS `portal-empleos`;
CREATE DATABASE `portal-empleos`;
USE `portal-empleos`;

-- ================================================
-- Tabla: users
-- ================================================
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ================================================
-- Tabla: companies
-- ================================================
DROP TABLE IF EXISTS `companies`;

CREATE TABLE `companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `address` (`address`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

-- ================================================
-- Tabla: jobs
-- ================================================
DROP TABLE IF EXISTS `jobs`;

CREATE TABLE `jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `schedule` varchar(50) NOT NULL,
  `min_salary` varchar(20) NOT NULL,
  `max_salary` varchar(20) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `company_location` varchar(100) NOT NULL,
  `company_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

-- ================================================
-- Tabla: jobdetails
-- ================================================
DROP TABLE IF EXISTS `jobdetails`;

CREATE TABLE `jobdetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_id` int NOT NULL,
  `description` text,
  `requirements` text,
  `benefits` text,
  `publication_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `jobdetails_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ================================================
-- Tabla: applications
-- ================================================
DROP TABLE IF EXISTS `applications`;

CREATE TABLE `applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `job_id` int NOT NULL,
  `applied_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`job_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ================================================
-- Tabla: cv
-- ================================================
DROP TABLE IF EXISTS `cv`;

CREATE TABLE `cv` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `education_institution` VARCHAR(255),      -- Academic Background
  `degree_title` VARCHAR(255),
  `education_start_date` DATE,
  `education_end_date` DATE,
  `work_company` VARCHAR(255),               -- Work Experience
  `work_position` VARCHAR(255),
  `work_start_date` DATE,
  `work_end_date` DATE,
  `skills` TEXT,                             -- Key Skills
  `languages` TEXT,
  `career_objective` TEXT,
  `achievements_projects` TEXT,
  `availability` VARCHAR(50),
  `linkedin_profile` VARCHAR(255),           -- Professional Networks
  `references` TEXT,
  `cv_pdf` LONGBLOB,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;