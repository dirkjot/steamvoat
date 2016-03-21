app = angular.module("voat", ["angular-uuid", "ngCookies", "ngAnimate"]);

app.controller("one", ['$scope', '$http', '$cookies', '$timeout', 'uuid',
  function($scope, $http, $cookies, $timeout, uuid) {
  $scope.voteData = {comment: "", color: "", uuid: ""};
  $scope.votecolorclass = "";
  $scope.myValue = false;

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

  //// Initialize jRumble on Selector
  //$('.btn').jrumble({
  //                  	x: 0,	y: 0,
  //                  	rotation: 9, speed: 60,
  //                  });
  //
  //// Start rumble on element
  //$('.btn').trigger('startRumble');
  //
  //$timeout(function() { $('.btn').trigger('stopRumble'); },
  //  1500);


}]);

