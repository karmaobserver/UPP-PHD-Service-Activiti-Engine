(function() {
	'use strict';

	angular
		.module('phdApp')
		.factory('LoginService', LoginService);

	LoginService.$inject = ['$http', '$base64'];
	function LoginService($http, $base64) {

		return {
		/*var sayHello = function() {
			return "Hello ";
		},*/
	        
            login: function(token,username) {
            	var req = {
                    method: 'GET',
                    url: 'http://localhost:8080/activiti-rest/service/identity/users?id=' + username,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token
                    }
                }
                return $http(req)
                		.then(function(result) {
                			console.log("login");
                			console.log(result);
                            return result;
                        })
                        .catch(function(error) {
                        	console.log(error);
							return error;
						});	;           	
       		 },

	        encodeUser: function(username,password){
	    		var decodedToken = username + ":" + password;
	            var encodedToken = $base64.encode(decodedToken);
            return encodedToken;
    	}

		}
		


	}
})();