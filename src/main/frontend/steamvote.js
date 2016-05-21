app = angular.module("steamvote", ["uuid4", "ngCookies", "ngAnimate"]);

app.constant("moment", moment);

app.controller("one", ['$scope', '$http', '$cookies', '$timeout', '$location', '$anchorScroll', '$timeout', 'uuid4', 'moment',
    function($scope, $http, $cookies, $timeout, $location, $anchorScroll, $timeout, uuid4, moment) {
        var TIMEOUT_MINUTES = 5;

        // there are four states, captured in three variables:
        // state         | showCommentsEntry  | showConfirmation  | votecolorclasss
        // home          | false              | false             | <empty>
        // voted         | false              | false             | <color>
        // comments      | true               | false             | <emptyOrColor>
        // commentsgiven | true               | true              | <emptyOrColor>
        $scope.showCommentsEntry = false;
        $scope.showConfirmation = false;
        $scope.votecolorclass = "";
        $scope.voteData = {comment: "", color: "", uuid: "", className: "---", professorName: "Hald"};
        var resetPromise = false;

        $scope.determine_user = function() {
            var userUuid = $cookies.get('useruuid');
            if (userUuid == null) {
                userUuid = uuid4.generate(); }

            var expiry = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
            $cookies.put("useruuid", userUuid, { expires: expiry });
            $scope.voteData.uuid = userUuid;
        };

        $scope.clickbutton = function(color) {
            //console.log("clickbutton");
            $scope.voteData.color = color;
            $scope.votecolorclass = color + "-background";
            $scope.send();
        };

        $scope.goToComments = function() {
            //console.log("gotocommments");
            delayReset();
            $scope.showCommentsEntry = true;
            $scope.showConfirmation = false;
        };

        $scope.backToVoting = function() {
            //console.log("backtovoting");
            delayReset();
            $scope.showCommentsEntry = false;
        };

        $scope.backToHome = function() {
            //console.log("backToHome");
            $scope.showCommentsEntry = false;
            $scope.showConfirmation = false;
            $scope.votecolorclass = '';
            $scope.voteData.comment = '';
        };

        $scope.commentIconState = function() {
            if ($scope.showConfirmation) {
                return "header-comment-icon"; }
            else {
                return "header-comment-icon-selected"; }
        };

        $scope.submitFeedbackDimmed = function() {
            var commentLength = $scope.voteData.comment.length;
            if (commentLength > 0) {
                if ($scope.submitFeedbackDimmed.prevLength != commentLength) {
                    //console.log("submitFeedbackDimmed - new chars found");
                    $scope.submitFeedbackDimmed.prevLength = commentLength;
                    delayReset(); }
                return {};  }
            else {
                return {'opacity':.3 } ; }
        };

        $scope.send = function () {
            delayReset();
            //console.log("sending", $scope.voteData);
            $http.post("/vote", $scope.voteData).then(
                function success(response) {
                    if ($scope.voteData.comment != '') {
                        $scope.showConfirmation = true;     }},
                function failure(response) {
                    alert("Could not contact the server, sorry");
                    console.log("failed call to vote", response.data);    });
        };

        delayReset = function() {
            if (resetPromise) {
                $timeout.cancel(resetPromise);
            }
            resetPromise = $timeout($scope.backToHome, TIMEOUT_MINUTES * 60000);
        };


        schedule = [[ "Mon", "11:15", "12:45", "PSYCH7"], 
                    [ "Mon", "12:45", "14:15", "PSYCH7"], 
                    [ "Mon", "14:15", "15:45", "PSYCH1"], 
                    [ "Tue", "12:45", "14:15", "PSYCH1"], 
                    [ "Tue", "14:15", "15:45", "PSYCH1"],
                    [ "Wed", "11:15", "12:45", "PSYCH7"], 
                    [ "Wed", "12:45", "14:15", "PSYCH7"], 
                    [ "Wed", "14:15", "15:45", "PSYCH1"], 
                    [ "Thu", "12:45", "14:15", "PSYCH1"], 
                    [ "Thu", "14:15", "15:45", "PSYCH1"]

                      ,[ "Wed", "20:15", "23:45", "NGHT"],
                     ];
        
        $scope.getClassName = function(locatimenow) {
            dayname = locatimenow.format('ddd');
            hourminute = locatimenow.format('HH:mm');

            matchingclasses = schedule.filter(function(v) { 
                return (v[0]==dayname && hourminute >= v[1] && hourminute <=v[2]); });
            if (matchingclasses.length == 1 && matchingclasses[0].length == 4) {
                return matchingclasses[0][3]; }
            return '---';
        };

        // auto run:
        $scope.determine_user();
        $scope.voteData.className = $scope.getClassName(moment());
        delayReset();
    }]);





