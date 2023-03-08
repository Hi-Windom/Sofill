/*!
* sofill v1.0.28
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
'use strict';

var SConst = require('@sillot/bridge/src/SConst');



Object.keys(SConst).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return SConst[k]; }
	});
});
