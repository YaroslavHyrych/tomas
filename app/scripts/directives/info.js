'use strict';

/**
 * @ngdoc directive
 * @name tomasApp.directive:info
 * @description
 * # info
 */
angular.module('tomasApp')
  .directive('info', function () {
    return {
      templateUrl: 'views/info.html',
      restrict: 'E'
    };
  });
