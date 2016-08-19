var Emails = require('../collections/emails_col').Collection;
var Email = require('../models/email_mod').Model;

module.exports = {
	getEmail: function (req, res, next) {
       Email.forge({ id: req.params.id })
		.fetch({withRelated: ['users'], require: true})
		.then(function (model) {
		    res.json(model);
		})
		.catch(function (error) {
			res.status(500).json({errormsg: error.message});
		});
	},
   getEmails: function (req, res, next) {
        Emails.forge()
		.fetch({withRelated: ['users'], require: true})
		.then(function (model) {
            res.json(model);
		})
		.catch(function (error) {
			res.status(500).json({errormsg: error.message});
		});
	},
   addEmail: function (req, res, next) {
       Email.forge(req.body)
		.save()
		.then(function (model) {
           res.json(model);
        })
		.catch(function (error) {
            res.status(500).json({errormsg: error.message});
        });
	},
    delEmail: function (req, res, next) {
        Email.forge({ id: req.params.id })
		.destroy()
		.then(function (model) {
          res.json([{id:req.params.id}]);
        })
		.catch(function (error) {
            res.status(500).json({errormsg: error.message});
         });
	},
    updateEmail: function (req, res, next) {
        Email.forge({ id: req.params.id })
		.save(req.body, { method: 'update' })
		.then(function (model) {
           res.json(model);
        })
		.catch(function (error) {
            res.status(500).json({errormsg: error.message});
       });
	},
}
