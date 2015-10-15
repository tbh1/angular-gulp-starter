angular.module('mainApp')
.controller('CoreController', function($timeout, $log) {

  'use strict';

  var vm = this;

  vm.menuItems = [
  { text: 'Blog', href: '#' },
  { text: 'About', state: 'about' },
  { text: 'Contact', state: 'contact' },
  { text: 'Github', href: 'http://github.com/toxicblu' }
  ];

  vm.copyrightDate = (function() {
    var startYear = 2015;
    var endYear = new Date().getFullYear();

    $log.info(typeof(endYear));

    return startYear + ((startYear == endYear) ? '' : (' - ' + endYear));
  })();

});
