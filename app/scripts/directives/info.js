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
      scope: {
        activity: '='
      },
      bindToController: true,
      templateUrl: 'views/info.html',
      restrict: 'E',
      controllerAs: 'ctrl',
      controller: ['Activity', function (Activity) {
        this.isShow = function () {
          return this.activity && this.activity.type == Activity.TYPE.WORK;
        }
      }]
    };
  });
