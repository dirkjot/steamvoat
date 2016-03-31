app = angular.module("voat", ["uuid4", "ngCookies", "ngAnimate"]);

app.controller("one", ['$scope', '$http', '$cookies', '$timeout', 'uuid4',
  function($scope, $http, $cookies, $timeout, uuid4) {
    $scope.voteData = {comment: "", color: "", uuid: ""};
    $scope.votecolorclass = "";
    $scope.bubbleUp = false;
    $scope.animText = "Please vote!";
    $scope.feedbackMessage = false;

    $scope.determine_user = function() {
      var userUuid = $cookies.get('useruuid');
      if (userUuid == null) {
        userUuid = uuid4.generate(); }

      var expiry = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
      $cookies.put("useruuid", userUuid, { expires: expiry });
      $scope.voteData.uuid = userUuid;
    };

    $scope.clickbutton = function(color) {
      $scope.voteData.color = color;
      $scope.votecolorclass = color + "-background";
      $scope.send();
    };

    $scope.send = function () {
      console.log("sending", $scope.voteData);
      $http.post("/vote", $scope.voteData).then(
          function success(response) {
            if ($scope.voteData.comment != '') {
              $scope.feedbackMessage = true;
              $timeout(function() { $scope.feedbackMessage = false; },
                3000);
            }},
          function failure(response) {
            alert("Could not contact the server, sorry");
            console.log("failed call to vote", response.data);
          });
    };

    $scope.determine_user();



  }]);

