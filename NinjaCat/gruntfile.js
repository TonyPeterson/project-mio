/*global module:true, require: true */

var pngquant = require('imagemin-pngquant');
var pngcrush = require('imagemin-pngcrush');

// generates texturepacker task for a sprite
var createTPtask = function(spriteName) {
    return {
        src: ['sprites/' + spriteName + '/**/*.png'],
        options: {
            output: {
                sheet: {
                    file: 'server/public/images/' + spriteName + '.png',
                    format: 'png'
                },
                data: {
                    file: 'sprites/json/' + spriteName + '.json',
                    format: 'phaser-json-hash'
                }
            }
        }
    };
};


module.exports = function(grunt) {

    //require('time-grunt')(grunt);

    require('jit-grunt')(grunt, {
        jsonToJs: 'tools/grunt-jsonToJs.js'
    });

    // banners for JS and HTML
    var bannerTemplate = '<%= pkg.title %> | <%= pkg.homepage %> %>',
        jsBanner = '/*! ' + bannerTemplate + ' */\n',
        htmlBanner = '<!-- ' + bannerTemplate + ' -->\n';

    // project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            web: [
                'server/public/css/',
                'server/public/scripts/'
            ],
            temp: [
                'temp'
            ]
        },

        texturepacker: {
            options: {
                algorithm: 'MaxRects',
                maxrectsHeuristics: 'Best',
                padding: 2,
                maxWidth: 8192,
                maxHeight: 8192,
                disableRotation: true,
                trimMode: 'Trim',
                alphaHandling: 'ReduceBorderArtifacts',
                trimSpriteNames: true,
                prependFolderName: true
            },
            platforms_tablet: createTPtask('platforms_tablet'),
            palm_short_left: createTPtask('palm_short_left'),
            palm_short_right: createTPtask('palm_short_right'),
            palm_medium_left: createTPtask('palm_medium_left'),
            palm_medium_right: createTPtask('palm_medium_right'),
            palm_tall_left: createTPtask('palm_tall_left'),
            palm_tall_right: createTPtask('palm_tall_right'),
            palm_shared: createTPtask('palm_shared'),
            toaster_challenge: createTPtask('toaster_challenge'),
            cat_tim_badguys_plants: createTPtask('cat_tim_badguys_plants'),
            platform_landscape_misc: createTPtask('platform_landscape_misc'),
            rubegoldberg: createTPtask('rubegoldberg')
        },
        imagemin: {
            options: {
                use: [pngquant({
                    quality: 99,
                    nofs: true
                })]
            },
            sprites: {
                files: [{
                    expand: true,
                    cwd: 'server/public/images/',
                    src: [
                        'platforms_tablet.png',
                        'palm_short_left.png',
                        'palm_short_right.png',
                        'palm_medium_left.png',
                        'palm_medium_right.png',
                        'palm_tall_left.png',
                        'palm_tall_right.png',
                        'palm_shared.png',
                        'toaster_challenge.png',
                        'cat_tim_badguys_plants.png',
                        'platform_landscape_misc.png'
                    ],
                    dest: 'server/public/images/',
                }]
            }
        },
        jsonToJs: {
            ninjacat: {
                options: {
                    parent: 'app.json',
                    ensureParent: false,
                    flatten: true
                },
                files: {
                    'client/js/sprites.js': ['sprites/json/*.json']
                }
            }
        },
        concat: {
            app: {
                options: {
                    banner: '(function(){\n',
                    footer: '\n})();'
                },
                src: [
                    'client/js/namespace.js',
                    'client/js/site/*.js',
                    'client/js/controls/*.js',
                    'client/js/game/ProgrammableGameObject.js',
                    'client/js/game/**/*.js',
                    'client/js/conversations/*.js',
                    'client/js/levels/**/*.js',
                    'client/js/mods/Mod.js',
                    'client/js/mods/NinjaCatMod.js',
                    'client/js/mods/*.js',
                    'client/js/states/*.js',
                    'client/js/sprites.js',
                    'client/js/main.js',
                ],
                dest: 'server/public/scripts/app.js'
            },
            libs: {
                src: [
                    'node_modules/phaser/build/phaser.js',
                    //'node_modules/phaser/build/phaser.min.js',
                    'node_modules/underscore/underscore-min.js',
                    'client/js/libs/interact.js',
                    'client/js/libs/jquery.easing.min.js',
                    'client/js/libs/phaser-virtual-joystick.js'
                ],
                dest: 'server/public/scripts/libs.js'
            }
        },
        copy: {
            jQuery: {
                files: [{
                    src: ['node_modules/jquery/dist/jquery.min.js'],
                    dest: 'server/public/scripts/jquery.min.js'
                }]
            },
            cdn: {
                files: [{
                    expand: true,
                    cwd: 'server/public/',
                    src: ['**'],
                    dest: 'temp/cdn/'
                }]
            }
        },
        copy: {
            jQuery: {
                files: [{
                    src: ['node_modules/jquery/dist/jquery.min.js'],
                    dest: 'server/public/scripts/jquery.min.js'
                }]
            },
            cdn: {
                files: [{
                    expand: true,
                    cwd: 'server/public/',
                    src: ['**'],
                    dest: 'temp/cdn/'
                }]
            },
            css: {
                files: [{
                    src: ['client/css/app.css'],
                    dest: 'server/public/css/app.css'
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: true,
                ignores: ['tools/**/*.js']
            },
            all: {
                src: [
                    'Gruntfile.js',
                    'client/js/**/*.js',
                    '!client/js/libs/*.js',
                    '!client/js/sprites.js',
                    'tools/**/*.js',
                    'server/**/*.js',
                    '!server/public/**/*.js'
                ]
            }
        },
        uglify: {
            includeBanner: {
                options: {
                    banner: jsBanner
                },
                files: {
                    'server/public/scripts/app.js': ['server/public/scripts/app.js']
                }
            },
            noBanner: {
                files: {
                    'server/public/scripts/libs.js': ['server/public/scripts/libs.js']
                }
            }
        },
        cssmin: {
            options: {
                rebase: false
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'server/public/css/',
                    src: ['*.css'],
                    dest: 'server/public/css',
                    ext: '.css'
                }]
            }
        },
        ver: {
            cdn: {
                baseDir: 'temp/cdn/',
                phases: [{
                    files: [
                        'temp/cdn/images/**',
                        'temp/cdn/fonts/**',
                        '!Thumbs.db',
                    ],
                    references: [
                        'temp/cdn/scripts/app.js',
                        'temp/cdn/css/app.css'
                    ]
                }, {
                    files: [
                        'temp/cdn/css/*.css',
                        'temp/cdn/scripts/*.js'
                    ]
                }],
                versionFile: 'server/cdnVersions.json'
            }
        },
        watch: {
            options: {
                interval: 1000
            },
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                },
                tasks: ['concat', 'copy:css']
            },
            css: {
                files: ['client/css/*.css'],
                tasks: ['copy:css']
            },
            js: {
                files: ['client/**/*.js'],
                tasks: ['concat', 'jshint']
            // },
            // sprite: {
            //     files: ['sprites/**/*.png'],
            //     tasks: ['sprites']
            }
        }
    });

    grunt.registerTask('debug', [
        'newer:jshint',
        'newer:copy:jQuery',
        'newer:concat',
        'newer:copy:css',
    ]);

    // re-compile sprite JSON
    grunt.registerTask('json', [
        'jsonToJs',
        'concat',
        'debug'
    ]);

    grunt.registerTask('sprites', [
        'texturepacker',
        'json',
        'newer:imagemin:sprites'
    ]);

    grunt.registerTask('ship', [
        'copy:jQuery',
        'concat',
        'copy:css',
        'cssmin',
        'uglify'
    ]);

    grunt.registerTask('azure', [
        'clean',
        'ship'
    ]);

    grunt.registerTask('default', 'debug');

};