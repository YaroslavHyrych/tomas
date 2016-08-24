'use strict';

/**
 * @ngdoc directive
 * @name tomasApp.directive:activities
 * @description
 * # activities
 */
angular.module('tomasApp')
  .directive('activities', function () {
    return {
      templateUrl: 'views/activities.html',
      restrict: 'E',
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the activities directive');
      // }
    };
  });
