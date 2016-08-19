var isLoggedIn = require('../../app/libs/isloggedin.js');
var phonesController = require('../controllers/phones_con.js');

module.exports = function(app, passport) {

	app.get('/phones', phonesController.getPhone);
	app.get('/phone/:id', phonesController.getphone);
	app.post('/phone_add', phonesController.addPhone);
	app.get('/phone_del/:id', phonesController.delPhone);
	app.post('/phone_update/:id', phonesController.updatePhone);
}
