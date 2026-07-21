(function () {
    app.levels.level1.layers = [{
        type: "collidable",
        x: 10,
        y: 2400,
        key: "platform_landscape_misc",
        frame: "Transp1x1",
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
    }, {
        type: "platform-leftright",
        x: 0,
        y: 2540,
        width: 400,
        sway: 75000,
        speed: 800
    }, {
        type: "tilesprite",
        x: 0,
        y: 0,
        w: 9e4,
        h: 2512,
        key: "stars",
        backgroundDistance: app.starsDistance
    }, {
        type: "animatedsprite",
        x: 50,
        y: 1450,
        frameSet: "pod"
    }, {
        type: "sprite",
        x: -100,
        y: 2525,
        anchor: {
            x: 0,
            y: 1
        },
        key: "platform_landscape_misc",
        frame: "mountains_01",
        backgroundDistance: app.mountainsDistance
    }, {
        type: "sprite",
        x: 500,
        y: 1250,
        key: "platform_landscape_misc",
        frame: "clouds_01",
        backgroundDistance: app.cloudsDistance
    }, {
        type: "sprite",
        x: 8e3,
        y: 2e3,
        key: "platform_landscape_misc",
        frame: "island_back_08",
        backgroundDistance: app.mountainsDistance
    }, {
        type: "sprite",
        x: 1e4,
        y: 1750,
        key: "platform_landscape_misc",
        frame: "island_back_02",
        backgroundDistance: app.cloudsDistance
    }, {
        type: "sprite",
        x: 12e3,
        y: 1950,
        key: "platform_landscape_misc",
        frame: "island_back_09",
        backgroundDistance: app.cloudsDistance
    }, {
        type: "sprite",
        x: 13e3,
        y: 1650,
        key: "platform_landscape_misc",
        frame: "island_back_06",
        backgroundDistance: app.cloudsDistance
    }, {
        type: "sprite",
        x: 18e3,
        y: 2250,
        key: "platform_landscape_misc",
        frame: "island_back_01",
        backgroundDistance: app.cloudsDistance
    }, {
        type: "sprite",
        x: 1900,
        y: 900,
        key: "platform_landscape_misc",
        frame: "planet_big_02",
        scale: 0.6,
        backgroundDistance: app.planetsDistance
    }, {
        type: "sprite",
        x: 2200,
        y: 2525,
        anchor: {
            x: 0,
            y: 1
        },
        key: "platform_landscape_misc",
        frame: "mountains_02",
        backgroundDistance: app.mountainsDistance
    }, {
        type: "sprite",
        x: 2900,
        y: 2100,
        key: "platform_landscape_misc",
        frame: "clouds_04",
        backgroundDistance: app.cloudsDistance
    }, {
        type: "sprite",
        x: 5e3,
        y: 2525,
        anchor: {
            x: 0,
            y: 1
        },
        key: "platform_landscape_misc",
        frame: "mountains_01",
        backgroundDistance: app.mountainsDistance
    }, {
        type: "sprite",
        x: 4600,
        y: 500,
        key: "platform_landscape_misc",
        frame: "planet_big_02",
        scale: 1,
        backgroundDistance: app.planetsDistance
    }, 
                                
//////////////////////////////////
//CRASH SITE TO SPAWN FLOWER 1
//////////////////////////////////
                                
    {
        type: "group",
        x: -300,
        y: 1950,
        children: [{
            type: "group",
            x: 0,
            y: 0,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_01",
                    offsetX: 0,
                    offsetY: -63
                }, {
                    frame: "island_01",
                    offsetX: -72,
                    offsetY: -63
                }]
            }, {
                type: "plant",
                frameSet: "plant02",
                x: 1900,
                y: 0,
                tabletOptions: {
                    hide: !1,
                    animate: !1
                }
            }, {
                type: "plant",
                frameSet: "plant03",
                x: 2100,
                y: 0,
                depthGroup: "front",
                tabletOptions: {
                    hide: !1,
                    animate: !1
                }
            }, {
                type: "plant",
                frameSet: "tulip01",
                x: 2300,
                y: 0,
                tabletOptions: {
                    hide: !1
                }
            }, {
                type: "plant",
                frameSet: "peacock_bush",
                x: 2500,
                y: 0,
                tabletOptions: {
                    hide: !1
                }
            }, {
                type: "plant",
                frameSet: "plant01",
                x: 2700,
                y: 0,
                depthGroup: "front",
                tabletOptions: {
                    hide: !0
                }
            }]
        }, {
            type: "platform-island",
            x: 3300,
            y: 0,
            segments: [{
                offsetY: -43,
                frame: "island_03"
            }]
        }, {
            type: "group",
            x: 3850,
            y: -230,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island014",
                    offsetY: -17
                }]
            }, {
                type: "collidable",
                    key: "platform_landscape_misc",
                    frame: "Transp1x1",
                    depthGroup: "front",
                    x: 0,
                    y: 0,
                    anchor: {
                        x: 0,
                        y: 1
                    },
                    multiBox: [{
                        x: -3,
                        y: 200,
                        width: 100,
                        height: 200
                    }]
            }]
        }, {
            type: "group",
            x: 4e3,
            y: -430,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island012",
                    offsetX: 0,
                    offsetY: 0
                }]
            }, {
                type: "collidable",
                    key: "platform_landscape_misc",
                    frame: "Transp1x1",
                    depthGroup: "front",
                    x: 0,
                    y: 0,
                    anchor: {
                        x: 0,
                        y: 1
                    },
                    multiBox: [{
                        x: -3,
                        y: 200,
                        width: 100,
                        height: 200
                    }]
            }]
        }, {
            type: "group",
            x: 4170,
            y: -630,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island014",
                    offsetX: 0,
                    offsetY: -17
                }]
            }, {
                type: "collidable",
                    key: "platform_landscape_misc",
                    frame: "Transp1x1",
                    depthGroup: "front",
                    x: 0,
                    y: 0,
                    anchor: {
                        x: 0,
                        y: 1
                    },
                    multiBox: [{
                        x: -3,
                        y: 200,
                        width: 100,
                        height: 200
                    }]
            }]
        }]
    }, 
                                
//////////////////////////////////
//SPAWN FLOWER 1 - 2
//////////////////////////////////
                                
    {
        type: "group",
        x: 3975,
        y: 2250,
        children: [{
            type: "platform-island",
            x: 0,
            y: 0,
            segments: [{
                offsetY: -45,
                frame: "island_02"
            }]
        }, {
            type: "life-heart",
            x: 1925,
            y: 0
        }, {
            type: "platform-island",
            x: 1575,
            y: 0,
            segments: [{
                offsetY: -45,
                frame: "island_03"
            }],
            body: {
                width: 543,
                height: 130
            }
        }, {
            type: "group",
            x: 2425,
            y: -150,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_04",
                    offsetX: 0,
                    offsetY: -336
                }]
            }, {
                type: "turtle",
                x: 600,
                y: 0,
                fps: 30,
                sway: 300,
                speed: 100,
                startProgress: 0.9,
                bodyOffset: {
                    width: -60,
                    height: -50
                }
            }]
        }, {
            type: "platform-updown",
            x: 3925,
            y: -950,
            width: 400,
            sway: 800,
            speed: 400
        }, {
            type: "group",
            x: 4525,
            y: -950,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_03",
                    offsetX: 0,
                    offsetY: -45
                }]
            }, {
                type: "plant",
                frameSet: "plant02",
                x: 100,
                y: 0,
                depthGroup: "front",
                tabletOptions: {
                    hide: !1,
                    animate: !1
                }
            }]
        }, {
            type: "group",
            x: 5125,
            y: -800,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_008",
                    offsetX: 0,
                    offsetY: -21
                }, {
                    frame: "island_005",
                    offsetX: -150,
                    offsetY: -25
                }]
            }, {
                type: "plant",
                frameSet: "plant01",
                x: 50,
                y: 0,
                depthGroup: "front",
                tabletOptions: {
                    hide: !1
                }
            }, {
                type: "plant",
                frameSet: "plant02",
                x: 290,
                y: 0,
                tabletOptions: {
                    hide: !1
                }
            }]
        }, {
            type: "platform-updown",
            x: 5825,
            y: -800,
            width: 400,
            sway: 700,
            speed: 400
        }, {
            type: "group",
            x: 6325,
            y: -150,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_010",
                    offsetX: 0,
                    offsetY: -18
                }]
            }, {
                type: "plant",
                frameSet: "plant02",
                x: 100,
                y: 0,
                depthGroup: "front",
                tabletOptions: {
                    hide: !1,
                    animate: !1
                }
            }]
        }]
    }, 
                                
//////////////////////////////////
//SPAWN FLOWER 2 - 3
//////////////////////////////////
                                
    {
        type: "group",
        x: 10900,
        y: 1900,
        children: [{
            type: "group",
            x: 0,
            y: 0,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_01",
                    offsetX: 0,
                    offsetY: -63
                }, {
                    frame: "island_01",
                    offsetX: -72,
                    offsetY: -63
                }]
            }, {
                type: "plant",
                frameSet: "plant02",
                x: 1900,
                y: 0,
                depthGroup: "front",
                tabletOptions: {
                    hide: !1,
                    animate: !1
                }
            }, {
                type: "plant",
                frameSet: "plant01",
                x: 2e3,
                y: 0,
                tabletOptions: {
                    hide: !0
                }
            }, {
                type: "plant",
                frameSet: "plant03",
                x: 2100,
                y: 0,
                depthGroup: "front",
                tabletOptions: {
                    hide: !1,
                    animate: !1
                }
            }, {
                type: "plant",
                frameSet: "peacock_bush",
                x: 2200,
                y: 0,
                tabletOptions: {
                    hide: !1
                }
            }, {
                type: "plant",
                frameSet: "tulip01",
                x: 2300,
                y: 0,
                depthGroup: "front",
                tabletOptions: {
                    hide: !1
                }
            }, {
                type: "plant",
                frameSet: "plant03",
                x: 2400,
                y: 0,
                tabletOptions: {
                    hide: !1,
                    animate: !1
                }
            }, {
                type: "plant",
                frameSet: "peacock_bush",
                x: 2500,
                y: 0,
                depthGroup: "front",
                tabletOptions: {
                    hide: !1
                }
            }, {
                type: "plant",
                frameSet: "plant02",
                x: 2600,
                y: 0,
                tabletOptions: {
                    hide: !1,
                    animate: !1
                }
            }, {
                type: "plant",
                frameSet: "plant01",
                x: 2700,
                y: 0,
                depthGroup: "front",
                tabletOptions: {
                    hide: !0
                }
            }]
        }, {
            type: "collidable",
            x: 900,
            y: 3,
            key: "platform_landscape_misc",
            frame: "ruin1",
            anchor: {
                x: 0,
                y: 1
            },
            multiBox: [{
                x: 0,
                y: 0,
                width: 120,
                height: 100
            }, {
                x: 120,
                y: 0,
                width: 195,
                height: 200
            }]
        }, {
            type: "platform-island",
            x: 3150,
            y: 100,
            segments: [{
                offsetY: -45,
                frame: "island_02"
            }],
            body: {
                width: 885,
                height: 200,
                offsetX: 0,
                offsetY: 0
            }
        }, {
            type: "platform-leftright",
            x: 4100,
            y: 100,
            width: 800,
            sway: 725,
            speed: 300
        }, {
            type: "group",
            x: 5700,
            y: 100,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_03",
                    offsetY: -45
                }]
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "tall_plants_02",
                x: 280,
                y: -174,
                tabletOptions: {
                    hide: !1,
                    animate: !1
                }
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "tall_plants_01",
                depthGroup: "front",
                x: 415,
                y: -138,
                tabletOptions: {
                    hide: !1,
                    animate: !1
                }
            }]
        }, {
            type: "group",
            x: 6400,
            y: 300,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_004",
                    offsetY: -20
                }]
            }, {
                type: "platform-island",
                x: 600,
                y: 0,
                segments: [{
                    frame: "island_005",
                    offsetY: -25
                }]
            }, {
                type: "platform-island",
                x: 400,
                y: -600,
                segments: [{
                    frame: "island012"
                }]
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "tall_plants_01",
                depthGroup: "front",
                x: 450,
                y: -736,
                tabletOptions: {
                    hide: !1,
                    animate: !1
                }
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "mushroom02",
                depthGroup: "front",
                x: 420,
                y: -30
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "mushroom01",
                depthGroup: "front",
                x: 460,
                y: -44
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "mushroom02",
                depthGroup: "front",
                x: 560,
                y: -30
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "mushroom02",
                depthGroup: "back",
                x: 600,
                y: -30
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "mushroom01",
                depthGroup: "front",
                x: 1e3,
                y: -44
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "crystal_01",
                depthGroup: "back",
                x: 1060,
                y: -90
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "mushroom02",
                depthGroup: "front",
                x: 1120,
                y: -30
            }, {
                type: "platform-island",
                x: 1e3,
                y: -900,
                segments: [{
                    frame: "island014",
                    offsetY: -17
                }]
            }, {
                type: "life-heart",
                x: 1080,
                y: -900
            }, {
                type: "briar_patch",
                x: 800,
                y: 210,
                fps: 12,
                depthGroup: "back"
            }]
        }, {
            type: "platform-sinking",
            x: 7875,
            y: 50,
            width: 250,
            sink: 800,
            speed: 100
        }, {
            type: "life-heart",
            x: 8700,
            y: -310
        }, {
            type: "group",
            x: 8200,
            y: 350,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_004",
                    offsetY: -20
                }]
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "rock09",
                depthGroup: "back",
                x: 230,
                y: -117
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "tall_plants_02",
                depthGroup: "front",
                x: 280,
                y: -174
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "tall_plants_01",
                depthGroup: "back",
                x: 750,
                y: -138
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "rock11",
                depthGroup: "back",
                x: 500,
                y: -750
            }, {
                type: "platform-island",
                x: 300,
                y: -650,
                segments: [{
                    frame: "island_011",
                    offsetY: -21
                }]
            }, {
                type: "turtle",
                x: 100,
                y: 0,
                fps: 30,
                sway: 300,
                speed: 80,
                startProgress: 0.9,
                bodyOffset: {
                    width: -60,
                    height: -50
                }
            }, {
                type: "watching_turtle",
                x: 800,
                y: 0,
                fps: 12,
                sway: 500,
                speed: 100,
                startProgress: 0.9,
                bodyOffset: {
                    width: -60,
                    height: -50
                }
            }]
        }, {
            type: "platform-updown",
            x: 9700,
            y: 350,
            width: 350,
            sway: -400,
            speed: 300
        }, {
            type: "platform-updown",
            x: 10100,
            y: -440,
            width: 350,
            sway: 400,
            speed: 300
        }, {
            type: "platform-updown",
            x: 10500,
            y: -400,
            width: 350,
            sway: -400,
            speed: 300
        }]
    }, 
                                
//////////////////////////////////
//SPAWN FLOWER 3 - CHALLENGE
//////////////////////////////////
                                
    {
        type: "group",
        x: 21800,
        y: 1100,
        children: [{
            type: "platform-island",
            x: 0,
            y: 0,
            segments: [{
                offsetY: -45,
                frame: "island_02"
            }],
            body: {
                width: 885,
                height: 200
            }
        }, {
        	type: 'object',
        	objectType: 'PlatformMove',
        	x: 960,
        	y: 0,
        	width: 400,
        	sway: 1900,
        	speed: 300,
        	anchor: {
        	    x: 0,
        	    y: 1
        	},
        	isProgrammable: !0,
        	snippets: [{
        		id: "platform:move",
        		title: "Platform Move",
        		image: "PlatformOn1.gif",
        		number: 1,
        		method: "move",
        		code: "platform.move(true);"
        	}]
        }, {
            type: "group",
            x: 3385,
            y: 0,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_02",
                    offsetY: -45
                }]
            }, {
                type: "life-heart",
                x: 450,
                y: -30
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "rock07",
                depthGroup: "back",
                x: 350,
                y: -58
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "eye_plants_01",
                depthGroup: "back",
                x: 600,
                y: -130
            }]
        }, {
            type: "group",
            x: 4500,
            y: 300,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_004",
                    offsetY: -20
                }]
            }, {
                type: "turtle",
                x: 100,
                y: 0,
                fps: 12,
                sway: 700,
                speed: 150,
                startProgress: 0.9,
                bodyOffset: {
                    width: -60,
                    height: -50
                }
            }, {
                type: "turtle",
                x: 600,
                y: 0,
                fps: 12,
                sway: 700,
                speed: 100,
                startProgress: 0.9,
                bodyOffset: {
                    width: -60,
                    height: -50
                }
            }, {
                type: "turtle",
                x: 200,
                y: 0,
                fps: 12,
                sway: 1000,
                speed: 200,
                startProgress: 0,
                bodyOffset: {
                    width: -60,
                    height: -50
                }
            }]
        }, {
            type: "group",
            x: 5700,
            y: 900,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_006",
                    offsetY: 0
                }]
            }, {
                type: "platform-island",
                x: 900,
                y: -200,
                segments: [{
                    frame: "island012",
                    offsetY: 0
                }]
            }, {
                type: "life-heart",
                x: 990,
                y: -220
            }, {
                type: "briar_patch",
                x: 400,
                y: 195,
                fps: 12,
                depthGroup: "back"
            }, {
                type: "platform-island",
                x: 600,
                y: -800,
                segments: [{
                    frame: "island_03",
                    offsetY: -45
                }]
            }, {
                type: "collidable",
                x: 1050,
                y: -600,
                key: "platform_landscape_misc",
                frame: "Transp1x1",
                anchor: {
                    x: 0,
                    y: 1
                },
                multiBox: [{
                    x: 0,
                    y: 0,
                    width: 40,
                    height: 100
                }]
            }]
        }, {
            type: "group",
            x: 6800,
            y: 300,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_002",
                    offsetY: -60
                }]
            }, {
                type: "turtle",
                x: 660,
                y: 0,
                fps: 12,
                sway: 200,
                speed: 150,
                startProgress: 0.9,
                bodyOffset: {
                    width: -60,
                    height: -50
                }
            }, {
                type: "collidable",
                x: 300,
                y: 3,
                key: "platform_landscape_misc",
                frame: "ruin1",
                anchor: {
                    x: 0,
                    y: 1
                },
                multiBox: [{
                    x: 0,
                    y: 0,
                    width: 120,
                    height: 100
                }, {
                    x: 120,
                    y: 0,
                    width: 195,
                    height: 200
                }]
            }, {
                type: "collidable",
                x: 900,
                y: 50,
                key: "platform_landscape_misc",
                frame: "ruins_03",
                depthGroup: "back",
                anchor: {
                    x: 0,
                    y: 1
                },
                multiBox: [{
                    x: 0,
                    y: 0,
                    width: 300,
                    height: 340
                }]
            }]
        }, {
            type: "group",
            x: 8500,
            y: 700,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_010",
                    offsetY: -18
                }]
            }, {
                type: "platform-updown",
                x: 600,
                y: 100,
                width: 350,
                sway: -900,
                speed: 300
            }]
        }, 
                   
//////////////////////////////////
//NEWSTUFFS 1
//////////////////////////////////

        {
            type: "group",
            x: 9500,
            y: 0,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_02",
                    offsetY: -45
                }]
            }, {
                type: "collidable",
                key: "platform_landscape_misc",
                frame: "ruins_bridge_left",
                defaultTabletSprite: true,
                x: 420,
                y: 0,
                anchor: {
                    x: 0,
                    y: 1
                },
                multiBox: [{
                    x: 0,
                    y: 0,
                    width: 140,
                    height: 120
                }, {
                    x: 145,
                    y: -120,
                    width: 140,
                    height: 168
                }, {
                    x: 270,
                    y: -288,
                    width: 510,
                    height: 146
                }]
            }, 
            {
                type: 'object',
                objectType: 'SpikeBridge',
                depthGroup: 'back',
                x: 1210,
                y: -432,
                isProgrammable: true,
                snippetSets: [
                    {
                        name: "bridgeSnippets",
                        spriteNameForSnippets: "spikeBridge",
                        snippetsOffset: {
                            x: 350,
                            y: 600
                        },
                        snippets: [{
                            id: "bridge:rotate",
                            title: "Rotate Bridge",
                            image: "spike-move.gif",
                            number: 1,
                            method: "rotateBridge",
                            code: "bridge.rotate([options_0]);",
                            parameterOptions: [{
                                name: "angle",
                                type: "select",
                                options: ["0", "90", "180", "270", "360"]
                            }]
                        }]
                    }
                ]
            },
            {
                type: "platform-island",
                x: 3000,
                segments: [{
                    frame: "island_006",
                    offsetY: 0
                }]
            }, {
                type: "collidable",
                key: "platform_landscape_misc",
                frame: "ruins_bridge_right",
                defaultTabletSprite: true,
                x: 2620,
                y: 0,
                anchor: {
                    x: 0,
                    y: 1
                },
                multiBox: [{
                    x: 670,
                    y: 0,
                    width: 140,
                    height: 110
                }, {
                    x: 550,
                    y: -110,
                    width: 120,
                    height: 168
                }, {
                    x: 0,
                    y: -288,
                    width: 544,
                    height: 146
                }]
            }, {
                type: "group",
                x: 4100,
                y: -160,
                children: [{
                    type: "platform-island",
                    segments: [{
                        frame: "island_004",
                        offsetY: -20
                    }]
                }, {
                    type: "watching_turtle",
                    x: 100,
                    y: 0,
                    fps: 12,
                    sway: 1200,
                    speed: 200,
                    startProgress: 0,
                    bodyOffset: {
                        width: -60,
                        height: -50
                    }
                }, {
                    type: "watching_turtle",
                    x: 100,
                    y: 0,
                    fps: 12,
                    sway: 700,
                    speed: 150,
                    startProgress: 0.9,
                    bodyOffset: {
                        width: -60,
                        height: -50
                    }
                }, {
                    type: "watching_turtle",
                    x: 600,
                    y: 0,
                    fps: 12,
                    sway: 700,
                    speed: 100,
                    startProgress: 0.9,
                    bodyOffset: {
                        width: -60,
                        height: -50
                    }
                }]
            }]
        }, 
                   
        {
            type: "platform-sinking",
            x: 15300,
            y: 0,
            width: 300,
            sink: 800,
            speed: 150
        }, {
            type: "platform-sinking",
            x: 15900,
            y: 400,
            width: 250,
            sink: 800,
            speed: 200
        }, {
            type: "platform-sinking",
            x: 16400,
            y: 800,
            width: 200,
            sink: 800,
            speed: 250
        }, {
            type: "group",
            x: 16885,
            y: 1200,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_010",
                    offsetX: 0,
                    offsetY: -18
                }, {
                    frame: "island_02",
                    offsetX: -10,
                    offsetY: -41
                }]
            }, {
                type: "plant",
                frameSet: "plant02",
                x: 100,
                y: 0,
                depthGroup: "front"
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "rock13",
                depthGroup: "back",
                x: 200,
                y: -158
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "rock12",
                depthGroup: "back",
                x: 440,
                y: -238
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "tall_plants_02",
                depthGroup: "front",
                x: 500,
                y: -174
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "tall_plants_01",
                depthGroup: "back",
                x: 785,
                y: -138
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "tall_plants_02",
                depthGroup: "front",
                x: 900,
                y: -174
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "tall_plants_01",
                depthGroup: "back",
                x: 1100,
                y: -138
            }]
        }, {
            type: "group",
            x: 18785,
            y: 1200,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_004",
                    offsetX: 0,
                    offsetY: -20
                }, {
                    frame: "island_016",
                    offsetX: -405,
                    offsetY: -81
                }]
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "rock09",
                depthGroup: "back",
                x: 300,
                y: -118
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "rock05",
                depthGroup: "back",
                x: 550,
                y: -20
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "rock06",
                depthGroup: "back",
                x: 650,
                y: -38
            }]
        }, {
            type: "object",
            objectType: "FallingTree",
            body: {
                width: 1050,
                height: 50
            },
            x: 20100,
            y: 1341,
            jumpToYAdjust: -400,
            anchor: {
                x: 0.5,
                y: 1
            },
            isProgrammable: !0,
            snippets: [{
                id: "tree:fall",
                title: "Tree Fall",
                image: "card-tree-fall.gif",
                number: 1,
                method: "fall",
                code: "tree.fall([options_0]);",
                parameterOptions: [{
                    name: "fallDirection",
                    type: "select",
                    options: ["left", "right"]
                }]
            }, {
                id: "tree:grow",
                title: "Tree Grow",
                image: "card-tree-grow.gif",
                number: 2,
                method: "grow",
                code: "tree.grow([options_0]);",
                parameterOptions: [{
                    name: "growTo",
                    type: "select",
                    options: ["medium", "tall"]
                }]
            }, {
                id: "tree:color_leaves",
                title: "Change Leaves",
                image: "card-tree-hex.gif",
                number: 3,
                method: "colorLeaves",
                code: "tree.colorLeaves([options_0]);",
                parameterOptions: [{
                    name: "color",
                    type: "select",
                    options: ["Teal", "Yellow", "Green"]
                }]
            }]
        }]
    }, 
                                
//////////////////////////////////
//SPAWN FLOWER 4 - 5
//////////////////////////////////
                                
    {
        type: "group",
        x: 42950,
        y: 2300,
        children: [{
            type: "group",
            x: 0,
            y: 0,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_01",
                    offsetY: -60
                }]
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "rock08",
                depthGroup: "back",
                x: 300,
                y: -35
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "rock10",
                depthGroup: "back",
                x: 650,
                y: -48
            }]
        }, {
            type: "group",
            x: 1750,
            y: -180,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island014",
                    offsetY: -17
                }]
            }]
        }, {
            type: "group",
            x: 2050,
            y: -380,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island015",
                    offsetY: 0
                }]
            }]
        }, {
            type: "platform-updown",
            x: 2350,
            y: 0,
            width: 400,
            sway: -1e3,
            speed: 400
        }, {
            type: "platform-updown",
            x: 2850,
            y: -1900,
            width: 400,
            sway: 900,
            speed: 362
        }, {
            type: "group",
            x: 3300,
            y: -1900,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_007",
                    offsetY: 0
                }]
            }]
        }, {
            type: "platform-leftright",
            x: 3700,
            y: -1700,
            width: 300,
            sway: 1400,
            speed: 300
        }, {
            type: "platform-leftright",
            x: 6e3,
            y: -1500,
            width: 300,
            sway: -700,
            speed: 150
        }, {
            type: "group",
            x: 6200,
            y: -1200,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_02",
                    offsetY: -41
                }]
            }, {
                type: "life-heart",
                x: 500,
                y: 0
            }, {
                type: "watching_turtle",
                isSpiked: !0,
                x: 100,
                y: 0,
                fps: 12,
                sway: 700,
                speed: 100,
                startProgress: 1,
                bodyOffset: {
                    width: -60,
                    height: -50
                }
            }]
        }]
    }, 
                                
//////////////////////////////////
//SPAWN FLOWER 5 - 6
//////////////////////////////////
                                
    {
        type: "group",
        x: 50200,
        y: 1600,
        children: [{
            type: "group",
            x: 0,
            y: 0,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_01",
                    offsetY: -62
                }]
            }, {
                type: "collidable",
                x: 350,
                y: 4,
                key: "platform_landscape_misc",
                frame: "ruins_04",
                anchor: {
                    x: 0,
                    y: 1
                },
                multiBox: [{
                    x: 0,
                    y: 0,
                    width: 220,
                    height: 248
                }, {
                    x: 200,
                    y: 0,
                    width: 425,
                    height: 483
                }, {
                    x: 620,
                    y: 0,
                    width: 210,
                    height: 185
                }]
            }, {
                type: "platform-island",
                x: 900,
                y: -1150,
                segments: [{
                    frame: "island_011",
                    offsetY: -21
                }]
            }, {
                type: "platform-island",
                x: -150,
                y: 850,
                segments: [{
                    frame: "island012",
                    offsetY: 0
                }]
            }, {
                type: "life-heart",
                x: 1120,
                y: -1170
            }, {
                type: "life-heart",
                x: -60,
                y: 840
            }, {
                type: "platform-brick",
                x: 0,
                y: -250,
                width: 75,
                sink: 800,
                speed: 200
            }, {
                type: "platform-brick",
                x: -80,
                y: -400,
                width: 75,
                sink: 1245,
                speed: 200
            }, {
                type: "platform-brick",
                x: 150,
                y: -500,
                width: 75,
                sink: 800,
                speed: 200
            }, {
                type: "platform-brick",
                x: 1100,
                y: -540,
                width: 75,
                sink: 800,
                speed: 200
            }, {
                type: "platform-brick",
                x: 1250,
                y: -250,
                width: 75,
                sink: 800,
                speed: 200
            }, {
                type: "platform-brick",
                x: 1450,
                y: -350,
                width: 75,
                sink: 800,
                speed: 200
            }]
        }, 
                   
        {
            type: "group",
            x: 1700,
            y: 600,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_004",
                    offsetY: -20
                }]
            }, {
                type: "platform-island",
                x: 1200,
                y: -500,
                segments: [{
                    frame: "island_009"
                }]
            }, 

            {
                type: 'object',
                objectType: 'TeeterTotter',
                depthGroup: 'front',
                x: 260,
                y: -164,
                isProgrammable: true,
                challengeTriggerConfig: {
                    // begin and end x are in world space and are compared against ninja cat's position
                    beginX: 52190,
                    endX: 52210,
                    stopCameraFollowing: true,
                    adjustCamera: {
                        x: 700,
                        y: 0
                    }
                },
                snippetSets: [
                    {
                        name: "boulderSnippets",
                        spriteNameForSnippets: "boulderInner",
                        snippetsOffset: {
                            x: 330,
                            y: 300
                        },
                        snippets: [{
                            id: "boulder:setDirection",
                            title: "Set Variable",
                            image: "roll-direction.gif",
                            number: 1,
                            method: "setBoulderDirection",
                            code: "var roll = [options_0];",
                            type: "variable",
                            parameterOptions: [{
                                name: "direction",
                                type: "select",
                                options: ["right", "left"]
                            }]
                        }, {
                            id: "boulder:roll",
                            title: "Roll Boulder",
                            image: "roll-direction.gif",
                            number: 1,
                            method: "moveBoulder",
                            code: "rock.move(roll);"
                        }]
                    }
                ]
            },
            
            {
                type: "collidable",
                key: "platform_landscape_misc",
                frame: "Transp1x1",
                x: 360,
                y: 0,
                anchor: {
                    x: 0,
                    y: 1
                },
                multiBox: [{
                    x: 0,
                    y: 0,
                    width: 40,
                    height: 80
                }]
            }, 
            
            {
                type: "platform-island",
                x: 900,
                y: -1200,
                segments: [{
                    frame: "island_02",
                    offsetY: -45
                }]
            }, 
            
            // {
            //     //THIS SHOULD GO AWAY WHEN TEETER CHALLENGE IS ADDED
            //     type: "collidable",
            //     key: "platform_landscape_misc",
            //     frame: "Transp1x1",
            //     x: 0,
            //     y: -1195,
            //     anchor: {
            //         x: 0,
            //         y: 1
            //     },
            //     multiBox: [{
            //         x: 0,
            //         y: 0,
            //         width: 940,
            //         height: 5
            //     }]
            // }
            ]
        }, 
                   
        {
            type: "group",
            x: 4200,
            y: 0,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_001",
                    offsetX: 0,
                    offsetY: 0
                }]
            }, {
                type: "collectable-mod",
                modType: "BoingBoots",
                x: 1630,
                y: -825,
                key: "platform_landscape_misc",
                frame: "boing_boots",
                collectEventName: "boing_boots"
            }, {
                type: "watching_turtle",
                isSpiked: !0,
                x: 100,
                y: 0,
                fps: 12,
                sway: 400,
                speed: 100,
                startProgress: 0,
                bodyOffset: {
                    width: -60,
                    height: -50
                }
            }, {
                type: "watching_turtle",
                isSpiked: !0,
                x: 700,
                y: 0,
                fps: 12,
                sway: 400,
                speed: 100,
                startProgress: 0.333,
                bodyOffset: {
                    width: -60,
                    height: -50
                }
            }, {
                type: "watching_turtle",
                isSpiked: !0,
                x: 1800,
                y: 0,
                fps: 12,
                sway: 400,
                speed: 100,
                startProgress: 0.666,
                bodyOffset: {
                    width: -60,
                    height: -50
                }
            }, {
                type: "platform-island",
                x: 800,
                y: -800,
                segments: [{
                    frame: "island_03",
                    offsetY: -45
                }]
            }, {
                type: "platform-island",
                x: 1500,
                y: 0,
                segments: [{
                    frame: "island_003",
                    offsetY: 0
                }]
            }, {
                type: "platform-island",
                x: 1500,
                y: -700,
                segments: [{
                    frame: "island_005",
                    offsetY: -25
                }]
            }, {
                type: "collidable",
                x: 1300,
                y: 4,
                key: "platform_landscape_misc",
                frame: "ruins_03",
                anchor: {
                    x: 0,
                    y: 1
                },
                multiBox: [{
                    x: 0,
                    y: 0,
                    width: 300,
                    height: 340
                }]
            }, {
                type: "platform-brick",
                x: 200,
                y: -200,
                width: 75,
                sink: 190,
                speed: 200
            }, {
                type: "platform-brick",
                x: 400,
                y: -400,
                width: 75,
                sink: 390,
                speed: 200
            }, {
                type: "platform-brick",
                x: 600,
                y: -600,
                width: 75,
                sink: 590,
                speed: 200
            }, {
                type: "platform-brick",
                x: 1150,
                y: -200,
                width: 75,
                sink: 190,
                speed: 200
            }, {
                type: "platform-brick",
                x: 1700,
                y: -300,
                width: 75,
                sink: 290,
                speed: 200
            }]
        }, {
            type: "group",
            x: 7700,
            y: 0,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_006",
                    offsetY: 0
                }]
            }, {
                type: "collidable",
                x: 350,
                y: 0,
                key: "platform_landscape_misc",
                frame: "ruins_05",
                anchor: {
                    x: 0,
                    y: 1
                },
                multiBox: [{
                    x: 0,
                    y: 0,
                    width: 25,
                    height: 20
                }, {
                    x: 25,
                    y: 0,
                    width: 36,
                    height: 95
                }, {
                    x: 61,
                    y: 0,
                    width: 152,
                    height: 243
                }, {
                    x: 213,
                    y: 0,
                    width: 109,
                    height: 92
                }]
            }, {
                type: "platform-brick",
                x: 920,
                y: -80,
                width: 75,
                sink: 990,
                speed: 200
            }]
        }, {
            type: "group",
            x: 8800,
            y: 750,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_007",
                    offsetY: 0
                }]
            }, {
                type: "life-heart",
                x: 160,
                y: -30
            }]
        }, {
            type: "group",
            x: 8850,
            y: -650,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_002",
                    offsetY: -60
                }]
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "ruins_arch_left",
                depthGroup: "back",
                x: 690,
                y: -574
            }, {
                type: "collidable",
                key: "platform_landscape_misc",
                frame: "ruins_arch_right",
                depthGroup: "front",
                x: 690,
                y: 4,
                anchor: {
                    x: 0,
                    y: 1
                },
                multiBox: [{
                    x: 0,
                    y: -550,
                    width: 504,
                    height: 100
                }, {
                    x: 500,
                    y: -436,
                    width: 104,
                    height: 20
                }]
            }]
        }, {
            type: "group",
            x: 10370,
            y: -900,
            children: [{
                type: "collidable",
                key: "platform_landscape_misc",
                frame: "brokenwall_01",
                depthGroup: "front",
                x: 0,
                y: 0,
                anchor: {
                    x: 0,
                    y: 1
                },
                multiBox: [{
                    x: 0,
                    y: 0,
                    width: 125,
                    height: 800
                }, {
                    x: 120,
                    y: -520,
                    width: 610,
                    height: 300
                }]
            }]
        }, {
            type: "group",
            x: 10300,
            y: 0,
            children: [{
                type: "platform-island",
                segments: [{
                    frame: "island_02",
                    offsetY: -45
                }]
            }, {
                type: "collidable",
                key: "platform_landscape_misc",
                frame: "brokenwall_02",
                depthGroup: "back",
                x: 440,
                y: -460,
                anchor: {
                    x: 0,
                    y: 1
                },
                multiBox: [{
                    x: 7,
                    y: 0,
                    width: 125,
                    height: 475
                }, {
                    x: 120,
                    y: -455,
                    width: 400,
                    height: 20
                }]
            }, {
                type: "briar_patch",
                x: 300,
                y: 210,
                fps: 12,
                depthGroup: "back"
            }]
        }, {
            type: "collidable",
            key: "platform_landscape_misc",
            frame: "brokenwall_03",
            depthGroup: "front",
            x: 11300,
            y: -1150,
            anchor: {
                x: 0,
                y: 1
            },
            multiBox: [{
                x: 640,
                y: 0,
                width: 150,
                height: 475
            }, {
                x: 500,
                y: -110,
                width: 150,
                height: 475
            }]
        }, {
            type: "group",
            x: 11100,
            y: -500,
            children: [{
                type: "group",
                x: 1400,
                y: 30,
                children: [{
                    type: "platform-jumpthrough",
                    x: 440,
                    y: -300,
                    body: {
                        width: 75,
                        height: 15
                     }
                }, {
                    type: "sprite",
                    key: "platform_landscape_misc",
                    frame: "castle02_background",
                    depthGroup: "back",
                    x: 0,
                    y: -700
                }, {
                    type: "sprite",
                    key: "platform_landscape_misc",
                    frame: "castlelight_on",
                    depthGroup: "back",
                    x: 391,
                    y: -640
                }, {
                    type: "animatedsprite",
                    x: 348,
                    y: -605,
                    frameSet: "lantern_flicker"
                }, {
                    type: "sprite",
                    key: "platform_landscape_misc",
                    frame: "castle02_doorframe",
                    depthGroup: "back",
                    x: 0,
                    y: -340
                }, {
                    type: "collidable",
                    key: "platform_landscape_misc",
                    frame: "castle02_front",
                    depthGroup: "front",
                    x: -36,
                    y: 0,
                    anchor: {
                        x: 0,
                        y: 1
                    },
                    multiBox: [{
                        x: 36,
                        y: -330,
                        width: 300,
                        height: 400
                    }, {
                        x: 211,
                        y: -730,
                        width: 445,
                        height: 80
                    }, {
                        x: 546,
                        y: -530,
                        width: 70,
                        height: 200
                    }, {
                        x: 546,
                        y: 0,
                        width: 743,
                        height: 330
                    }, {
                        x: 1050,
                        y: -330,
                        width: 75,
                        height: 108
                    }, {
                        x: 1135,
                        y: -310,
                        width: 155,
                        height: 216
                    }, {
                        x: 1289,
                        y: 0,
                        width: 185,
                        height: 238
                    }]
                }, {
                    type: "life-heart",
                    x: 400,
                    y: -880
                }]
            }, {
                type: "platform-island",
                depthGroup: "front",
                x: 1500,
                segments: [{
                    frame: "island_001"
                }]
            }, {
                type: "platform-island",
                depthGroup: "front",
                segments: [{
                    frame: "island_01",
                    offsetY: -63
                }]
            }]
        }]
    }, {
        type: "group",
        x: 64500,
        y: 1400,
        children: [{
            type: "group",
            children: [{
                type: "platform-island",
                depthGroup: "front",
                segments: [{
                    frame: "island016"
                }]
            }, {
                type: "watching_turtle",
                isSpiked: 0,
                x: 200,
                y: 0,
                fps: 12,
                sway: 400,
                speed: 150,
                startProgress: 0.666,
                bodyOffset: {
                    width: -60,
                    height: -50
                }
            }, {
                type: "watching_turtle",
                isSpiked: !0,
                x: 50,
                y: 0,
                fps: 12,
                sway: 700,
                speed: 50,
                startProgress: 0.666,
                bodyOffset: {
                    width: -60,
                    height: -50
                }
            }]
        }, {
            type: "platform-island",
            x: 150,
            y: -800,
            depthGroup: "front",
            segments: [{
                frame: "island_03",
                offsetY: -45
            }]
        }, {
            type: "platform-leftright",
            x: 495,
            y: 240,
            width: 300,
            sway: 5000,
            speed: 300
        }, {
            type: "collidable",
            key: "platform_landscape_misc",
            frame: "Transp1x1",
            depthGroup: "front",
            x: 0,
            y: 0,
            anchor: {
                x: 0,
                y: 1
            },
            multiBox: [{
                x: 696,
                y: 200,
                width: 100,
                height: 200
            }]
        }]
    }, {
        type: "group",
        x: 66000,
        y: 1100,
        children: [{
            type: "platform-island",
            depthGroup: "front",
            segments: [{
                frame: "island_004",
                offsetY: -20
            }]
        }, {
            type: "platform-brick",
            x: -600,
            y: -400,
            width: 75,
            sink: 800,
            speed: 200
        }, {
            type: "platform-brick",
            x: -300,
            y: -250,
            width: 75,
            sink: 800,
            speed: 200
        }, {
            type: "platform-brick",
            x: 180,
            y: -500,
            width: 75,
            sink: 800,
            speed: 200
        }, {
            type: "collidable",
            key: "platform_landscape_misc",
            frame: "ruins_06",
            depthGroup: "front",
            x: 350,
            y: 1,
            anchor: {
                x: 0,
                y: 1
            },
            multiBox: [{
                x: 0,
                y: 0,
                width: 300,
                height: 235
            }, {
                x: 280,
                y: -235,
                width: 345,
                height: 368
            }, {
                x: 625,
                y: 0,
                width: 180,
                height: 290
            }]
        }, {
            type: "turtle",
            x: 50,
            y: 0,
            fps: 30,
            sway: 250,
            speed: 100,
            startProgress: 0.9,
            bodyOffset: {
                width: -60,
                height: -50
            }
        }, {
            type: "turtle",
            x: 400,
            y: -235,
            fps: 30,
            sway: 180,
            speed: 100,
            startProgress: 0.1,
            bodyOffset: {
                width: -60,
                height: -50
            }
        }, {
            type: "turtle",
            x: 1000,
            y: -285,
            fps: 30,
            sway: 100,
            speed: 100,
            startProgress: 0.1,
            bodyOffset: {
                width: -60,
                height: -50
            }
        }, {
            type: "turtle",
            x: 1190,
            y: 0,
            fps: 30,
            sway: 150,
            speed: 100,
            startProgress: 0.1,
            bodyOffset: {
                width: -60,
                height: -50
            }
        }]
    }, {
        type: "group",
        x: 68000,
        y: 600,
        children: [{
        }, {
            type: "platform-island",
            x: -700,
            y: -300,
            depthGroup: "front",
            segments: [{
                frame: "island_010",
                offsetY: -20
            }]
        }, {
            type: "platform-island",
            depthGroup: "front",
            segments: [{
                frame: "island_004",
                offsetY: -20
            }]
        }, {
            type: "watching_turtle",
            isSpiked: !0,
            x: 50,
            y: 0,
            fps: 12,
            sway: 1200,
            speed: 200,
            startProgress: 0.666,
            bodyOffset: {
                width: -60,
                height: -50
            }
        }, {
            type: "platform-brick",
            x: -500,
            y: 300,
            width: 75,
            sink: 800,
            speed: 200
        }, {
            type: "platform-brick",
            x: -250,
            y: 100,
            width: 75,
            sink: 800,
            speed: 200
        }, {
            type: "platform-brick",
            x: 1480,
            y: -200,
            width: 75,
            sink: 1400,
            speed: 200
        }]
    }, {
        type: "group",
        x: 69700,
        y: 1500,
        children: [{
            type: "platform-island",
            segments: [{
                frame: "island017",
            }]
        }, {
            type: "life-heart",
            x: 100,
            y: -50
        }]
    }, {
        type: "group",
        x: 69700,
        y: 600,
        children: [{
            type: "platform-island",
            segments: [{
                frame: "island_022",
            }]
        }, {
            type: "collidable",
            key: "platform_landscape_misc",
            frame: "ruins_07",
            depthGroup: "front",
            x: 0,
            y: 0,
            anchor: {
                x: 0,
                y: 1
            },
            multiBox: [{
                x: 0,
                y: 0,
                width: 160,
                height: 415
            }, {
                x: 160,
                y: 0,
                width: 240,
                height: 152
            }]
        }, {
            type: "collidable",
            key: "platform_landscape_misc",
            frame: "ruins_08",
            depthGroup: "front",
            x: 1250,
            y: 0,
            anchor: {
                x: 0,
                y: 1
            },
            multiBox: [{
                x: 0,
                y: 0,
                width: 200,
                height: 370
            }, {
                x: 200,
                y: 0,
                width: 120,
                height: 254
            }]
        }]
    }, {
        type: "group",
        x: 71600,
        y: 1200,
        children: [{
            type: "platform-island",
            segments: [{
                frame: "island_04",
                offsetY: -336
            }]
        }, {
            type: "platform-brick",
            x: -200,
            y: -800,
            width: 75,
            sink: 800,
            speed: 200
        }]
    }, {
        type: "group",
        x: 73000,
        y: 2000,
        children: [{
            type: "platform-island",
            segments: [{
                frame: "island_01",
                offsetY: -63
            }]
        }, {
            type: "briar_patch",
            x: 1100,
            y: 210,
            fps: 12,
            depthGroup: "back"
        }, {
            type: "briar_patch",
            x: 1900,
            y: 210,
            fps: 12,
            depthGroup: "back"
        }, {
            type: "platform-island",
            x: 1450,
            segments: [{
                frame: "island_002",
                offsetY: -60
            }]
        }, {
            type: "platform-island",
            x: 1320,
            y: -740,
            segments: [{
                frame: "island_007",
            }]
        }, {
            type: "collidable",
            key: "platform_landscape_misc",
            frame: "ruins_thin_wall",
            depthGroup: "back",
            x: 1450,
            y: 0,
            anchor: {
                x: 0,
                y: 1
            },
            multiBox: [{
                x: 0,
                y: 0,
                width: 100,
                height: 740
            }]
        }, {
            type: "platform-brick",
            x: 1700,
            y: -700,
            width: 75,
            sink: 800,
            speed: 200
        }, {
            type: "collidable",
            key: "platform_landscape_misc",
            frame: "ruins_09",
            depthGroup: "front",
            x: 1600,
            y: -400,
            anchor: {
                x: 0,
                y: 1
            },
            multiBox: [{
                x: 440,
                y: 0,
                width: 145,
                height: 700
            }, {
                x: 0,
                y: -700,
                width: 585,
                height: 700
            }]
        }, {
            type: "group",
            x: 1610,
            y: -1102,
            children: [{
                type: "platform-damage",
                x: 200,
                y: 0,
                bodyOffset: {
                    width: 400,
                    height: 20
                }
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "spike",
                x: 0
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "spike",
                x: 85
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "spike",
                x: 170
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "spike",
                x: 255
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "spike",
                x: 340
            }]
        }, {
            type: "platform-leftright",
            x: 3100,
            y: 0,
            width: 300,
            sway: 2000,
            speed: 300
        }]
    }, {
        type: "group",
        x: 78500,
        y: 2000,
        children: [{
            type: "platform-island",
            segments: [{
                frame: "island_01",
                offsetY: -63
            }, {
                frame: "island_02",
                offsetX: -400,
                offsetY: -41
            }, {
                frame: "island_02",
                offsetX: 620,
                offsetY: -41
            }, {
                frame: "island_01",
                offsetX: -200,
                offsetY: -63
            }]
        }, {
            type: "group",
            x: 300,
            children: [{
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "castle01_backgroundb_on",
                depthGroup: "back",
                x: 210,
                y: -650
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "castle01_wall_background_on",
                depthGroup: "back",
                x: 2850,
                y: -1150
            }, {
                type: "sprite",
                key: "platform_landscape_misc",
                frame: "castle01_battlements",
                depthGroup: "front",
                x: 0,
                y: -539
            }, {
                type: "collidable",
                key: "platform_landscape_misc",
                frame: "castle01_gatewall_background",
                depthGroup: "back",
                x: 0,
                y: 1,
                anchor: {
                    x: 0,
                    y: 1
                },
                multiBox: [{
                    x: 0,
                    y: -450,
                    width: 263,
                    height: 40
                }, {
                    x: 180,
                    y: -300,
                    width: 245,
                    height: 40
                }]
            }, {
                type: "animatedsprite",
                x: -164,
                y: -780,
                frameSet: "castle_flag",
                depthGroup: "front"
            }, {
                type: "animatedsprite",
                x: 1170,
                y: -1080,
                frameSet: "castle_flag",
                depthGroup: "front"
            }, {
                type: "animatedsprite",
                x: 2420,
                y: -1080,
                frameSet: "castle_flag",
                depthGroup: "front"
            }, {
                type: "life-heart",
                x: 540,
                y: -1390
            }, {
                type: "group",
                x: 0,
                y: -330,
                children: [{
                    type: "sprite",
                    key: "platform_landscape_misc",
                    frame: "lantern",
                    depthGroup: "back",
                    x: 0,
                    y: 0
                }, {
                    type: "animatedsprite",
                    x: -20,
                    y: -20,
                    frameSet: "lantern_flicker"
                }]
            }, {
                type: "group",
                x: 770,
                y: -300,
                children: [{
                    type: "sprite",
                    key: "platform_landscape_misc",
                    frame: "castlelight_on",
                    depthGroup: "back",
                    x: 0,
                    y: 0
                }, {
                    type: "animatedsprite",
                    x: -43,
                    y: 36,
                    frameSet: "lantern_flicker"
                }]
            }, {
                type: "group",
                x: 1175,
                y: -300,
                children: [{
                    type: "sprite",
                    key: "platform_landscape_misc",
                    frame: "castlelight_on",
                    depthGroup: "back",
                    x: 0,
                    y: 0
                }, {
                    type: "animatedsprite",
                    x: -43,
                    y: 36,
                    frameSet: "lantern_flicker"
                }]
            }, {
                type: "collidable",
                key: "platform_landscape_misc",
                frame: "castle01a_forground",
                depthGroup: "front",
                x: 200,
                y: 3,
                anchor: {
                    x: 0,
                    y: 1
                },
                multiBox: [{
                    x: 225,
                    y: -300,
                    width: 220,
                    height: 1000
                }, {
                    x: 182,
                    y: -1280,
                    width: 315,
                    height: 60
                }, {
                    x: 445,
                    y: -300,
                    width: 750,
                    height: 120
                }, {
                    x: 1310,
                    y: 0,
                    width: 1380,
                    height: 490
                }, {
                    x: 1310,
                    y: -490,
                    width: 70,
                    height: 260
                }, {
                    x: 1105,
                    y: -750,
                    width: 320,
                    height: 60
                }, {
                    x: 2410,
                    y: -490,
                    width: 220,
                    height: 260
                }, {
                    x: 2360,
                    y: -750,
                    width: 320,
                    height: 60
                }, {
                    x: 2630,
                    y: -410,
                    width: 650,
                    height: 230
                }]
            }, {
                type: "group",
                x: 420,
                y: -330,
                children: [{
                    type: "sprite",
                    key: "platform_landscape_misc",
                    frame: "lantern",
                    depthGroup: "front",
                    x: 0,
                    y: 0
                }, {
                    type: "animatedsprite",
                    x: -20,
                    y: -20,
                    frameSet: "lantern_flicker",
                    depthGroup: "front"
                }]
            }, {
                type: "group",
                x: 2030,
                y: -440,
                children: [{
                    type: "sprite",
                    key: "platform_landscape_misc",
                    frame: "lantern",
                    depthGroup: "front",
                    x: 0,
                    y: 0
                }, {
                    type: "animatedsprite",
                    x: -20,
                    y: -20,
                    frameSet: "lantern_flicker",
                    depthGroup: "front"
                }]
            }, {
                type: "platform-jumpthrough",
                x: 1380,
                y: -220,
                body: {
                    width: 75,
                    height: 15
                 }
            }, {
                type: "platform-jumpthrough",
                x: 1450,
                y: -405,
                body: {
                    width: 75,
                    height: 15
                 }
            }, {
                type: "collidable",
                key: "platform_landscape_misc",
                frame: "castle01b_forground",
                depthGroup: "front",
                x: 3850,
                y: 1,
                anchor: {
                    x: 0,
                    y: 1
                },
                multiBox: [{
                    x: 42,
                    y: -510,
                    width: 75,
                    height: 700
                }, {
                    x: 345,
                    y: -510,
                    width: 90,
                    height: 700
                }, {
                    x: 0,
                    y: -1190,
                    width: 485,
                    height: 60
                }, {
                    x: 345,
                    y: 0,
                    width: 235,
                    height: 540
                }]
            }, {
                type: "platform-brick",
                x: 900,
                y: -700,
                width: 75,
                sink: 800,
                speed: 200
            }, {
                type: "platform-brick",
                x: 1100,
                y: -800,
                width: 75,
                sink: 800,
                speed: 200
            }, {
                type: "platform-brick",
                x: 1800,
                y: -750,
                width: 75,
                sink: 800,
                speed: 200
            }, {
                type: "platform-brick",
                x: 3600,
                y: -450,
                width: 75,
                sink: 800,
                speed: 200
            }, {
                type: "platform-brick",
                x: 3750,
                y: -250,
                width: 75,
                sink: 800,
                speed: 200
            }, {
                type: "platform-brick",
                x: 3550,
                y: -850,
                width: 75,
                sink: 800,
                speed: 200
            }, {
                type: "platform-brick",
                x: 3700,
                y: -1100,
                width: 75,
                sink: 800,
                speed: 200
            }, {
                type: "platform-brick",
                x: 4500,
                y: -800,
                width: 75,
                sink: 800,
                speed: 200
            }, {
                type: "platform-brick",
                x: 4400,
                y: -1000,
                width: 75,
                sink: 800,
                speed: 200
            }, {
                type: "platform-brick",
                x: 4600,
                y: -300,
                width: 75,
                sink: 800,
                speed: 200
            }, {
                type: "watching_turtle",
                isSpiked: !0,
                x: 1700,
                y: -490,
                fps: 12,
                sway: 700,
                speed: 200,
                startProgress: 0.666,
                depthGroup: "back",
                bodyOffset: {
                    width: -60,
                    height: -50
                }
            }, {
                type: "watching_turtle",
                isSpiked: !0,
                x: 3600,
                y: 0,
                fps: 12,
                sway: 500,
                speed: 200,
                startProgress: 0.666,
                depthGroup: "back",
                bodyOffset: {
                    width: -60,
                    height: -50
                }
            }, {
                type: "life-heart",
                x: 3000,
                y: -40
            }]
        }]
    }, {
        type: "group",
        x: 83700,
        y: 2200,
        children: [{
            type: "platform-island",
            segments: [{
                frame: "island_04",
                offsetY: -336
            }]
        }, {
            type: "watching_turtle",
            isSpiked: 0,
            x: 50,
            y: 0,
            fps: 12,
            sway: 700,
            speed: 200,
            startProgress: 0.666,
            depthGroup: "back",
            bodyOffset: {
                width: -60,
                height: -50
            }
        }]
    }, {
        type: 'group',
        x: 85500,
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
                x: 600,
                y: 0,
                depthGroup: 'back',
                children: [
                    {
                        type: 'sprite',
                        key: 'rubegoldberg',
                        frame: 'rubegold_pillar',
                        depthGroup: 'back',
                        x: 76,
                        y: 0,
                        anchor: { x: 0, y: 1 }
                    },
                    {
                        type: 'sprite',
                        windowId: 'sp',
                        key: 'rubegoldberg',
                        frame: 'rubegold_spikeposition',
                        depthGroup: 'back',
                        x: 1160,
                        y: -1130,
                        anchor: { x: 0, y: 1 }
                    },
                    {
                        type: 'object',
                        objectType: 'RubeMachine',
                        depthGroup: 'back',
                        x: 0,
                        y: 0
                    }
                ] 
            },
            // island with ball & monster
            {
                type: 'group',
                x: 1300,
                y: -300,
                children: [{
                    type: 'platform-island',
                    segments: [
                        { frame: 'island_01', offsetX: 0, offsetY: -63 }
                    ]
                }] 
            },
            // island with pendulum
            {
                type: 'group',
                x: 1000,
                y: -1150,
                children: [{
                    type: 'platform-island',
                    segments: [
                        { frame: 'island_003', offsetX: 0, offsetY: 0 }
                    ]
                }] 
            },
            // island on other side of spike bar
            {
                type: 'group',
                x: 2400,
                y: -1150,
                children: [{
                    type: 'platform-island',
                    segments: [
                        { frame: 'island_011', offsetX: 0, offsetY: -21 }
                    ]
                }] 
            },
        ]
    }];
})();