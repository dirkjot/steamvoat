app = angular.module("voat", ["uuid4", "ngCookies", "ngAnimate"]);

app.controller("one", ['$scope', '$http', '$cookies', '$timeout', '$location', '$anchorScroll', 'uuid4',
  function($scope, $http, $cookies, $timeout, $location, $anchorScroll, uuid4) {
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

    $scope.goToComments = function() {
      $scope.showCommentsEntry = true;
      $scope.showConfirmation = false;

    };

    $scope.backToVoting = function() {
      $scope.showCommentsEntry = false;
    };

    $scope.backToHome = function() {
      $scope.showCommentsEntry = false;
      $scope.votecolorclass = '';
    };

    $scope.commentIconState = function() {
      if ($scope.showConfirmation) {
        return "header-comment-icon";
      }
      else {
        return "header-comment-icon-selected";
      }
    };

    $scope.send = function () {
      console.log("sending", $scope.voteData);
      $http.post("/vote", $scope.voteData).then(
          function success(response) {
            if ($scope.voteData.comment != '') {
              $scope.feedbackMessage = true;
              $scope.showConfirmation = true;
              $scope.voteData.comment = '';
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

