/*!
* sofill v1.0.33
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
*/
function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === 'undefined') {
    return;
  }
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "@layer {\n  /* 所有边距初始化 */\n  * {\n    margin: 0px;\n    padding: 0px;\n  }\n}\nbody.body--win32 {\n  -webkit-font-smoothing: antialiased;\n  border: none !important;\n  /* 去掉软件的边框线 */\n}\n/* https://www.zhangxinxu.com/wordpress/2019/03/css-focus-visible */\n:focus:not(:focus-visible) {\n  outline: 0;\n}\nhtml,\nbody {\n  overflow: hidden;\n}\n.fn__flex-1,\n.layout__wnd--active {\n  overflow-x: hidden;\n}\nul {\n  /* https://www.zhangxinxu.com/wordpress/2018/10/scroll-behavior-scrollintoview-%e5%b9%b3%e6%bb%91%e6%bb%9a%e5%8a%a8/# */\n  scroll-behavior: smooth;\n  scroll-snap-type: x mandatory;\n  /* 把滚动条的位置提前预留好（空白） */\n  scrollbar-gutter: stable;\n  overflow-anchor: auto;\n}\nul li {\n  /* https://www.zhangxinxu.com/wordpress/2018/11/know-css-scroll-snap/ */\n  scroll-snap-align: start;\n}\n/* 可能对解决动画动效抖动抽搐有帮助 */\n#layouts,\n#layouts > div.fn__flex.fn__flex-1,\n#layouts > div.fn__flex.fn__flex-1 > div.layout__center.fn__flex.fn__flex-1 {\n  transition-delay: 0.31s !important;\n}\n/* 块添加圆角 */\n.protyle-wysiwyg [data-node-id] {\n  border-radius: 1px;\n}\n/* 块标提示不被窗口线遮挡 */\n.protyle-gutters {\n  z-index: 2;\n}\n/* 表单设置不能拖拽缩放 */\ntextarea.b3-text-field.fn__flex-1 {\n  border: 1px solid transparent;\n  resize: none;\n}\n@font-face {\n  font-family: \"SC BASE\";\n  src: local(\"PingFang SC\"), local(\"Microsoft Yahei\");\n}\n@font-face {\n  font-family: quote;\n  src: local(\"SimSun\");\n  unicode-range: U+201c, U+201d;\n  /* 中文双引号使用宋体样式 #162 */\n}\n:root {\n  /* 字体 */\n  --b3-font-family: quote, \"Inter\", \"Inter-Regular\", \"HarmonyOS Sans SC\", \"Noto Sans\", \"Noto Sans CJK SC\", \"SC BASE\", \"WenQuanYi Micro Hei\", sans-serif, \"Segoe UI\", Roboto, \"Helvetica Neue\",\n    Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  --b3-font-family-code: \"JetBrainsMono-Regular\", mononoki, Consolas, \"Liberation Mono\", Menlo, Courier, monospace, \"Apple Color Emoji\",\n    \"Segoe UI Emoji\", \"Noto Color Emoji\", \"Segoe UI Symbol\", \"Android Emoji\", \"EmojiSymbols\", \"SC BASE\";\n  --b3-font-family-graph: mononoki;\n  --b3-font-family-emoji: \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Segoe UI\", \"Apple Color Emoji\", \"Twemoji Mozilla\", \"Noto Color Emoji\", \"Android Emoji\";\n  --b3-font-family-math: KaTeX_Math;\n}\n/* 容器 */\n.b3-typography,\n.protyle-wysiwyg.protyle-wysiwyg--attr {\n  container-type: inline-size;\n  container-name: doc;\n}\n.protyle-wysiwyg__embed {\n  container-type: inline-size;\n  container-name: embedBreadrumb;\n}\n.file-tree.sy__file {\n  container-type: inline-size;\n  container-name: FileTree;\n  overflow-y: hidden;\n}\n.b3-tab-bar.b3-list--background:has(li[data-name=\"editor\"]) {\n  container-type: size;\n  container-name: settingLeft;\n}\n/* @media screen and (min-width: 700px) {\n  #toolbar {\n    container-type: inline-size;\n    container-name: toolbar;\n    z-index: 999;\n    padding-right: 3px;\n  }\n} 没有明显效果*/\n/* @container (min-width: 100px) {\n  #toolbar .toolbar__item {\n     flex-shrink: 0;\n     padding: 9px max(min(0.58cqw,9px),4px) 9px max(min(0.58cqw,9px),4px);\n     box-sizing: border-box;\n }\n } */\n";
styleInject(css_248z);
