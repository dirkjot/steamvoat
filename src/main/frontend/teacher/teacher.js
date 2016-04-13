app = angular.module("teacher", []);

app.constant("moment", moment);

app.controller("two", ['$scope', '$http', 'moment',
    function ($scope, $http, moment) {

        $scope.votelist = [];
        $scope.filtered = true;

        $scope.formatDate = function (timestamp) {
            return moment(timestamp).format("h:mm a on YYYY-MM-DD");
        };

        $scope.getVotes = function() {
            var endpoint = $scope.filtered ? "/teacher/filteredlist" : "/teacher/rawlist";
            console.log("contacting", endpoint);

            $http.get(endpoint).then(
                function success (result) {
                    $scope.votelist = result.data.content  },
                function failure (result) {
                    alert("Could not retrieve votes");
                    console.log("Retrieving votes failed: ", result);  });
        };

        // auto run:
        $scope.getVotes();
    }]);
 