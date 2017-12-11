(function() {
	'use strict';

	angular
		.module('phdApp')
		.controller('TaskCtrl', TaskCtrl);
	TaskCtrl.$inject = ['$scope', '$rootScope', 'localStorageService', 'ActivitiService', '$http', '$stateParams', '$state', '$window' ];
	function TaskCtrl($scope, $rootScope, localStorageService, ActivitiService,  $http, $stateParams, $state, $window) {
		var vm = this;


    vm.encodedToken = localStorageService.get("encodedToken");

    var taskId = $stateParams.taskId;
    var taskDefinitionKey = $stateParams.taskDefinitionKey;
    console.log("taskDefinitionKey");
    console.log(taskDefinitionKey);

    vm.creatingCommission = false;

    if (taskDefinitionKey === 'predlaganje_komisije_OP' || taskDefinitionKey === 'predlaganje_komisije_OO') {
      vm.creatingCommission = true;
      getProfessors();
    }

    getTaskById();
    getFormDataForTask();


    function getTaskById() {
   		ActivitiService.getTaskById(vm.encodedToken, taskId).then(function(response){
          vm.task = response.data;          
      });
    }

    function getFormDataForTask() {
      ActivitiService.getFormDataForTask(vm.encodedToken, taskId).then(function(response){
          vm.formData = response.data;                
      });
    }

    function getProfessors() {
          ActivitiService.getMembersByGroup(vm.encodedToken,'profesori').then(function(response) {
            vm.professors = response.data.data;
          }); 
    }

    vm.executeTask = function(taksId) {

      var propertiesList = [];
      var property = {};

      console.log(vm.creatingCommission);
      console.log(vm.commissionProfessors);
      var professorsTrue = [];
      vm.showAlert = false;




      if (vm.creatingCommission) {
        for(var i = 0; i < vm.professors.length; i++) {
          console.log(vm.commissionProfessors[vm.professors[i].id]);

          if (vm.commissionProfessors[vm.professors[i].id]) {
            console.log("IMA " + vm.professors[i].id);
            professorsTrue.push(vm.professors[i].id);

            //ako se checkbox poklapa sa nekim od radiobutton ili se radiobuttoni poklapaju
            if ((vm.professors[i].id == vm.commissionPresident) || (vm.professors[i].id == vm.commissionMentor) || (vm.commissionPresident == vm.commissionMentor) || 
              vm.commissionPresident == null || vm.commissionMentor == null ) {
              vm.showAlert = true;  
            }
          }

        }
        if (vm.showAlert || professorsTrue.length != 3) {
          $window.alert("You must pick one commission president, one mentor and three more proffesors members. Also, same person can not be president and mentor");
          return;
        }
      }
    
      for(var i = 0; i < vm.formData.formProperties.length; i++){

        if (vm.formData.formProperties[i].id  === 'mentor' || vm.formData.formProperties[i].id  === 'mentor_oo') {
          property = {
                id: vm.formData.formProperties[i].id,
                value: vm.commissionMentor
              }
        } else if (vm.formData.formProperties[i].id  === 'predsednik' || vm.formData.formProperties[i].id  === 'predsednik_oo') {
          property = {
                id: vm.formData.formProperties[i].id,
                value: vm.commissionPresident
              }
        } else if (vm.formData.formProperties[i].id  === 'clankom3' || vm.formData.formProperties[i].id  === 'clankom3_oo') {
          property = {
                id: vm.formData.formProperties[i].id,
                value: professorsTrue[0]
              }
        } else if (vm.formData.formProperties[i].id  === 'clankom4' || vm.formData.formProperties[i].id  === 'clankom4_oo') {
          property = {
                id: vm.formData.formProperties[i].id,
                value: professorsTrue[1]
              }
        } else if (vm.formData.formProperties[i].id  === 'clankom5' || vm.formData.formProperties[i].id  === 'clankom5_oo') {
          property = {
                id: vm.formData.formProperties[i].id,
                value: professorsTrue[2]
              }
        } else {

        //Za sve ostale
        property = {
                id: vm.formData.formProperties[i].id,
                value: vm.results[vm.formData.formProperties[i].id]
              }

        }

        propertiesList.push(property);
      }

      console.log(propertiesList);
      

      var data = {
          taskId: taskId,
          properties: propertiesList
        }

      ActivitiService.executeTask(vm.encodedToken, data).then(function(response){
        $state.go("home");
        if (response.status!=204) {
          console.log("nije 204");
          console.log(response.status);
        }

        
      });
    }

	}
})();