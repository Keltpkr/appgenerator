var Countries = require('../collections/countries_col').Collection;
var Country = require('../models/country_mod').Model;

module.exports = {
	getCountry: function (req, res, next) {
       Country.forge({ id: req.params.id })
		.fetch({withRelated: ['adresses','users'], require: true})
		.then(function (model) {
		    res.json(model);
		})
		.catch(function (error) {
			res.status(500).json({errormsg: error.message});
		});
	},
   getCountries: function (req, res, next) {
        Countries.forge()
		.fetch({withRelated: ['adresses','users'], require: true})
		.then(function (model) {
            res.json(model);
		})
		.catch(function (error) {
			res.status(500).json({errormsg: error.message});
		});
	},
   addCountry: function (req, res, next) {
       Country.forge(req.body)
		.save()
		.then(function (model) {
           res.json(model);
        })
		.catch(function (error) {
            res.status(500).json({errormsg: error.message});
        });
	},
    delCountry: function (req, res, next) {
        Country.forge({ id: req.params.id })
		.destroy()
		.then(function (model) {
          res.json([{id:req.params.id}]);
        })
		.catch(function (error) {
            res.status(500).json({errormsg: error.message});
         });
	},
    updateCountry: function (req, res, next) {
        Country.forge({ id: req.params.id })
		.save(req.body, { method: 'update' })
		.then(function (model) {
           res.json(model);
        })
		.catch(function (error) {
            res.status(500).json({errormsg: error.message});
       });
	},
}
