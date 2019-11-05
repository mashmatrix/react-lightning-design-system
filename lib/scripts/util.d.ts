export declare const uuid: any;
export declare const getToday: () => string;
export declare function setAssetRoot(path: string): void;
export declare function getAssetRoot(): string;
export declare function registerStyle(styleName: string, rules: string[][]): void;
export declare function isElInChildren(rootEl: any, targetEl: any): boolean;
export declare function offset(el: HTMLElement): {
    top: number;
    left: number;
};
export declare function cleanProps(props: object, propTypes: object): object;
declare const _default: {
    setAssetRoot: typeof setAssetRoot;
    getAssetRoot: typeof getAssetRoot;
    registerStyle: typeof registerStyle;
    isElInChildren: typeof isElInChildren;
    offset: typeof offset;
    cleanProps: typeof cleanProps;
};
export default _default;
