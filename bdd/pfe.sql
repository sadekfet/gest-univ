-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mar. 29 avr. 2025 à 12:45
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `pfe`
--

-- --------------------------------------------------------

--
-- Structure de la table `cycle`
--

DROP TABLE IF EXISTS `cycle`;
CREATE TABLE IF NOT EXISTS `cycle` (
  `idcycle` varchar(2) NOT NULL,
  `nomcycle` varchar(100) NOT NULL,
  PRIMARY KEY (`idcycle`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `cycle`
--

INSERT INTO `cycle` (`idcycle`, `nomcycle`) VALUES
('01', 'ليسانس'),
('02', 'ماستر');

-- --------------------------------------------------------

--
-- Structure de la table `departement`
--

DROP TABLE IF EXISTS `departement`;
CREATE TABLE IF NOT EXISTS `departement` (
  `iddep` varchar(2) NOT NULL,
  `nomdep` varchar(100) NOT NULL,
  PRIMARY KEY (`iddep`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `departement`
--

INSERT INTO `departement` (`iddep`, `nomdep`) VALUES
('01', 'العلوم و التكنولوجيا'),
('02', 'الحقوق'),
('03', 'العلوم الاجتماعية'),
('04', 'العلوم الاقتصادية و التجارية و علوم التسيير'),
('05', 'آداب و لغة عربية'),
('06', 'علوم الطبيعة و الحياة'),
('07', 'لغات أجنبية'),
('08', 'رياضيات و إعلام آلي'),
('09', 'علوم المادة'),
('10', 'علوم إنسانية'),
('11', 'علوم إسلامية');

-- --------------------------------------------------------

--
-- Structure de la table `emploi`
--

DROP TABLE IF EXISTS `emploi`;
CREATE TABLE IF NOT EXISTS `emploi` (
  `dayhour` varchar(100) NOT NULL,
  `08:30-10:00` varchar(100) NOT NULL,
  `10:00-11:30` varchar(100) NOT NULL,
  `11:30-13:00` varchar(100) NOT NULL,
  `13:30-15:00` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `emploi`
--

INSERT INTO `emploi` (`dayhour`, `08:30-10:00`, `10:00-11:30`, `11:30-13:00`, `13:30-15:00`) VALUES
('sunday', 'tp1', '', 'td1', 'cour1'),
('monday', 'td2', 'tp2', '', ''),
('tuesday', 'tp3', '', '', 'cour3'),
('wednesday', 'tp4', 'td4', 'cour4', 'tp4'),
('thursday', 'tp5', '', 'cour5', '');

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

DROP TABLE IF EXISTS `etudiant`;
CREATE TABLE IF NOT EXISTS `etudiant` (
  `idetudiant` varchar(12) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `dnais` varchar(10) CHARACTER SET utf16 NOT NULL,
  `lnais` varchar(100) NOT NULL,
  `iddep` varchar(2) NOT NULL,
  `idspc` varchar(2) NOT NULL,
  `idcycle` varchar(2) NOT NULL,
  `niveau` varchar(1) NOT NULL,
  `groupe` varchar(2) NOT NULL,
  PRIMARY KEY (`idetudiant`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`idetudiant`, `nom`, `prenom`, `dnais`, `lnais`, `iddep`, `idspc`, `idcycle`, `niveau`, `groupe`) VALUES
('23047076101', 'فطوسي', 'صادق', '26-02-1985', 'القلعة', '08', '02', '02', '2', '1'),
('23047076102', 'بن حميدة', 'فتيحة', '12-05-1999', 'غليزان', '04', '04', '01', '3', '2'),
('222237559001', 'غيلاس', 'آية', '14-12-2004', 'غليزان', '02', '02', '01', '3', '1'),
('23047076104', 'بن حجار', 'فاطمة', '14-03-2006', 'مستغانم', '05', '05', '01', '3', '1'),
('23047076105', 'غيلاس', 'فاتح', '01-02-1979', 'يلل', '03', '03', '02', '1', '1');

-- --------------------------------------------------------

--
-- Structure de la table `specialite`
--

DROP TABLE IF EXISTS `specialite`;
CREATE TABLE IF NOT EXISTS `specialite` (
  `idspc` varchar(2) NOT NULL,
  `nomspc` varchar(100) NOT NULL,
  PRIMARY KEY (`idspc`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `specialite`
--

INSERT INTO `specialite` (`idspc`, `nomspc`) VALUES
('01', 'العلوم السياسية'),
('02', 'الإعلام الالي'),
('03', 'الفلسفة'),
('04', 'علم الاجتماع'),
('05', 'اللغة الإنجليزية'),
('06', 'الحقوق'),
('07', 'اللغة العربية'),
('08', 'اللغة الفرنسية'),
('09', 'علم النفس'),
('10', 'علوم التربية'),
('11', 'علوم اقتصادية'),
('12', 'علوم تجارية'),
('13', 'علوم التسيير'),
('14', 'الهندسة الكهربائية'),
('15', 'الهندسة المعمارية'),
('16', 'الهندسة الميكانكية'),
('17', 'الهندسة الكيميائية'),
('18', 'الرياضيات'),
('19', 'علوم الطبيعة و الحياة'),
('20', 'علوم الأرض و الكون'),
('21', 'علوم البيئة'),
('22', 'العلوم الإسلامية'),
('23', 'اعلام واتصال'),
('24', 'علوم انسانية'),
('25', 'دراسات لغوية'),
('26', 'علوم مالية ومحاسبة');

-- --------------------------------------------------------

--
-- Structure de la table `tabemploi`
--

DROP TABLE IF EXISTS `tabemploi`;
CREATE TABLE IF NOT EXISTS `tabemploi` (
  `iddep` varchar(2) NOT NULL,
  `idspc` varchar(2) NOT NULL,
  `idcycle` varchar(2) NOT NULL,
  `groupe` varchar(2) NOT NULL,
  `day` varchar(20) NOT NULL,
  `08:30-10:00` varchar(50) NOT NULL,
  `10:00-11:30` varchar(50) NOT NULL,
  `11:30-13:00` varchar(50) NOT NULL,
  `13:30-15:00` varchar(50) NOT NULL,
  `15:00-16:30` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `tabemploi`
--

INSERT INTO `tabemploi` (`iddep`, `idspc`, `idcycle`, `groupe`, `day`, `08:30-10:00`, `10:00-11:30`, `11:30-13:00`, `13:30-15:00`, `15:00-16:30`) VALUES
('08', '02', '02', '1', 'Sunday', 'SI TD (SAL25)', 'SI COUR (SAL14)', '', 'BDD COUR (SAL12)', ''),
('08', '02', '02', '1', 'Monday', 'BDD TP (SAL12)', '', '', '', ''),
('08', '02', '02', '1', 'Tuesday', 'alg cours sal25', '', 'BDD ', '', ''),
('08', '02', '02', '1', 'wednesday', '', '', '', '', ''),
('08', '02', '02', '1', 'Thursday', '', '', '', '', ''),
('08', '02', '01', '1', 'Sunday', 'SE cour(salle23)', 'SE TD (salle05)', '', '', ''),
('08', '02', '01', '1', 'Monday', 'Res cour (Amphi2)', '', 'Res TD(salle23)', 'Poo cour (Emphi2)', ''),
('08', '02', '01', '1', 'Tuesday', 'SE TP (info2)', 'BDD TD (salle07)', 'THL TP(info5)', 'THL Cour (Amphi)', ''),
('08', '02', '01', '1', 'wednesday', 'TP BDD (info 2)', 'TP Daw (info)', 'Res TP(info 3)', 'Daw cour (Amphi2)', ''),
('08', '02', '01', '1', 'Thursday', '', 'BDD cour (Amphi 2)', '', '', ''),
('08', '02', '01', '2', 'Sunday', 'SE cour(salle23)', 'POO TP (info2)', 'SE TD (salle23)', 'THL TP (info3)', ''),
('08', '02', '01', '2', 'Monday', 'Res cour (Amphi2)', 'TD Res (salle 23)', 'TP Daw (info 2)', 'Poo cour (Emphi2)', ''),
('08', '02', '01', '2', 'Tuesday', 'TD BDD (salle 7)', 'TP SE (info 1)', 'THL TD(salle 8)', 'THL Cour (Amphi)', ''),
('08', '02', '01', '2', 'wednesday', '', 'TP BDD (info 2)', 'TP Res (info 3)', 'Daw cour (Amphi2)', ''),
('08', '02', '01', '2', 'Thursday', '', 'BDD cour (Amphi 2)', '', '', ''),
('01', '17', '01', '1', 'Sunday', '', 'Chimie des surfaces cour ', 'Chimie des surfaces TD', 'Méthodes Physique d\'Analyses (Labo 3)', ''),
('01', '17', '01', '1', 'Monday', 'Cours Electrochimie', 'Cours Chimie quantique 2', 'Cours Cristallographie', 'TD Cristallographie', ''),
('01', '17', '01', '1', 'Tuesday', 'Cours Cristallographie', 'Cours Ethique Déontologie', 'Cours Chimie des surfaces', 'TP Electrochimie', ''),
('01', '17', '01', '1', 'wednesday', 'Cours Electrochimie', 'TD Electrochimie', 'Cours Chimie quantique 2', 'TD Chimie quantique 2', ''),
('01', '17', '01', '1', 'Thursday', '', '', 'cours  Anglais scientifique 2 a distance', '', ''),
('07', '05', '01', '3', 'Sunday', 'literature TD(salle3)', 'ESP TD(salle3)', 'written expression  Cour (Amphi D4)', 'Didactics Cour (Amphi D4)', ''),
('07', '05', '01', '3', 'Monday', 'Literature Cour(Amphi D4)', '', 'Oral expression TD(salle3)', 'Methodology TD(salle3)', ''),
('07', '05', '01', '3', 'Tuesday', '', 'Methodology Cour(Amphi D4)', 'written expression TD(salle3)', 'French cour(Amphi D4)', ''),
('07', '05', '01', '3', 'wednesday', 'civilization TD(salle3)', 'translation TD(salle3)', 'linguistics TD(salle3)', 'linguistics cour(Amphi D4)', ''),
('07', '05', '01', '3', 'Thursday', 'civilization cour(Amphi D4(', 'ICT TD (salle11)', '', '', ''),
('06', '26', '01', '1', 'Sunday', 'Cours Bio-statistiques(salle A10)', 'TP Techniques d\'analyse (Labo 12)', 'Microbiologie de l\'environnement (salle A25)', 'Microbiologie de l\'environnement (salle A25)', ''),
('06', '26', '01', '1', 'Monday', '', 'Techniques d\'analyse (salle A25)', 'TP (Mic-Ind)(Labo9)', 'TP (Mic-Ind)(Labo9)', ''),
('06', '26', '01', '1', 'Tuesday', 'Cours Bio-statistique(Amphi 2)', 'TD Qualité et sécurité alimentaire (salle A10)', 'cours Microbiologie industrielle ( salle A25)', 'cours Microbiologie industrielle ( salle A25)', ''),
('06', '26', '01', '1', 'wednesday', 'Cours Qualité et sécurité alimentaire (salle A25)', 'TD Techniques d\'analyse (salle A25)', 'Cours Microbiologie alimentaire (salle A25)', 'Cours Microbiologie alimentaire (salle A25)', ''),
('06', '26', '01', '1', 'Thursday', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `iduser` varchar(12) NOT NULL,
  `motpass` varchar(12) NOT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`iduser`, `motpass`) VALUES
('admin', 'admin');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
