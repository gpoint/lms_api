
module.exports = {
    
    login: function (req, res, next){res.send("Instructor login is working");},

    dashboard: function (req, res, next){res.send("Instructor dashboard is working");},

    create: function(req, res, next){ res.send("Instructor create is working");},

    update: function(req, res, next){ res.send("Instructor update is working");},

    delete: function(req, res, next){ res.send("Instructor delete is working");}

}