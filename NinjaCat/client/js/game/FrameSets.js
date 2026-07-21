(function() {

    app.frameSets = {

        // plants

        'plant01': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('plant01_00', 283, 306, 3)
        },

        'plant02': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('plant02_00', 279, 302, 3)
        },

        'plant03': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('plant03_00', 287, 311, 3)
        },

        'tulip01': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('tulip01_00', 0, 20, 3)
        },

        'peacock_bush': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('peacock_bush_00', 1, 24, 3)
        },

        'respawn_flower': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('respawn_flower_00', 37, 55, 3)
        },

        // platforms

        'platform_flame': {
            texture: 'platform_landscape_misc',
            frames: app.utils.createPrefixNumberArray('platform_flame_00', 0, 13, 3)
        },

        'platform_flame_left': {
            texture: 'platform_landscape_misc',
            frames: app.utils.createPrefixNumberArray('platform_flame_left_00', 0, 13, 3)
        },

        'platform_flame_right': {
            texture: 'platform_landscape_misc',
            frames: app.utils.createPrefixNumberArray('platform_flame_right_00', 0, 13, 3)
        },

        'platform_drop': {
            texture: 'platform_landscape_misc',
            frames: app.utils.createPrefixNumberArray('platform_drop_00', 10, 29, 3)
        },

        // bad guys

        'shellwalk': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('turtle_00', 15, 34, 3)
        },

        'spiked_shellwalk': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('TurtleSpikedShell_00', 0, 7, 1)
        },

        'turtle_eye_right': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('turtle_withEye1_00', 0, 55, 3)
        },

        'turtle_eye_left': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('turtle_withEye1_00', 69, 140, 3)
        },

        'turtle_eye_move_left_to_right': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('turtle_withEye1_00', 141, 151, 3)
        },

        'turtle_eye_move_right_to_left': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('turtle_withEye1_00', 56, 68, 3)
        },

        'spiked_turtle_eye_right': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('TurtleSpikedEye_', 0, 55, 3)
        },

        'spiked_turtle_eye_left': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('TurtleSpikedEye_', 69, 140, 3)
        },

        'spiked_turtle_eye_move_left_to_right': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('TurtleSpikedEye_', 141, 151, 3)
        },

        'spiked_turtle_eye_move_right_to_left': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('TurtleSpikedEye_', 56, 68, 3)
        },

        'briar_patch_closing': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('BriarPatch_00', 24, 33, 3)
        },

        'briar_patch_opening': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('BriarPatch_00', 34, 42, 3)
        },

        'turtle_disintigrate': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('Disintegrate_', 0, 11, 3)
        },

        // palm tree

        'palm_short_left_leaves': {
            texture: 'palm_short_left',
            frames: app.utils.createPrefixNumberArray('palm_short_fallleft_gray_', 0, 48, 2)
        },

        'palm_short_left_tree': {
            texture: 'palm_short_left',
            frames: app.utils.createPrefixNumberArray('palmtree_short_fallleft_00', 48, 96, 3)
        },

        'palm_short_right_leaves': {
            texture: 'palm_short_right',
            frames: app.utils.createPrefixNumberArray('palm_short_fallright_gray_', 0, 48, 2)
        },

        'palm_short_right_tree': {
            texture: 'palm_short_right',
            frames: app.utils.createPrefixNumberArray('palmtree_short_fallright_00', 48, 96, 3)
        },

        'palm_medium_left_leaves': {
            texture: 'palm_medium_left',
            frames: app.utils.createPrefixNumberArray('palm_medium_fallleft_gray_', 0, 48, 2)
        },

        'palm_medium_left_tree': {
            texture: 'palm_medium_left',
            frames: app.utils.createPrefixNumberArray('palmtree_medium_fallleft_00', 48, 96, 3)
        },

        'palm_medium_right_leaves': {
            texture: 'palm_medium_right',
            frames: app.utils.createPrefixNumberArray('palm_medium_fallright_gray_', 0, 48, 2)
        },

        'palm_medium_right_tree': {
            texture: 'palm_medium_right',
            frames: app.utils.createPrefixNumberArray('palmtree_medium_fallright_00', 48, 96, 3)
        },

        'palm_tall_left_leaves': {
            texture: 'palm_tall_left',
            frames: app.utils.createPrefixNumberArray('palm_tall_fallleft_gray_', 0, 48, 2)
        },

        'palm_tall_left_tree': {
            texture: 'palm_tall_left',
            frames: app.utils.createPrefixNumberArray('palmtree_tall_fallleft_00', 48, 96, 3)
        },

        'palm_tall_right_leaves': {
            texture: 'palm_tall_right',
            frames: app.utils.createPrefixNumberArray('palm_tall_fallright_gray_', 0, 48, 2)
        },

        'palm_tall_right_tree': {
            texture: 'palm_tall_right',
            frames: app.utils.createPrefixNumberArray('palmtree_tall_fallright_00', 48, 96, 3)
        },

        'palm_dust': {
            texture: 'palm_shared',
            frames: app.utils.createPrefixNumberArray('dust_00', 72, 96, 3)
        },

        'palm_fall': {
            texture: 'palm_shared',
            frames: app.utils.createPrefixNumberArray('palm_medium_drop_00', 198, 222, 3)
        },

        'palm_breathe': {
            texture: 'palm_shared',
            frames: app.utils.createPrefixNumberArray('palm_medium_breath_', 0, 48, 2)
        },

        'glitch': {
            texture: 'platform_landscape_misc',
            frames: app.utils.createPrefixNumberArray('glitch_', 0, 8, 2)
        },

        // crashed pod

        'pod': {
            texture: 'platform_landscape_misc',
            frames: app.utils.createPrefixNumberArray('crashed_pod_00', 48, 69, 3)
        },

        // health

        'life_heart_breathe': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('life_heart_00', 2, 31, 3)
        },

        'life_heart_pop': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('life_heart_00', 32, 38, 3)
        },

        // talking

        'talking_tim': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('talking_head_tim_00', 0, 107, 3)
        },

        'talking_ninjacat': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('talking_head_ninjacat_00', 0, 343, 3)
        },

        // tim

        'tim': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('TimBody_0', 0, 47, 2)
        },

        'tim_tablet': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('SwingStaff_0', 0, 47, 2)
        },

        'tablet_bubble_appear': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('tablet_bubble_000', 10, 37, 2)
        },

        'tablet_bubble_disappear': {
            texture: 'cat_tim_badguys_plants',
            frames: app.utils.createPrefixNumberArray('tablet_bubble_000', 10, 37, 2).reverse()
        },

        // toaster challenge

        'toast_alarm_clock_1': {
            texture: 'toaster_challenge',
            frames: app.utils.createPrefixNumberArray('alarm_clock_1_000', 0, 4, 2)
        },

        'toast_alarm_clock_2': {
            texture: 'toaster_challenge',
            frames: app.utils.createPrefixNumberArray('alarm_clock_2_000', 4, 10, 2)
        },

        'toast_alarm_clock_3': {
            texture: 'toaster_challenge',
            frames: app.utils.createPrefixNumberArray('alarm_clock_3_000', 12, 24, 2)
        },

        'toast_monster_awakes': {
            texture: 'toaster_challenge',
            frames: app.utils.createPrefixNumberArray('toast_monster_wakeup_000', 66, 78, 2)
        },

        'toast_monster_swat': {
            texture: 'toaster_challenge',
            frames: app.utils.createPrefixNumberArray('toast_monster_000', 3, 27, 2)
        },

        'toast_monster_eat': {
            texture: 'toaster_challenge',
            frames: app.utils.createPrefixNumberArray('toast_monster_000', 27, 63, 2)
        },

        'toaster': {
            texture: 'toaster_challenge',
            frames: app.utils.createPrefixNumberArray('toaster_000', 12, 16, 2)
        },

        'monster_teeth': {
            texture: 'toaster_challenge',
            frames: app.utils.createPrefixNumberArray('teeth_000', 41, 62, 2)
        },

        'toaster_gear': {
            texture: 'toaster_challenge',
            frames: app.utils.createPrefixNumberArray('gear_0000', 0, 4, 1)
        },

        'toast_explode_1': {
            texture: 'toaster_challenge',
            frames: app.utils.createPrefixNumberArray('toast_1_explode_000', 13, 19, 2)
        },

        'toast_explode_2': {
            texture: 'toaster_challenge',
            frames: app.utils.createPrefixNumberArray('toast_2_explode_000', 13, 19, 2)
        },

        'toast_explode_4': {
            texture: 'toaster_challenge',
            frames: app.utils.createPrefixNumberArray('toast_4_explode_000', 13, 19, 2)
        },
        
        // misc

        'lantern_flicker': {
            texture: 'platform_landscape_misc',
            frames: app.utils.createPrefixNumberArray('lanternlight_00', 0, 13, 3)
        },
        
        'castle_flag': {
            texture: 'platform_landscape_misc',
            frames: app.utils.createPrefixNumberArray('flag_00', 0, 13, 3)
        }

    };

})();