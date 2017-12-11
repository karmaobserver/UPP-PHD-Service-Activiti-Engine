(function() {
	'use strict';

	angular
		.module('phdApp')
		.controller('NewProcessCtrl', NewProcessCtrl);

	NewProcessCtrl.$inject = ['$scope', '$rootScope', 'ActivitiService', 'localStorageService', '$state', 'FileUploader'];
	function NewProcessCtrl($scope, $rootScope, ActivitiService, localStorageService, $state, FileUploader) {
		var vm = this;

		vm.username = localStorageService.get("username");
		vm.password = localStorageService.get("password");
		vm.encodedToken = localStorageService.get("encodedToken");

		vm.uploader = new FileUploader();

		getProfessors();
		getDepartment();

        vm.startProcess = function() {

        	console.log(vm.procedureType);
        	console.log(vm.mentor);
        	var initData = {
		        processDefinitionKey: "phd",
		        variables: [{
		            name: "nacin_studiranja",
		            value: vm.procedureType
		        },{
		            name: "mentor",
		            value: vm.mentor
		        },{
		        	name: "katedra",
		            value: vm.departmentType
		        }]
	        };
	
            ActivitiService.startProcess(vm.encodedToken, initData).then(function(response) {
	      		/*$rootScope.mentor = null;
		        $rootScope.typeOfStudies = false;
		        $localStore.put("processInstanceId",response.data.id);*/
		        localStorageService.set("processInstanceId", response.data.id);
            	$state.go('home');
            });         
        }

        function getProfessors() {
	        ActivitiService.getMembersByGroup(vm.encodedToken,'profesori').then(function(response) {
	        	console.log("profesori");
	        	console.log(response);
	         	vm.professors = response.data.data;
	        }); 
        }

        function getDepartment() {
	        ActivitiService.getDepartment(vm.encodedToken).then(function(response) {
	        	console.log("getDepartment");
	        	console.log(response);
	         	vm.departments = response.data.data;
	        }); 
        }



    	
	}
})();