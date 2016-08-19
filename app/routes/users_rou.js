var isLoggedIn = require('../../app/libs/isloggedin.js');
var usersController = require('../controllers/users_con.js');

module.exports = function(app, passport) {

	app.get('/users', usersController.getUser);
	app.get('/user/:id', usersController.getuser);
	app.post('/user_add', usersController.addUser);
	app.get('/user_del/:id', usersController.delUser);
	app.post('/user_update/:id', usersController.updateUser);
}
