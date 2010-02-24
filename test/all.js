exports.unittest = require('./ringo/unittest_test');
exports.args = require('./ringo/args_test');
exports.array = require('./core/array_test');
exports.buffer = require('./ringo/buffer_test')
exports.object = require('./core/object_test');
exports.file = require('./ringo/file_test');
exports.skin = require('./ringo/skin_test');
exports.file = require('./file/all');
exports.binary = require('./binary/all');
exports.repository = require('./repository/all');
exports.io = require('./io_test');
exports.modules = require('./modules/all');

// start the test runner if we're called directly from command line
if (require.main == module.id) {
    require('ringo/unittest').run(exports);
}
