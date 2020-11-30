

const mongoose = require('mongoose');
const { User } = require('../models/allmodels');

//Create retrieve update and delete handlers

module.exports = {

    //Create user
    create: function(req, res){ 
        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }
        const data = req.body;
        let user = User(data);
        user._id = new mongoose.Types.ObjectId;
        user.setPassword(req.body.password);
    
        user.save().then(result => { 
            res.json({"message":"Successfully saved",
                      "Data": result
            }) }).catch(err => {
            if(err) { 
                res.status(500).send({
                    "message": err.message || "Error occured while trying to create a user"
                    })
            };
        }); 
    },

    //Retrieve all users
    users: function(req, res){
        User.find({}).then(data =>{
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                "message": err.message || "Error occured while trying to retrieve all users"
            });
    });},

    //Retrieve user by ID
    user: function(req, res){
        User.findById(req.params.id).then(data => {
            if(!data){
                res.status(404).send({message: `Not found user with id ${req.params.id}`});
            }
            else res.send(data);
        }).catch(err => {
            res.status(500).send({message: err.message || `Error occured while retrieving user with id: ${req.params.id}`});
        
        });
        
    },

    //Retrieve user by Email
    email: function (req, res){
        User.find({email: req.query.email}).then(data => {
            if(!data){
                res.status(404).send({message: `Not found user with id ${res.query.email}`})
            }
            else res.send(data)
        }).catch(err => {
            res.status(500).send({message: `Error occured while retrieving user with email: ${req.query.email}`});
        });
        
    },
    //Update user by id
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
                    message: `Cannot update User with id: ${id}. Maybe User is not found`
                });
            }
            else res.send({message: "User was updated successfully"});
        }).catch(err => {
            res.status(500).send({message: `Error updating User with id: ${id}`});
        });
    },
    //Update user by email
    updateByEmail: function(req, res){
        let email = req.body.email
        User.findOneAndUpdate({email: email}, req.body).then(data => {
            if(!data){
                res.status(404).send({
                    message: `Cannot update user with email: ${email}. Maybe User is not found`
                });
            }
            else res.send({message: "User was updated successfully"});
        }).catch(err => {
            res.status(500).send({message: `Error updating user with email: ${email}`})
        })
    },

    delete: function(req, res){ 
        let id = req.params.id;

        User.findByIdAndRemove(id).then(data => {
            if(!data){
                res.status(404).send({
                    message: `Cannot delete User with id: ${id}, Maybe User was not found! `
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: `Could not delete User with id: ${id}`
            });
        });
    },

    deletes: function(req, res){
        User.deleteMany({}).then(data => {
            res.send({
                message: `${data.deletedCount} Users were deleted successfuly`
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while removing all Users"
            });
        });
    }

}