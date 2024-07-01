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
  obj.edit = "";
  obj.delete = "";
}

let app = angular.module("runnerz", []);
app.controller("runsController", function ($scope, $http) {
  $scope.runner = {};
  $scope.runs = {};
  $scope.runsHeadersOrderBy = {};
  $scope.run = {};
  $scope.getAllRuns = $http.get("http://127.0.0.1:8080/api/runs").then(function (response) {
    $scope.runs = response.data;
    $scope.runsHeadersOrderBy = getTableHeaders(Object.keys((response.data[0])));
    $scope.runs.forEach(addEditAndDelete);
    //Replace all runner ids with their respective names
    $scope.runs.forEach($scope.getUserName);
    /*
    $scope.headers = getTableHeaders(Object.keys(($scope.runs[0])));
    */
    $scope.headers = Object.keys(($scope.runs[0]));
    console.log($scope.runs[0]);
  });
  $scope.goToDetail = function (object = "Not object received") {
    $scope.getRun(object);
    console.log("go to detail of: " + object.title + " With id: " + object.id);
  }
  $scope.getRun = function (run) {
    $scope.run = Object.assign({}, run);
    $scope.runHeaders = Object.keys(($scope.run));
    //$scope.run.runner = $scope.getUserName($scope.run.runner);
    //$scope.runHeaders = getTableHeaders(Object.keys(($scope.run)));
    console.log("Runner username set: " + $scope.run.runner);
  }
  $scope.getUserName = function (obj) {/// Returns an Json with the User's name
    if ($scope.runner.id != obj.runner || $scope.runner == null) {
      $scope.runner.id = obj.runner;
      $http.get("http://127.0.0.1:8080/api/users/name/" + $scope.runner.id).then(function (response) {
        let runner = response.data;
        $scope.runner.name = runner.username;
        obj.runner = runner.name;
        console.log("Username = " + runner.username);
      }, function () { console.log("Error fetching runner name") });
    }
  }
});