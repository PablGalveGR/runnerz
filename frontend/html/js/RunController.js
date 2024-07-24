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

let app = angular.module("runnerz", []);
app.controller("runsController", function ($scope, $http, $window) {
  $scope.runs = {};
  $scope.detailRun = false;
  $scope.editRun = false;
  $scope.addRun = false;
  $scope.users = {};
  $scope.run = {};
  $scope.runs = [];
  getAllUsers();
  getAllRuns();
  function refreshAll() {
    $scope.runs = [];
    $scope.editRun = false;
    $scope.detailRun = false;
    $scope.addRun = false;
    $scope.users = {};
    $scope.user = {};
    getAllUsers();
    getAllRuns();
  }
  function getAllRuns() {
    $http.get("http://127.0.0.1:8080/api/runs").then(function (response) {
      let runs = response.data;
      //$scope.runsHeadersOrderBy = fomatHeaders(Object.keys((response.data[0])));
      runs.forEach(addEditAndDelete);
      $scope.headers = fomatHeaders(Object.keys((runs[0])));
      //Replace all runner ids with their respective names
      for (let i = 0; i < runs.length; i++) {
        runs[i] = getUserName(runs[i]);
        if (i == runs.length - 1) {
          $scope.runs = Object.assign([], runs);
        }
      }
    });
  }
  // Gets all the Users of the database
  function getAllUsers() {
    $http.get("http://127.0.0.1:8080/api/users").then(function (response) {
      $scope.users = response.data;
    });
  }
  // Return the object with changing the runner id by the name of the runner
  function getUserName(obj) {
    $http.get("http://127.0.0.1:8080/api/users/name/" + obj.runner).then(function (response) {
      let runner = response.data;
      obj.runner = runner.username;
      console.log("Username = " + runner.username);
    }, function () { console.log("Error fetching runner name") });
    return obj;
  }
  /*Detail Run*/
  // Opens the detailed a run's detailed view
  $scope.goToDetail = function (object = "Not object received") {
    $scope.detailRun = true;
    $scope.editRun = false;
    $scope.addRun = false;
    $scope.getRun(object);
    console.log("go to detail of: " + object.title + " With id: " + object.id);
  }
  // Gets a single run
  $scope.getRun = function (run) {
    $scope.run = Object.assign({}, run);
    delete $scope.run.edit;
    delete $scope.run.delete;
    $scope.runHeaders = Object.keys(($scope.run));
    console.log("Runner username set: " + $scope.run.runner);
  }
  /*Add run*/
  // Sets the form headers
  $scope.goToAddRun = function () {
    $scope.detailRun = false;
    $scope.editRun = false;
    $scope.addRun = true;
    let addRunHeaders = Object.keys(($scope.runs[0]));
    addRunHeaders.splice(addRunHeaders.indexOf('edit'),1);
    addRunHeaders.splice(addRunHeaders.indexOf('delete'),1);
    $scope.addRunHeaders = fomatHeaders(addRunHeaders);
  }
  $scope.getRunToAdd = function(){
    let runToAdd = {};
    for (property of Object.keys($scope.addRunHeaders)) {
      let element = document.getElementsByName(property.value)[0];
      let value = element.value;
      runToAdd[property] = value;
    }
    console.log("Run to update: " + runToUpdate.id);
    addRun(runToUpdate);
  }
  function addRun(run){
    console.log("Run to add: " + run.id);
    /*$http.put("http://127.0.0.1:8080/api/runs/update/" + run.id, run).
      then(function () {
        console.log("Run edited boi");
        refreshAll();
      }),
      function () { console.log("Error adding run") };
  }*/
  }
  /*Edit Runs*/
  // Opens a run's edit view
  $scope.goToEdit = function (object = "Not object received") {
    $scope.detailRun = false;
    $scope.editRun = true;
    $scope.addRun = false;
    $scope.getRun(object);
    console.log("go to edit of: " + object.title + " With id: " + object.id);
  }
  // Retrieves the run that is going to be updated
  $scope.getRunEdit = function () {
    let runToUpdate = {};
    for (property of Object.keys($scope.run)) {
      let element = document.getElementsByName(property)[0];
      let value = element.value;
      runToUpdate[property] = value;
    }
    console.log("Run to update: " + runToUpdate.id);
    editRun(runToUpdate);
  }
  // Sends to the server a petition to update a run
  function editRun(run) {
    console.log("Run to edit: " + run.id);
    $http.put("http://127.0.0.1:8080/api/runs/update/" + run.id, run).
      then(function () {
        console.log("Run edited boi");
        refreshAll();
      }),
      function () { console.log("Error updating run") };
  }
  /*Delete*/
  // Drops the selected run from the list of runs
  function deleteRunFromList(run) {
    console.log(typeof $scope.runs);
    let runIndexTodelete = $scope.runs.indexOf(run);
    $scope.runs.splice(runIndexTodelete, 1);
  }
  // Delete run from the DB
  $scope.gotoDelete = function (run) {
    let choice = $window.confirm("Are you sure to delete the run: id = " + run.id + " Title = " + run.title + " ?");
    if (choice == true) {
      console.log("Delete run");
      $http.delete("http://127.0.0.1:8080/api/runs/delete/" + run.id).then(deleteRunFromList(run));
    }
    else {
      console.log("Cancel delete");
    }
  }
});