(function() {
	'use strict';

	angular
		.module('phdApp')
		.controller('NavigationCtrl', NavigationCtrl);

	NavigationCtrl.$inject = ['$scope', '$rootScope', 'localStorageService', '$state', 'ActivitiService'];
	function NavigationCtrl($scope, $rootScope, localStorageService, $state, ActivitiService) {
		var vm = this;

		vm.username = localStorageService.get("username");
		vm.firstName = localStorageService.get("firstName");
		vm.lastName = localStorageService.get("lastName");
		vm.encodedToken = localStorageService.get("encodedToken");
		vm.groups = "";
		vm.doktorant =false;
		getUserGroups();

		 getProccessDefinitionList();
		function getProccessDefinitionList() {
	      ActivitiService.getProccessDefinitionList(vm.encodedToken).then(function(response){
	        console.log("ProcessDefinition");
	        console.log(response.data);
	        vm.deploymentIdPHD = response.data.data[0].deploymentId;	   
	      });
	    }

	   /* vm.deleteDeplomentById = function(deplomentId) {
	    	ActivitiService.deleteDeplomentById(vm.encodedToken, deplomentId).then(function(response){
	        console.log("Obrisan deploment");	   
	      });
	    }*/

		vm.logout = function() {
		 	localStorageService.clearAll();
		 	$state.go('login');           
        }

        function getUserGroups() {
            ActivitiService.getUserGroups(vm.encodedToken, vm.username).then(function(response) {
	         	vm.groups = response.data.data;
	         	for(var i=0; i<vm.groups.length; i++) {
		        	if ((vm.groups[i].id) == "doktoranti") {
		        		vm.doktorant = true;

		        	}
		        }        	
            });         
        }

        

	}
})();