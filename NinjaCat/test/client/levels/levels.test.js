const level1 = require("../../../client/js/levels/level1");

app.utils.createPrefixNumberArray = function(name, a, b, c) { return [0]};  //Mock function
const frameSets = require("../../../client/js/game/FrameSets");

const fs = require('fs');

for(var level in app.levels) {
    var currentLvl = app.levels[level];

    test("startPosition", () => {
        expect(typeof(currentLvl.startPosition.x)).toBe("number");
        expect(typeof(currentLvl.startPosition.y)).toBe("number");
    });

    var soundPath = "server/public/sounds/";
    
    test("Sounds", () => {
        for(var sound in currentLvl.sounds) {
            expect(typeof(currentLvl.sounds[sound])).toBe("string");            
            expect(fs.existsSync(soundPath + currentLvl.sounds[sound]+".m4a")).toBe(true, currentLvl.sounds[sound]);
        }
    });

    test("Basic Properties", () => {
        expect(currentLvl.parallaxCameraZeroY).toBeGreaterThanOrEqual(0);
        expect(currentLvl.backgroundGradientDistance).toBeGreaterThan(0);
        expect(currentLvl.backgroundGradientDistance).toBeLessThan(1);
    });

    test("Background Gradients", () => {
        for(var gradient in currentLvl.backgroundGradient) {
            expect(currentLvl.backgroundGradient[gradient].stop).toBeGreaterThanOrEqual(0);
            expect(currentLvl.backgroundGradient[gradient].stop).toBeLessThanOrEqual(1);
            expect(typeof(currentLvl.backgroundGradient[gradient].color)).toBe("string");
            expect(currentLvl.backgroundGradient[gradient].color.length).toBe(7);
        }
    });

    test("Spawn Points", () => {
        for( var spawnP in currentLvl.spawnPoints) {
            expect(currentLvl.spawnPoints[spawnP].x).toBeGreaterThan(0);
            expect(currentLvl.spawnPoints[spawnP].y).toBeGreaterThan(0);
            expect(currentLvl.spawnPoints[spawnP].sprite.x).toBeGreaterThan(0);
            expect(currentLvl.spawnPoints[spawnP].sprite.y).toBeGreaterThan(0);
            expect(currentLvl.spawnPoints[spawnP].sprite.frameSet).toEqual("respawn_flower");  // Change this once there is need for a different frameSet.
            expect(app.frameSets[currentLvl.spawnPoints[spawnP].sprite.frameSet]).toBeTruthy();
        }
    });

    test("Conversations", () => {
        for( var conv in currentLvl.conversations) {
            curConv = currentLvl.conversations[conv];
            expect(typeof(curConv.id)).toBe("string");
            expect(typeof(curConv.type)).toBe("string");
            expect(typeof(curConv.audioKey)).toBe("string");
            if(!!curConv.levelEventTrigger) {
                expect(typeof(curConv.levelEventTrigger)).toBe("string");
            } else {                
                expect(curConv.beginX).toBeGreaterThan(1);
                expect(curConv.endX).toBeGreaterThan(1);
            }
            expect(curConv.transcript.times).toBeTruthy();
            for(i=0; i<curConv.transcript.times.length; i++) {
                curTime = curConv.transcript.times[i];
                pattern = /^[0-1]+(:[0-9]+(\.[0-9]+)*)*$/;
                expect(curTime.t).toEqual(expect.stringMatching(pattern));
                var speech = curTime.cat || curTime.tim || curTime.action;
                expect(typeof(speech)).toBe("string");
            }
        }
    });

    test("Layers", () => {
        var layerTypes = ["collidable", "tilesprite", "animatedsprite", "sprite", "group", "platform-island", "life-heart", "platform-updown", "platform-leftright",
            "platform-sinking", "object", "plant", "turtle", "briar_patch", "watching_turtle", "platform-brick", "collectable-mod"];
        var depthGroups = ["front", "back"];

        function ValidateLayerBasics(curLayer) {
            expect(layerTypes).toContain(curLayer.type);
            expect(typeof(curLayer.x)).toBe("number");
            expect(typeof(curLayer.y)).toBe("number");
        }

        function ValidateLayerOptionals(curLayer) {
            if(!!curLyr.key) {
                expect(typeof(curLyr.key)).toBe("string");
            }
            if(!!curLyr.frameSet) {
                expect(typeof(curLyr.frameSet)).toBe("string");
            }
            if(!!curLyr.frame) {
                expect(typeof(curLyr.frame)).toBe("string");
            }
            if (!!curLyr.anchor) {
                expect(curLyr.anchor.x).toBeGreaterThanOrEqual(0);
                expect(curLyr.anchor.x).toBeLessThanOrEqual(1);
                expect(curLyr.anchor.y).toBeGreaterThanOrEqual(0);
                expect(curLyr.anchor.y).toBeLessThanOrEqual(1);
            }
            if (!!curLyr.multiBox) {
                for(j=0; j<curLyr.multiBox.length; j++) {
                    expect(curLyr.multiBox[j].x).toBeGreaterThanOrEqual(0);
                    expect(curLyr.multiBox[j].y).toBeGreaterThanOrEqual(0);
                    expect(curLyr.multiBox[j].y).toBeLessThanOrEqual(1);
                    expect(curLyr.multiBox[j].width).toBeGreaterThan(0);
                    expect(curLyr.multiBox[j].height).toBeGreaterThan(0);
                }
            }
            if(!!curLyr.w || !!curLyr.h) {
                expect(curLyr.w).toBeGreaterThan(0);
                expect(curLyr.h).toBeGreaterThan(0);
            }
            if(!!curLyr.backgroundDistance) {
                expect(curLyr.backgroundDistance).toBeGreaterThanOrEqual(0);
                expect(curLyr.backgroundDistance).toBeLessThanOrEqual(1);
            }
            if(!!curLyr.scale) {
                expect(curLyr.scale).toBeGreaterThan(0);
            }
            if(!!curLyr.sway) {
                expect(typeof(curLyr.sway)).toBe("number");
            }
        }

        function ValidateTurtle(turtle) {
            expect(turtle.x).toBeGreaterThanOrEqual(100)
            expect(turtle.y).toEqual(0);
            expect(turtle.fps).toBeGreaterThan(1);
            expect(turtle.sway).toBeGreaterThan(100);
            expect(turtle.speed).toBeGreaterThan(50);
            expect(turtle.startProgress).toBeGreaterThanOrEqual(0);
            expect(turtle.startProgress).toBeLessThanOrEqual(1);
            expect(turtle.bodyOffset.width).toEqual(-60);
            expect(turtle.bodyOffset.height).toEqual(-50);
            if(!!turtle.isSpiked) {
                expect(turtle.isSpiked).toEqual(true);
            }
        }

        function ValidateSegment(segment) {
            expect(typeof(segment.frame)).toEqual("string");
            if(!!segment.offsetX) {
                expect(segment.offsetX).toBeLessThanOrEqual(0);
            }
            if(!!segment.offsetY) {
                expect(segment.offsetY).toBeLessThanOrEqual(0);
            }
        }

        function ValidateSinker(item) {
            if(["platform-brick", "platform-sinking"].indexOf(item.type) === -1) return;

            expect(item.width).toBeGreaterThanOrEqual(75);
            expect(item.sink).toBeGreaterThan(100);
            expect(item.speed).toBeGreaterThanOrEqual(100);
        }

        const imagePath = "server/public/images/";

        function ValidateSnippets(snippets) {
            for(var i=0; i<snippets.length; i++) {
                item=snippets[i];
                expect(typeof(item.id)).toBe("string");
                expect(typeof(item.title)).toBe("string");
                expect(typeof(item.image)).toBe("string");
                expect(fs.existsSync(imagePath + item.image)).toBe(true);
                expect(typeof(item.method)).toBe("string");
                expect(typeof(item.code)).toBe("string");
                expect(typeof(item.number)).toBe("number");
                for(var x=0; x < item.parameterOptions.length; x++ ) {
                    expect(typeof(item.parameterOptions[x].name)).toBe("string");
                    expect(typeof(item.parameterOptions[x].type)).toBe("string");
                    expect(Array.isArray(item.parameterOptions[x].options)).toBe(true);
                }
            }
        }

        function ValidateProgrammable(item) {
            expect(typeof(item.objectType)).toBe("string");
            expect(item.body).toEqual({height:50, width: 1050});
            expect(typeof(item.jumpToYAdjust)).toBe("number");
            expect(item.anchor).toEqual({x: 0.5, y: 1});
            expect(item.isProgrammable).toEqual(true);
            if(!!item.snippetSets) {
                for(k=0; k<item.snippetSets.length; k++) {
                    expect(typeof(item.snippetSets[k].name)).toBe("string");
                    expect(Array.isArray(item.snippetSets[k].angles)).toEqual(true);
                    expect(item.snippetSets[k].radius).toBeLessThanOrEqual(360);
                    expect(item.snippetSets[k].radius).toBeGreaterThanOrEqual(0);
                    ValidateSnippets(item.snippetSets[k].snippets);
                }
            } else if(!!item.snippets) {
                ValidateSnippets(item.snippets);
            }
        }

        function ValidateChild(item) {
            ValidateLayerBasics(item);
            if(!!item.fps) {
                expect(item.fps).toBeGreaterThan(10);
            }
            if(!!item.frame) {
                expect(typeof(item.frame)).toEqual("string");
            } 
            if(!!item.frameSet) {
                expect(typeof(item.frameSet)).toEqual("string");
            }
            if(!!item.depthGroup) {
                expect(depthGroups).toContain(item.depthGroup);
            }
            if(!!item.tabletOptions) {
                expect(typeof(item.tabletOptions.hide)).toEqual("boolean");
                if(!!item.tabletOptions.animate) {
                    expect(item.tabletOptions.animate).toEqual(false);
                }
            }
            if(!!item.modType) {
                expect(typeof(item.modType)).toBe("string");
                expect(typeof(item.collectEventName)).toBe("string");
            }
            ValidateSinker(item);
        }

        for(i=0; i<currentLvl.layers.length; i++) {
            curLyr = currentLvl.layers[i];
            ValidateLayerBasics(curLyr);
            ValidateLayerOptionals(curLyr);
            ValidateSinker(curLyr);
            if(curLyr.type.includes("object")) {
                ValidateProgrammable(curLyr);
            }
            if(!!curLyr.children) {
                for(j=0; j<curLyr.children.length; j++) {
                    curChild = curLyr.children[j];
                    expect(layerTypes).toContain(curChild.type);
                    if(curChild.type.includes("turtle")) {
                        ValidateTurtle(curChild);
                    } else if(!!curChild.segments) {
                        for(k=0; k<curChild.segments.length; k++) {
                            ValidateSegment(curChild.segments[k]);
                        }
                    } else {
                        ValidateChild(curChild);
                    }
                }
            }
        }
    });
}

