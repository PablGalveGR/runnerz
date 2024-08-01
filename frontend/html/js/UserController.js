///Needs the to pass as a parameter an array of Strings
function fomatHeaders(tableHeaders) {
    let headers = [];
    for (let i = 0; i < tableHeaders.length; i++) {
      let word = tableHeaders[i];
      if (word == 'startedOn') {
        word = 'started on';
      }
      else if (word == 'completedOn') {
        word = 'completed on';
      }
      let firstLetter = word[0];
      let finalWord = firstLetter.toUpperCase() + word.substr(1, word.length);
      headers[i] = finalWord;
    }
    return headers
  }
  
  function addEditAndDelete(obj) {
    obj.edit = "edit";
    obj.delete = "delete";
  }
  
  let app = angular.module("usernerz", []);
  app.controller("usersController", function ($scope, $http, $window) {
    $scope.detailUser = false;
    $scope.editUser = false;
    $scope.addUser = false;
    $scope.user = {};
    $scope.users = [];
    getAllUsers();
    function refreshAll() {
      $scope.users = [];
      $scope.editUser = false;
      $scope.detailUser = false;
      $scope.addUser = false;
      $scope.users = {};
      $scope.user = {};
      getAllUsers();
    }
    function getAllUsers() {
      $http.get("http://127.0.0.1:8080/api/users").then(function (response) {
        let users = response.data;
        //$scope.usersHeadersOrderBy = fomatHeaders(Object.keys((response.data[0])));
        users.forEach(addEditAndDelete);
        $scope.headers = fomatHeaders(Object.keys((users[0])));
      });
    }
    // Gets all the Users of the database
    /*function getAllUsers() {
      $http.get("http://127.0.0.1:8080/api/users").then(function (response) {
        $scope.users = response.data;
      });
    }*/
    /*Detail User*/
    // Opens the detailed a user's detailed view
    $scope.goToDetail = function (object = "Not object received") {
      $scope.detailUser = true;
      $scope.editUser = false;
      $scope.addUser = false;
      $scope.getUser(object);
      console.log("go to detail of: " + object.username + " With id: " + object.id);
    }
    // Gets a single user
    $scope.getUser = function (user) {
      $scope.user = Object.assign({}, user);
      delete $scope.user.edit;
      delete $scope.user.delete;
      $scope.userHeaders = Object.keys(($scope.user));
      console.log("User set: " + $scope.user.username);
    }
    /*Add user*/
    // Sets the form headers
    $scope.goToAddUser = function () {
      $scope.detailUser = false;
      $scope.editUser = false;
      $scope.addUser = true;
      $http.get('http://127.0.0.1:8080/api/users/1').then(function(response){
        let addUserHeaders = Object.keys((response.data));
        $scope.addUserHeaders =addUserHeaders;
      });
      
    }
    $scope.getUserToAdd = function () {
      let userToAdd = {};
      //let properties = Object.keys($scope.users[0]);
      /*properties.splice(properties.indexOf("edit"), 1);
      properties.splice(properties.indexOf("delete"), 1);*/
      let properties = $scope.addUserHeaders;
      properties.splice(properties.indexOf("id"), 1);
      userToAdd.id = null;
      for (property of properties) {
        if (property != "$$hashKey") {
          let element = document.getElementsByName(property)[0];
          let value = element.value;
          userToAdd[property] = value;
        }
      }
      console.log("User to add: " + userToAdd.title);
      addUser(userToAdd);
    }
    function addUser(user) {
      console.log("User to add: " + user.title);
      $http.post("http://127.0.0.1:8080/api/users",user).
        then(function () {
          console.log("User added boi");
          refreshAll();
        }),
        function () { console.log("Error adding user") };
    }
    /*Edit Users*/
    // Opens a user's edit view
    $scope.goToEdit = function (object = "Not object received") {
      $scope.detailUser = false;
      $scope.editUser = true;
      $scope.addUser = false;
      $scope.getUser(object);
      console.log("go to edit of: " + object.title + " With id: " + object.id);
    }
    // Retrieves the user that is going to be updated
    $scope.getUserEdit = function () {
      let userToUpdate = {};
      let properties = Object.keys($scope.user);
      for (property of properties) {
        if (property != "$$hashKey") {
          let element = document.getElementsByName(property)[0];
          let value = element.value;
          userToUpdate[property] = value;
        }
      }
      console.log("User to update: " + userToUpdate.id);
      editUser(userToUpdate);
    }
    // Sends to the server a petition to update a user
    function editUser(user) {
      console.log("User to edit: " + user.id);
      $http.put("http://127.0.0.1:8080/api/users/update/" + user.id, user).
        then(function () {
          console.log("User edited boi");
          refreshAll();
        }),
        function () { console.log("Error updating user") };
    }
    /*Delete*/
    // Drops the selected user from the list of users
    function deleteUserFromList(user) {
      console.log(typeof $scope.users);
      let userIndexTodelete = $scope.users.indexOf(user);
      $scope.users.splice(userIndexTodelete, 1);
    }
    // Delete user from the DB
    $scope.gotoDelete = function (user) {
      $scope.editUser = false;
      let choice = $window.confirm("Are you sure to delete the user: id = " + user.id + " Title = " + user.title + " ?");
      if (choice == true) {
        console.log("Delete user");
        $http.delete("http://127.0.0.1:8080/api/users/delete/" + user.id).then(deleteUserFromList(user));
      }
      else {
        console.log("Cancel delete");
      }
    }
  });