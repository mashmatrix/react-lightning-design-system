import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories/index.js');
}

configure(loadStories, module);
