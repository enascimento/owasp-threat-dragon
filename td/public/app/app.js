﻿'use strict';

var angular = require('angular');
require('angular-route');
require('angular-xeditable');
window.jQuery = require('jquery');
require('bootstrap');
require('angular-animate');

//temporary fix for Chrome/Jointjs problem
SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function (toElement) {
    return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM());
};

var app = angular.module('app', ['ui.bootstrap', 'ngAnimate', 'ngRoute', 'common', 'xeditable', 'templates']);

//require core component
require('owasp-threat-dragon-core');

//require custom modules, services, controllers and directives
require('./config.route');
require('./services');
require('./welcome');
require('./threatmodels');
require('./diagrams');
require('./directives');

app.config(['$provide', function ($provide) {
    $provide.decorator('$exceptionHandler', ['$delegate', 'config', 'logger', require('./config.exceptionHandler')]);
}]);

app.run(['$rootScope', '$location',
    function ($rootScope, $location) {
        $rootScope.location = $location;
    }]);

// Handle routing errors and success events
app.run(['$route', '$rootScope', 'routemediator',
    function ($route, $rootScope, routemediator) {
        routemediator.setRoutingHandlers();
    }]);

//config for angular-xeditable
app.run(['editableOptions', function (editableOptions) {
    editableOptions.theme = 'bs3';
}]);