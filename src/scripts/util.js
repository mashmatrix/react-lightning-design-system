let assetRoot = '/asset';

function setAssetRoot(path) {
  assetRoot = path;
}

function getAssetRoot() {
  return assetRoot;
}

export default { setAssetRoot, getAssetRoot };
