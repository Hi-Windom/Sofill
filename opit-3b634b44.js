/*!
* sofill v1.0.51
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
import { l as localforageExports } from './localforage-f04fbcca.js';

async function setItem(key, value, cb) {
    try {
        const v = await localforageExports.setItem(key, value);
        cb ? cb() : console.log(v);
        v(true);
    }
    catch (e) {
        console.error(e);
        e(false);
    }
}
function getItem(key, cb) {
    return localforageExports.getItem(key)
        .then((v) => {
        cb ? cb() : console.log(v);
    })
        .catch((e) => {
        console.error(e);
    });
}

export { getItem as g, setItem as s };
