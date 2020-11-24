

module.exports = {
    login: function (req, res, next){res.send("Admin Logins page is working");},

    dashboard: function (req, res, next){res.send("Admin dashboard is working");},

    create: function(req, res, next){ res.send("Admin create is working");},

    update: function(req, res, next){ res.send("Admin update is working");},

    delete: function(req, res, next){ res.send("Admin delete is working");}
}
