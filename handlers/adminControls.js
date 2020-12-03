const mongoose = require('mongoose');
const { Redirect } = require('react-router-dom');
const { User } = require('../models/allmodels');
const { Course } = require('../models/allmodels');


module.exports = {
    
    login: function (req, res){
        //authenticate admin then redirect to dashboard if credential is valid  

        redirect(303, '/api/admin/dashboard');
    },

    dashboard: function (req, res){
        
    },

    //Create a course
    createCourse: function(req, res){

    },

    //Retrieve all registered courses
    courses: function(req, res){

    },

    //Delete a course
    deleteCourse: function(req, res){

    },

    //Assign a course to a user(student)
    assignCourse: function(req, res){

    },

    //Assign user(student) to user(instructor)
    assignInstructor: function(req, res){
        
    },


}