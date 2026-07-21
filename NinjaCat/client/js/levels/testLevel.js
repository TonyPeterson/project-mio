(function() {

    app.levels.testLevel = {

        width: 9800,
        height: 2525,

        startPosition: {
            x: app.scale(450),
            y: app.scale(1700)
        },

        // backgroundGradient: [
        //     { stop: 0,   color: '#FF0000' },
        //     { stop: 0.5, color: '#00FF00' },
        //     { stop: 1.0, color: '#0000FF' },
        // ],

        layers: [

            // background gradient
            {
                type: 'tilesprite',
                x: 0,
                y: 0,
                w: 11000,
                h: 2525,
                key: 'level-bg'
            },

            // stars
            {
                type: 'tilesprite',
                x: 0,
                y: 0,
                w: 11000,
                h: 2512,
                key: 'stars'
            },

            // spawn island
            {
                type: 'platform-island',
                x: -300,
                y: 1950,
                segments: [{
                    frame: 'island_01',
                    offsetX: -72,
                    offsetY: -63
                }]
            },


            {
                type: 'sprite',
                key: 'platform_landscape_misc',
                frame: 'island_005',
                tabletKey: 'platforms_tablet',
                tabletFrame: 'island_005',
                x: 800,
                y: 1450,
            },



            // // group
            // {
            //     type: 'group',
            //     x: 1900,
            //     y: 1600,
            //     children: [
            //         {
            //             type: 'platform-island',
            //             segments: [
            //                 { frame: 'island_005', offsetX: 0, offsetY: -22 }
            //             ]
            //         },
            //         {
            //             type: 'plant',
            //             plantType: 'plant01',
            //             x: 200
            //         }                    
            //     ]
            // },


            // up/down platform
            {
                type: 'platform-updown',
                x: 2000,
                y: 1200,
                width: 400,
                sway: 900,
                speed: 400
            },

            // // left/right platform
            // {
            //     type: 'platform-leftright',
            //     x: 2800,
            //     y: 2000,
            //     width: 800,
            //     sway: 800,
            //     speed: 300
            // },

            // {
            //     type: 'platform-sinking',
            //     x: 4000,
            //     y: 1750,
            //     width: 500,
            //     sink: 600,
            //     speed: 100
            // },


            // custom platform example (shouldn't be needed')
            // {
            //     type: 'platform',
            //     x: -300,
            //     y: 1950,
            //     sprites: [{

            //         // the render location of the sprite
            //         x: 0, y: 0,

            //         // the name of the sprite that contains the frame (corresponds to the subfolder under /sprites)
            //         key: 'platform_landscape_misc',

            //         // the name of the frame within the sprite (corresponds to the filename of the image)
            //         frame: 'island_001'
            //     },{

            //         // use a second sprite to construct the other half of the platform
            //         x: 1000, y: -60,
            //         key: 'platform_landscape_misc',
            //         frame: 'island_002'
            //     }],
            //     body: {
            //         // the width and height of object collision area (hit d to preview)
            //         width: 2560,
            //         height: 200,

            //         // the x,y location of the collision area relative to the graphics  
            //         offsetY: 0,
            //         offsetX: 0
            //     }
            // },    



        ]

    };

})();