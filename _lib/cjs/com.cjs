/*!
* sofill v1.1.10
* https://github.com/Hi-Windom/Sofill
* https://www.npmjs.com/package/sofill
* https://jsr.io/@sisi/sofill
*/
'use strict';

var ConfirmDialog1 = /*html*/ `
<div class="SCC-wrapper"></div><div class="b3-dialog--open"><div class="SCC-dialog b3-dialog ConfirmDialog"><div class="b3-dialog__scrim"></div><div class="b3-dialog__container" style="width:520px"><svg class="SCC-close b3-dialog__close fn__a"><use xlink:href="#iconClose"></use></svg><div class="b3-dialog__header" onselectstart="return false;">⚠️ 清空操作确认</div><div style="height:auto"><div class="b3-dialog__content">确定清除 <b>主题全部配置数据</b>? 操作不可恢复！<br><br><span style="color:red;font-size:1.02rem">用户自定义配置和主题数据将丢失</span></div><div class="b3-dialog__action"><button class="SCC-default b3-button b3-button--cancel">取消</button><div class="fn__space"></div><button class="SCC-primary b3-button b3-button--text" id="SC_winsay_confirmDialog_ConfirmBtn">确定</button></div></div></div></div></div>
`;
var ConfirmDialog2 = /*html*/ `
<div class="SCC-wrapper"></div><div class="b3-dialog--open"><div class="SCC-dialog b3-dialog ConfirmDialog"><div class="b3-dialog__scrim"></div><div class="b3-dialog__container" style="width:520px"><svg class="SCC-close b3-dialog__close fn__a"><use xlink:href="#iconClose"></use></svg><div class="b3-dialog__header" onselectstart="return false;">⚠️ 重置操作确认</div><div style="height:auto"><div class="b3-dialog__content">确定重置 <b>所有自定义设置数据</b>? 操作不可恢复！<br><br><span style="color:green;font-size:1.02rem">形态记忆等主题数据不会受影响</span></div><div class="b3-dialog__action"><button class="SCC-default b3-button b3-button--cancel">取消</button><div class="fn__space"></div><button class="SCC-primary b3-button b3-button--text" id="SC_winsay_confirmDialog_ConfirmBtn">确定</button></div></div></div></div></div>
`;
var ConfirmDialog3 = /*html*/ `
<div class="SCC-wrapper"></div><div class="b3-dialog--open"><div class="SCC-dialog b3-dialog ConfirmDialog"><div class="b3-dialog__scrim"></div><div class="b3-dialog__container" style="width:520px"><svg class="SCC-close b3-dialog__close fn__a"><use xlink:href="#iconClose"></use></svg><div class="b3-dialog__header" onselectstart="return false;">⚠️ 覆盖操作确认</div><div style="height:auto"><div class="b3-dialog__content">确定覆盖 <b>已有配置数据</b>? 操作不可恢复！<br><br><span id="CoverWarming" style="color:blue;font-size:1.02rem"></span></div><div class="b3-dialog__action"><button class="SCC-default b3-button b3-button--cancel">取消</button><div class="fn__space"></div><button class="SCC-primary b3-button b3-button--text" id="SC_winsay_confirmDialog_ConfirmBtn">确定</button></div></div></div></div></div>
`;
var ConfirmDialog4 = /*html*/ `
<div class="SCC-wrapper"></div><div class="b3-dialog--open"><div class="SCC-dialog b3-dialog ConfirmDialog"><div class="b3-dialog__scrim"></div><div class="b3-dialog__container" style="width:520px"><svg class="SCC-close b3-dialog__close fn__a"><use xlink:href="#iconClose"></use></svg><div class="b3-dialog__header" onselectstart="return false;">🌐 更新操作确认</div><div style="height:auto"><div class="b3-dialog__content">更新可用： <b><span id="UpdateInfo"></span></b><br><br><span id="CoverWarming" style="color:blue;font-size:1.02rem"></span></div><div class="b3-dialog__action"><button class="SCC-default b3-button b3-button--cancel">取消</button><div class="fn__space"></div><button class="SCC-primary b3-button b3-button--text" id="SC_winsay_confirmDialog_ConfirmBtn">确定</button></div></div></div></div></div>
`;
var ConfirmDialog5 = /*html*/ `
<div class="SCC-wrapper"></div><div class="b3-dialog--open"><div class="SCC-dialog b3-dialog ConfirmDialog"><div class="b3-dialog__scrim"></div><div class="b3-dialog__container" style="width:520px"><svg class="SCC-close b3-dialog__close fn__a"><use xlink:href="#iconClose"></use></svg><div class="b3-dialog__header" onselectstart="return false;">🚧 调试信息确认</div><div style="height:auto"><div class="b3-dialog__content" style="padding: 13px 31px 3px 34px;"><b><span id="UpdateInfo"></span></b><br><br><span id="CoverWarming" style="color:blue;font-size:1.02rem"></span></div></div></div></div></div>
`;
var ConfirmDialog6 = /*html*/ `
<div class="SCC-wrapper"></div><div class="b3-dialog--open"><div class="SCC-dialog b3-dialog ConfirmDialog"><div class="b3-dialog__scrim"></div><div class="b3-dialog__container" style="width:520px"><svg class="SCC-close b3-dialog__close fn__a"><use xlink:href="#iconClose"></use></svg><div class="b3-dialog__header" onselectstart="return false;">☢️ 主题自我保护警告</div><div style="height:auto"><div class="b3-dialog__content" style="padding: 13px 31px 3px 34px;"><b><span id="Info"></span></b><br><br><span id="CoverWarming" style="color:blue;font-size:1.02rem"></span><div class="b3-dialog__action"><button class="SCC-default b3-button b3-button--cancel">取消</button><div class="fn__space"></div><button class="SCC-primary b3-button b3-button--text" id="SC_winsay_confirmDialog_ConfirmBtn">确定</button></div></div></div></div></div></div>
`;
var ConfirmDialog7 = /*html*/ `
<div class="SCC-wrapper"></div><div class="b3-dialog--open"><div class="SCC-dialog b3-dialog ConfirmDialog"><div class="b3-dialog__scrim"></div><div class="b3-dialog__container" style="width:520px"><svg class="SCC-close b3-dialog__close fn__a"><use xlink:href="#iconClose"></use></svg><div class="b3-dialog__header" onselectstart="return false;">♻️ 一次性通知</div><div style="height:auto"><div class="b3-dialog__content" style="padding: 13px 31px 3px 34px;"><b><span id="UpdateInfo"></span></b><br><br><span id="CoverWarming" style="color:blue;font-size:1.02rem"></span></div></div></div></div></div>
`;
var ConfirmDialog8 = /*html*/ `
<div class="SCC-wrapper"></div><div class="b3-dialog--open"><div class="SCC-dialog b3-dialog ConfirmDialog"><div class="b3-dialog__scrim"></div><div class="b3-dialog__container" style="width:520px"><svg class="SCC-close b3-dialog__close fn__a"><use xlink:href="#iconClose"></use></svg><div class="b3-dialog__header" onselectstart="return false;">☢️ 跨平台警告</div><div style="height:auto"><div class="b3-dialog__content" style="padding: 13px 31px 3px 34px;"><b><span id="UpdateInfo"></span></b><br><br><span id="CoverWarming" style="color:blue;font-size:1.02rem"></span></div></div></div></div></div>
`;

exports.ConfirmDialog1 = ConfirmDialog1;
exports.ConfirmDialog2 = ConfirmDialog2;
exports.ConfirmDialog3 = ConfirmDialog3;
exports.ConfirmDialog4 = ConfirmDialog4;
exports.ConfirmDialog5 = ConfirmDialog5;
exports.ConfirmDialog6 = ConfirmDialog6;
exports.ConfirmDialog7 = ConfirmDialog7;
exports.ConfirmDialog8 = ConfirmDialog8;
