/*
  © Microsoft. All rights reserved.
  Build: 6.2.8100.0 
  Version: 0.5 
*/

// Here are some inserted lines
// with some extra comments
	
(function (global, undefined) {
	"use strict";
	var definedVariable = {};
	definedVariable.prop = 5;

	function initializeProperties(target, members) {
		var keys = Object.keys(members);
		var properties;
		var i, len;
		for (i = 0, len = keys.length; i < len; i++) {
			var key = keys[i];
			var enumerable = key.charCodeAt(0) !== /*_*/95;
			var member = members[key];
			if (member && typeof member === 'object') {
			}
			target[key] = member;
		}
	}
})(this);