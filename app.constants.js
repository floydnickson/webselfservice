(function(){
  'use strict';

  angular.module('selfService')

	.constant("BASE_URL", "https://62.171.190.235/fineract-provider/api/v1")

	.constant('AUTH_EVENTS', {
		updateUser: 'update-user',
		notAuthorized: 'auth-not-authorized',
		notAuthenticated: 'auth-not-authenticated'
	})

	.constant("TENANT_IDENTIFIER", "mifostenant-default")

	.constant('USER_ROLES', {
		user: 'USER'
	});
})();
