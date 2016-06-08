let assetRoot = '/assets';
const symbolFiles = {};

export function setAssetRoot(path) {
  assetRoot = path;
}

export function getAssetRoot() {
  return assetRoot;
}

export function clearSymbolPaths() {
  Object.keys(symbolFiles).forEach(key => {
    delete symbolFiles[key];
  });
}

// get the file path for a single symbols file by type
export function getSymbolsFilePath(type) {
  return symbolFiles[type];
}

// updates the symbols file object by assigning
// all differences passed in
export function setSymbolsFilePath(updates) {
  return Object.assign(symbolFiles, updates);
}

export function registerStyle(styleName, rules) {
  const styleId = 'react-slds-cssfix-' + styleName;
  let style = document.getElementById(styleId);
  if (style) { return; }
  style = document.createElement('style');
  style.id = styleId;
  style.appendChild(document.createTextNode(''));
  document.documentElement.appendChild(style);
  for (const ruleSet of rules) {
    const declaration = ruleSet.pop();
    let selectors = ruleSet;
    selectors = selectors.concat(selectors.map((s) => '.slds ' + s));
    const rule = selectors.join(', ') + ' ' + declaration;
    style.sheet.insertRule(rule, 0);
  }
}

export default { setAssetRoot, getAssetRoot, registerStyle, getSymbolsFilePath, setSymbolsFilePath };
