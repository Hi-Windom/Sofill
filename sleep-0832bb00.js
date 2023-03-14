/*!
* sofill v1.0.47
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
'use strict';

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

exports.sleep = sleep;
