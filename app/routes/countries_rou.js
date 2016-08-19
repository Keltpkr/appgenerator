var isLoggedIn = require('../../app/libs/isloggedin.js');
var countriesController = require('../controllers/countries_con.js');

module.exports = function(app, passport) {

	app.get('/countries', countriesController.getCountry);
	app.get('/country/:id', countriesController.getcountry);
	app.post('/country_add', countriesController.addCountry);
	app.get('/country_del/:id', countriesController.delCountry);
	app.post('/country_update/:id', countriesController.updateCountry);
}
