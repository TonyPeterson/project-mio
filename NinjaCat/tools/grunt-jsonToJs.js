
module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('jsonToJs', 'Converts JSON into JS', function() {

        var options = this.options({
            separator: grunt.util.linefeed,
            parent: 'app',
            ensureParent: true,
            flatten: false
        });

        // Iterate over all src-dest file pairs.
        this.files.forEach(function(f) {

            // keep track of vars that we need to ensure
            var ensureVars = [];

            var output = f.src.filter(function(filepath) {

                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('JSON file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }

            }).map(function(filepath) {

                // Read file source.
                var fileText = grunt.file.read(filepath),

                    // gets all directories (filename popped below)
                    dirs = filepath.split('/'),

                    // gets the filename without extension
                    name = dirs.pop().split('.').shift(),

                    currentParent = options.parent,

                    i, len;

                if (!options.flatten) {
                    // ensure that parent dictionaries will be created
                    for (i = 0, len = dirs.length; i < len; i++) {
                        currentParent += '.' + dirs[i];
                        if (ensureVars.indexOf(currentParent) < 0) {
                            ensureVars.push(currentParent);
                        }
                    }
                }

                // assign the JSON text to the var (name constructed from path)
                return currentParent + '["' + name + '"] = ' + fileText + ';';
                
            }).join(grunt.util.normalizelf(options.separator));


            if (options.ensureParent) {
                output = 
                    'var ' + options.parent + ' = ' + options.parent + ' || {};\n' +
                    ensureVars.map(function(varName) {
                        return varName + ' = ' + varName + ' || {};';
                    }).join('\n') + '\n\n' + output;
            }

            // Write the destination file.
            grunt.file.write(f.dest, output);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');

        });

    });

};