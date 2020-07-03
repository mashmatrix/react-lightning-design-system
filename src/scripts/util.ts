import createUUID from 'uuid';

export const uuid =
  process.env.NODE_ENV === 'test' ? () => '$uuid$' : createUUID;

export const getToday =
  process.env.NODE_ENV === 'test'
    ? () => '2017-02-23'
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
  style.appendChild(document.createTextNode(''));
  document.documentElement.appendChild(style);
  for (const ruleSet of rules) {
    const declaration = ruleSet.pop();
    let selectors = ruleSet;
    selectors = selectors.concat(selectors.map((s) => `.slds ${s}`));
    const rule = `${selectors.join(', ')} ${declaration}`;
    (style.sheet as CSSStyleSheet).insertRule(rule, 0);
  }
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
};
