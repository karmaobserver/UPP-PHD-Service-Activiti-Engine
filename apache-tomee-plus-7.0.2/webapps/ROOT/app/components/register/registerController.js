(function() {
	'use strict';

	angular
		.module('phdApp')
		.controller('RegisterCtrl', RegisterCtrl);

	RegisterCtrl.$inject = ['$scope', '$rootScope', 'localStorageService', '$state', 'ActivitiService' ];
	function RegisterCtrl($scope, $rootScope, localStorageService, $state, ActivitiService) {
		var vm = this;

		/*vm.username = "";
		vm.password = "";*/

        vm.register = function() {

            var encodedToken = ActivitiService.encodeUser('referent', 'referent');

            var data = {
            	id: vm.username,
            	firstName: vm.firstName,
            	lastName: vm.lastName,
            	email: vm.email,
            	password: vm.password
            }

            var dataGroup = {
            	userId: vm.username
            }

            console.log( vm.username);


            ActivitiService.register(encodedToken, data).then(function(response) {
            	ActivitiService.addMemberToGroup(encodedToken, dataGroup, 'doktoranti').then(function(response) {
  		
          		});   
            	$state.go('login');
            	
            });
            
                  
        }

	}
})();