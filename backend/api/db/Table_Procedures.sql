USE `portal-empleos`;

-- ================================================
-- PROCEDURE: sp_createUser
-- ================================================
DROP PROCEDURE IF EXISTS `sp_createUser`;
DELIMITER $$

CREATE PROCEDURE `sp_createUser` (
    IN p_user VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255)
)
BEGIN
    -- Check for duplicate user or email
    IF EXISTS (SELECT 1 FROM users WHERE user = p_user OR email = p_email) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User or email already registered';
    END IF;

    -- Insert new user
    INSERT INTO users (`user`, `email`, `password`)
    VALUES (p_user, p_email, p_password);
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_createCompany
-- ================================================
DROP PROCEDURE IF EXISTS `sp_createCompany`;
DELIMITER $$

CREATE PROCEDURE `sp_createCompany` (
    IN p_user VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_address VARCHAR(100),
    IN p_password VARCHAR(255)
)
BEGIN
    -- Check for duplicate user, email, or address
    IF EXISTS (SELECT 1 FROM companies WHERE user = p_user OR email = p_email OR address = p_address) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User, email or address already registered';
    END IF;

    -- Insert new company
    INSERT INTO companies (`user`, `email`, `address`, `password`)
    VALUES (p_user, p_email, p_address, p_password);
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_createJob
-- ================================================
DROP PROCEDURE IF EXISTS `sp_createJob`;
DELIMITER $$

CREATE PROCEDURE `sp_createJob` (
    IN p_title VARCHAR(255),
    IN p_schedule VARCHAR(100),
    IN p_min_salary DECIMAL(10,2),
    IN p_max_salary DECIMAL(10,2),
    IN p_company_name VARCHAR(255),
    IN p_company_location VARCHAR(255),
    IN p_company_id INT
)
BEGIN
    -- Insert new job
    INSERT INTO jobs (
        title,
        schedule,
        min_salary,
        max_salary,
        company_name,
        company_location,
        company_id
    )
    VALUES (
        p_title,
        p_schedule,
        p_min_salary,
        p_max_salary,
        p_company_name,
        p_company_location,
        p_company_id
    );
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_updateJob
-- ================================================
DROP PROCEDURE IF EXISTS `sp_updateJob`;
DELIMITER $$

CREATE PROCEDURE `sp_updateJob` (
    IN p_id INT,
    IN p_title VARCHAR(255),
    IN p_schedule VARCHAR(100),
    IN p_min_salary DECIMAL(10,2),
    IN p_max_salary DECIMAL(10,2),
    IN p_company_name VARCHAR(100),
    IN p_company_location VARCHAR(100)
)
BEGIN
    -- Check if job exists
    IF NOT EXISTS (SELECT 1 FROM jobs WHERE id = p_id) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Job not found';
    END IF;

    -- Update job record
    UPDATE jobs
    SET
        title = p_title,
        schedule = p_schedule,
        min_salary = p_min_salary,
        max_salary = p_max_salary,
        company_name = p_company_name,
        company_location = p_company_location
    WHERE id = p_id;
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_createJobDetails
-- ================================================
DROP PROCEDURE IF EXISTS `sp_createJobDetails`;
DELIMITER $$

CREATE PROCEDURE `sp_createJobDetails` (
    IN p_job_id INT,
    IN p_description TEXT,
    IN p_requirements TEXT,
    IN p_benefits TEXT,
    IN p_publication_date DATE
)
BEGIN
    -- Check if job exists
    IF NOT EXISTS (SELECT 1 FROM jobs WHERE id = p_job_id) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Job does not exist';
    END IF;

    -- Insert job details
    INSERT INTO jobdetails (
        job_id, description, requirements, benefits, publication_date
    ) VALUES (
        p_job_id, p_description, p_requirements, p_benefits, p_publication_date
    );
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_deleteJob
-- ================================================
DROP PROCEDURE IF EXISTS `sp_deleteJob`;
DELIMITER $$

CREATE PROCEDURE `sp_deleteJob` (
    IN p_job_id INT
)
BEGIN
    -- Check if job exists
    IF NOT EXISTS (SELECT 1 FROM jobs WHERE id = p_job_id) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Job not found';
    END IF;

    -- Delete job
    DELETE FROM jobs WHERE id = p_job_id;
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_applyToJob
-- ================================================
DROP PROCEDURE IF EXISTS `sp_applyToJob`;
DELIMITER $$

CREATE PROCEDURE `sp_applyToJob` (
    IN p_user_id INT,
    IN p_job_id INT
)
BEGIN
    -- Check if user or job exist (optional but recomendable)
    IF NOT EXISTS (SELECT 1 FROM users WHERE id = p_user_id) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User not found';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM jobs WHERE id = p_job_id) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Job not found';
    END IF;

    -- Insert if not already applied
    IF NOT EXISTS (SELECT 1 FROM applications WHERE user_id = p_user_id AND job_id = p_job_id) THEN
        INSERT INTO applications (user_id, job_id)
        VALUES (p_user_id, p_job_id);
    END IF;
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_hasUserAppliedToJob
-- ================================================
DROP PROCEDURE IF EXISTS `sp_hasUserAppliedToJob`;
DELIMITER $$

CREATE PROCEDURE `sp_hasUserAppliedToJob` (
    IN p_user_id INT,
    IN p_job_id INT
)
BEGIN
    -- Check if application exists and return result
    SELECT COUNT(*) > 0 AS alreadyApplied
    FROM applications
    WHERE user_id = p_user_id AND job_id = p_job_id;
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_getApplicationsWithCv
-- ================================================
DROP PROCEDURE IF EXISTS `sp_getApplicationsWithCv`;
DELIMITER $$

CREATE PROCEDURE `sp_getApplicationsWithCv` (
    IN p_job_id INT
)
BEGIN
    -- Validar existencia de la vacante
    IF NOT EXISTS (SELECT 1 FROM jobs WHERE id = p_job_id) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Job not found';
    END IF;

    -- Devolver los CVs relacionados a esa vacante sin incluir el PDF
    SELECT 
        cv.user_id,
        cv.first_name,
        cv.last_name,
        cv.phone,
        cv.address,
        cv.city,
        cv.education_institution,
        cv.degree_title,
        cv.education_start_date,
        cv.education_end_date,
        cv.work_company,
        cv.work_position,
        cv.work_start_date,
        cv.work_end_date,
        cv.skills,
        cv.languages,
        cv.career_objective,
        cv.achievements_projects,
        cv.availability,
        cv.linkedin_profile,
        cv.references
    FROM applications
    JOIN cv ON applications.user_id = cv.user_id
    WHERE applications.job_id = p_job_id;
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_loginUser
-- ================================================
DROP PROCEDURE IF EXISTS `sp_loginUser`;
DELIMITER $$

CREATE PROCEDURE `sp_loginUser` (
    IN p_user VARCHAR(50)
)
BEGIN
    -- Devolver usuario por username
    SELECT id, user, email, password
    FROM users
    WHERE user = p_user
    LIMIT 1;
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_loginCompany
-- ================================================
DROP PROCEDURE IF EXISTS `sp_loginCompany`;
DELIMITER $$

CREATE PROCEDURE `sp_loginCompany` (
    IN p_user VARCHAR(50)
)
BEGIN
    -- Devolver empresa por username
    SELECT id, user, email, address, password
    FROM companies
    WHERE user = p_user
    LIMIT 1;
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_getAllJobs
-- ================================================
DROP PROCEDURE IF EXISTS `sp_getAllJobs`;
DELIMITER $$

CREATE PROCEDURE `sp_getAllJobs` ()
BEGIN
    SELECT 
        id, title, schedule, min_salary, max_salary,
        company_name, company_location
    FROM jobs;
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_getCompanyJobs
-- ================================================
DROP PROCEDURE IF EXISTS `sp_getCompanyJobs`;
DELIMITER $$

CREATE PROCEDURE `sp_getCompanyJobs` (
    IN p_company_id INT
)
BEGIN
    SELECT * FROM jobs WHERE company_id = p_company_id;
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_getJobById
-- ================================================
DROP PROCEDURE IF EXISTS `sp_getJobById`;
DELIMITER $$

CREATE PROCEDURE `sp_getJobById` (
    IN p_job_id INT
)
BEGIN
    SELECT * FROM jobs WHERE id = p_job_id;
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_getCV 
-- ================================================
DROP PROCEDURE IF EXISTS `sp_getCV`;
DELIMITER $$

CREATE PROCEDURE `sp_getCV` (
    IN p_user_id INT
)
BEGIN
    SELECT 
        id,
        user_id,
        first_name,
        last_name,
        phone,
        address,
        city,
        degree_title,
        education_institution,
        education_start_date,
        education_end_date,
        work_position,
        work_company,
        work_start_date,
        work_end_date,
        skills,
        languages,
        availability,
        linkedin_profile,
        career_objective,
        achievements_projects,
        `references`
    FROM cv
    WHERE user_id = p_user_id;
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_saveCV
-- ================================================
DROP PROCEDURE IF EXISTS `sp_saveCV`;
DELIMITER $$

CREATE PROCEDURE `sp_saveCV` (
    IN p_user_id INT,
    IN p_first_name VARCHAR(100),
    IN p_last_name VARCHAR(100),
    IN p_phone VARCHAR(50),
    IN p_address VARCHAR(255),
    IN p_city VARCHAR(100),
    IN p_education_institution VARCHAR(255),
    IN p_degree_title VARCHAR(255),
    IN p_education_start_date DATE,
    IN p_education_end_date DATE,
    IN p_work_company VARCHAR(255),
    IN p_work_position VARCHAR(255),
    IN p_work_start_date DATE,
    IN p_work_end_date DATE,
    IN p_skills TEXT,
    IN p_languages TEXT,
    IN p_career_objective TEXT,
    IN p_achievements_projects TEXT,
    IN p_availability VARCHAR(50),
    IN p_linkedin_profile VARCHAR(255),
    IN p_references TEXT
)
BEGIN
    IF EXISTS (SELECT 1 FROM cv WHERE user_id = p_user_id) THEN
        UPDATE cv SET
            first_name = p_first_name,
            last_name = p_last_name,
            phone = p_phone,
            address = p_address,
            city = p_city,
            education_institution = p_education_institution,
            degree_title = p_degree_title,
            education_start_date = p_education_start_date,
            education_end_date = p_education_end_date,
            work_company = p_work_company,
            work_position = p_work_position,
            work_start_date = p_work_start_date,
            work_end_date = p_work_end_date,
            skills = p_skills,
            languages = p_languages,
            career_objective = p_career_objective,
            achievements_projects = p_achievements_projects,
            availability = p_availability,
            linkedin_profile = p_linkedin_profile,
            `references` = p_references
        WHERE user_id = p_user_id;
    ELSE
        INSERT INTO cv (
            user_id, first_name, last_name, phone, address, city,
            education_institution, degree_title, education_start_date, education_end_date,
            work_company, work_position, work_start_date, work_end_date,
            skills, languages, career_objective, achievements_projects,
            availability, linkedin_profile, `references`
        ) VALUES (
            p_user_id, p_first_name, p_last_name, p_phone, p_address, p_city,
            p_education_institution, p_degree_title, p_education_start_date, p_education_end_date,
            p_work_company, p_work_position, p_work_start_date, p_work_end_date,
            p_skills, p_languages, p_career_objective, p_achievements_projects,
            p_availability, p_linkedin_profile, p_references
        );
    END IF;
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_updateCVPDF
-- ================================================
DROP PROCEDURE IF EXISTS `sp_updateCVPDF`;
DELIMITER $$

CREATE PROCEDURE `sp_updateCVPDF` (
    IN p_user_id INT,
    IN p_cv_pdf LONGBLOB
)
BEGIN
    UPDATE cv SET cv_pdf = p_cv_pdf WHERE user_id = p_user_id;
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_hasCV
-- ================================================
DROP PROCEDURE IF EXISTS `sp_hasCV`;
DELIMITER $$

CREATE PROCEDURE `sp_hasCV` (
    IN p_user_id INT
)
BEGIN
    SELECT EXISTS(SELECT 1 FROM cv WHERE user_id = p_user_id) AS has_cv;
END $$

DELIMITER ;

-- ================================================
-- PROCEDURE: sp_getCVPDF
-- ================================================
DROP PROCEDURE IF EXISTS `sp_getCVPDF`;
DELIMITER $$

CREATE PROCEDURE `sp_getCVPDF` (
    IN p_user_id INT
)
BEGIN
    SELECT cv_pdf FROM cv WHERE user_id = p_user_id;
END $$

DELIMITER ;
