-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Hospitals_sp20
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Hospitals_sp20
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Hospitals_sp20`;
CREATE SCHEMA IF NOT EXISTS `Hospitals_sp20` DEFAULT CHARACTER SET utf8 ;
USE `Hospitals_sp20` ;

-- -----------------------------------------------------
-- Table `Hospitals_sp20`.`People`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospitals_sp20`.`People` (
  `PersonID` INT NOT NULL,
  `PersonType` VARCHAR(45) NOT NULL,
  `LastName` VARCHAR(45) NOT NULL,
  `FirstName` VARCHAR(45) NULL,
  `Age` INT NULL,
  `COVIDPositive` TINYINT NULL,
  PRIMARY KEY (`PersonID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Hospitals_sp20`.`Wards`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospitals_sp20`.`Wards` (
  `WardID` INT NOT NULL,
  `WardName` VARCHAR(45) NULL,
  `COVIDExposed` TINYINT NULL,
  `TotalBeds` INT NULL,
  `BedsFilled` INT NULL,
  PRIMARY KEY (`WardID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Hospitals_sp20`.`Beds`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospitals_sp20`.`Beds` (
  `BedID` INT NOT NULL,
  `WardID` INT NOT NULL,
  PRIMARY KEY (`BedID`),
  INDEX `fk_Beds_Wards1_idx` (`WardID` ASC),
  CONSTRAINT `fk_Beds_Wards1`
    FOREIGN KEY (`WardID`)
    REFERENCES `Hospitals_sp20`.`Wards` (`WardID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Hospitals_sp20`.`Patients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospitals_sp20`.`Patients` (
  `PersonID` INT NOT NULL,
  `Condition` VARCHAR(45) NULL,
  `CheckedIn` TINYINT NULL,
  `Diagnosis` VARCHAR(45) NULL,
  `COVIDRiskProfile` VARCHAR(45) NULL,
  `BedID` INT NULL,
  PRIMARY KEY (`PersonID`),
  INDEX `fk_Patients_Beds1_idx` (`BedID` ASC),
  CONSTRAINT `fk_Patients_Beds1`
    FOREIGN KEY (`BedID`)
    REFERENCES `Hospitals_sp20`.`Beds` (`BedID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Patients_People1`
    FOREIGN KEY (`PersonID`)
    REFERENCES `Hospitals_sp20`.`People` (`PersonID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Hospitals_sp20`.`Doctors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospitals_sp20`.`Doctors` (
  `PersonID` INT NOT NULL,
  `WardNumber` INT NULL,
  `WardID` INT NOT NULL,
  PRIMARY KEY (`PersonID`),
  INDEX `fk_Doctors_Wards1_idx` (`WardID` ASC),
  CONSTRAINT `fk_Doctors_Wards1`
    FOREIGN KEY (`WardID`)
    REFERENCES `Hospitals_sp20`.`Wards` (`WardID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Hospitals_sp20`.`DoctorsPatients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospitals_sp20`.`DoctorsPatients` (
  `PatientID` INT NOT NULL,
  `DoctorID` INT NOT NULL,
  PRIMARY KEY (`DoctorID`, `PatientID`),
  INDEX `fk_DoctorsPatients_Patients1_idx` (`PatientID` ASC),
  INDEX `fk_DoctorsPatients_Doctors1_idx` (`DoctorID` ASC),
  CONSTRAINT `fk_DoctorsPatients_Patients1`
    FOREIGN KEY (`PatientID`)
    REFERENCES `Hospitals_sp20`.`Patients` (`PersonID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_DoctorsPatients_Doctors1`
    FOREIGN KEY (`DoctorID`)
    REFERENCES `Hospitals_sp20`.`Doctors` (`PersonID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Hospitals_sp20`.`Equipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospitals_sp20`.`Equipment` (
  `EquipmentID` INT NOT NULL,
  `EquipmentType` VARCHAR(45) NULL,
  `COVIDExposed` TINYINT NULL,
  PRIMARY KEY (`EquipmentID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Hospitals_sp20`.`Specialties`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospitals_sp20`.`Specialties` (
  `SpecialtyID` INT NOT NULL,
  `SpecialtyName` VARCHAR(45) NULL,
  PRIMARY KEY (`SpecialtyID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Hospitals_sp20`.`DoctorsSpecialties`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospitals_sp20`.`DoctorsSpecialties` (
  `DoctorID` INT NOT NULL,
  `SpecialtyID` INT NOT NULL,
  PRIMARY KEY (`DoctorID`, `SpecialtyID`),
  INDEX `fk_DoctorsSpecialties_Doctors1_idx` (`DoctorID` ASC),
  INDEX `fk_DoctorsSpecialties_Specialties1_idx` (`SpecialtyID` ASC),
  CONSTRAINT `fk_DoctorsSpecialties_Doctors1`
    FOREIGN KEY (`DoctorID`)
    REFERENCES `Hospitals_sp20`.`Doctors` (`PersonID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_DoctorsSpecialties_Specialties1`
    FOREIGN KEY (`SpecialtyID`)
    REFERENCES `Hospitals_sp20`.`Specialties` (`SpecialtyID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Hospitals_sp20`.`PatientsSpecialtiesNeeded`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospitals_sp20`.`PatientsSpecialtiesNeeded` (
  `PatientsSpecialtiesNeededID` INT NOT NULL,
  `PatientID` INT NOT NULL,
  `SpecialtyNeededID` INT NOT NULL,
  PRIMARY KEY (`PatientsSpecialtiesNeededID`),
  INDEX `fk_PatientsSpecialtiesNeeded_Patients1_idx` (`PatientID` ASC),
  INDEX `fk_PatientsSpecialtiesNeeded_Specialties1_idx` (`SpecialtyNeededID` ASC),
  CONSTRAINT `fk_PatientsSpecialtiesNeeded_Patients1`
    FOREIGN KEY (`PatientID`)
    REFERENCES `Hospitals_sp20`.`Patients` (`PersonID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PatientsSpecialtiesNeeded_Specialties1`
    FOREIGN KEY (`SpecialtyNeededID`)
    REFERENCES `Hospitals_sp20`.`Specialties` (`SpecialtyID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Hospitals_sp20`.`Staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospitals_sp20`.`Staff` (
  `PersonID` INT NOT NULL,
  `StaffType` VARCHAR(45) NULL,
  PRIMARY KEY (`PersonID`),
  CONSTRAINT `fk_Staff_People1`
    FOREIGN KEY (`PersonID`)
    REFERENCES `Hospitals_sp20`.`People` (`PersonID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Staff_Doctors1`
    FOREIGN KEY (`PersonID`)
    REFERENCES `Hospitals_sp20`.`People` (`PersonID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Hospitals_sp20`.`DoctorsEquipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospitals_sp20`.`DoctorsEquipment` (
  `DoctorsEquipmentID` INT NOT NULL,
  `DoctorID` INT NOT NULL,
  `EquipmentID` INT NOT NULL,
  PRIMARY KEY (`DoctorsEquipmentID`),
  INDEX `fk_DoctorsEquipment_Doctors1_idx` (`DoctorID` ASC),
  INDEX `fk_DoctorsEquipment_Equipment1_idx` (`EquipmentID` ASC),
  CONSTRAINT `fk_DoctorsEquipment_Doctors1`
    FOREIGN KEY (`DoctorID`)
    REFERENCES `Hospitals_sp20`.`Doctors` (`PersonID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_DoctorsEquipment_Equipment1`
    FOREIGN KEY (`EquipmentID`)
    REFERENCES `Hospitals_sp20`.`Equipment` (`EquipmentID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Hospitals_sp20`.`PatientsEquipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospitals_sp20`.`PatientsEquipment` (
  `PatientsEquipmentID` INT NOT NULL,
  `EquipmentID` INT NOT NULL,
  `PatientsID` INT NOT NULL,
  PRIMARY KEY (`PatientsEquipmentID`),
  INDEX `fk_PatientsEquipment_Equipment1_idx` (`EquipmentID` ASC),
  INDEX `fk_PatientsEquipment_Patients1_idx` (`PatientsID` ASC),
  CONSTRAINT `fk_PatientsEquipment_Equipment1`
    FOREIGN KEY (`EquipmentID`)
    REFERENCES `Hospitals_sp20`.`Equipment` (`EquipmentID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PatientsEquipment_Patients1`
    FOREIGN KEY (`PatientsID`)
    REFERENCES `Hospitals_sp20`.`Patients` (`PersonID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Hospitals_sp20`.`DatabaseUsers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Hospitals_sp20`.`DatabaseUsers` (
  `PersonID` INT NOT NULL,
  `Username` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NULL,
  `Admin` TINYINT NULL,
  PRIMARY KEY (`PersonID`),
  CONSTRAINT `fk_DatabaseUsers_Staff1`
    FOREIGN KEY (`PersonID`)
    REFERENCES `Hospitals_sp20`.`Staff` (`PersonID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
