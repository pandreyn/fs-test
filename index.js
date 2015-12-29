/**
 * Created by apetkevich on 29.12.2015.
 */

var chokidar = require('chokidar');
var fse = require('fs-extra');
var path = require('path');

var watcher = chokidar.watch('D:\\Google Диск', {
  ignored: /[\/\\]\./, persistent: true
});

var log = console.log.bind(console);

function onChange(filename, stats){
  log('-------------File', filename, 'has been changed');
  if (stats) {
    log('File', filename, 'changed size to', stats.size);
    var newFilename = 'c:\\1\\' + path.basename(filename);
    fse.copy(filename, newFilename, function (err) {
      if (err) return console.error(err)
      console.log("copied success!")
    }) // copies file
  };
}

watcher
    .on('add', function(filename) { log('File', filename, 'has been added'); })
    .on('addDir', function(filename) { log('Directory', filename, 'has been added'); })
    .on('change', onChange)
    .on('unlink', function(filename) { log('File', filename, 'has been removed'); })
    .on('unlinkDir', function(filename) { log('Directory', filename, 'has been removed'); })
    .on('error', function(error) { log('Error happened', error); })
    .on('ready', function() { log('Initial scan complete. Ready for changes.'); })
    .on('raw', function(event, filename, details) { log('Raw event info:', event, filename, details); })

//// 'add', 'addDir' and 'change' events also receive stat() results as second
//// argument when available: http://nodejs.org/api/fs.html#fs_class_fs_stats
//watcher.on('change', function(filename, stats) {
//  if (stats) console.log('File', filename, 'changed size to', stats.size);
//});

//// Watch new files.
//watcher.add('new-file');
//watcher.add(['new-file-2', 'new-file-3', '**/other-file*']);
//
//// Un-watch some files.
//watcher.unwatch('new-file*');
//
//// Only needed if watching is `persistent: true`.
//watcher.close();
//
//// One-liner
//require('chokidar').watch('.', {ignored: /[\/\\]\./}).on('all', function(event, filename) {
//  console.log(event, filename);
//});