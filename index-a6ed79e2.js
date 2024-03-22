/*!
* sofill v1.1.0
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
async function post2Siyuan(url, data = {}) {
    let resData = null;
    await fetch(url, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
            Authorization: `Token '${window.siyuan?.config.api.token}'`,
        },
    }).then(function (response) {
        resData = response.json();
    });
    console.log(resData);
    return resData;
}
async function parseResponse(response) {
    let r = await response;
    // console.log(r)
    return r.code === 0 ? r.data : null;
}
const isMobile = () => {
    return document.getElementById("sidebar") ? true : false;
};
const isWindow = () => {
    return document.getElementById("toolbar") ? false : true;
};
const genUUID = () => ([1e7].toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (parseInt(c, 10) ^ (window.crypto.getRandomValues(new Uint32Array(1))[0] & (15 >> (parseInt(c, 10) / 4)))).toString(16));

export { post2Siyuan as a, isWindow as b, genUUID as g, isMobile as i, parseResponse as p };
