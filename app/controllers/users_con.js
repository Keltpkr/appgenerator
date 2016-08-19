var Users = require('../collections/users_col').Collection;
var User = require('../models/user_mod').Model;

module.exports = {
	getUser: function (req, res, next) {
       User.forge({ id: req.params.id })
		.fetch({withRelated: ['adresses','emails','groups','phones','countries'], require: true})
		.then(function (model) {
		    res.json(model);
		})
		.catch(function (error) {
			res.status(500).json({errormsg: error.message});
		});
	},
   getUsers: function (req, res, next) {
        Users.forge()
		.fetch({withRelated: ['adresses','emails','groups','phones','countries'], require: true})
		.then(function (model) {
            res.json(model);
		})
		.catch(function (error) {
			res.status(500).json({errormsg: error.message});
		});
	},
   addUser: function (req, res, next) {
       User.forge(req.body)
		.save()
		.then(function (model) {
           res.json(model);
        })
		.catch(function (error) {
            res.status(500).json({errormsg: error.message});
        });
	},
    delUser: function (req, res, next) {
        User.forge({ id: req.params.id })
		.destroy()
		.then(function (model) {
          res.json([{id:req.params.id}]);
        })
		.catch(function (error) {
            res.status(500).json({errormsg: error.message});
         });
	},
    updateUser: function (req, res, next) {
        User.forge({ id: req.params.id })
		.save(req.body, { method: 'update' })
		.then(function (model) {
           res.json(model);
        })
		.catch(function (error) {
            res.status(500).json({errormsg: error.message});
       });
	},
}
