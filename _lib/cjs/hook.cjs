/*!
* sofill v1.1.8
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
* https://jsr.io/@sisi/sofill
*/
'use strict';

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

exports.sleep = sleep;
