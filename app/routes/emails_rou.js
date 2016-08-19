var isLoggedIn = require('../../app/libs/isloggedin.js');
var emailsController = require('../controllers/emails_con.js');

module.exports = function(app, passport) {

	app.get('/emails', emailsController.getEmail);
	app.get('/email/:id', emailsController.getemail);
	app.post('/email_add', emailsController.addEmail);
	app.get('/email_del/:id', emailsController.delEmail);
	app.post('/email_update/:id', emailsController.updateEmail);
}
