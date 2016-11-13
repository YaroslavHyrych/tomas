'use strict';

/**
 * @ngdoc function
 * @name tomasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tomasApp
 */
angular.module('tomasApp')
  .controller('MainCtrl', ['$scope', 'Activity', 'history', function ($scope, Activity, history) {
    var self = this;
    //TODO remove
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    this.startNewActivity = function() {
      start(Activity.TYPE.WORK);
    };

    this.makeBreak = function() {
      start(Activity.TYPE.BREAK);
    };

    var start = function (type) {
      if ($scope.activity) {
        self.stop();
      }

      $scope.activity = new Activity(type);

      $scope.$broadcast('before-start-activity');
      $scope.activity.start();
      $scope.$broadcast('after-start-activity');
    };

    this.stop = function() {
      if (!$scope.activity) return;

      $scope.$broadcast('before-stop-activity');
      $scope.activity.stop();
      $scope.$broadcast('after-stop-activity');

      history.save($scope.activity);
      $scope.$broadcast('after-save-activity', $scope.activity);
      $scope.activity = null;
    };
  }]);
