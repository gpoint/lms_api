const mongoose = require('mongoose');
const { User } = require('../models/allmodels');

module.exports = {
    //Create an instructor account 
    create: function (req, res){
        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }
        if(req.body.isInstructor === true){
        const data = req.body;
        let instructor = User(data);
        instructor._id = new mongoose.Types.ObjectId;
        instructor.setPassword(req.body.password);
    
        instructor.save().then(result => { 
            res.json({"message":"Successfully created a new instructor account",
                      "data": result
            })}).catch(err => {
            if(err) { 
                res.status(500).send({
                    "message": err.message || "Error occured while trying to create a new instructor account"
                    })
            };
        }); 
        }
    },

   //Retrieve all registered instructors
    instructors: function(req, res){ 
        User.find({ isInstructor: true }).then(data =>{
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                "message": err.message || "Error occured while trying to retrieve all instructors"
            });
        });
    },

     //Retrieve instructor by ID
    instructor: function(req, res){ 
        User.findById(req.params.iid).then(data => {
            if(!data){
                res.status(404).send({message: `Not found instructor with id ${req.params.iid}`});
            }
            else res.send(data);
        }).catch(err => {
            res.status(500).send({message: err.message || `Error occured while retrieving instructor with id: ${req.params.iid}`});
        
        });
    },
    //Retrieve instructor by Email
    email: function(req, res){ 
            User.find({email: req.params.email, isInstructor: true }).then(data => {
                if(!data){
                    res.status(404).send({message: `Not found instructor with email ${res.params.email}`})
                }
                else res.send(data)
            }).catch(err => {
                res.status(500).send({"message": err.message || `Error occured while retrieving instructor with email: ${req.params.email}`});
            });
    },

    //Update instructor by id
    update: function(req, res){ 
        let id = req.body.id;
        if(!req.body){
            return res.status(400).send({
                message: "Data to update can not be empty"
            });

        }
        User.findByIdAndUpdate(id, req.body, { useFindAndModify: false}).then(data => {
            if(!data){
                res.status(404).send({
                    message: `Cannot update instructor with id: ${id}. Maybe instructor is not found`
                });
            }
            else res.send({message: "Instructor was updated successfully"});
        }).catch(err => {
            res.status(500).send({"message": err.message || `Error occured while updating instructor with id: ${id}`});
        });
    },

    //Update instructor by email
    updateByEmail: function(req, res){
        let email = req.body.email
        User.findOneAndUpdate({email: email, isInstructor: true }, req.body).then(data => {
            if(!data){
                res.status(404).send({
                    message: `Cannot update instructor with email: ${email}. Maybe instructor is not found`
                });
            }
            else res.send({message: "instructor was updated successfully"});
        }).catch(err => {
            res.status(500).send({"message": err.message || `Error occured while updating instructor with email: ${email}`})
        })
    },

    //Delete instructor by id
    delete: function(req, res){ 
        let id = req.params.iid;
        User.findByIdAndRemove(id).then(data => {
            if(!data){
                res.status(404).send({
                    message: `Cannot delete instructor with id: ${id}, Maybe instructor was not found! `
                });
            }
        }).catch(err => {
            res.status(500).send({
                "message": err.message || `Could not delete instructor with id: ${id}`
            });
        });
    },

    //Delete all instructors
    deletes: function(req, res){
        User.deleteMany({isInstructor: true }).then(data => {
            res.send({
                message: `${data.deletedCount} Instructors were deleted successfuly`
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while deleting all instructors"
            });
        });
    },

    //Create question
    createQuestion: function(req, res){

    },

    //Upload course materials (pdf, docx, jpg, xlsx, png, gif, pptx, links, videos, text)
    uploads: function(req, res){
        
    },

    //Create report
    reports: function(req, res){

    },

    //Schedule a class
    schedule: function(req, res){

    },

    //Assign project to user (student)
    project: function(req, res){

    },
    //Assessment of student
    assess: function(req, res){

    }, 

    //Rate user(student)
    rate: function(req, res){

    }
}
