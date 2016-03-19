app = angular.module("voat", ["angular-uuid", "ngCookies"]);

app.controller("one", ['$scope', '$http', '$cookies', 'uuid', function($scope, $http, $cookies, uuid) {
  $scope.voteData = {comment: "", color: "", uuid: ""};
  $scope.votecolorclass = "";

  $scope.determine_user = function() {
    var userUuid = $cookies.get('useruuid');
    if (userUuid == null) {
      userUuid = uuid.v4(); }

    var expiry = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    $cookies.put("useruuid", userUuid, { expires: expiry });
    $scope.voteData.uuid = userUuid;
    };

  $scope.clickbutton = function(color) {
    $scope.voteData.color = color;
    $scope.votecolorclass = color + "-custom";
    $scope.send();
  };

  $scope.send = function () {
       console.log("sending", $scope.voteData);
       $http.post("/vote", $scope.voteData).then(
            function success(response) {
                console.log("success call to vote", response.data); },
            function failure(response) {
                console.log("failed call to vote", response.data); });
  };

  $scope.determine_user();

}]);

