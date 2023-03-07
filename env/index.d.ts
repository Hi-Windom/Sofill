export * from './platform';
declare const config_Custom = "/conf/appearance/themes/Sofill-/config/Custom.json";
declare const config_UI = "/conf/appearance/themes/Sofill-/config/UI.json";
declare const themeStyle: HTMLLinkElement;
declare const THEME_ROOT: string;
declare const winsay_ROOT = "/appearance/themes/Sofill-/";
declare const winsay_ROOT_ABS: string;
declare const S2_BASE = "/appearance/themes/Sofill-/style-S2/";
declare const S2_BASE_ABS: string;
declare const ID_COLOR_STYLE = "theme-color-style";
declare var ThemeName: string;
declare var AliaName: string;
declare const IDs: {
    STYLE_COLOR: string;
    BUTTON_TOOLBAR_CHANGE_COLOR: string;
};
declare var colors: string[];
declare var colors2: string[];
declare const latest_LC_ID = "SC_winsay_cp_custom__LS";
declare const latest_DC_ID = "SC_winsay_cp_custom__DS";
declare var Iterator: (items: any) => Generator<any, never, unknown>;
declare var Iterator2: (items: any) => Generator<any, never, unknown>;
/**
 * 获取客户端模式
 * @return {string} 'app' 或 'desktop' 或 'mobile'
 */
declare var clientMode: string;
declare var apitoken: string;
export { clientMode, Iterator2, Iterator, latest_DC_ID, latest_LC_ID, colors2, colors, IDs, ID_COLOR_STYLE, THEME_ROOT, winsay_ROOT, winsay_ROOT_ABS, S2_BASE, S2_BASE_ABS, themeStyle, config_UI, config_Custom, ThemeName, AliaName, apitoken, };
