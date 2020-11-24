
const express = require('express');
const homeControls = require('../handlers/homeControls');
const adminControls = require('../handlers/adminControls');
const instructorControls = require('../handlers/instructorControls');
const userControls = require('../handlers/userControls');
const courseControls = require('../handlers/courseControls');
const lessonControls = require('../handlers/lessonControls')

var router = express.Router();

/**HOME ACCESS POINTS */
//GETS
router.get('/', homeControls.index);


/**ADMIN ACCESS POINTS */
//GETS
router.get('/admin/login', adminControls.login);
router.get('/admin/dashboard', adminControls.dashboard);

//POSTS
router.post('/admin/create', instructorControls.create);

//PUTS
router.put('/admin/:adminid', instructorControls.update);
//DELETES

/**INSTRUCTOR ACCESS POINTS */
//GETS
router.get('/instructor/login', instructorControls.login);
router.get('/instructor/dashboard', instructorControls.dashboard);

//POSTS
router.post('/instructor/create', instructorControls.create);

//PUTS
router.put('/instructor/:iid', instructorControls.update);

//DELETES
router.delete('/instructor/:iid', instructorControls.delete);

/**USER ACCESS POINTS */
//GETS
router.get('/user/login', userControls.login);
router.get('/user/dashboard', userControls.dashboard);

//POSTS
router.post('/user/create', userControls.create);

//PUTS
router.put('/user/:uid', userControls.update);

//DELETES
router.delete('/user/:uid', userControls.delete);

/**COURSE ACCESS POINTS */
//GETS
router.get('/course/login', courseControls.login);
router.get('/course/dashboard', courseControls.dashboard);

//POSTS
router.post('/course/create', courseControls.create);

//PUTS
router.put('/course/:cid', courseControls.update);

//DELETES
router.delete('/course/:cid', courseControls.delete);


/**LESSON ACCESS POINTS */
//GETS
router.get('/lesson/login', lessonControls.login);
router.get('/lesson/dashboard', lessonControls.dashboard);

//POSTS
router.post('/lesson/create', lessonControls.create);

//PUTS
router.put('/lesson/:lid', lessonControls.update);

//DELETES
router.delete('/lesson/:lid', lessonControls.delete);

module.exports = router;