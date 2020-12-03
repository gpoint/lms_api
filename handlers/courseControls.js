
module.exports = {
    
    login: function (req, res, next){res.send("Course login is working");},

    dashboard: function (req, res, next){res.send("Course dashboard is working");},

    create: function(req, res, next){ res.send("Course create is working");},

    update: function(req, res, next){ res.send("Course update is working");},

    delete: function(req, res, next){ res.send("Course delete is working");}

}