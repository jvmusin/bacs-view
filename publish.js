const ghpages = require('gh-pages');
const path = 'dist';

console.log('Deploy was started...');
ghpages.publish(path, {
  dest: 'bacs-view',
  repo: 'https://github.com/Ploffi/ploffi.github.io.git',
  branch: 'master'
});