-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Menu_vegan_DB
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Menu_vegan_DB` ;

-- -----------------------------------------------------
-- Schema Menu_vegan_DB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Menu_vegan_DB` DEFAULT CHARACTER SET utf8 ;
USE `Menu_vegan_DB` ;

-- -----------------------------------------------------
-- Table `Menu_vegan_DB`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Menu_vegan_DB`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(100) NOT NULL,
  `mail` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `fecha_alta` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `reg_confirm` TINYINT NOT NULL DEFAULT 0,
  `reg_token` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Menu_vegan_DB`.`Tipo_menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Menu_vegan_DB`.`Tipo_menu` (
  `idTipo_menu` INT NOT NULL AUTO_INCREMENT,
  `Tipo` VARCHAR(45) NULL,
  PRIMARY KEY (`idTipo_menu`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Menu_vegan_DB`.`Menu_semana`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Menu_vegan_DB`.`Menu_semana` (
  `idMenu_semana` INT NOT NULL AUTO_INCREMENT,
  `Dia` VARCHAR(10) NOT NULL,
  `idUsuario` INT NOT NULL,
  `idTipo_menu` INT NOT NULL,
  PRIMARY KEY (`idMenu_semana`),
  CONSTRAINT `fk_Menu_semana_Usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `Menu_vegan_DB`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Menu_semana_Tipo_menu1`
    FOREIGN KEY (`idTipo_menu`)
    REFERENCES `Menu_vegan_DB`.`Tipo_menu` (`idTipo_menu`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Menu_vegan_DB`.`Receta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Menu_vegan_DB`.`Receta` (
  `idReceta` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(255) NOT NULL,
  `Descripcion` VARCHAR(2048) NOT NULL,
  `Tiempo` INT NOT NULL,
  `img` VARCHAR(255) NOT NULL,
  `Tiempo_preparacion` INT NOT NULL,
  PRIMARY KEY (`idReceta`),
  CONSTRAINT `fk_Receta_Menu_semana1`
    FOREIGN KEY (`Tiempo_preparacion`)
    REFERENCES `Menu_vegan_DB`.`Menu_semana` (`idMenu_semana`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Menu_vegan_DB`.`Ingredientes_receta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Menu_vegan_DB`.`Ingredientes_receta` (
  `Nombre` VARCHAR(45) NOT NULL,
  `Descripcion` VARCHAR(2048) NOT NULL,
  `img` VARCHAR(255) NOT NULL,
  `Donde_encontrarlo` VARCHAR(255) NOT NULL,
  `idReceta` INT NOT NULL,
  CONSTRAINT `fk_Ingredientes_receta_Receta`
    FOREIGN KEY (`idReceta`)
    REFERENCES `Menu_vegan_DB`.`Receta` (`idReceta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `Menu_vegan_DB`.`Tipo_menu`
-- -----------------------------------------------------
START TRANSACTION;
USE `Menu_vegan_DB`;
INSERT INTO `Menu_vegan_DB`.`Tipo_menu` (`idTipo_menu`, `Tipo`) VALUES (DEFAULT, 'Desayuno');
INSERT INTO `Menu_vegan_DB`.`Tipo_menu` (`idTipo_menu`, `Tipo`) VALUES (DEFAULT, 'Comida');
INSERT INTO `Menu_vegan_DB`.`Tipo_menu` (`idTipo_menu`, `Tipo`) VALUES (DEFAULT, 'Cena');

COMMIT;

