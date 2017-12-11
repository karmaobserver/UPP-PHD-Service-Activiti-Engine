(function() {
	'use strict';

	angular
		.module('phdApp')
		.controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['$scope', '$rootScope', 'HomeService', 'localStorageService', 'ActivitiService' ];
	function HomeCtrl($scope, $rootScope, HomeService, localStorageService, ActivitiService) {
		var vm = this;

		vm.firstName = localStorageService.get("firstName");
		vm.lastName = localStorageService.get("lastName");
		vm.username = localStorageService.get("username");
		vm.password = localStorageService.get("password");
    vm.encodedToken = localStorageService.get("encodedToken");
		vm.groups = "";
    vm.studentInfo = {};

		getTasksByUser();


    

    vm.getAllTasks = function() {
      ActivitiService.getAllTasks(vm.encodedToken).then(function(response){
      });
    }
  
    function getTasksByUser() {
      console.log(vm.username);
   		ActivitiService.getTasksByUser(vm.encodedToken, vm.username).then(function(response){
        if(response.data.data.length != 0){
            vm.allTasksForUser = response.data.data;
            for(var i = 0; i < response.data.data.length; i++){
               getProcessInitiator(response.data.data[i].processInstanceId);
            }
          } else {
                  vm.allTasksForUser = null;
                }                    
      });
    }

    function getProcessInitiator(processInstanceId) {
      ActivitiService.getProcessInitiator(vm.encodedToken, processInstanceId).then(function(response){
        console.log("Initiator");
        vm.studentInfo[processInstanceId] = response.data.value;
      });
    }

    vm.deleteProcessInstace = function(instanceIdToDelete) {
      ActivitiService.deleteProcessInstanceById(vm.encodedToken, instanceIdToDelete).then(function(response) {
        console.log("Uspesno obrisana" + instanceIdToDelete);
        getTasksByUser();         
        });         

    }

    /*vm.properties = function(taskId) {
      $state.go('task');   
    }*/
		 	
	}
})();