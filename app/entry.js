'use strict';

require('./scss/main.scss');

const path = require('path');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const angular = require('angular');
const ngTouch = require('angular-touch');
const ngAnimate = require('angular-animate');
const ngMap = require('ngmap');

require('@uirouter/angularjs');
require('angular-ui-bootstrap');
require('ng-file-upload');

const momentus = angular.module('momentus', ['ui.router', 'ngFileUpload', 'ngTouch', 'ngAnimate', 'ui.bootstrap', 'ngMap']);

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach(path => momentus.config(context(path)));

context = require.context('./view/', true, /\.js$/);
context.keys().forEach(key => momentus.controller(pascalcase(path.basename(key, 'js')), context(key)));

context = require.context('./service/', true, /\.js$/);
context.keys().forEach(key => momentus.service(camelcase(path.basename(key, '.js')), context(key)));

context = require.context('./component/', true, /\.js$/);
context.keys().forEach(key => momentus.component(camelcase(path.basename(key, '.js')), context(key)));
//
// context = require.context('./filter/', true, /\.js$/);
// context.keys().forEach(key => momentus.filter(camelcase(path.basename(key, '.js')), context(key)));
