module.exports = {
    
    login: function (req, res, next){res.send("Lesson login is working");},

    dashboard: function (req, res, next){res.send("Lesson dashboard is working");},

    create: function(req, res, next){ res.send("Lesson create is working");},

    update: function(req, res, next){ res.send("Lesson update is working");},

    delete: function(req, res, next){ res.send("Lesson delete is working");}
}