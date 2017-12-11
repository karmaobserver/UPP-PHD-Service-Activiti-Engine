(function() {
	'use strict';

	angular
		.module('phdApp')
		.controller('GroupCtrl', GroupCtrl);

	GroupCtrl.$inject = ['$scope', '$rootScope', 'localStorageService', 'ActivitiService', '$http', '$stateParams', '$state' ];
	function GroupCtrl($scope, $rootScope, localStorageService, ActivitiService, $http, $stateParams, $state) {
		var vm = this;

    var groupId = $stateParams.groupId;
		vm.username = localStorageService.get("username");
    vm.encodedToken = localStorageService.get("encodedToken");
    vm.studentInfo = {};

    getTasksByUserForGroup(groupId);
    getGroupByGroupId(groupId);


    vm.claimTask = function(taksId) {
      ActivitiService.claimTask(vm.encodedToken, vm.username, taksId).then(function(response){
        console.log("uspesno uzet task");
         $state.go('home'); 
        //getTasksByUserForGroup(groupId);
      });
    }
  
    function getTasksByUserForGroup(groupId) {
      console.log(groupId);
      ActivitiService.getTasksByUserForGroup(vm.encodedToken, groupId).then(function(response){
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

    function getGroupByGroupId(groupId) {
      ActivitiService.getGroupByGroupId(vm.encodedToken, groupId).then(function(response){
        vm.group = response.data;                
      });
    }
		 	


	}
})();