(function () {
    app.levels.level1.conversations = [
        {
            id: "whereami",
            type: "SelfConversation",
            audioKey: "silence",
            //beginX: 1330,
            //endX: 1430,
            transcript: {
                times: [{
                    t: "0",
                    cat: "Whoa... I feel a little dizzy!"
                }, {
                    t: "0:03",
                    cat: "What is this place?"
                }]
            }
        }, {
            id: "conversation1",
            type: "Conversation",
            audioKey: "timConversation1",
            beginX: 4567,
            endX: 4667,
            transcript: {
                times: [{
                    t: "0",
                    tim: "You made it!"
                }, {
                    t: "0:01.5",
                    cat: "Made what? Where am I?"
                }, {
                    t: "0:04.6",
                    tim: "You’re just in time. War tore our world apart. We need help, and I think you can change everything."
                }, {
                    t: "0:13.7",
                    cat: "Wait a sec… why me? And who are you?"
                }, {
                    t: "0:17.7",
                    tim: "There are some who call me… Tim. I’m a wizard. A wise guy, ya see."
                }, {
                    t: "0:25.7",
                    tim: "And there are many people of this world who call you Ninja Cat, our hero, our coder."
                }, {
                    t: "0:32.8",
                    tim: "We need to make our world good again, and your fierce energy is our only hope, my feline friend."
                }, {
                    t: "0:39.9",
                    cat: "They call me what?"
                }, {
                    t: "0:41.8",
                    tim: "A coder. Quick! There’s not much time. Hack the world for good!"
                }, {
                    t: "0:46.7",
                    cat: "But how?"
                }, {
                    t: "0:48.3",
                    tim: "Use your brain! And this might help. Scan and change the world with this tablet. It's now or never."
                }, {
                    t: "0:56",
                    tim: "But you're not alone. Something tells me you'll find Guru's ready to help along the way."
                }, {
                    t: "1:02.1",
                    cat: "Purrrfect. Challenge accepted. What's next?"
                }, {
                    t: "1:06.2",
                    tim: "Whoops! Gotta take this call…"
                }]
            }
        }, {
            id: "conversation4",
            type: "TabletConversation",
            audioKey: "timConversation2",
            beginX: 22940,
            endX: 23040,
            transcript: {
                times: [{
                    t: "0",
                    tim: "Whoa there, that gap is too big to jump across and this platform isn't moving."
                }, {
                    t: "0:05",
                    tim: "This is where you're going to have to use that gift I mentioned before."
                }, {
                    t: "0:10",
                    tim: "Press \"T\" to pull it out."
                }, {
                    t: "0:11",
                    action: "openTablet"
                }, {
                    t: "0:09.427",
                    tim: "This tablet will let you view the world from a different perspective."
                }, {
                    t: "0:13.594",
                    tim: "This current view is called \"scan-mode\" and you can access it again later"
                }, {
                    t: "0:17.072",
                    tim: "by pressing this button with your mouse."
                }, {
                    t: "0:17.908",
                    action: "highlightScanButton"
                }, {
                    t: "0:19.948",
                    tim: "Some objects in this world can be changed using code."
                }, {
                    t: "0:23.731",
                    action: "unhighlightScanButton"
                }, {
                    t: "0:23.801",
                    tim: "With your mouse, click the platform."
                }, {
                    t: "0:27.223",
                    action: "clickTree"
                }, {
                    t: "0:27.683",
                    tim: "This is called a \"Snippet Card\" "
                }, {
                    t: "0:29.585",
                    tim: "and it can change the code of this platform."
                }, {
                    t: "0:34.436",
                    tim: "The place where you collect all your cards"
                }, {
                    t: "0:37.267",
                    tim: "is called your repository or \"Repo\"."
                }, {
                    t: "0:40.47",
                    tim: "With your mouse, drag the Snippet Card to the Repo... it's found here."
                }, {
                    t: "0:46.993",
                    action: "moveSnippetCard"
                }, {
                    t: "0:48",
                    tim: "There! You've collected the Snippet Card."
                }, {
                    t: "0:53",
                    tim: "Let's change this platform and get across that gap. Click into your Repo."
                }, {
                    t: "1:08.178",
                    action: "enterRepo"
                }, {
                    t: "1:08.486",
                    tim: "You're doing great! In here you're looking at two things."
                }, {
                    t: "1:12.687",
                    tim: "This side is your Repo..."
                }, {
                    t: "1:13.311",
                    action: "highlightRepo"
                }, {
                    t: "1:15.348",
                    tim: "... and this side is your Editor."
                }, {
                    t: "1:16.2",
                    action: "highlightEditor"
                }, {
                    t: "1:18.405",
                    tim: "To use the code on a Snippet Card,"
                }, {
                    t: "1:21.729",
                    tim: "simply drag and drop the card into the editor."
                }, {
                    t: "1:25.263",
                    action: "dragToEditor"
                }, {
                    t: "1:26",
                    tim: "The platform must not be moving"
                }, {
                    t: "1:28",
                    tim: "because the \".move\" function must be set to \"false\"."
                }, {
                    t: "1:32",
                    tim: "This \'true/false\' code is called a \"boolean\"."
                }, {
                    t: "1:38",
                    tim: "Using this card will change the boolean value to true."
                }, {
                    t: "1:52.693",
                    tim: "When you're ready, click \"Execute\" at the bottom"
                }, {
                    t: "1:56.476",
                    tim: "to see your code do it's work."
                }]
            }
        }, {
            id: "treeconvo",
            type: "SelfConversation",
            audioKey: "silence",
            beginX: 41550,
            endX: 41650,
            transcript: {
                times: [{
                    t: "0",
                    cat: "Hmmm... I'm not going to be able to jump that!"
                }, {
                    t: "0:04",
                    cat: "I wonder if I can use my tablet here?"
                }, {
                    t: "0:08",
                    cat: "What was the key to pull out my \'T\'ablet?"
                }]
            }
        }, {
            id: "conversation3",
            type: "Conversation",
            audioKey: "timConversation3",
            levelEventTrigger: "boing_boots",
            transcript: {
                times: [{
                    t: "0",
                    tim: "Nice! You just found your first item"
                }, {
                    t: "0:03.016",
                    tim: "Click on your backpack to equip it,"
                }, {
                    t: "0:05.871",
                    tim: "and press \"f\" or \"shift\" to use it."
                }]
            }
        }
        //                        , {
        //            id: "DemoWin",
        //            type: "TabletConversation",
        //            audioKey: "silence",
        //            beginX: 32900,
        //            endX: 33000,
        //            doesNotEnd: true,
        //            transcript: {
        //                times: [{
        //                    t: "0",
        //                    tim: "Wow! Congratulations, you've completed the Project Mio Demo!"
        //                }, {
        //                    t: "0:05.0",
        //                    tim: "Please take a moment to fill out the survey you were handed."
        //                }, {
        //                    t: "0:10",
        //                    tim: "Once you're done, turn it in to continue playing."
        //                }]
        //            }
        //        }
    ];
})();
