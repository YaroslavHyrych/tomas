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
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.startNewActivity = function() {
      start(Activity.TYPE.WORK);
      console.log('startNewActivity');
    };

    $scope.makeBreak = function() {
      start(Activity.TYPE.BREAK);
      console.log('makeBreak');
    };

    var start = function (type) {
      if ($scope.activity) {
        $scope.stop();
      }

      $scope.activity = new Activity(type);
      $scope.activity.start();

      console.log(JSON.stringify($scope.activity));
    };

    $scope.stop = function() {
      if (!$scope.activity) return;

      $scope.activity.stop().save();

      $scope.activity = null;
    };


  }]);
