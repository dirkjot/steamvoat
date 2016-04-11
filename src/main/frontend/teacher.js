app = angular.module("teacher", []);

app.controller("two", ['$scope', '$http',
    function ($scope, $http) {

        $scope.votelist = [];

        $scope.getVotes = function() {
            console.log("initing");
            $http.get("/teacher/rawlist").then(
                function success (result) {
                    $scope.votelist = result.data.content;
                    console.log("content", $scope.votelist)
                },
                function failure (result) {
                    console.log("Retrieving votes failed: ", result);
                });
        };

        // auto run:
        console.log("auto run 2");
        $scope.getVotes();
    }]);
 