const fs = require('fs');

const dependencies = [
  { src: 'node_modules/jquery/dist/jquery.min.js', dest: 'src/dependencies/jquery.min.js' },
];
// todo how to copy font-awesome
console.log('Copying dependencies...');

// create directory if not exists
try {
  fs.mkdirSync('src/dependencies');
} catch (err) {}

for (const dependency of dependencies) {
  fs.copyFileSync(dependency.src, dependency.dest);
}
