var app = angular.module("csv", ['ngSanitize', 'ngCsv']);
app.controller("csv", function ($scope) {
    console.log("CSV controller loaded ..");

    var array = [
        {
            name: "Ajinkya",
            email: "ajinkya@gmail.com"
        },
        {
            name: "Anand",
            email: "anand@gmail.com"
        },
        {
            name: "Hemant",
            email: "hemant@gmail.com"
        }

    ];

    $scope.getArray = function () {
        return array;
    }
});
