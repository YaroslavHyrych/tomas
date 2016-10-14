'use strict';

/**
 * @ngdoc function
 * @name tomasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tomasApp
 */
angular.module('tomasApp')
  .controller('MainCtrl', ['$scope', 'Activity', function ($scope, Activity) {
    //TODO remove
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    this.startNewActivity = function() {
      start(Activity.TYPE.WORK);
      $scope.$broadcast('start-activity');
    };

    this.makeBreak = function() {
      start(Activity.TYPE.BREAK);
      $scope.$broadcast('start-activity');
    };

    var start = function (type) {
      if ($scope.activity) {
        stop();
      }

      $scope.activity = new Activity(type);
      $scope.activity.start();
    };

    this.stop = function() {
      if (!$scope.activity) return;

      $scope.activity.stop().save();

      $scope.activity = null;
    };
  }]);
