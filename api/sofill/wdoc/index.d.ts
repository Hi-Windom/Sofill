/**
 * 获得焦点所在的块
 * @return {HTMLElement} 光标所在块
 * @return {null} 光标不在块内
 */
export declare function getFocusedBlock(): HTMLElement;
/**
 * 获得焦点所在块 ID
 * @return {string} 块 ID
 * @return {null} 光标不在块内
 */
export declare function getFocusedBlockID(): string;
/**
 * 获得焦点所在文档
 * @return {HTMLElement} 焦点所在文档
 * @return {null} 没有聚焦的文档
 */
export declare function getFocusedDoc(): Element;
/**
 * 获得焦点所在文档的背景
 * @return {HTMLElement} 焦点所在文档的背景
 * @return {null} 没有聚焦的文档
 */
export declare function getFocusedDocBackground(): Element;
/**
 * 获得焦点所在文档的 ID
 * @return {string} 文档 ID
 * @return {null} 没有聚焦的文档
 */
export declare function getFocusedDocID(): any;
/**
 * 获得焦点所在的块 ID, 否则获得焦点所在文档的 ID
 * @return {string} 块 ID 或文档 ID
 * @return {null} 光标不在块内或文档内
 */
export declare function getFocusedID(): any;
