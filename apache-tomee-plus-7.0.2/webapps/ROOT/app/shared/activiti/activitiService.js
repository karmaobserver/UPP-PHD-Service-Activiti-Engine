(function() {
	'use strict';

	angular
		.module('phdApp')
		.factory('ActivitiService', ActivitiService);

	ActivitiService.$inject = ['$http', '$base64'];
	function ActivitiService($http, $base64) {

		return {
		/*var sayHello = function() {
			return "Hello ";
		},*/

            startProcess: function(token, data){
                var req = {
                    method: 'POST',
                    url: 'http://localhost:8080/activiti-rest/service/runtime/process-instances',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    },
                    data: JSON.stringify(data)
                }
                return $http(req)
                        .then(function(result) {
                            /*console.log("startProcess");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
             },

             register: function(token, data){
                var req = {
                    method: 'POST',
                    url: 'http://localhost:8080/activiti-rest/service/identity/users',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    },
                    data: JSON.stringify(data)
                }
                return $http(req)
                        .then(function(result) {
                            console.log("register");
                            console.log(result);
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
             },
             
            addMemberToGroup: function(token, data, groupId){
                console.log(data);
                var req = {
                    method: 'POST',
                    url: 'http://localhost:8080/activiti-rest/service/identity/groups/'+groupId+'/members',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    },
                    data: JSON.stringify(data)
                }
                return $http(req)
                        .then(function(result) {
                            console.log("addMemberToGroup");
                            console.log(result);
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
             },

            getUserGroups: function(token, username){
	            var req = {
	                method: "GET",
	                url: 'http://localhost:8080/activiti-rest/service/identity/groups?member=' + username,
	                headers: {
	                  'Content-Type': 'application/json',
	                  'Authorization': 'Basic ' + token
	                }
	            }
                return $http(req)
                		.then(function(result) {
                            /*console.log("getUserGroups");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                        	console.log(error);
							return error;
						});	          	
       		},


       		getMembersByGroup: function(token, groupId){
	            var req = {
                    method: 'GET',
                    url: 'http://localhost:8080/activiti-rest/service/identity/users?memberOfGroup='+groupId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    }
                }
                return $http(req)
                		.then(function(result) {
                            /*console.log("getMembersByGroup");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                        	console.log(error);
							return error;
						});	          	
       		},

       		getTasksByUser: function(token, username){
	            var req = {
                    method: 'GET',
                    url: 'http://localhost:8080/activiti-rest/service/runtime/tasks?assignee=' + username,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    }
                }
                return $http(req)
                		.then(function(result) {
                            /*console.log("getTasksByUser");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                        	console.log(error);
							return error;
						});	          	
       		},

            getTasksByUserForGroup: function(token, groupId){
                var req = {
                    method: 'GET',
                    url: 'http://localhost:8080/activiti-rest/service/runtime/tasks?candidateGroup=' + groupId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    }
                }
                return $http(req)
                        .then(function(result) {
                            /*console.log("getTasksByUserForGroup");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
            },
            
            getGroupByGroupId: function(token, groupId){
                var req = {
                    method: 'GET',
                    url: 'http://localhost:8080/activiti-rest/service/identity/groups/' + groupId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    }
                }
                return $http(req)
                        .then(function(result) {
                            /*console.log("getGroupByGroupId");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
            },
            
            

            getProcessInitiator: function(token, processInstanceId){
                var req = {
                    method: 'GET',
                    url: 'http://localhost:8080/activiti-rest/service/runtime/process-instances/'+processInstanceId+'/variables/studentInfo',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    }
                }
                return $http(req)
                        .then(function(result) {
                            /*console.log("getProcessInitiator");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
            },

            

            claimTask: function(token, username, taskId){
                var data = {
                    action: "claim",
                    assignee: username
                }
                var req = {
                    method: 'POST',
                    url: 'http://localhost:8080/activiti-rest/service/runtime/tasks/' + taskId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    },
                    data: JSON.stringify(data)
                }
                return $http(req)
                        .then(function(result) {
                            /*console.log("claimTask");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
            },

            getTaskById: function(token, taskId){
                var req = {
                    method: 'GET',
                    url: 'http://localhost:8080/activiti-rest/service/runtime/tasks/'+ taskId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    }
                }
                return $http(req)
                        .then(function(result) {
                           /* console.log("getTaskById");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
            },

            getFormDataForTask: function(token, taskId){
                var req = {
                    method: 'GET',
                    url: 'http://localhost:8080/activiti-rest/service/form/form-data?taskId=' + taskId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    }
                }
                return $http(req)
                        .then(function(result) {
                            /*console.log("getFormDataForTask");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
            },

            executeTask: function(token, data){
                var req = {
                    method: 'POST',
                    url: 'http://localhost:8080/activiti-rest/service/form/form-data',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    },
                    data: JSON.stringify(data)
                }
                return $http(req)
                        .then(function(result) {
                           /* console.log("executeTask");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
            },

            getProccessDefinitionList: function(token){
                var req = {
                    method: 'GET',
                    url: 'http://localhost:8080/activiti-rest/service/repository/process-definitions?key=phd',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    }
                }
                return $http(req)
                        .then(function(result) {
                            /*console.log("getProccessDefinitionList");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
            },

            deleteDeplomentById: function(token, deploymentId){
                var req = {
                    method: 'DELETE',
                    url: 'http://localhost:8080/activiti-rest/service/repository/deployments/' + deploymentId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    }
                }
                return $http(req)
                        .then(function(result) {
                            /*console.log("deleteDeplomentById");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
            },

            getDepartment: function(token){
                var req = {
                    method: 'GET',
                    url: 'http://localhost:8080/activiti-rest/service/identity/groups?type=katedra',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    }
                }
                return $http(req)
                        .then(function(result) {
                            /*console.log("getDepartment");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
            },

            //nece trebati
            getAllTasks: function(token){
                var req = {
                    method: 'GET',
                    url: 'http://localhost:8080/activiti-rest/service/runtime/tasks',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    }
                }
                return $http(req)
                        .then(function(result) {
                            /*console.log("getAllTasks");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
            },

            //trenutno ne treba
            getTasksInstace: function(token, processInstanceId){
                var req = {
                    method: 'GET',
                    url: 'http://localhost:8080/activiti-rest/service/runtime/tasks?processInstanceId=' + processInstanceId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    }
                }
                return $http(req)
                        .then(function(result) {
                            /*console.log("getTasksInstace");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
            },

            //ne treba, al trenutno koristim
            deleteProcessInstanceById: function(token, processInstanceId){
                var req = {
                    method: 'DELETE',
                    url: 'http://localhost:8080/activiti-rest/service/runtime/process-instances/'+ processInstanceId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    }
                }
                return $http(req)
                        .then(function(result) {
                            /*console.log("deleteProcessInstanceById");
                            console.log(result);*/
                            return result;
                        })
                        .catch(function(error) {
                            console.log(error);
                            return error;
                        });             
            },

            
           
	        encodeUser: function(username,password){
	    		var decodedToken = username + ":" + password;
	            var encodedToken = $base64.encode(decodedToken);
           		return encodedToken;
    		}

		}
	}
})();