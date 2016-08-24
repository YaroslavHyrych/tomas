angular.module('tomasApp')
.factory('Activity', ['$localStorage', function($localStorage) {
  function Activity(type) {
    this.name = 'New activity';
    this.description = '';
    this.type = type || Activity.TYPE.WORK;
  }

  Activity.TYPE = {
    BREAK: 'break',
    WORK: 'work'
  };

  Activity.prototype.start = function() {
    this.startDate = new Date();

    return this;
  };

  Activity.prototype.stop = function() {
    this.stopDate = new Date();

    return this;
  };

  Activity.prototype.save = function() {
    if (!this.stopDate) this.stopDate = new Date();

    $localStorage[this.startDate.getTime()] = this;
  };

  return Activity;
}]);
