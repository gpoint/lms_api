
const express = require('express');
const homeControls = require('../handlers/homeControls');
const instructorControls  = require('../handlers/instructorControls');
const adminControls = require('../handlers/adminControls');
const userControls = require('../handlers/userControls');
const courseControls = require('../handlers/courseControls');
const lessonControls = require('../handlers/lessonControls')

var router = express.Router();

/**HOME ACCESS POINTS */
//GETS
router.get('/', homeControls.index);


/**ADMIN ACCESS POINTS */
//login 
router.post('/admin/login', adminControls.login);

//admin dashboard
router.get('/admin/dashboard', adminControls.dashboard);

//assign course to user(student)
router.post('/admin/:cid-:uid', adminControls.assignCourse);

//create a new course 
router.get('/admin/course', adminControls.createCourse);

//POSTS
router.post('/admin/create', adminControls.create);

//PUTS
router.put('/admin/:adminid', adminControls.update);
//DELETES

/**INSTRUCTOR ACCESS POINTS */

//create a new instructor account
router.post('/instructor/create', instructorControls.create);

// get all registered instructors
router.get('/instructor', instructorControls.instructors);

//get instructor by ID
router.get('/instructor/:iid', instructorControls.instructor);

//get instructor by email
router.get('/instructor/:email', userControls.email)

//update instructor by id
router.put('/instructor/update', instructorControls.update);

//update a user by email
router.put('/instructor/updatebyemail', userControls.updateByEmail);

//delete instructor by id
router.delete('/instructor/:iid', instructorControls.delete);

//delete all instructors
router.delete('/instructors', userControls.deletes);


/**USER ACCESS POINTS */

//create a new user
router.post('/user/create', userControls.create);

//get all users
router.get('/user', userControls.users);

//get user by ID
router.get('/user/:id', userControls.user);

//get user by email
router.get('/user/:email', userControls.email)


//update a user by ID
router.put('/user/update', userControls.update);

//update a user by email
router.put('/user/updatebyemail', userControls.updateByEmail);

//delete user by id
router.delete('/user/:uid', userControls.delete);

//delete all users
router.delete('/users', userControls.deletes);




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