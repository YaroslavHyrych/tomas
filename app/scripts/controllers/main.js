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
    var that = this;
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
        that.stop();
      }

      $scope.activity = new Activity(type);
      $scope.activity.start();

      $scope.$broadcast('start-activity');
    };

    this.stop = function() {
      if (!$scope.activity) return;

      $scope.activity.stop().save();
      $scope.activity = null;

      $scope.$broadcast('stop-activity');
    };
  }]);
