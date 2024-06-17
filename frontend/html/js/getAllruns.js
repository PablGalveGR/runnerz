///Needs the to pass as a parameter an array with the name of the properties of a Json Object
function getTableHeaders(tableHeaders) {
    let headers = [];
    for (let i = 0; i < tableHeaders.length; i++) {
      let word = tableHeaders[i];
      let firstLetter = word[0];
      let finalWord = firstLetter.toUpperCase() + word.substr(1, word.length);
      headers[i] = finalWord;
      console.log(finalWord);
    }
    return headers
  }
let app = angular.module("runnerz", []);
app.controller("getAllruns", function($scope, $http){
    $http.get("http://127.0.0.1:8080/api/runs").then(function (response){
        $scope.headersUpper = getTableHeaders(Object.keys((response.data[0])));
        $scope.runs = response.data;
    });
});