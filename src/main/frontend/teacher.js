app = angular.module("teacher", []);

app.constant("moment", moment);

app.controller("two", ['$scope', '$http', 'moment',
    function ($scope, $http, moment) {

        $scope.votelist = [];

        $scope.formatDate = function (timestamp) {
            return moment(timestamp).format("h:mm a on YYYY-MM-DD");
        };

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
        $scope.mmx = moment(100);
        console.log("auto run 2");
        $scope.getVotes();
    }]);
 