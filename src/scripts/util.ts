import { updateScroll } from 'react-relative-portal';

export const getToday =
  process.env.NODE_ENV === 'test'
    ? () => '2022-05-18'
    : () => new Date().toISOString().substring(0, 10);

let assetRoot = '/assets';

export function setAssetRoot(path: string) {
  assetRoot = path;
}

export function getAssetRoot() {
  return assetRoot;
}

export function registerStyle(styleName: string, rules: string[][]) {
  const styleId = `react-slds-cssfix-${styleName}`;
  if (document.getElementById(styleId)) {
    return;
  }
  const style = document.createElement('style');
  style.id = styleId;
  const styleText = rules
    .map((ruleSet) => {
      const declaration = ruleSet.pop();
      let selectors = ruleSet;
      selectors = selectors.concat(selectors.map((s) => `.slds ${s}`));
      return `${selectors.join(', ')} ${declaration}`;
    })
    .join('\n');
  style.appendChild(document.createTextNode(styleText));
  document.documentElement.appendChild(style);
}

export function isElInChildren(rootEl: any, targetEl: any) {
  /* eslint-disable no-param-reassign */
  while (targetEl && targetEl !== rootEl) {
    targetEl = targetEl.parentNode;
  }

  return !!targetEl;
}

export function offset(el: HTMLElement) {
  const rect = el.getBoundingClientRect();

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft,
  };
}

export function cleanProps(props: object, propTypes: object) {
  const newProps = props;
  Object.keys(propTypes).forEach((key) => {
    // @ts-ignore
    delete newProps[key];
  });
  return newProps;
}

export default {
  setAssetRoot,
  getAssetRoot,
  registerStyle,
  isElInChildren,
  offset,
  cleanProps,
  updateScroll,
};
