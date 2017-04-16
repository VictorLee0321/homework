-- MySQL dump 10.13  Distrib 5.6.31, for Linux (x86_64)
--
-- Host: localhost    Database: homework
-- ------------------------------------------------------
-- Server version	5.6.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `anonymous_admin`
--

DROP TABLE IF EXISTS `anonymous_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anonymous_admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(50) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anonymous_admin`
--

LOCK TABLES `anonymous_admin` WRITE;
/*!40000 ALTER TABLE `anonymous_admin` DISABLE KEYS */;
INSERT INTO `anonymous_admin` VALUES (1,'vic');
/*!40000 ALTER TABLE `anonymous_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anonymous_clazz`
--

DROP TABLE IF EXISTS `anonymous_clazz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anonymous_clazz` (
  `clazz_id` varchar(20) NOT NULL,
  `clazz_name` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `university` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `major` varchar(50) NOT NULL,
  `entrance` date NOT NULL,
  `graduation` date NOT NULL,
  PRIMARY KEY (`clazz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anonymous_clazz`
--

LOCK TABLES `anonymous_clazz` WRITE;
/*!40000 ALTER TABLE `anonymous_clazz` DISABLE KEYS */;
INSERT INTO `anonymous_clazz` VALUES ('computer152','计算机152','四川省','电子科技大学','计算机学院','计算机应用与科学','2015-09-01','2019-06-30'),('software133','软工133','广东省','中山大学','软件学院','软件工程','2013-09-01','2017-06-30'),('test1','测试班级1','Tokyo','Tokyo_University','FBI','movies','2013-09-01','2019-06-30'),('test_class','测试班级','test_province','test_university','test_department','test_major','2013-09-01','2017-06-30'),('tongji131','统计131','广东省','仲恺农业工程学院','计算科学学院','统计学','2013-09-01','2017-06-30'),('tongji132','统计132','广东省','仲恺农业工程学院','计算科学学院','统计学','2013-09-01','2017-06-30'),('tumu141','土木141','广东省','仲恺农业工程学院','城市建设学院','土木工程','2014-09-01','2018-06-30'),('xinji131','信计131','广东省','仲恺农业工程学院','计算科学学院','信息与计算科学','2013-09-01','2017-06-30'),('xinji132','信计132','广东省','仲恺农业工程学院','计算科学学院','信息与计算科学','2013-09-01','2017-06-30'),('xinji133','信计133','广东省','仲恺农业工程学院','计算科学学院','信息与计算科学','2013-09-01','2017-06-30'),('xinji134','信计134','广东省','仲恺农业工程学院','计算科学学院','信息与计算科学','2013-09-01','2017-06-30'),('xinji135','信计135','北京市','仲大','计算科学学院','信息与计算科学','2013-09-01','2017-06-30');
/*!40000 ALTER TABLE `anonymous_clazz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anonymous_course`
--

DROP TABLE IF EXISTS `anonymous_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anonymous_course` (
  `course_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(50) NOT NULL,
  `teach_year` date NOT NULL,
  `term` int(11) NOT NULL,
  `clazz_id_id` varchar(20) NOT NULL,
  `teacher_id_id` varchar(20) NOT NULL,
  PRIMARY KEY (`course_id`),
  KEY `anonymous_cours_clazz_id_id_23777d79_fk_anonymous_clazz_clazz_id` (`clazz_id_id`),
  KEY `anonymous_teacher_id_id_dc876697_fk_anonymous_teacher_teacher_id` (`teacher_id_id`),
  CONSTRAINT `anonymous_cours_clazz_id_id_23777d79_fk_anonymous_clazz_clazz_id` FOREIGN KEY (`clazz_id_id`) REFERENCES `anonymous_clazz` (`clazz_id`),
  CONSTRAINT `anonymous_teacher_id_id_dc876697_fk_anonymous_teacher_teacher_id` FOREIGN KEY (`teacher_id_id`) REFERENCES `anonymous_teacher` (`teacher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anonymous_course`
--

LOCK TABLES `anonymous_course` WRITE;
/*!40000 ALTER TABLE `anonymous_course` DISABLE KEYS */;
INSERT INTO `anonymous_course` VALUES (4,'测试课程1','2017-04-08',1,'test1','teacher001'),(6,'测试课程2','2016-09-01',1,'test1','teacher001'),(7,'soft_exppppppppppppppppppppppppppppppppppppppppppp','2017-04-13',2,'software133','tc0'),(8,'test_course_1','2016-09-01',1,'test_class','test_teacher'),(9,'test_course_2','2015-09-01',1,'test_class','test_teacher'),(10,'测试课程3','2014-09-01',1,'test_class','test_teacher'),(11,'测试课程2','2015-09-01',1,'test_class','test_teacher');
/*!40000 ALTER TABLE `anonymous_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anonymous_emails`
--

DROP TABLE IF EXISTS `anonymous_emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anonymous_emails` (
  `email` varchar(254) NOT NULL,
  `check_code` varchar(6) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anonymous_emails`
--

LOCK TABLES `anonymous_emails` WRITE;
/*!40000 ALTER TABLE `anonymous_emails` DISABLE KEYS */;
INSERT INTO `anonymous_emails` VALUES ('1@qq.com','1'),('82@qq.com','251739'),('871686762@qq.com','313313'),('8716@qq.com','175189'),('9527@gg.cn','9527'),('ljklj@qq.com','462049'),('st0@s.com','701894'),('test1@t1.t1','270448'),('test@test.cn','test'),('vic@vi.com','793677');
/*!40000 ALTER TABLE `anonymous_emails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anonymous_finish`
--

DROP TABLE IF EXISTS `anonymous_finish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anonymous_finish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `submit_time` datetime NOT NULL,
  `is_overtime` tinyint(1) NOT NULL,
  `file_path` varchar(300) NOT NULL,
  `student_id_id` varchar(20) NOT NULL,
  `task_id_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `anonymous_student_id_id_dcd772db_fk_anonymous_student_student_id` (`student_id_id`),
  KEY `anonymous_finish_task_id_id_81bfebe4_fk_anonymous_task_task_id` (`task_id_id`),
  CONSTRAINT `anonymous_finish_task_id_id_81bfebe4_fk_anonymous_task_task_id` FOREIGN KEY (`task_id_id`) REFERENCES `anonymous_task` (`task_id`),
  CONSTRAINT `anonymous_student_id_id_dcd772db_fk_anonymous_student_student_id` FOREIGN KEY (`student_id_id`) REFERENCES `anonymous_student` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anonymous_finish`
--

LOCK TABLES `anonymous_finish` WRITE;
/*!40000 ALTER TABLE `anonymous_finish` DISABLE KEYS */;
INSERT INTO `anonymous_finish` VALUES (1,'2017-04-08 15:03:33',0,'/data/vic/aaa','201321314300',2),(32,'2017-04-14 20:17:11',0,'','1',3),(51,'2017-04-15 10:19:53',1,'','1',4),(54,'2017-04-15 17:53:00',1,'','1',7),(57,'2017-04-15 23:10:13',0,'','1',2),(59,'2017-04-16 13:33:28',1,'','9527',8),(60,'2017-04-16 13:33:40',0,'','9527',9);
/*!40000 ALTER TABLE `anonymous_finish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anonymous_student`
--

DROP TABLE IF EXISTS `anonymous_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anonymous_student` (
  `student_id` varchar(20) NOT NULL,
  `student_name` varchar(50) NOT NULL,
  `sex` int(11) NOT NULL,
  `clazz_id_id` varchar(20) NOT NULL,
  PRIMARY KEY (`student_id`),
  KEY `anonymous_stude_clazz_id_id_8e01bdef_fk_anonymous_clazz_clazz_id` (`clazz_id_id`),
  CONSTRAINT `anonymous_stude_clazz_id_id_8e01bdef_fk_anonymous_clazz_clazz_id` FOREIGN KEY (`clazz_id_id`) REFERENCES `anonymous_clazz` (`clazz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anonymous_student`
--

LOCK TABLES `anonymous_student` WRITE;
/*!40000 ALTER TABLE `anonymous_student` DISABLE KEYS */;
INSERT INTO `anonymous_student` VALUES ('001','测试1',1,'xinji133'),('1','一',1,'test1'),('2','二',1,'software133'),('201321314300','victor李',1,'xinji133'),('9527','测试学生',1,'test_class'),('test_student','测试学生',1,'test_class');
/*!40000 ALTER TABLE `anonymous_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anonymous_task`
--

DROP TABLE IF EXISTS `anonymous_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anonymous_task` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `task_name` varchar(50) NOT NULL,
  `last_time` datetime NOT NULL,
  `issue_time` datetime NOT NULL,
  `begin_remind` int(11) NOT NULL,
  `course_id_id` int(11) NOT NULL,
  PRIMARY KEY (`task_id`),
  KEY `anonymous_ta_course_id_id_b6c881e2_fk_anonymous_course_course_id` (`course_id_id`),
  CONSTRAINT `anonymous_ta_course_id_id_b6c881e2_fk_anonymous_course_course_id` FOREIGN KEY (`course_id_id`) REFERENCES `anonymous_course` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anonymous_task`
--

LOCK TABLES `anonymous_task` WRITE;
/*!40000 ALTER TABLE `anonymous_task` DISABLE KEYS */;
INSERT INTO `anonymous_task` VALUES (2,'test_task1','2017-04-17 17:37:59','2017-04-08 14:57:10',3,4),(3,'test_task2','2017-04-26 08:33:45','2017-04-13 08:33:53',3,4),(4,'test_task3','2017-04-13 08:34:08','2017-04-13 08:34:11',2,4),(5,'test_task','2017-04-30 08:34:46','2017-04-13 08:34:50',2,6),(6,'test_task3','2017-05-01 08:35:15','2017-04-13 08:35:46',2,6),(7,'test_task_long_long_long_long_long_long_long_long','2017-04-13 20:05:53','2017-04-13 09:09:18',2,4),(8,'测试作业1','2017-04-16 13:29:05','2017-04-16 13:29:13',2,8),(9,'测试作业2','2018-04-16 13:29:24','2017-04-16 13:29:32',3,8),(10,'测试作业3','2017-07-16 13:29:50','2017-04-16 13:29:54',5,8),(11,'test_task1','2017-04-16 13:30:11','2017-04-16 13:30:14',5,9),(12,'测试作业4','2017-08-16 17:57:34','2017-04-16 17:57:41',3,8);
/*!40000 ALTER TABLE `anonymous_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anonymous_teacher`
--

DROP TABLE IF EXISTS `anonymous_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anonymous_teacher` (
  `teacher_id` varchar(20) NOT NULL,
  `teacher_name` varchar(50) NOT NULL,
  `sex` int(11) NOT NULL,
  PRIMARY KEY (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anonymous_teacher`
--

LOCK TABLES `anonymous_teacher` WRITE;
/*!40000 ALTER TABLE `anonymous_teacher` DISABLE KEYS */;
INSERT INTO `anonymous_teacher` VALUES ('tc0','贾老师',0),('teacher001','凌凌依',0),('test_teacher','测试老师',1),('test_teacher001','凌凌依',0);
/*!40000 ALTER TABLE `anonymous_teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anonymous_user`
--

DROP TABLE IF EXISTS `anonymous_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anonymous_user` (
  `account` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role` int(11) NOT NULL,
  `role_id` varchar(20) NOT NULL,
  `email` varchar(254) NOT NULL,
  `register_time` datetime NOT NULL,
  `validate_code` varchar(32) NOT NULL,
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anonymous_user`
--

LOCK TABLES `anonymous_user` WRITE;
/*!40000 ALTER TABLE `anonymous_user` DISABLE KEYS */;
INSERT INTO `anonymous_user` VALUES ('1','1',2,'1','1@qq.com','2017-04-12 13:07:20','1'),('2','2',2,'1','1@qq.com','2017-04-12 13:08:42','1'),('3','1',2,'1','1@qq.com','2017-04-12 13:11:28','1'),('gg','gg',2,'9527','9527@gg.cn','2017-04-16 18:30:12','9527'),('s0','1',2,'201321314300','s0@s0.s0','2017-04-08 14:23:19','001'),('s00','22',2,'201321314300','st0@s.com','2017-04-12 13:02:10','701894'),('st0','123',2,'001','st0@s.com','2017-04-10 15:23:13','701894'),('tc0','123f',1,'tc0','st0@s.com','2017-04-10 15:34:02','701894'),('test','test',2,'test_student','test@test.cn','2017-04-16 13:24:53','test');
/*!40000 ALTER TABLE `anonymous_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissi_permission_id_84c5c92e_fk_auth_permission_id` (`permission_id`),
  CONSTRAINT `auth_group_permissi_permission_id_84c5c92e_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permissi_content_type_id_2f476e4b_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can add permission',2,'add_permission'),(5,'Can change permission',2,'change_permission'),(6,'Can delete permission',2,'delete_permission'),(7,'Can add user',3,'add_user'),(8,'Can change user',3,'change_user'),(9,'Can delete user',3,'delete_user'),(10,'Can add group',4,'add_group'),(11,'Can change group',4,'change_group'),(12,'Can delete group',4,'delete_group'),(13,'Can add content type',5,'add_contenttype'),(14,'Can change content type',5,'change_contenttype'),(15,'Can delete content type',5,'delete_contenttype'),(16,'Can add session',6,'add_session'),(17,'Can change session',6,'change_session'),(18,'Can delete session',6,'delete_session'),(19,'Can add admin',7,'add_admin'),(20,'Can change admin',7,'change_admin'),(21,'Can delete admin',7,'delete_admin'),(22,'Can add user',8,'add_user'),(23,'Can change user',8,'change_user'),(24,'Can delete user',8,'delete_user'),(25,'Can add task',9,'add_task'),(26,'Can change task',9,'change_task'),(27,'Can delete task',9,'delete_task'),(28,'Can add finish',10,'add_finish'),(29,'Can change finish',10,'change_finish'),(30,'Can delete finish',10,'delete_finish'),(31,'Can add teacher',11,'add_teacher'),(32,'Can change teacher',11,'change_teacher'),(33,'Can delete teacher',11,'delete_teacher'),(34,'Can add student',12,'add_student'),(35,'Can change student',12,'change_student'),(36,'Can delete student',12,'delete_student'),(37,'Can add course',13,'add_course'),(38,'Can change course',13,'change_course'),(39,'Can delete course',13,'delete_course'),(40,'Can add clazz',14,'add_clazz'),(41,'Can change clazz',14,'change_clazz'),(42,'Can delete clazz',14,'delete_clazz'),(43,'Can add emails',15,'add_emails'),(44,'Can change emails',15,'change_emails'),(45,'Can delete emails',15,'delete_emails');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$30000$bamMvAFenlV4$vSWuQWy93UrMYe9myeakecTi/6BrCH6b3od8A7zKCDI=','2017-04-08 13:47:50',1,'admin','','','admin@admin.com',1,1,'2017-04-08 13:47:48');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_perm_permission_id_1fbb5f2c_fk_auth_permission_id` (`permission_id`),
  CONSTRAINT `auth_user_user_perm_permission_id_1fbb5f2c_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin__content_type_id_c4bce8eb_fk_django_content_type_id` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin__content_type_id_c4bce8eb_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2017-04-08 14:09:25','1','Admin object',1,'[{\"added\": {}}]',7,1),(2,'2017-04-08 14:21:10','201321314300','201321314300',1,'[{\"added\": {}}]',12,1),(3,'2017-04-08 14:21:56','teacher001','teacher001',1,'[{\"added\": {}}]',11,1),(4,'2017-04-08 14:23:19','s0','User object',1,'[{\"added\": {}}]',8,1),(5,'2017-04-08 14:32:56','test1','test1',1,'[{\"added\": {}}]',14,1),(6,'2017-04-08 14:37:58','4','4 测试课程1',1,'[{\"added\": {}}]',13,1),(7,'2017-04-08 14:50:34','6','6_测试课程2',1,'[{\"added\": {}}]',13,1),(8,'2017-04-08 14:52:40','test_teacher001','test_teacher001',2,'[{\"changed\": {\"fields\": [\"teacher_id\"]}}]',11,1),(9,'2017-04-08 14:57:10','2','2:test_task1',1,'[{\"added\": {}}]',9,1),(10,'2017-04-08 15:03:33','1','Finish object',1,'[{\"added\": {}}]',10,1),(11,'2017-04-10 15:10:36','001','001_测试1',1,'[{\"added\": {}}]',12,1),(12,'2017-04-10 15:26:23','tc0','tc0_贾老师',1,'[{\"added\": {}}]',11,1),(13,'2017-04-12 13:06:04','1','1_1',1,'[{\"added\": {}}]',12,1),(14,'2017-04-12 13:06:35','1@qq.com','1@qq.com',1,'[{\"added\": {}}]',15,1),(15,'2017-04-13 08:33:53','3','3_test_task2',1,'[{\"added\": {}}]',9,1),(16,'2017-04-13 08:34:11','4','4_test_task3',1,'[{\"added\": {}}]',9,1),(17,'2017-04-13 08:34:50','5','5_test_task',1,'[{\"added\": {}}]',9,1),(18,'2017-04-13 08:35:46','6','6_test_task3',1,'[{\"added\": {}}]',9,1),(19,'2017-04-13 09:09:18','7','7_test_task_long_long_long_long_long_long_long_long',1,'[{\"added\": {}}]',9,1),(20,'2017-04-13 09:11:21','7','7_soft_exppppppppppppppppppppppppppppppppppppppppppp',1,'[{\"added\": {}}]',13,1),(21,'2017-04-13 11:23:20','1','1_一',2,'[{\"changed\": {\"fields\": [\"student_name\"]}}]',12,1),(22,'2017-04-13 11:24:58','1','1_一',2,'[{\"changed\": {\"fields\": [\"clazz_id\"]}}]',12,1),(23,'2017-04-14 03:35:16','2','2_二',1,'[{\"added\": {}}]',12,1),(24,'2017-04-14 17:37:37','2','2_test_task1',2,'[{\"changed\": {\"fields\": [\"last_time\"]}}]',9,1),(25,'2017-04-14 17:38:01','2','2_test_task1',2,'[{\"changed\": {\"fields\": [\"last_time\"]}}]',9,1),(26,'2017-04-14 20:05:56','7','7_test_task_long_long_long_long_long_long_long_long',2,'[{\"changed\": {\"fields\": [\"last_time\"]}}]',9,1),(27,'2017-04-16 13:21:55','test_class','test_class',1,'[{\"added\": {}}]',14,1),(28,'2017-04-16 13:23:17','test_student','test_student',1,'[{\"added\": {}}]',12,1),(29,'2017-04-16 13:24:42','test@test.cn','test@test.cn',1,'[{\"added\": {}}]',15,1),(30,'2017-04-16 13:24:53','test','test',1,'[{\"added\": {}}]',8,1),(31,'2017-04-16 13:25:58','test_teacher','test_teacher',1,'[{\"added\": {}}]',11,1),(32,'2017-04-16 13:26:20','8','8',1,'[{\"added\": {}}]',13,1),(33,'2017-04-16 13:26:38','9','9',1,'[{\"added\": {}}]',13,1),(34,'2017-04-16 13:27:24','10','10',1,'[{\"added\": {}}]',13,1),(35,'2017-04-16 13:27:38','11','11',1,'[{\"added\": {}}]',13,1),(36,'2017-04-16 13:29:13','8','8',1,'[{\"added\": {}}]',9,1),(37,'2017-04-16 13:29:32','9','9',1,'[{\"added\": {}}]',9,1),(38,'2017-04-16 13:29:54','10','10',1,'[{\"added\": {}}]',9,1),(39,'2017-04-16 13:30:14','11','11',1,'[{\"added\": {}}]',9,1),(40,'2017-04-16 13:32:39','9527','9527',2,'[{\"changed\": {\"fields\": [\"student_id\"]}}]',12,1),(41,'2017-04-16 17:57:41','12','12',1,'[{\"added\": {}}]',9,1),(42,'2017-04-16 18:30:04','9527@gg.cn','9527@gg.cn',1,'[{\"added\": {}}]',15,1),(43,'2017-04-16 18:30:12','gg','gg',1,'[{\"added\": {}}]',8,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(7,'anonymous','admin'),(14,'anonymous','clazz'),(13,'anonymous','course'),(15,'anonymous','emails'),(10,'anonymous','finish'),(12,'anonymous','student'),(9,'anonymous','task'),(11,'anonymous','teacher'),(8,'anonymous','user'),(4,'auth','group'),(2,'auth','permission'),(3,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2017-04-08 13:45:11'),(2,'auth','0001_initial','2017-04-08 13:45:12'),(3,'admin','0001_initial','2017-04-08 13:45:12'),(4,'admin','0002_logentry_remove_auto_add','2017-04-08 13:45:12'),(5,'anonymous','0001_initial','2017-04-08 13:45:14'),(6,'contenttypes','0002_remove_content_type_name','2017-04-08 13:45:14'),(7,'auth','0002_alter_permission_name_max_length','2017-04-08 13:45:14'),(8,'auth','0003_alter_user_email_max_length','2017-04-08 13:45:14'),(9,'auth','0004_alter_user_username_opts','2017-04-08 13:45:14'),(10,'auth','0005_alter_user_last_login_null','2017-04-08 13:45:14'),(11,'auth','0006_require_contenttypes_0002','2017-04-08 13:45:14'),(12,'auth','0007_alter_validators_add_error_messages','2017-04-08 13:45:14'),(13,'auth','0008_alter_user_username_max_length','2017-04-08 13:45:14'),(14,'sessions','0001_initial','2017-04-08 13:45:14'),(15,'anonymous','0002_emails','2017-04-09 15:08:05');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_de54fa62` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('pabqk2mqlyk0h89svqkacmza89xr9avl','YjkzZmM2ZDdlZjk3MGMwZmI3YjFlN2U0MDEwMjhlMGZiM2M0YThkYzp7Il9hdXRoX3VzZXJfaGFzaCI6ImVmZjM4YWNjOTU0NzEzNTNkNDlkZWFkZGFkNDMzYjE3YmIyYmJmZGYiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=','2017-04-22 13:47:50');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-16 22:33:41
