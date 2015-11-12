var app = angular.module("examApp", ["ngRoute"]);

// Routes
app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
    .when('/', {
        templateUrl: '/pages/list.html',
        controller: 'listController as listCtrl'
    }).when('/person/:id', {
        templateUrl: '/pages/person.html',
        controller: 'personController as personCtrl'
    });
}]);

app.service('personService', [function () {
  var self = this;

  this.persons = [
    {id: 1,name: "Jens",age : 18} ,{id: 2,name: "Peter",age : 23} ,{id: 3,name: "Hanne",age : 23}
  ];

}]);

app.controller("mainController", ['personService', function(personService) {
  var self = this;
  this.personService = personService;
  this.newUserVisible = false;

  this.toggleNewUser = function() {
    if (self.newUserVisible === false) {
      self.newUserVisible = true;
    } else {
      self.newUserVisible = false;
    }
  };

  this.createUser = function() {
    if (self.personName === "" || self.personAge === "") {return;}
    personService.persons.push({
      id: personService.persons.length + 1,
      name: self.personName,
      age: self.personAge
    });

    self.personName = "";
    self.personAge = "";
  };

}]);

app.controller("listController", ['personService', function(personService) {
  this.personService = personService;
}]);

app.controller("personController", ['personService','$routeParams', function(personService, $routeParams) {
  this.personService = personService;
  var self = this;

  this.getPerson = function(){
    personService.persons.forEach(function(person) {
        if (person.id === parseInt($routeParams.id)) {
          self.person = person;
        }
    });
  };

  this.getPerson();

}]);
