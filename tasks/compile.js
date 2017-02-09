const fs = require('fs');
const gettext = require('gulp-angular-gettext');
const gulp = require('gulp');
const yargs = require('yargs');

const source = yargs.argv.source;

if (!source) {
  throw new Error('Please specify the source file to compile: --source=path/to/source/file.po');
} else if (source.indexOf('*') === -1) { // allow globbing
  if (!fs.existsSync(source)) {
    throw new Error('"' + source + '" does not exist!');
  } else if (!fs.statSync(source).isFile()) {
    throw new Error('"' + source + '" is not a file!');
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
  return gulp.src(source)
    .pipe(gettext.compile({ format: 'json' }))
    .pipe(gulp.dest(target));
});
