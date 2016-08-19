let assetRoot = '/assets';

export function setAssetRoot(path) {
  assetRoot = path;
}

export function getAssetRoot() {
  return assetRoot;
}

export function registerStyle(styleName, rules) {
  const styleId = `react-slds-cssfix-${styleName}`;
  let style = document.getElementById(styleId);
  if (style) { return; }
  style = document.createElement('style');
  style.id = styleId;
  style.appendChild(document.createTextNode(''));
  document.documentElement.appendChild(style);
  for (const ruleSet of rules) {
    const declaration = ruleSet.pop();
    let selectors = ruleSet;
    selectors = selectors.concat(selectors.map((s) => `.slds ${s}`));
    const rule = `${selectors.join(', ')} ${declaration}`;
    style.sheet.insertRule(rule, 0);
  }
}

export function cleanProps(props, propTypes) {
  const newProps = props;
  Object.keys(propTypes).forEach((key) => {
    delete newProps[key];
  });
  return newProps;
}

export default { setAssetRoot, getAssetRoot, registerStyle, cleanProps };
