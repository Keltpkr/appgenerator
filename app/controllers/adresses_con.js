var Adresses = require('../collections/adresses_col').Collection;
var Adress = require('../models/adress_mod').Model;

module.exports = {
	getAdress: function (req, res, next) {
       Adress.forge({ id: req.params.id })
		.fetch({withRelated: ['countries','users'], require: true})
		.then(function (model) {
		    res.json(model);
		})
		.catch(function (error) {
			res.status(500).json({errormsg: error.message});
		});
	},
   getAdresses: function (req, res, next) {
        Adresses.forge()
		.fetch({withRelated: ['countries','users'], require: true})
		.then(function (model) {
            res.json(model);
		})
		.catch(function (error) {
			res.status(500).json({errormsg: error.message});
		});
	},
   addAdress: function (req, res, next) {
       Adress.forge(req.body)
		.save()
		.then(function (model) {
           res.json(model);
        })
		.catch(function (error) {
            res.status(500).json({errormsg: error.message});
        });
	},
    delAdress: function (req, res, next) {
        Adress.forge({ id: req.params.id })
		.destroy()
		.then(function (model) {
          res.json([{id:req.params.id}]);
        })
		.catch(function (error) {
            res.status(500).json({errormsg: error.message});
         });
	},
    updateAdress: function (req, res, next) {
        Adress.forge({ id: req.params.id })
		.save(req.body, { method: 'update' })
		.then(function (model) {
           res.json(model);
        })
		.catch(function (error) {
            res.status(500).json({errormsg: error.message});
       });
	},
}
