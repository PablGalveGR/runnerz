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
  $scope.runs = {};
  $scope.runsHeadersOrderBy = {};
  $scope.run = {};
  $scope.getAllRuns = $http.get("http://127.0.0.1:8080/api/runs").then(function (response) {
    $scope.runs = response.data;
    $scope.runsHeadersOrderBy = getTableHeaders(Object.keys((response.data[0])));
    $scope.runs.forEach(addEditAndDelete);
    /*
    $scope.headers = getTableHeaders(Object.keys(($scope.runs[0])));
    */
    $scope.headers = Object.keys(($scope.runs[0]));
    console.log($scope.runs[0]);
  });
  $scope.goToDetail = function (object = "Not object received") {
    $scope.getRun(object.id);
    console.log("go to detail of: " + object.title + " With id: " + object.id);
  }
  function getUserName(id) {/// Returns a string with the User's name
    let name = "";
    $http.get("http://127.0.0.1:8080/api/users/name/" + id).then(function (response) {
      let runner = response.data;
      name = runner;
      console.log("Username = " + runner);
    });
    return name;
  }
  $scope.getRun = function (id) {
    $http.get("http://127.0.0.1:8080/api/runs/" + id).then(function (response) {
      $scope.run = response.data;
      $scope.runHeaders = Object.keys(($scope.run));
      $scope.run.runner = getUserName($scope.run.runner);
      console.log($scope.run.runner);
      //$scope.runHeaders = getTableHeaders(Object.keys(($scope.run)));
      //console.log($scope.run);
    })
  }
});