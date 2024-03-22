/*!
* sofill v1.1.3
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export { sleep as s };
