

const mongoose = require('mongoose');
const { User } = require('../models/allmodels');


module.exports = {
    
    login: function (req, res, next){res.send("User login is working");},

    dashboard: function (req, res, next){res.send("User dashboard is working");},

    create: function(req, res, next){ 
        const data = req.body;
        let user = User(data);
        user._id = new mongoose.Types.ObjectId;
        user.setPassword(req.body.password);
    
        user.save().then(result => { 
            res.json({"message":"Successfully saved"}) }).catch(error => {
            if(error) { 
                res.send(error.message);
            };
        }); next();
    },

    update: function(req, res, next){ res.send("User update is working");},

    delete: function(req, res, next){ res.send("User delete is working");}

}