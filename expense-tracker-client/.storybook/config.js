import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/stories/table');
  require('../src/stories/form');
}

configure(loadStories, module);
