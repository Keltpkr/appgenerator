var Phones = require('../collections/phones_col').Collection;
var Phone = require('../models/phone_mod').Model;

module.exports = {
	getPhone: function (req, res, next) {
       Phone.forge({ id: req.params.id })
		.fetch({withRelated: ['users'], require: true})
		.then(function (model) {
		    res.json(model);
		})
		.catch(function (error) {
			res.status(500).json({errormsg: error.message});
		});
	},
   getPhones: function (req, res, next) {
        Phones.forge()
		.fetch({withRelated: ['users'], require: true})
		.then(function (model) {
            res.json(model);
		})
		.catch(function (error) {
			res.status(500).json({errormsg: error.message});
		});
	},
   addPhone: function (req, res, next) {
       Phone.forge(req.body)
		.save()
		.then(function (model) {
           res.json(model);
        })
		.catch(function (error) {
            res.status(500).json({errormsg: error.message});
        });
	},
    delPhone: function (req, res, next) {
        Phone.forge({ id: req.params.id })
		.destroy()
		.then(function (model) {
          res.json([{id:req.params.id}]);
        })
		.catch(function (error) {
            res.status(500).json({errormsg: error.message});
         });
	},
    updatePhone: function (req, res, next) {
        Phone.forge({ id: req.params.id })
		.save(req.body, { method: 'update' })
		.then(function (model) {
           res.json(model);
        })
		.catch(function (error) {
            res.status(500).json({errormsg: error.message});
       });
	},
}
