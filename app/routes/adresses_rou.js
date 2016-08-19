var isLoggedIn = require('../../app/libs/isloggedin.js');
var adressesController = require('../controllers/adresses_con.js');

module.exports = function(app, passport) {

	app.get('/adresses', adressesController.getAdress);
	app.get('/adress/:id', adressesController.getadress);
	app.post('/adress_add', adressesController.addAdress);
	app.get('/adress_del/:id', adressesController.delAdress);
	app.post('/adress_update/:id', adressesController.updateAdress);
}
