
(function () {
	'use strict';
  angular
       .module('phdApp')
      .config(config)
     .run(run);	

 function config($stateProvider, $urlRouterProvider, $locationProvider) {
  

   //localStorageServiceProvider.setPrefix('merchantApp');
     //Koristim da bi izbacio # iz url-a. Jos u server.js koristim rewrite mehanizam // to ked osm pravel XO makso
   // $locationProvider.html5Mode(true).hashPrefix('!'); 
   
 	$urlRouterProvider.otherwise('/login');
  //Posto koristim nested views, treba mi da kada pogodim parenta (buy), redirektuje me na child (firstStep), a pritom da ostavim url
  //$urlRouterProvider.when('/buy', '/buy/firstStep' );

 		
     $stateProvider
      
      .state('login', {
	      url: "/login",
        views: {
                 'content': {
                           templateUrl: 'app/components/login/login.html',
                           controller: "LoginCtrl",
                           controllerAs: "vm"
                       }
                } 
      })
      .state('register', {
        url: "/register",
        views: {
                 'content': {
                           templateUrl: 'app/components/register/register.html',
                           controller: "RegisterCtrl",
                           controllerAs: "vm"
                       }
                } 
      })
      .state('home', {
        url: "/home",
        views: {
                 'content': {
                           templateUrl: 'app/components/home/home.html',
                           controller: "HomeCtrl",
                           controllerAs: "vm"
                       },
                  'navigation':{
                           templateUrl: 'app/components/navigation/navigation.html',
                           controller: "NavigationCtrl",
                           controllerAs: "vm"
                       }
                } 
      })
      .state('group', {
        url: "/group?groupId",
        views: {
                 'content': {
                           templateUrl: 'app/components/group/group.html',
                           controller: "GroupCtrl",
                           controllerAs: "vm"
                       },
                  'navigation':{
                           templateUrl: 'app/components/navigation/navigation.html',
                           controller: "NavigationCtrl",
                           controllerAs: "vm"
                       }
                } 
      })
      .state('task', {
        url: "/task?taskId&taskDefinitionKey",
        views: {
                 'content': {
                           templateUrl: 'app/components/task/task.html',
                           controller: "TaskCtrl",
                           controllerAs: "vm"
                       },
                  'navigation':{
                           templateUrl: 'app/components/navigation/navigation.html',
                           controller: "NavigationCtrl",
                           controllerAs: "vm"
                       }
                } 
      })
      .state('newProcess', {
        url: "/newProcess",
        views: {
                 'content': {
                           templateUrl: 'app/components/newProcess/newProcess.html',
                           controller: "NewProcessCtrl",
                           controllerAs: "vm"
                       },
                  'navigation':{
                           templateUrl: 'app/components/navigation/navigation.html',
                           controller: "NavigationCtrl",
                           controllerAs: "vm"
                       }
                } 
      });
      /*.state('buy', {
        url: "/buy",
        views: {
                 'content': {
                           templateUrl: "app/components/buy/views/buy.html",
                           controller: "BuyCtrl",
                           controllerAs: "vm"
                       },
                  'navigation':{
                           templateUrl: 'app/components/navigation/navigation.html',
                           controller: "NavigationCtrl",
                           controllerAs: "vm"
                       }     
                },
        abstract:true
       })//Nested Views for buy
       .state('buy.firstStep', {
            url: '/firstStep',
            templateUrl: 'app/components/buy/views/buyFirstStep.html'
        })
       .state('buy.secondStep', {
            url: '/secondStep',
            templateUrl: 'app/components/buy/views/buySecondStep.html'
        })
         .state('buy.thirdStep', {
            url: '/thirdStep',
            templateUrl: 'app/components/buy/views/buyThirdStep.html'
        })
         .state('buy.fourthStep', {
            url: '/fourthStep',
            templateUrl: 'app/components/buy/views/buyFourthStep.html'
        })
         .state('buy.fifthStep', {
            url: '/fifthStep',
            templateUrl: 'app/components/buy/views/buyFifthStep.html'
        });*/

   /*     $locationProvider.html5Mode(true)
        $locationProvider.hashPrefix('!');*/

    

  }

  function run($rootScope, $state, localStorageService) {


  }

}());