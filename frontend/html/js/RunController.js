///Needs the to pass as a parameter an array with the name of the properties of a Json Object
function getTableHeaders(tableHeaders) {
  let headers = [];
  for (let i = 0; i < tableHeaders.length; i++) {
    let word = tableHeaders[i];
    let firstLetter = word[0];
    let finalWord = firstLetter.toUpperCase() + word.substr(1, word.length);
    headers[i] = finalWord;
    //console.log(finalWord);
  }
  return headers
}

function addEditAndDelete(obj) {
  obj.edit = "edit";
  obj.delete = "delete";
}

let app = angular.module("runnerz", []);
app.controller("runsController", function ($scope, $http) {
  $scope.runner = { 'id': '', 'name': '' }
  $scope.runs = {};
  $scope.detailRun = false;
  $scope.editRun = false;
  $scope.users = {};
  //$scope.runsHeadersOrderBy = {};
  $scope.run = {};
  $scope.runs = {};
  getAllUsers();
  getAllRuns();
  function getAllRuns() {
    $http.get("http://127.0.0.1:8080/api/runs").then(function (response) {
      let runs = response.data;
      //$scope.runsHeadersOrderBy = getTableHeaders(Object.keys((response.data[0])));
      runs.forEach(addEditAndDelete);
      $scope.headers = Object.keys((runs[0]));
      //Replace all runner ids with their respective names
      for (let i = 0; i < runs.length; i++) {
        runs[i] = getUserName(runs[i]);
        if (i == runs.length - 1) {
          $scope.runs = Object.assign({}, runs);
        }
      }
    });
  }
  function getAllUsers(){
    $http.get("http://127.0.0.1:8080/api/users").then(function (response){
      $scope.users = response.data;
    });
  }
  function getUserName(obj) {
    if ($scope.runner.id != obj.runner || $scope.runner == null || $scope.runner.name == "") {
      $scope.runner.id = obj.runner;
      $http.get("http://127.0.0.1:8080/api/users/name/" + $scope.runner.id).then(function (response) {
        let runner = response.data;
        $scope.runner.name = runner.username;
        obj.runner = $scope.runner.name;
        console.log("Username = " + runner.username);
      }, function () { console.log("Error fetching runner name") });
    }
    else {
      obj.runner = $scope.runner.name;
    }
    return obj;
  }
  $scope.goToDetail = function (object = "Not object received") {
    $scope.detailRun = true;
    $scope.editRun = false;
    $scope.getRun(object);
    console.log("go to detail of: " + object.title + " With id: " + object.id);
  }
  $scope.getRun = function (run) {
    $scope.run = Object.assign({}, run);
    delete $scope.run.edit;
    delete $scope.run.delete;
    $scope.runHeaders = Object.keys(($scope.run));
    //$scope.run.runner = $scope.getUserName($scope.run.runner);
    //$scope.runHeaders = getTableHeaders(Object.keys(($scope.run)));
    console.log("Runner username set: " + $scope.run.runner);
  }
  /////Edit Runs
  $scope.goToEdit = function (object = "Not object received") {
    $scope.detailRun = false;
    $scope.editRun = true;
    $scope.getRun(object);
    console.log("go to edit of: " + object.title + " With id: " + object.id);
  }
  $scope.getRunEdit = function () {
    let runToUpdate = {};
    for (property of Object.keys($scope.run)) {
      let element = document.getElementsByName(property)[0];
      let value = element.value
      runToUpdate[property] = value;
    }
    console.log("Run to update: " + runToUpdate.id);
    editRun(runToUpdate);
  }
  function editRun(run) {
    console.log("Run to edit: " + run.id);
    $http.post("http://127.0.0.1:8080/api/runs/update/" + run.id, run).
    then(console - log("Run edited boi")), 
    function () { console.log("Error updating run") };
    getAllRuns();
  }
});