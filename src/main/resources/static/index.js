app = angular.module("voat", []);

app.controller("one", function($scope) {
  $scope.votecolorclass = "";

  $scope.clickbutton = function(color) {
    $scope.votecolorclass = color + "-custom";
  };



});

