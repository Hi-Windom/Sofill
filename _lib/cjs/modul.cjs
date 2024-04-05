/*!
* sofill v1.1.8
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
* https://jsr.io/@sisi/sofill
*/
'use strict';

var index$1 = require('../../index-DPNnHBw4.js');
var index = require('../../index-DYlAAZT1.js');

function showDocCreatedDate() {
    /** 为打开文档的标题下显示文档创建日期 */
    function showDocumentCreationDate() {
        setInterval(DocumentCreationDate, 300);
    }
    function DocumentCreationDate() {
        var allDocumentTitleElement = getAllDocumentTitleElement();
        for (let index = 0; index < allDocumentTitleElement.length; index++) {
            const element = allDocumentTitleElement[index];
            var documentCreatTimeElement = creatTimeSpanElement(element.parentElement);
            var spanTxt = documentCreatTimeElement.innerText;
            if (spanTxt === "" || spanTxt === "日期获取中……") {
                var documentCreatTimeTxt = getDocumentTime(element);
                documentCreatTimeElement.innerText = documentCreatTimeTxt;
            }
        }
    }
    /**获取所有打开文档的标题元素 */
    function getAllDocumentTitleElement() {
        return document.querySelectorAll(".protyle-title__input");
    }
    /**为文档标题元素下创建时间容器元素 */
    function creatTimeSpanElement(tilteElement) {
        var item = tilteElement.children;
        for (let index = 0; index < item.length; index++) {
            const element = item[index];
            if (element.getAttribute("documentCreatTimeElement") != null) {
                return element;
            }
        }
        var documentCreatTimeElement = index$1.addinsertCreateElement(tilteElement, "span");
        documentCreatTimeElement.setAttribute("documentCreatTimeElement", "true");
        documentCreatTimeElement.style.display = "block";
        documentCreatTimeElement.style.marginLeft = "7px";
        documentCreatTimeElement.style.marginBottom = "0px";
        documentCreatTimeElement.style.fontSize = "70%";
        documentCreatTimeElement.style.color = "#484550";
        documentCreatTimeElement.style.opacity = "0.58";
        return documentCreatTimeElement;
    }
    /** 获得这个文档的创建时间 */
    function getDocumentTime(tilteElement) {
        var tS = tilteElement.parentElement.previousElementSibling.getAttribute("data-node-id");
        if (tS == null) {
            return "";
        }
        var year = tS.substring(0, 4);
        var moon = tS.substring(4, 6);
        var day = tS.substring(6, 8);
        tS.substring(8, 10);
        tS.substring(10, 12);
        tS.substring(12, 14);
        return "since " + year + "-" + moon + "-" + day;
    }
    (function (w, und) {
        Refresh();
    })();
    function Refresh() {
        if (!index.isMobile()) {
            setTimeout(() => {
                showDocumentCreationDate(); //为打开文档标题下面显示文档创建日期
            }, 500);
        }
    }
}

function changeFontSizeScroller() {
    const config = {
        theme: {
            regs: {
                fontsize: /(?<=\.b3-typography|protyle-wysiwyg|protyle-title\s*\{\s*font-size\s*:\s*)(\d+)(?=px(?:\s+\!important)?(?:\s*;|\}))/,
            },
            wheel: {
                enable: true, // 滚轮功能开关
                zoom: {
                    enable: true, // 滚轮缩放功能开关
                    threshold: 100, // 滚轮缩放阈值
                    min: 9, // 最小字号(px)
                    max: 72, // 最大字号(px)
                },
            },
            hotkeys: {
                wheel: {
                    zoom: {
                        // 鼠标滚轮缩放(Ctrl + wheel)
                        enable: true,
                        CtrlCmd: true,
                        WinCtrl: false,
                        Shift: false,
                        Alt: false,
                        type: "mousewheel",
                    },
                },
            },
        },
    };
    /**
     * 设置编辑器字号
     * REF https://github.com/siyuan-note/siyuan/blob/7fbae2f7438a313837218e419468e0b189163c6a/app/src/util/assets.ts#L120-L145
     * @param {number} fontSize 字号
     * @return {number} 设置后的字号
     * @return {null} 没有找到字号
     */
    function setFontSize(fontSize) {
        let style = document.getElementById("editorFontSize");
        if (style) {
            const height = Math.floor(fontSize * 1.625);
            style.innerHTML = `
.b3-typography, .protyle-wysiwyg, .protyle-title {font-size:${fontSize}px !important}
.b3-typography code:not(.hljs), .protyle-wysiwyg span[data-type~=code] { font-variant-ligatures: ${window.siyuan.config.editor.codeLigatures ? "normal" : "none"} }
.li > .protyle-action {height:${height + 8}px;line-height: ${height + 8}px}
.protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h1, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h2, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h3, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h4, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h5, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h6 {line-height:${height + 8}px;}
.protyle-wysiwyg [data-node-id].li > .protyle-action:after {height: ${fontSize}px;width: ${fontSize}px;margin:-${fontSize / 2}px 0 0 -${fontSize / 2}px}
.protyle-wysiwyg [data-node-id].li > .protyle-action svg {height: ${Math.max(14, fontSize - 8)}px}
.protyle-wysiwyg [data-node-id] [spellcheck="false"] {min-height:${height}px}
.protyle-wysiwyg .li {min-height:${height + 8}px}
.protyle-gutters button svg {height:${height}px}
.protyle-wysiwyg img.emoji, .b3-typography img.emoji {width:${height - 8}px}
.protyle-wysiwyg .h1 img.emoji, .b3-typography h1 img.emoji {width:${Math.floor(fontSize * 1.75 * 1.25)}px}
.protyle-wysiwyg .h2 img.emoji, .b3-typography h2 img.emoji {width:${Math.floor(fontSize * 1.55 * 1.25)}px}
.protyle-wysiwyg .h3 img.emoji, .b3-typography h3 img.emoji {width:${Math.floor(fontSize * 1.38 * 1.25)}px}
.protyle-wysiwyg .h4 img.emoji, .b3-typography h4 img.emoji {width:${Math.floor(fontSize * 1.25 * 1.25)}px}
.protyle-wysiwyg .h5 img.emoji, .b3-typography h5 img.emoji {width:${Math.floor(fontSize * 1.13 * 1.25)}px}
.protyle-wysiwyg .h6 img.emoji, .b3-typography h6 img.emoji {width:${Math.floor(fontSize * 1.25)}px}
.b3-typography:not(.b3-typography--default), .protyle-wysiwyg, .protyle-title, .protyle-title__input{font-family: "${window.siyuan.config.editor.fontFamily}", "quote", "Helvetica Neue", "Luxi Sans", "DejaVu Sans", "Hiragino Sans GB", "Microsoft Yahei", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", "EmojiSymbols" !important;}
`;
            return parseInt(config.theme.regs.fontsize.exec(style.innerHTML));
        }
        return null;
    }
    /* 字号更改 */
    function changeFontSize(delta) {
        let size = (delta / config.theme.wheel.zoom.threshold) | 0;
        let old_size = window.siyuan.config.editor.fontSize;
        let new_size = Math.max(Math.min(old_size + size, config.theme.wheel.zoom.max), config.theme.wheel.zoom.min);
        new_size = setFontSize(new_size);
        if (new_size)
            window.siyuan.config.editor.fontSize = new_size;
    }
    function isEvent(event, key) {
        return (event.type === key.type &&
            event.altKey === key.Alt &&
            event.shiftKey === key.Shift &&
            (event.ctrlKey || event.metaKey) === key.CtrlCmd &&
            (event.ctrlKey && event.metaKey) === key.WinCtrl);
    }
    document.addEventListener("mousewheel", (e) => {
        if (isEvent(e, config.theme.hotkeys.wheel.zoom)) {
            e.stopPropagation();
            setTimeout(() => changeFontSize(e.wheelDeltaY), 0);
        }
    }, true);
}

function dynamicTitleUnderline() {
    /**获取所有打开文档的标题元素 */
    function getAllDocumentTitleElement() {
        return document.querySelectorAll(".protyle-title__input");
    }
    /** 为文档标题创建动态下划线 */
    function rundynamicUnderline() {
        setInterval(dynamicUnderline, 200);
    }
    function dynamicUnderline() {
        var AllDocumentTitleElement = getAllDocumentTitleElement();
        for (let index = 0; index < AllDocumentTitleElement.length; index++) {
            const element = AllDocumentTitleElement[index];
            var line = createLine(element);
            var txt = getTileTxt(element);
            var maxWidth = element.offsetWidth;
            var Style = getComputedStyle(element, null);
            var font = Style.font;
            var width = index$1.getActualWidthOfChars(txt, { size: font }) + 13;
            if (width < 58) {
                width = 58;
            } //动态下划线最小宽度
            if (width > maxWidth) {
                width = maxWidth;
            } //不超过一行
            line.style.width = width + "px";
        }
    }
    function createLine(TitleElement) {
        var item = TitleElement.parentElement.children;
        for (let index = 0; index < item.length; index++) {
            const element = item[index];
            if (element.getAttribute("Line") != null) {
                return element;
            }
        }
        var line = index$1.insertCreateAfter(TitleElement, "div");
        line.setAttribute("Line", "true");
        line.setAttribute("class", "scc-dynamic");
        line.setAttribute("id", "doc-underline");
        line.style.opacity = "0.13";
        line.style.height = "1.3px";
        line.style.marginTop = "3.1px";
        line.style.marginBottom = "5.8px";
        line.style.backgroundImage =
            "linear-gradient(to right, #ff0000, #0070c0, #ff3399, #912997)"; //动态下划线颜色
        return line;
    }
    function getTileTxt(TitleElement) {
        return TitleElement.innerText;
    }
    (function (w, und) {
        Refresh();
    })();
    function Refresh() {
        if (!index.isMobile()) {
            setTimeout(() => {
                rundynamicUnderline(); //为文档标题创建动态下划线
            }, 500);
        }
    }
}

exports.changeFontSizeScroller = changeFontSizeScroller;
exports.dynamicTitleUnderline = dynamicTitleUnderline;
exports.showDocCreatedDate = showDocCreatedDate;
