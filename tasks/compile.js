const fs = require('fs');
const gettext = require('gulp-angular-gettext');
const gulp = require('gulp');
const yargs = require('yargs');

const file = yargs.argv.file;

if (!file) {
  throw new Error('Please specify the file to compile: --file=path/to/file.po');
} else if (file.indexOf('*') === -1) { // allow globbing
  if (!fs.existsSync(file)) {
    throw new Error('"' + file + '" does not exist!');
  } else if (!fs.statSync(file).isFile()) {
    throw new Error('"' + file + '" is not a file!');
  }
}

const target = yargs.argv.target;

if (!target) {
  throw new Error('Please specify the target folder: --target=path/to/target/folder/');
} else if (!fs.existsSync(target)) {
  throw new Error('"' + target + '" does not exist!');
} else if (!fs.statSync(target).isDirectory()) {
  throw new Error('"' + target + '" is not a folder!');
}

gulp.task('compile', function () {
  return gulp.src(file)
    .pipe(gettext.compile({ format: 'json' }))
    .pipe(gulp.dest(target));
});
