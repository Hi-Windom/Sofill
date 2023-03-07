/*!
* sofill v1.0.20
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
async function post2Siyuan(url, data = {}) {
    let resData = null;
    await fetch(url, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
            Authorization: `Token '${window.siyuan.config.api.token}'`,
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

export { post2Siyuan as a, isMobile as i, parseResponse as p };
