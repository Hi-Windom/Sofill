/*!
* sofill v1.1.4
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
'use strict';

var SConst = require('@sillot/bridge/src/SConst');



Object.keys(SConst).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return SConst[k]; }
	});
});
