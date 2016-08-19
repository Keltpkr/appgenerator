var isLoggedIn = require('../../app/libs/isloggedin.js');
var groupsController = require('../controllers/groups_con.js');

module.exports = function(app, passport) {

	app.get('/groups', groupsController.getGroup);
	app.get('/group/:id', groupsController.getgroup);
	app.post('/group_add', groupsController.addGroup);
	app.get('/group_del/:id', groupsController.delGroup);
	app.post('/group_update/:id', groupsController.updateGroup);
}
