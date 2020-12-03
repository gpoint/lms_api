
const express = require('express');
const homectrls = require('../controllers/homectrl');

var router = express.Router();

//Home Access Point
router.get('/', homectrls.home);

//Admin Access Points
 //router.get('/admin', adminCtrls);

 //Instructor Access Points
 //router.get('/instructor'dd, instructorCtrls);

 //User Access Points
 //router.get('/user', userCtrls);

 //Course Access Points
 //router.get('/course', courseCtrls);

//Lesson Access Points
 //router.get('/lesson', lessonCtrls);


module.exports = router;