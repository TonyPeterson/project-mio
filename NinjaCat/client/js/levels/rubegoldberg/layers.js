(function () {

    var level = app.levels.rubegoldberg;

    level.layers = [

        {
            //multi-box ruin
            type: 'collidable',
            x: 10,
            y: 2400,
            key: 'platform_landscape_misc',
            frame: 'Transp1x1',
            anchor: {
                x: 0,
                y: 1
            },
            multiBox: [{
                x: 0,
                y: 0,
                width: 10,
                height: 2400
	        }]
	    },

        {
            type: 'tilesprite',
            x: 0,
            y: 0,
            w: level.width,
            h: 2512,
            key: 'stars',
            backgroundDistance: app.starsDistance
	    },

        {
            //Crashed pod
            type: 'animatedsprite',
            x: -100,
            y: 1450,
            frameSet: 'pod'
	    },

        {
            type: 'sprite',
            x: -100,
            y: 2525,
            anchor: {
                x: 0,
                y: 1
            },
            key: 'platform_landscape_misc',
            frame: 'mountains_01',
            backgroundDistance: app.mountainsDistance
	    },

        {
            type: 'sprite',
            x: 500,
            y: 1250,
            key: 'platform_landscape_misc',
            frame: 'clouds_01',
            backgroundDistance: app.cloudsDistance
	    },

        {
            type: 'sprite',
            x: 8000,
            y: 2000,
            key: 'platform_landscape_misc',
            frame: 'island_back_08',
            backgroundDistance: app.mountainsDistance
	    },

        {
            type: 'sprite',
            x: 1900,
            y: 900,
            key: 'platform_landscape_misc',
            frame: 'planet_big_02',
            scale: 0.6,
            backgroundDistance: app.planetsDistance
	    },

        {
            type: 'sprite',
            x: 2200,
            y: 2525,
            anchor: {
                x: 0,
                y: 1
            },
            key: 'platform_landscape_misc',
            frame: 'mountains_02',
            backgroundDistance: app.mountainsDistance
	    },

        {
            type: 'sprite',
            x: 2900,
            y: 2100,
            key: 'platform_landscape_misc',
            frame: 'clouds_04',
            backgroundDistance: app.cloudsDistance
	    },

        {
            type: 'sprite',
            x: 5000,
            y: 2525,
            anchor: {
                x: 0,
                y: 1
            },
            key: 'platform_landscape_misc',
            frame: 'mountains_01',
            backgroundDistance: app.mountainsDistance
	    },

        {
            type: 'sprite',
            x: 4600,
            y: 500,
            key: 'platform_landscape_misc',
            frame: 'planet_big_02',
            scale: 1,
            backgroundDistance: app.planetsDistance
	    },

//////////////////////////////////
//CRASH SITE TO SPAWN FLOWER 1
//////////////////////////////////

        {
            type: 'group',
            x: 0,
            y: 1950,
            children: [

                // 1st island
                {
                    type: 'group',
                    x: 0,
                    y: 0,
                    children: [{
                        type: 'platform-island',
                        segments: [
                            { frame: 'island_02', offsetX: 0, offsetY: -45 },
                            { frame: 'island_008', offsetX: -60, offsetY: -21 }
                        ]
                    }] 
                },

                // machine
                {
                    type: 'group',
                    x: 800,
                    y: 0,
                    depthGroup: 'back',
                    children: [

                        {
                            type: 'object',
                            objectType: 'RubeMachine',
                            depthGroup: 'back',
                            x: 0,
                            y: 0,
                            isProgrammable: true,
                            challengeTriggerConfig: {
                                // begin and end x are in world space and are compared against ninja cat's position
                                beginX: 825,
                                endX: 965,
                                stopCameraFollowing: true,
                                adjustCamera: {
                                    x: 300,
                                    y: -300
                                }
                            },
                            snippetSets: [
                                {
                                    name: "spikeSnippets",
                                    spriteNameForSnippets: "spikePosition",
                                    snippetsOffset: {
                                        x: 575,
                                        y: 450
                                    },
                                    snippets: [{
                                        id: "spike:move",
                                        title: "Move Spike",
                                        image: "spike-move.gif",
                                        number: 1,
                                        method: "moveSpike",
                                        code: "spike.move([options_0]);",
                                        parameterOptions: [{
                                            name: "position",
                                            type: "select",
                                            options: ["A", "B", "C"]
                                        }]
                                    }]
                                },
                                {
                                    name: "monsterSnippets",
                                    spriteNameForSnippets: "cyber",
                                    snippetsOffset: {
                                        x: 150,
                                        y: 650
                                    },
                                    snippets: [{
                                        id: "monster:debug",
                                        title: "Debug",
                                        image: "rube-monster-debug.gif",
                                        number: 1,
                                        type: "debug",
                                        method: "debugMonster",
                                        code: "var monster = {\n" + 
                                            "   color: \"green\",\n" +
                                            "   hungry: true,\n" +
                                            "   sleeping: [options_0], // haha!\n" +
                                            "   likes: \"cheese\"\n" +
                                            "};",
                                        cardCode: "var monster = {...};",
                                        parameterOptions: [{
                                            name: "setMonsterSleeping",
                                            type: "select",
                                            options: ["true", "false"]
                                        }]
                                    }]
                                }
                            ]
                        }
                    ] 
                },

                
            ]
        }        
        
	];
})();