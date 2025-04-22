//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.32;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.32] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the default battle system (DTB).
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 0
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
//=============================================================================

const _0x9123=['drawCurrentParam','SParamVocab4','isTriggered','OUTQUART','pictures','reserveNewGameCommonEvent','sparamRate1','MRF','setupValueFont','rowSpacing','IconXParam1','outlineColorDmg','SUBTRACT','ShopMenu','INSERT','_centerElementCoreEngine','Key%1','paramFlatBonus','blendFunc','FontSmoothing','_windowskin','CAPSLOCK','drawActorSimpleStatus','startAnimation','WIN_OEM_CUSEL','update','makeFontBigger','contents','erasePicture','process_VisuMZ_CoreEngine_jsQuickFunctions','ItemHeight','playCursor','statusWindowRect','evaluate','_backSprite1','OUTCIRC','playBuzzer','CustomParamAbb','_stored_ctGaugeColor1','<%1\x20%2:[\x20]','menu','27clDKmX','itemLineRect','ColorTPGauge2','ENTER_SPECIAL','type','F18','CreateBattleSystemID','SystemSetSideView','measureTextWidth','_customModified','Version','xparamFlatJS','updateCoreEasing','KeySHIFT','enemies','goldWindowRect','updatePositionCoreEngineShakeHorz','Spriteset_Battle_createEnemies','Scene_Menu_create','IconSParam1','itemWindowRect','catchLoadError','isNextScene','systemColor','HRG','F17','changeClass','Tilemap_addShadow','targetBackOpacity','_sideButtonLayout','visible','createWindowLayer','guardSkillId','targets','ColorTPCost','IconParam4','bgsVolume','setupNewGame','ParseWeaponNotetags','updateMove','StatusParamsBgType','bind','_refreshPauseSign','Game_Interpreter_command111','editWindowRect','repositionCancelButtonSideButtonLayout','XParamVocab7','randomJS','floor','Window_NameInput_cursorPageup','stretch','buttons','_goldWindow','isMapScrollLinked','bgm','SEMICOLON','buttonAssistText3','Game_Action_itemEva','createEnemies','Scene_Shop_create','ParseArmorNotetags','command355','CNT','_coreEngineShakeStyle','Keyboard','QUOTE','SnapshotOpacity','cursorUp','DELETE','repositionEnemiesByResolution','vertJS','_editWindow','ceil','_commandWindow','hpGaugeColor2','OUTQUINT','AGI','gradientFillRect','_itemWindow','_stored_tpGaugeColor1','KeyUnlisted','_dummyWindow','ColorTPGauge1','Scene_Skill_create','drawCircle','paramchangeTextColor','loadPicture','setCoreEngineScreenShakeStyle','WIN_OEM_ATTN','drawText','destroyCoreEngineMarkedBitmaps','NumberRect','maxItems','buttonAssistKey1','inputWindowRect','xparamPlus2','setMainFontSize','offsetY','updatePictureAntiZoom','DOWN','ParamArrow','contentsBack','SParameterFormula','SaveMenu','animationNextDelay','ctrlKey','enable','getBackgroundOpacity','paramWidth','_stored_expGaugeColor1','initDigitGrouping','OUTSINE','KeyItemProtect','makeActionList','Bitmap_drawText','CallHandlerJS','_backgroundSprite','XParamVocab4','onKeyDownKeysF6F7','min','_hideTileShadows','%2%1%3','nickname','Game_Interpreter_command105','ARRAYSTR','processFauxAnimationRequests','levelUp','_cancelButton','advanced','missed','backgroundBitmap','DisplayedParams','IconXParam8','PERIOD','currentLevelExp','SkillMenu','sparamPlus1','isGamepadTriggered','FDR','outlineColorGauge','ALT','createSpriteset','gaugeLineHeight','ItemBackColor2','processTimingData','(\x5cd+)>','addWindow','_shakeDuration','_timerSprite','key%1','GoldOverlap','numberShowButton','ColorMaxLvGauge1','Game_Interpreter_command355','_effectsContainer','Param','processKeyboardBackspace','buttonAssistWindowButtonRect','mpColor','paramY','#%1','initMembers','WIN_OEM_FJ_ROYA','Bitmap_fillRect','CategoryRect','initMembersCoreEngine','catchNormalError','setClickHandler','fillText','_clientArea','Window_NameInput_refresh','_hp','targetX','toLocaleString','command105','PreserveNumbers','concat','LevelUpFullMp','CustomParamType','_buttonAssistWindow','Padding','PIPE','charAt','keypress','VisuMZ_2_BattleSystemSTB','STB','ZOOM','_downArrowSprite','isKeyItem','NUM_LOCK','F22','_stored_deathColor','faceWidth','xScrollLinkedOffset','OUTEXPO','PGDN','traitObjects','paramFlatJS','_coreEasingType','setWindowPadding','_skillTypeWindow','add','keyMapper','QoL','TextManager_param','initialize','Show\x20Scrolling\x20Text\x20Script\x20Error','Total','seVolume','_pictureContainer','DATABASE','OPEN_PAREN','SHIFT','drawCurrencyValue','_fauxAnimationQueue','select','worldTransform','ParamMax','_statusEquipWindow','wholeDuration','RIGHT','buttonAssistText2','Game_Picture_initBasic','description','PositionJS','INOUTELASTIC','textWidth','popScene','HASH','drawBackgroundRect','performEscape','Input_shouldPreventDefault','tab','retrieveFauxAnimation','setTargetAnchor','SParamVocab8','WIN_OEM_FINISH','helpAreaTopSideButtonLayout','Game_BattlerBase_initMembers','pagedownShowButton','status','drawGameSubtitle','mainAreaHeightSideButtonLayout','_destroyInternalTextures','backOpacity','drawActorClass','_stored_ctGaugeColor2','vertical','updateDashToggle','OutlineColorDmg','_forcedBattleSys','parseForcedGameTroopSettingsCoreEngine','subject','FINAL','nw.gui','KANA','command357','BTestAddedQuantity','string','mpGaugeColor1','_encounterCount','shake','exit','Bitmap_clearRect','adjustSprite','VisuMZ_1_OptionsCore','ListBgType','_context','_actor','Game_Map_setup','buttonAssistWindowRect','isSideButtonLayout','_actorWindow','Input_onKeyDown','focus','clearForcedGameTroopSettingsCoreEngine','Bitmap_resize','createButtonAssistWindow','style','ProfileRect','terms','createFauxAnimation','createDigits','normalColor','_number','paramRateJS','makeDeepCopy','cos','resize','_windowLayer','_mp','itemSuccessRate','ParseSkillNotetags','setAction','processKeyboardDelete','updatePlayTestF7','tpGaugeColor2','94481JDNhjQ','drawTextEx','ARRAYJSON','sv_enemies','move','paramPlusJS','levelUpRecovery','EnableNumberInput','SParamVocab9','Bitmap_measureTextWidth','CommandList','isHandled','INQUAD','Linear','_targetOffsetX','WIN_OEM_FJ_LOYA','name','renderNoMask','stencilOp','Flat1','buttonAssistKey2','tileWidth','darwin','center','WIN_OEM_PA3','updatePositionCoreEngine','WASD','makeTargetSprites','StatusBgType','Scene_Map_updateMainMultiply','CEV','Scene_GameEnd_createBackground','16963OINcNf','GoldMax','helpAreaHeight','option','_registerKeyInput','_setupEventHandlers','_scene','buttonAssistOffset2','processCursorHomeEndTrigger','ActorBgType','itemHitImprovedAccuracy','addChild','PRESERVCONVERSION(%1)','ctGaugeColor1','onNameOk','createTextState','IconXParam7','IconParam0','Power','_shakePower','LINEAR','SLEEP','createMenuButton','_lastPluginCommandInterpreter','NUMPAD7','setSideView','isGameActive','Game_Actor_levelUp','playMiss','ASTERISK','Window_NumberInput_processDigitChange','PRINTSCREEN','ImprovedAccuracySystem','mainAreaHeight','ItemStyle','HelpRect','bitmapHeight','itemHeight','F19','map','isActiveTpb','setEasingType','MDR','Window_NameInput_cursorRight','ATTN','addEventListener','calcEasing','Window_Base_update','CancelText','Graphics_defaultStretchMode','_realScale','XParamVocab8','FunctionName','evade','IconSParam6','XParamVocab3','Scene_Item_create','_digitGrouping','Window_NameInput_processTouch','numActions','_offsetX','initialBattleSystem','EVA','stencilFunc','KeyboardInput','Spriteset_Base_update','up2','initCoreEasing','updatePositionCoreEngineShakeRand','cursorDown','Game_Action_itemHit','atbActive','setupCoreEngine','StatusMenu','stypeId','CrisisRate','_playtestF7Looping','_statusWindow','Graphics_centerElement','AccuracyBoost','displayY','Rate1','params','helpWindowRect','Scene_MenuBase_mainAreaHeight','ARRAYEVAL','randomInt','Enemy','createCommandWindow','setHome','ParseClassNotetags','itemRect','drawFace','exp','mainFontSize','FTB','isEnemy','ColSpacing','SCROLL_LOCK','processKeyboardHome','InputBgType','font-smooth','mainAreaTop','buttonAssistOffset%1','HOME','originalJS','MAX_SAFE_INTEGER','MODECHANGE','IconSParam2','Game_Picture_move','OpenConsole','system','pressed','isMaskingEnabled','isNumpadPressed','pagedown','successRate','test','fontSize','Gold','targetObjects','BTestWeapons','initVisuMZCoreEngine','layoutSettings','Game_Actor_paramBase','drawAllParams','displayX','paramBaseAboveLevel99','imageSmoothingEnabled','Scene_MenuBase_createPageButtons','isTpb','setCoreEngineUpdateWindowBg','sparamFlatJS','contains','boxWidth','isOpenAndActive','TitleCommandList','_shakeSpeed','_profileWindow','scale','SParamVocab3','CommandRect','([\x5c+\x5c-]\x5cd+)([%％])>','Sprite_Animation_setViewport','hideButtonFromView','statusParamsWindowRect','Window_Base_drawFace','version','pop','menuShowButton','Game_System_initialize','initBasic','OptionsMenu','param','Game_Picture_calcEasing','onButtonImageLoad','_hovered','Bitmap_gradientFillRect','isSpecialCode','UNDERSCORE','Scene_Boot_startNormalGame','GroupDigits','easingType','loadTitle1','_stored_tpCostColor','createCustomBackgroundImages','ALTGR','terminate','Scene_Equip_create','prototype','moveRelativeToResolutionChange','ActorRect','uiAreaWidth','NUMPAD9','ItemBgType','WIN_OEM_FJ_TOUROKU','mpCostColor','updatePositionCoreEngineShakeVert','MAT','_colorCache','isRepeated','mainCommandWidth','isEnabled','home','reserveCommonEvent','characters','_pressed','Scene_Name_create','OutlineColorGauge','updatePosition','_screenY','left','%1%2','children','EXR','keyboard','title','xparamRate','clearCachedKeys','Scene_Battle_update','iconHeight','Window_EquipItem_isEnabled','anchorCoreEasing','stringKeyMap','processKeyboardDigitChange','drawActorNickname','onInputBannedWords','_sellWindow','defineProperty','lineHeight','StatusRect','WIN_OEM_COPY','colSpacing','_opening','areButtonsOutsideMainUI','_width','traitsPi','targetPosition','Input_update','INBACK','targetScaleY','Window','_onKeyDown','isNwjs','destroy','updateOpacity','bitmap','setupButtonImage','setup','_mode','Window_NameInput_initialize','pageup','Game_BattlerBase_refresh','ColorExpGauge2','text%1','loadSystemImages','HIT','Scene_Options_create','_inputSpecialKeyCode','DashToggleR','PictureEraseRange','sparamFlatBonus','Scene_Boot_loadSystemImages','sparamFlat1','Settings','asin','clearStencil','strokeRect','flush','_listWindow','OptionsBgType','checkCacheKey','Actor','_viewportSize','ApplyEasing','render','xdg-open','context','Game_Picture_show','sin','QwertyLayout','switchModes','meVolume','Scene_MenuBase_mainAreaTop','log','setLastPluginCommandInterpreter','MainMenu','isCursorMovable','ParseItemNotetags','Sprite_AnimationMV_processTimingData','isUseModernControls','ACCEPT','updateEffekseer','_playTestFastMode','DigitGroupingGaugeSprites','Window_Gold_refresh','Window_NameInput_cursorDown','F21','NameInputMessage','IconSParam3','showFauxAnimations','CustomParamNames','process_VisuMZ_CoreEngine_CustomParameters','_backSprite2','drawActorExpGauge','clearRect','value','PLAY','_buyWindow','shift','filters','Window_Selectable_cursorUp','buttonAssistKey3','buttonAssistText1','RevertPreserveNumbers','_optionsWindow','HelpBgType','Scene_Map_initialize','Scene_Boot_onDatabaseLoaded','VOLUME_MUTE','ConvertParams','fadeSpeed','INBOUNCE','CommandBgType','processCursorMove','CLOSE_PAREN','Graphics','_hideButtons','isBusy','IconSParam4','text','DTB','_cacheScaleX','_anchor','encounterStep','INCUBIC','padding','PERCENT','updateLastTarget','toString','Window_Selectable_processTouch','paramRate1','rightArrowWidth','isMVAnimation','STENCIL_TEST','VisuMZ_2_BattleSystemBTB','_closing','CustomParam','length','TextCodeNicknames','commandWindowRows','NUM','Window_Selectable_processCursorMove','WIN_OEM_ENLW','addLoadListener','onMoveEnd','isItemStyle','maxGold','Game_Troop_setup','ColorDeath','INQUART','NewGameBoot','Scene_MenuBase_helpAreaTop','createChildSprite','STR','open','paramMaxJS','currentValue','toLowerCase','isPlaytest','OUTBACK','2ibmSuZ','ARRAYNUM','en-US','ColorMPGauge2','tpGaugeColor1','evaded','show','keyCode','valueOutlineColor','cursorRight','CTB','buttonAssistOffset1','processMoveCommand','skillTypes','BTestArmors','IconSParam8','paramX','slice','Game_Picture_x','PHA','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','sparamPlus2','down','Flat','drawRightArrow','dimColor1','PictureFilename','processAlwaysEscape','CLOSE_BRACKET','onInputOk','Bitmap_drawCircle','CLOSE_CURLY_BRACKET','Sprite_Button_initialize','process_VisuMZ_CoreEngine_RegExp','_internalTextures','gaugeRate','getCoreEngineScreenShakeStyle','COMMA','DIVIDE','ScreenShake','tilesets','WIN_OEM_WSCTRL','targetScaleX','startNormalGame','adjustBoxSize','MAXMP','height','MAXHP','currentExp','Window_NameInput_cursorUp','adjustPictureAntiZoom','EditBgType','Scene_Map_updateScene','getLevel','currencyUnit','_pauseSignSprite','TRAIT_PARAM','TRG','_isWindow','HANJA','_index','refresh','INOUTQUINT','IconParam2','openness','return\x200','profileWindowRect','reduce','duration','Game_Screen_initialize','_animation','ItemPadding','filterArea','REC','scaleSprite','IconSParam5','QUESTION_MARK','getLastPluginCommandInterpreter','Sprite_Button_updateOpacity','_spriteset','blockWidth','PAUSE','buttonAssistWindowSideRect','_menuButton','_moveEasingType','expGaugeColor1','Window_Base_drawIcon','TPB\x20WAIT','start','actorWindowRect','INEXPO','updateKeyText','SlotBgType','COLON','tileHeight','DummyRect','startShake','WIN_OEM_PA1','paramRate2','F12','GetParamIcon','retreat','offsetX','replace','ColorHPGauge1','Window_NameInput_cursorPagedown','enter','updateAnchor','CONVERT','Game_Picture_y','updateScene','AutoStretch','processSoundTimings','startAutoNewGame','parse','FontSize','createFauxAnimationSprite','isPhysical','sparamRate','addCommand','xparamPlus','updateClose','SlotRect','<JS\x20%1\x20%2:[\x20](.*)>','ShowJS','setGuard','ATK','drawActorLevel','XParamVocab2','SystemLoadAudio','_stored_hpGaugeColor1','isActor','F10','VisuMZ_2_BattleSystemCTB','_stored_mpGaugeColor2','loadWindowskin','WIN_OEM_FJ_JISHO','code','WIN_ICO_CLEAR','SystemSetFontSize','KeyTAB','setupCoreEasing','INELASTIC','random','RegExp','cursorPagedown','NUMPAD8','buttonY','Max','Sprite_Battler_startMove','NewGameCommonEventAll','Window_Selectable_drawBackgroundRect','EnableNameInput','Plus2','processDigitChange','ONE','loadSystem','_list','updateOrigin','textColor','CANCEL','battlebacks2','CategoryBgType','innerHeight','NUMPAD3','Game_Event_isCollidedWithEvents','INQUINT','iconWidth','BoxMargin','initButtonHidden','_slotWindow','skills','BottomButtons','isItem','GoldFontSize','eva','animationId','isMenuButtonAssistEnabled','setAnchor','SwitchActorText','DigitGroupingDamageSprites','OPEN_CURLY_BRACKET','round','makeCommandList','setSize','alwaysDash','WIN_ICO_HELP','tpColor','altKey','INOUTEXPO','match','_repositioned','ONE_MINUS_SRC_ALPHA','alpha','INOUTCUBIC','IconParam6','isPressed','F7key','note','Scene_Map_createMenuButton','applyCoreEasing','SkillTypeBgType','(\x5cd+)([%％])>','StatusEquipRect','contentsOpacity','setBattleSystem','CoreEngine','filter','titles1','SEPARATOR','forceOutOfPlaytest','innerWidth','ColorCrisis','push','ParseEnemyNotetags','isOpen','createDimmerSprite','Untitled','actor','createBackground','itypeId','SELECT','cursorPageup','IconParam5','BTB','_battlerName','Window_NameInput_cursorLeft','moveCancelButtonSideButtonLayout','maxCols','SystemSetBattleSystem','nextLevelExp','isRightInputMode','learnings','Game_Interpreter_PluginCommand','exec','getCombinedScrollingText','CustomParamIcons','background','processBack','_inputString','updateMainMultiply','_centerElement','allowShiftScrolling','Control\x20Variables\x20Script\x20Error','resetTextColor','gaugeBackColor','faces','active','OTB','_changingClass','calcCoreEasing','EscapeAlways','animations','Game_Temp_initialize','XParamVocab6','Layer','processCursorMoveModernControls','_fauxAnimationSprites','buttonAreaHeight','Window_Base_createTextState','TranslucentOpacity','IconXParam5','updateShadow','EXCLAMATION','maxLvGaugeColor2','sparamPlus','NEAREST','setBackgroundType','SParamVocab1','Window_NumberInput_start','isBottomButtonMode','clamp','_storedStack','XParamVocab0','AnimationMirrorOffset','drawValue','_targetOffsetY','img/%1/','none','boxHeight','ParamName','_stored_normalColor','sv_actors','Bitmap_strokeRect','createJsQuickFunction','_backgroundFilter','hpColor','TCR','CTRL','_addShadow','Input_clear','mainAreaTopSideButtonLayout','transform','createFauxAnimationQueue','currentClass','right','bitmapWidth','cursorLeft','Location','openingSpeed','paramPlus','save','_onKeyPress','VOLUME_DOWN','processHandling','_stored_pendingColor','mainAreaBottom','clear','MULTIPLY','playTestF6','Sprite_Animation_processSoundTimings','applyForcedGameTroopSettingsCoreEngine','drawGauge','drawSegment','setViewport','end','sqrt','PGUP','PictureEraseAll','Sprite_Gauge_currentValue','Activated','paramValueByName','createCancelButton','Symbol','BannedWords','LoadError','WIN_OEM_JUMP','pendingColor','ItemMenu','processKeyboardHandling','KEEP','paramName','paramBase','BattleManager_processEscape','NUMPAD1','width','subtitle','DimColor1','dummyWindowRect','targetEvaRate','MDF','getButtonAssistLocation','DimColor2','OUTCUBIC','54634LWACuX','Window_Selectable_cursorDown','NUMPAD5','getBattleSystem','isInputting','buttonAssistKey4','Wait','Window_Base_drawCharacter','usableSkills','BlurFilter','playEscape','65XWLgnJ','create','resetBattleSystem','GameEnd','helpAreaTop','isExpGaugeDrawn','MenuBg','xparamPlusJS','CRSEL','_clickHandler','makeEncounterCount','anchor','getGamepads','Scene_Boot_updateDocumentTitle','fromCharCode','XParamVocab1','SParamVocab6','BACKSPACE','processTouchModernControls','_stored_gaugeBackColor','isSideView','DrawItemBackgroundJS','useDigitGrouping','useDigitGroupingEx','isOptionValid','registerCommand','makeDocumentTitle','determineSideButtonLayoutValid','_movementWholeDuration','_tempActor','processEscape','isMagical','getInputMultiButtonStrings','down2','DefaultStyle','listWindowRect','max','EditRect','ctGaugeColor2','_muteSound','process_VisuMZ_CoreEngine_Functions','backspace','updatePositionCoreEngineShakeOriginal','ConvertNumberToString','itemEva','%1/','index','BattleSystem','playOk','targetY','applyEasing','Subtitle','_cacheScaleY','DataManager_setupNewGame','resetFontSettings','refreshDimmerBitmap','VisuMZ_2_BattleSystemOTB','203229aOjHqv','pictureButtons','Manual','Scene_Battle_createSpriteset','statusEquipWindowRect','ParseActorNotetags','buttonAssistText5','EXECUTE','Window_Selectable_itemRect','processKeyboardEnd','connected','call','7iFvPJF','VisuMZ_2_BattleSystemFTB','opacity','makeAutoBattleActions','Flat2','openURL','mev','getCustomBackgroundSettings','rgba(0,\x200,\x200,\x200.7)','ESC','ButtonHeight','playCursorSound','doesNameContainBannedWords','GoldIcon','FadeSpeed','_pollGamepads','Duration','_stored_mpGaugeColor1','valueOutlineWidth','xparamRate2','Plus','Window_StatusBase_drawActorSimpleStatus','destroyed','LUK','clone','BgFilename2','_forcedTroopView','Renderer','smoothSelect','itemPadding','onKeyDown','_drawTextShadow','WIN_OEM_PA2','ItemBackColor1','F24','expRate','TPB\x20ACTIVE','Script\x20Call\x20Error','apply','_cache','NUMPAD0','Input_pollGamepads','RightMenus','itemHit','_stored_tpGaugeColor2','drawGameTitle','isNormalPriority','drawGameVersion','setBackgroundOpacity','addChildToBack','Window_NameInput_processHandling','Window_Base_initialize','ImgLoad','_shouldPreventDefault','Window_ShopSell_isEnabled','format','F6key','_stored_crisisColor','origin','bgs','GRD','XParamVocab5','targetOpacity','REPLACE','ColorHPGauge2','xparamPlus1','Scene_Map_createSpriteset','top','consumeItem','tpCostColor','_coreEasing','updateFauxAnimations','MEV','isAlive','drawIcon','TextCodeClassNames','OutlineColor','DEF','isCollidedWithEvents','WindowLayer_render','hit','isWindowMaskingEnabled','deselect','outlineColor','abs','OUTBOUNCE','uiAreaHeight','AntiZoomPictures','ItemRect','RepositionEnemies','Scene_Name_onInputOk','removeFauxAnimation','commandWindowRect','trim','LevelUpFullHp','createTitleButtons','getColorDataFromPluginParameters','EquipMenu','Sprite_destroy','GoldBgType','drawIconBySize','_maxDigits','command122','mirror','Conditional\x20Branch\x20Script\x20Error','_isButtonHidden','createCustomParameter','_stored_powerDownColor','_baseTexture','drawParamText','changeTextColor','maxLvGaugeColor1','NoTileShadows','isBottomHelpMode','MAX_GL_TEXTURES','TextStr','xparamFlat1','Title','battleSystem','Window_StatusBase_drawActorLevel','120517qFDyDH','sparamRateJS','markCoreEngineModified','isDying','paramFlat','_baseSprite','categoryWindowRect','child_process','loadBitmap','_height','smallParamFontSize','expGaugeColor2','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','BackOpacity','ShowButtons','_statusParamsWindow','processTouch','144476nPBnLZ','DigitGroupingStandardText','_dimmerSprite','ColorCTGauge2','_stored_systemColor','Scene_MenuBase_createCancelButton','printError','SceneManager_initialize','Rate2','targetContentsOpacity','rgba(0,\x200,\x200,\x201.0)','number','CONTEXT_MENU','normal','canUse','MINUS','Window_Base_drawText','buttonAssistText%1','Spriteset_Base_destroy','fillRect','Game_Character_processMoveCommand','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','Graphics_printError','112858bpcnII','NUMPAD4','_gamepadWait','MCR','SceneManager_isGameActive','ColorPowerDown','battlebacks1','_categoryWindow','CIRCUMFLEX','setActorHome','ParseTilesetNotetags','horzJS','level','IconXParam0','_targetAnchor','setupBattleTestItems','Game_Picture_updateMove','updateOpen','F13','CRI','subjectHitRate','isGamepadConnected','MultiKeyFmt','parameters','ShowDevTools','updateDocumentTitle','_stored_maxLvGaugeColor1','encounterStepsMinimum','isSmartEventCollisionOn','includes','toUpperCase','SmartEventCollisionPriority','_numberWindow','onDatabaseLoaded','_bitmap','buttonAssistOffset5','MenuLayout','Scene_Status_create','sellWindowRect','numberWindowRect','setMute','ModernControls','dimColor2','runCombinedScrollingTextAsCode','PRINT','PDR','Sprite_Picture_updateOrigin','outbounce','WIN_OEM_AUTO','getInputButtonString','TextJS','showDevTools','EISU','setFrame','LEFT','HELP','DECIMAL','targetSpritePosition','isClosed','NUMPAD6','ParamChange','paramMax','buttonAssistKey%1','PLUS','ENTER','ButtonAssist','escape','setSkill','Page','RowSpacing','removeAllFauxAnimations','startMove','END','Scene_Base_createWindowLayer','powerUpColor','titles2','batch','F15','0.00','JSON','BgFilename1','Game_Action_updateLastTarget','forceStencil','INOUTQUART','centerSprite','setMoveEasingType','FUNC','isArrowPressed','_inputWindow','enableDigitGroupingEx','drawCharacter','playTestF7','_mapNameWindow','button','IconSet','ExtJS','item','isCancelled','_commandList','initCoreEngine','makeCoreEngineCommandList','_CoreEngineSettings','JUNJA','translucentOpacity','default','ProfileBgType','movePageButtonSideButtonLayout','process_VisuMZ_CoreEngine_Notetags','inBattle','ListRect','platform','Input_setupEventHandlers','EnableJS','setHandler','moveMenuButtonSideButtonLayout','F11','TGR','setActorHomeRepositioned','_upArrowSprite','IconSParam9','sparamPlusJS','drawItem','createBuffer','MRG','damageColor','process_VisuMZ_CoreEngine_Settings','sparamRate2','_pageupButton','initCoreEngineScreenShake','win32','OUTELASTIC','_digitGroupingEx','buyWindowRect','INCIRC','xparam','powerDownColor','dashToggle','_drawTextOutline','buttonAssistCancel','_helpWindow','NONCONVERT','integer','setViewportCoreEngineFix','ValueJS','DOUBLE_QUOTE','INOUTQUAD','cancel','LATIN1','stop','DummyBgType','ParseAllNotetags','Spriteset_Base_updatePosition','enemy','WIN_OEM_RESET','buttonAssistOffset3','Game_Actor_changeClass','sparam','split','pictureId','toFixed','Color','TimeProgress','Spriteset_Base_initialize','EQUAL','pow','maxBattleMembers','isGamepadButtonPressed','Type','goto','drawNewParam','viewport','areButtonsHidden','blt','_pagedownButton','repeat','Scene_Unlisted','_data','maxLevel','DigitGroupingExText','StartID','ParseStateNotetags','setSideButtonLayout','ColorNormal','yScrollLinkedOffset','loadGameImagesCoreEngine','updateTransform','Game_Interpreter_command122','StatusEquipBgType','endAnimation','animationBaseDelay','isAnimationOffsetXMirrored','constructor','deathColor','equips','Scene_MenuBase_createBackground','BgType','_movementDuration','onClick','BottomHelp','makeInputButtonString','SideView','performMiss','fillStyle','OpenURL'];const _0x5272=function(_0x451229,_0x28c5a8){_0x451229=_0x451229-0x96;let _0x912391=_0x9123[_0x451229];return _0x912391;};const _0x38ed9b=_0x5272;(function(_0x205d63,_0x38e39c){const _0x49ad14=_0x5272;while(!![]){try{const _0x11e0f7=parseInt(_0x49ad14(0x3e5))*-parseInt(_0x49ad14(0x5ca))+-parseInt(_0x49ad14(0x10e))*-parseInt(_0x49ad14(0x28d))+-parseInt(_0x49ad14(0x4be))+parseInt(_0x49ad14(0x3f0))*parseInt(_0x49ad14(0x12e))+parseInt(_0x49ad14(0x4d5))+parseInt(_0x49ad14(0x429))+-parseInt(_0x49ad14(0x435))*-parseInt(_0x49ad14(0x4ad));if(_0x11e0f7===_0x38e39c)break;else _0x205d63['push'](_0x205d63['shift']());}catch(_0x36209a){_0x205d63['push'](_0x205d63['shift']());}}}(_0x9123,0xcb0b5));var label=_0x38ed9b(0x35b),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x38ed9b(0x35c)](function(_0x522d51){const _0x373d3e=_0x38ed9b;return _0x522d51[_0x373d3e(0xd5)]&&_0x522d51['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x38ed9b(0x222)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x38ed9b(0x25a)]=function(_0x2ebf6b,_0x1768d8){const _0x2fe740=_0x38ed9b;for(const _0x292e17 in _0x1768d8){if(_0x292e17['match'](/(.*):(.*)/i)){const _0x5b4123=String(RegExp['$1']),_0x368428=String(RegExp['$2'])['toUpperCase']()[_0x2fe740(0x492)]();let _0x247aa9,_0x42c1d4,_0x213b06;switch(_0x368428){case _0x2fe740(0x279):_0x247aa9=_0x1768d8[_0x292e17]!==''?Number(_0x1768d8[_0x292e17]):0x0;break;case _0x2fe740(0x28e):_0x42c1d4=_0x1768d8[_0x292e17]!==''?JSON[_0x2fe740(0x2ff)](_0x1768d8[_0x292e17]):[],_0x247aa9=_0x42c1d4['map'](_0x396323=>Number(_0x396323));break;case'EVAL':_0x247aa9=_0x1768d8[_0x292e17]!==''?eval(_0x1768d8[_0x292e17]):null;break;case _0x2fe740(0x183):_0x42c1d4=_0x1768d8[_0x292e17]!==''?JSON[_0x2fe740(0x2ff)](_0x1768d8[_0x292e17]):[],_0x247aa9=_0x42c1d4[_0x2fe740(0x155)](_0x922a10=>eval(_0x922a10));break;case _0x2fe740(0x524):_0x247aa9=_0x1768d8[_0x292e17]!==''?JSON['parse'](_0x1768d8[_0x292e17]):'';break;case _0x2fe740(0x110):_0x42c1d4=_0x1768d8[_0x292e17]!==''?JSON[_0x2fe740(0x2ff)](_0x1768d8[_0x292e17]):[],_0x247aa9=_0x42c1d4['map'](_0xdabedd=>JSON[_0x2fe740(0x2ff)](_0xdabedd));break;case _0x2fe740(0x52b):_0x247aa9=_0x1768d8[_0x292e17]!==''?new Function(JSON['parse'](_0x1768d8[_0x292e17])):new Function(_0x2fe740(0x2ce));break;case'ARRAYFUNC':_0x42c1d4=_0x1768d8[_0x292e17]!==''?JSON[_0x2fe740(0x2ff)](_0x1768d8[_0x292e17]):[],_0x247aa9=_0x42c1d4[_0x2fe740(0x155)](_0x24dcd9=>new Function(JSON[_0x2fe740(0x2ff)](_0x24dcd9)));break;case _0x2fe740(0x286):_0x247aa9=_0x1768d8[_0x292e17]!==''?String(_0x1768d8[_0x292e17]):'';break;case _0x2fe740(0x646):_0x42c1d4=_0x1768d8[_0x292e17]!==''?JSON[_0x2fe740(0x2ff)](_0x1768d8[_0x292e17]):[],_0x247aa9=_0x42c1d4[_0x2fe740(0x155)](_0xe10e08=>String(_0xe10e08));break;case'STRUCT':_0x213b06=_0x1768d8[_0x292e17]!==''?JSON[_0x2fe740(0x2ff)](_0x1768d8[_0x292e17]):{},_0x2ebf6b[_0x5b4123]={},VisuMZ[_0x2fe740(0x25a)](_0x2ebf6b[_0x5b4123],_0x213b06);continue;case'ARRAYSTRUCT':_0x42c1d4=_0x1768d8[_0x292e17]!==''?JSON[_0x2fe740(0x2ff)](_0x1768d8[_0x292e17]):[],_0x247aa9=_0x42c1d4[_0x2fe740(0x155)](_0x349a34=>VisuMZ[_0x2fe740(0x25a)]({},JSON['parse'](_0x349a34)));break;default:continue;}_0x2ebf6b[_0x5b4123]=_0x247aa9;}}return _0x2ebf6b;},(_0x247a84=>{const _0x3a995a=_0x38ed9b,_0x1f7eae=_0x247a84['name'];for(const _0x8e7d61 of dependencies){if(!Imported[_0x8e7d61]){alert(_0x3a995a(0x2a1)['format'](_0x1f7eae,_0x8e7d61)),SceneManager['exit']();break;}}const _0x2da207=_0x247a84[_0x3a995a(0xc4)];if(_0x2da207[_0x3a995a(0x34b)](/\[Version[ ](.*?)\]/i)){const _0x544e3b=Number(RegExp['$1']);_0x544e3b!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3a995a(0x46c)](_0x1f7eae,_0x544e3b)),SceneManager['exit']());}if(_0x2da207[_0x3a995a(0x34b)](/\[Tier[ ](\d+)\]/i)){const _0x3232cf=Number(RegExp['$1']);_0x3232cf<tier?(alert(_0x3a995a(0x4b9)[_0x3a995a(0x46c)](_0x1f7eae,_0x3232cf,tier)),SceneManager[_0x3a995a(0xeb)]()):tier=Math['max'](_0x3232cf,tier);}VisuMZ[_0x3a995a(0x25a)](VisuMZ[label][_0x3a995a(0x222)],_0x247a84[_0x3a995a(0x4ec)]);})(pluginData),VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x3cd)]={'PluginCommands':!![]},PluginManager[_0x38ed9b(0x409)](pluginData[_0x38ed9b(0x11e)],_0x38ed9b(0x5a0),_0x4683e2=>{const _0x20754e=_0x38ed9b;VisuMZ[_0x20754e(0x25a)](_0x4683e2,_0x4683e2);const _0xb3213e=_0x4683e2['URL'];VisuMZ[_0x20754e(0x43a)](_0xb3213e);}),PluginManager['registerCommand'](pluginData[_0x38ed9b(0x11e)],'GoldChange',_0x1e01dd=>{const _0x5edc81=_0x38ed9b;VisuMZ['ConvertParams'](_0x1e01dd,_0x1e01dd);const _0x4b8f61=_0x1e01dd[_0x5edc81(0x24c)]||0x0;$gameParty['gainGold'](_0x4b8f61);}),PluginManager[_0x38ed9b(0x409)](pluginData[_0x38ed9b(0x11e)],'PictureEasingType',_0x338f59=>{const _0x2e06f1=_0x38ed9b;VisuMZ['ConvertParams'](_0x338f59,_0x338f59);const _0x2adff3=_0x338f59[_0x2e06f1(0x573)]||0x1,_0x22a94d=_0x338f59[_0x2e06f1(0x1d0)]||_0x2e06f1(0x11b),_0x3de078=$gameScreen['picture'](_0x2adff3);_0x3de078&&_0x3de078[_0x2e06f1(0x157)](_0x22a94d);}),PluginManager[_0x38ed9b(0x409)](pluginData[_0x38ed9b(0x11e)],_0x38ed9b(0x3cb),_0x5ab256=>{const _0x37c955=_0x38ed9b;for(let _0x148a65=0x1;_0x148a65<=0x64;_0x148a65++){$gameScreen[_0x37c955(0x5bd)](_0x148a65);}}),PluginManager[_0x38ed9b(0x409)](pluginData[_0x38ed9b(0x11e)],_0x38ed9b(0x21e),_0x4f969f=>{const _0x3489b3=_0x38ed9b;VisuMZ[_0x3489b3(0x25a)](_0x4f969f,_0x4f969f);const _0x5e9f65=Math[_0x3489b3(0x641)](_0x4f969f['StartID'],_0x4f969f['EndingID']),_0x4e1e86=Math[_0x3489b3(0x414)](_0x4f969f[_0x3489b3(0x588)],_0x4f969f['EndingID']);for(let _0x283468=_0x5e9f65;_0x283468<=_0x4e1e86;_0x283468++){$gameScreen[_0x3489b3(0x5bd)](_0x283468);}}),PluginManager[_0x38ed9b(0x409)](pluginData[_0x38ed9b(0x11e)],_0x38ed9b(0x2b4),_0x519434=>{const _0x5329b2=_0x38ed9b;VisuMZ[_0x5329b2(0x25a)](_0x519434,_0x519434);const _0x2131d5=_0x519434[_0x5329b2(0x57c)]||_0x5329b2(0x31c),_0x488845=_0x519434[_0x5329b2(0x140)][_0x5329b2(0x39c)](0x1,0x9),_0x5a1e2c=_0x519434['Speed']['clamp'](0x1,0x9),_0x1ae2e7=_0x519434[_0x5329b2(0x445)]||0x1,_0x119f12=_0x519434[_0x5329b2(0x3eb)];$gameScreen[_0x5329b2(0x621)](_0x2131d5),$gameScreen[_0x5329b2(0x2ed)](_0x488845,_0x5a1e2c,_0x1ae2e7);if(_0x119f12){const _0x379b8a=$gameTemp[_0x5329b2(0x2da)]();if(_0x379b8a)_0x379b8a['wait'](_0x1ae2e7);}}),PluginManager[_0x38ed9b(0x409)](pluginData[_0x38ed9b(0x11e)],_0x38ed9b(0x318),_0x465b84=>{const _0x2d69f2=_0x38ed9b;VisuMZ[_0x2d69f2(0x25a)](_0x465b84,_0x465b84);const _0x31bb7f=_0x465b84[_0x2d69f2(0x131)]||0x1;$gameSystem[_0x2d69f2(0x62a)](_0x31bb7f);}),PluginManager[_0x38ed9b(0x409)](pluginData['name'],_0x38ed9b(0x5d1),_0x4642ad=>{const _0x2d4e16=_0x38ed9b;if($gameParty[_0x2d4e16(0x541)]())return;VisuMZ['ConvertParams'](_0x4642ad,_0x4642ad);const _0x5136ca=_0x4642ad[_0x2d4e16(0x131)];if(_0x5136ca[_0x2d4e16(0x34b)](/Front/i))$gameSystem[_0x2d4e16(0x147)](![]);else _0x5136ca['match'](/Side/i)?$gameSystem[_0x2d4e16(0x147)](!![]):$gameSystem[_0x2d4e16(0x147)](!$gameSystem[_0x2d4e16(0x404)]());}),PluginManager[_0x38ed9b(0x409)](pluginData[_0x38ed9b(0x11e)],_0x38ed9b(0x30e),_0x2ab197=>{const _0x45bb19=_0x38ed9b;if($gameParty[_0x45bb19(0x541)]())return;VisuMZ[_0x45bb19(0x25a)](_0x2ab197,_0x2ab197);const _0x279477=[_0x45bb19(0x600),_0x45bb19(0x470),'me','se'];for(const _0x1ce919 of _0x279477){const _0x5ddb72=_0x2ab197[_0x1ce919],_0x3cfc1f=_0x45bb19(0x41d)['format'](_0x1ce919);for(const _0x81e210 of _0x5ddb72){console[_0x45bb19(0x236)](_0x3cfc1f,_0x81e210),AudioManager[_0x45bb19(0x54f)](_0x3cfc1f,_0x81e210);}}}),PluginManager[_0x38ed9b(0x409)](pluginData[_0x38ed9b(0x11e)],'SystemLoadImages',_0x43452a=>{const _0xc0a5f5=_0x38ed9b;if($gameParty[_0xc0a5f5(0x541)]())return;VisuMZ['ConvertParams'](_0x43452a,_0x43452a);const _0x5b262b=['animations',_0xc0a5f5(0x4db),_0xc0a5f5(0x32e),_0xc0a5f5(0x1e7),_0xc0a5f5(0x5d8),_0xc0a5f5(0x383),'parallaxes',_0xc0a5f5(0x5a5),_0xc0a5f5(0x3a7),'sv_enemies',_0xc0a5f5(0x19d),_0xc0a5f5(0x2b5),_0xc0a5f5(0x35d),_0xc0a5f5(0x520)];for(const _0x3e47b5 of _0x5b262b){const _0xcf5a4c=_0x43452a[_0x3e47b5],_0x3f2008=_0xc0a5f5(0x3a2)[_0xc0a5f5(0x46c)](_0x3e47b5);for(const _0x18cf4d of _0xcf5a4c){ImageManager['loadBitmap'](_0x3f2008,_0x18cf4d);}}}),PluginManager[_0x38ed9b(0x409)](pluginData[_0x38ed9b(0x11e)],_0x38ed9b(0x372),_0x5e84d9=>{const _0x106294=_0x38ed9b;if($gameParty[_0x106294(0x541)]())return;VisuMZ['ConvertParams'](_0x5e84d9,_0x5e84d9);const _0x4ff324=_0x5e84d9[_0x106294(0x131)]['toUpperCase']()[_0x106294(0x492)](),_0x3cc431=VisuMZ[_0x106294(0x35b)][_0x106294(0x5d0)](_0x4ff324);$gameSystem[_0x106294(0x35a)](_0x3cc431);}),VisuMZ['CoreEngine'][_0x38ed9b(0x5d0)]=function(_0x26839b){const _0x610de2=_0x38ed9b;_0x26839b=_0x26839b||_0x610de2(0xb7),_0x26839b=String(_0x26839b)[_0x610de2(0x4f3)]()[_0x610de2(0x492)]();switch(_0x26839b){case _0x610de2(0x265):return 0x0;case _0x610de2(0x459):Imported[_0x610de2(0xee)]&&(ConfigManager[_0x610de2(0x175)]=!![]);return 0x1;case _0x610de2(0x2e4):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x610de2(0x175)]=![]);return 0x2;case _0x610de2(0x297):if(Imported['VisuMZ_2_BattleSystemCTB'])return _0x610de2(0x297);break;case _0x610de2(0x9e):if(Imported[_0x610de2(0x9d)])return _0x610de2(0x9e);break;case _0x610de2(0x36d):if(Imported[_0x610de2(0x273)])return _0x610de2(0x36d);break;case _0x610de2(0x18d):if(Imported[_0x610de2(0x436)])return _0x610de2(0x18d);break;case _0x610de2(0x385):if(Imported[_0x610de2(0x428)])return _0x610de2(0x385);break;}return $dataSystem[_0x610de2(0x4ab)];},PluginManager['registerCommand'](pluginData['name'],'SystemSetWindowPadding',_0x54ff71=>{const _0x8e11dd=_0x38ed9b;VisuMZ[_0x8e11dd(0x25a)](_0x54ff71,_0x54ff71);const _0x2b96e1=_0x54ff71['option']||0x1;$gameSystem[_0x8e11dd(0xac)](_0x2b96e1);}),VisuMZ['CoreEngine']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x38ed9b(0x1d7)][_0x38ed9b(0x4f6)],Scene_Boot[_0x38ed9b(0x1d7)][_0x38ed9b(0x4f6)]=function(){const _0x52344b=_0x38ed9b;VisuMZ[_0x52344b(0x35b)][_0x52344b(0x258)]['call'](this),this[_0x52344b(0x2ae)](),this[_0x52344b(0x540)](),this['process_VisuMZ_CoreEngine_Settings'](),this[_0x52344b(0x418)](),this[_0x52344b(0x248)](),VisuMZ[_0x52344b(0x56b)]();},VisuMZ[_0x38ed9b(0x35b)]['RegExp']={},Scene_Boot['prototype'][_0x38ed9b(0x2ae)]=function(){const _0x165a25=_0x38ed9b,_0x14c97a=[_0x165a25(0x2bc),'MAXMP',_0x165a25(0x30b),'DEF',_0x165a25(0x1e0),_0x165a25(0x3e1),_0x165a25(0x616),_0x165a25(0x44c)],_0x2aff36=['HIT',_0x165a25(0x16c),_0x165a25(0x4e8),_0x165a25(0x12c),_0x165a25(0x47d),_0x165a25(0x5a8),_0x165a25(0x608),_0x165a25(0x5e2),'MRG','TRG'],_0x4b15a9=['TGR',_0x165a25(0x471),_0x165a25(0x2d6),'PHA',_0x165a25(0x4d8),_0x165a25(0x3ac),'PDR','MDR',_0x165a25(0x654),_0x165a25(0x1f0)],_0x3f31fc=[_0x14c97a,_0x2aff36,_0x4b15a9],_0x20e5c7=[_0x165a25(0x449),'Plus1',_0x165a25(0x326),_0x165a25(0x321),'Rate',_0x165a25(0x17f),_0x165a25(0x4c6),'Flat',_0x165a25(0x121),'Flat2'];for(const _0x5e0f3a of _0x3f31fc){let _0x6eb28b='';if(_0x5e0f3a===_0x14c97a)_0x6eb28b=_0x165a25(0x1c7);if(_0x5e0f3a===_0x2aff36)_0x6eb28b=_0x165a25(0x55b);if(_0x5e0f3a===_0x4b15a9)_0x6eb28b='sparam';for(const _0x451ecd of _0x20e5c7){let _0xfc10e1=_0x165a25(0x1ee)[_0x165a25(0x46c)](_0x6eb28b,_0x451ecd);VisuMZ['CoreEngine'][_0x165a25(0x31d)][_0xfc10e1]=[],VisuMZ[_0x165a25(0x35b)][_0x165a25(0x31d)][_0xfc10e1+'JS']=[];let _0x27ac7e=_0x165a25(0x5c8);if([_0x165a25(0x449),_0x165a25(0x2a4)]['includes'](_0x451ecd))_0x27ac7e+='([\x5c+\x5c-]\x5cd+)>';else{if(['Plus1',_0x165a25(0x121)][_0x165a25(0x4f2)](_0x451ecd))_0x27ac7e+=_0x165a25(0x1bc);else{if([_0x165a25(0x326),_0x165a25(0x439)]['includes'](_0x451ecd))_0x27ac7e+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{if(_0x451ecd==='Max')_0x27ac7e+=_0x165a25(0x65b);else{if(_0x451ecd==='Rate1')_0x27ac7e+=_0x165a25(0x357);else _0x451ecd==='Rate2'&&(_0x27ac7e+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x33a675 of _0x5e0f3a){let _0x576b6f=_0x451ecd['replace'](/[\d+]/g,'')[_0x165a25(0x4f3)]();const _0x39f71a=_0x27ac7e[_0x165a25(0x46c)](_0x33a675,_0x576b6f);VisuMZ['CoreEngine'][_0x165a25(0x31d)][_0xfc10e1][_0x165a25(0x362)](new RegExp(_0x39f71a,'i'));const _0x4935f9=_0x165a25(0x308)[_0x165a25(0x46c)](_0x33a675,_0x576b6f);VisuMZ[_0x165a25(0x35b)][_0x165a25(0x31d)][_0xfc10e1+'JS']['push'](new RegExp(_0x4935f9,'i'));}}}},Scene_Boot[_0x38ed9b(0x1d7)][_0x38ed9b(0x540)]=function(){const _0x1c9d4c=_0x38ed9b;if(VisuMZ[_0x1c9d4c(0x56b)])return;},Scene_Boot['prototype'][_0x38ed9b(0x552)]=function(){const _0x31b8aa=_0x38ed9b;VisuMZ['CoreEngine'][_0x31b8aa(0x222)][_0x31b8aa(0xb0)][_0x31b8aa(0x19c)]&&VisuMZ[_0x31b8aa(0x4ed)](!![]);VisuMZ[_0x31b8aa(0x35b)]['Settings'][_0x31b8aa(0xb0)][_0x31b8aa(0x4fe)]&&(Input['keyMapper'][0x23]=_0x31b8aa(0x3c8),Input[_0x31b8aa(0xaf)][0x24]=_0x31b8aa(0x1e5));if(VisuMZ['CoreEngine'][_0x31b8aa(0x222)][_0x31b8aa(0x516)]){const _0xf73d21=VisuMZ[_0x31b8aa(0x35b)][_0x31b8aa(0x222)][_0x31b8aa(0x516)];_0xf73d21['KeySHIFT']=_0xf73d21[_0x31b8aa(0x5d7)]||'\x5c}❪SHIFT❫\x5c{',_0xf73d21[_0x31b8aa(0x319)]=_0xf73d21['KeyTAB']||'\x5c}❪TAB❫\x5c{';}VisuMZ[_0x31b8aa(0x35b)][_0x31b8aa(0x222)][_0x31b8aa(0x16e)][_0x31b8aa(0x128)]&&(Input[_0x31b8aa(0xaf)][0x57]='up',Input[_0x31b8aa(0xaf)][0x41]=_0x31b8aa(0x1ed),Input[_0x31b8aa(0xaf)][0x53]=_0x31b8aa(0x2a3),Input['keyMapper'][0x44]=_0x31b8aa(0x3b4),Input[_0x31b8aa(0xaf)][0x45]='pagedown'),VisuMZ[_0x31b8aa(0x35b)]['Settings'][_0x31b8aa(0x16e)][_0x31b8aa(0x21d)]&&(Input[_0x31b8aa(0xaf)][0x52]=_0x31b8aa(0x55d));},Scene_Boot[_0x38ed9b(0x1d7)][_0x38ed9b(0x418)]=function(){const _0x389339=_0x38ed9b;this[_0x389339(0x5be)]();},Scene_Boot[_0x38ed9b(0x1d7)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x523ee6=_0x38ed9b,_0x8ef4e7=VisuMZ[_0x523ee6(0x35b)][_0x523ee6(0x222)]['jsQuickFunc'];for(const _0x422d64 of _0x8ef4e7){const _0x543271=_0x422d64[_0x523ee6(0x162)][_0x523ee6(0x2f4)](/[ ]/g,''),_0xecc274=_0x422d64['CodeJS'];VisuMZ[_0x523ee6(0x35b)][_0x523ee6(0x3a9)](_0x543271,_0xecc274);}},VisuMZ['CoreEngine'][_0x38ed9b(0x3a9)]=function(_0x393ba2,_0x39ad73){const _0x3ee0e8=_0x38ed9b;if(!!window[_0x393ba2]){if($gameTemp[_0x3ee0e8(0x28b)]())console[_0x3ee0e8(0x236)](_0x3ee0e8(0x4d3)[_0x3ee0e8(0x46c)](_0x393ba2));}const _0x9b81bc='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'['format'](_0x393ba2,_0x39ad73);window[_0x393ba2]=new Function(_0x9b81bc);},Scene_Boot[_0x38ed9b(0x1d7)]['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x544f51=_0x38ed9b,_0x3547b5=VisuMZ['CoreEngine'][_0x544f51(0x222)][_0x544f51(0x275)];if(!_0x3547b5)return;for(const _0x18bb62 of _0x3547b5){if(!_0x18bb62)continue;VisuMZ[_0x544f51(0x35b)][_0x544f51(0x49f)](_0x18bb62);}},VisuMZ['CoreEngine'][_0x38ed9b(0x247)]={},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x379)]={},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x97)]={},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x5c6)]={},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x49f)]=function(_0x22079e){const _0x2c0664=_0x38ed9b,_0x4c7bd9=_0x22079e['Abbreviation'],_0x4ebdad=_0x22079e[_0x2c0664(0x3a5)],_0x1c0fc1=_0x22079e['Icon'],_0x4ddca8=_0x22079e[_0x2c0664(0x57c)],_0x43ccf4=new Function(_0x22079e[_0x2c0664(0x564)]);VisuMZ[_0x2c0664(0x35b)]['CustomParamNames'][_0x4c7bd9[_0x2c0664(0x4f3)]()[_0x2c0664(0x492)]()]=_0x4ebdad,VisuMZ[_0x2c0664(0x35b)][_0x2c0664(0x379)][_0x4c7bd9[_0x2c0664(0x4f3)]()[_0x2c0664(0x492)]()]=_0x1c0fc1,VisuMZ[_0x2c0664(0x35b)][_0x2c0664(0x97)][_0x4c7bd9['toUpperCase']()[_0x2c0664(0x492)]()]=_0x4ddca8,VisuMZ[_0x2c0664(0x35b)]['CustomParamAbb'][_0x4c7bd9[_0x2c0664(0x4f3)]()['trim']()]=_0x4c7bd9,Object[_0x2c0664(0x1fe)](Game_BattlerBase[_0x2c0664(0x1d7)],_0x4c7bd9,{'get'(){const _0x948cf1=_0x2c0664,_0x1d89f5=_0x43ccf4[_0x948cf1(0x434)](this);return _0x4ddca8===_0x948cf1(0x562)?Math[_0x948cf1(0x343)](_0x1d89f5):_0x1d89f5;}});},VisuMZ[_0x38ed9b(0x56b)]=function(){const _0x41b9c7=_0x38ed9b;for(const _0x19bad4 of $dataActors){if(_0x19bad4)VisuMZ[_0x41b9c7(0x42e)](_0x19bad4);}for(const _0xe7a37c of $dataClasses){if(_0xe7a37c)VisuMZ[_0x41b9c7(0x188)](_0xe7a37c);}for(const _0x25ba9d of $dataSkills){if(_0x25ba9d)VisuMZ[_0x41b9c7(0x109)](_0x25ba9d);}for(const _0x3d8942 of $dataItems){if(_0x3d8942)VisuMZ[_0x41b9c7(0x23a)](_0x3d8942);}for(const _0x4f5877 of $dataWeapons){if(_0x4f5877)VisuMZ[_0x41b9c7(0x5f0)](_0x4f5877);}for(const _0x2c379a of $dataArmors){if(_0x2c379a)VisuMZ[_0x41b9c7(0x606)](_0x2c379a);}for(const _0x4ad318 of $dataEnemies){if(_0x4ad318)VisuMZ[_0x41b9c7(0x363)](_0x4ad318);}for(const _0x600d14 of $dataStates){if(_0x600d14)VisuMZ[_0x41b9c7(0x589)](_0x600d14);}for(const _0xe1dd55 of $dataTilesets){if(_0xe1dd55)VisuMZ[_0x41b9c7(0x4df)](_0xe1dd55);}},VisuMZ[_0x38ed9b(0x42e)]=function(_0x38ac83){},VisuMZ['ParseClassNotetags']=function(_0x230f56){},VisuMZ['ParseSkillNotetags']=function(_0x3ae91f){},VisuMZ[_0x38ed9b(0x23a)]=function(_0x20b584){},VisuMZ[_0x38ed9b(0x5f0)]=function(_0x362b09){},VisuMZ[_0x38ed9b(0x606)]=function(_0x335bd0){},VisuMZ['ParseEnemyNotetags']=function(_0x25242c){},VisuMZ[_0x38ed9b(0x589)]=function(_0x42d5e2){},VisuMZ['ParseTilesetNotetags']=function(_0x498d3b){},VisuMZ[_0x38ed9b(0x35b)]['ParseActorNotetags']=VisuMZ['ParseActorNotetags'],VisuMZ[_0x38ed9b(0x42e)]=function(_0x1a8cab){const _0x5decda=_0x38ed9b;VisuMZ[_0x5decda(0x35b)]['ParseActorNotetags'][_0x5decda(0x434)](this,_0x1a8cab);const _0x52778e=_0x1a8cab[_0x5decda(0x353)];if(_0x52778e['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0x1a8cab[_0x5decda(0x586)]=Number(RegExp['$1']);if(_0x1a8cab[_0x5decda(0x586)]===0x0)_0x1a8cab[_0x5decda(0x586)]=Number[_0x5decda(0x198)];}_0x52778e['match'](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x1a8cab['initialLevel']=Math[_0x5decda(0x641)](Number(RegExp['$1']),_0x1a8cab[_0x5decda(0x586)]));},VisuMZ['CoreEngine'][_0x38ed9b(0x188)]=VisuMZ[_0x38ed9b(0x188)],VisuMZ[_0x38ed9b(0x188)]=function(_0x27a855){const _0x52c470=_0x38ed9b;VisuMZ[_0x52c470(0x35b)][_0x52c470(0x188)][_0x52c470(0x434)](this,_0x27a855);if(_0x27a855[_0x52c470(0x375)])for(const _0x2c66c7 of _0x27a855[_0x52c470(0x375)]){_0x2c66c7[_0x52c470(0x353)][_0x52c470(0x34b)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x2c66c7[_0x52c470(0x4e1)]=Math['max'](Number(RegExp['$1']),0x1));}},VisuMZ['CoreEngine'][_0x38ed9b(0x363)]=VisuMZ[_0x38ed9b(0x363)],VisuMZ[_0x38ed9b(0x363)]=function(_0x1d8dcc){const _0x1469fa=_0x38ed9b;VisuMZ[_0x1469fa(0x35b)][_0x1469fa(0x363)][_0x1469fa(0x434)](this,_0x1d8dcc),_0x1d8dcc[_0x1469fa(0x4e1)]=0x1;const _0xe59830=_0x1d8dcc[_0x1469fa(0x353)];if(_0xe59830[_0x1469fa(0x34b)](/<LEVEL:[ ](\d+)>/i))_0x1d8dcc[_0x1469fa(0x4e1)]=Number(RegExp['$1']);if(_0xe59830['match'](/<MAXHP:[ ](\d+)>/i))_0x1d8dcc[_0x1469fa(0x180)][0x0]=Number(RegExp['$1']);if(_0xe59830['match'](/<MAXMP:[ ](\d+)>/i))_0x1d8dcc[_0x1469fa(0x180)][0x1]=Number(RegExp['$1']);if(_0xe59830[_0x1469fa(0x34b)](/<ATK:[ ](\d+)>/i))_0x1d8dcc['params'][0x2]=Number(RegExp['$1']);if(_0xe59830[_0x1469fa(0x34b)](/<DEF:[ ](\d+)>/i))_0x1d8dcc[_0x1469fa(0x180)][0x3]=Number(RegExp['$1']);if(_0xe59830[_0x1469fa(0x34b)](/<MAT:[ ](\d+)>/i))_0x1d8dcc[_0x1469fa(0x180)][0x4]=Number(RegExp['$1']);if(_0xe59830[_0x1469fa(0x34b)](/<MDF:[ ](\d+)>/i))_0x1d8dcc['params'][0x5]=Number(RegExp['$1']);if(_0xe59830['match'](/<AGI:[ ](\d+)>/i))_0x1d8dcc[_0x1469fa(0x180)][0x6]=Number(RegExp['$1']);if(_0xe59830[_0x1469fa(0x34b)](/<LUK:[ ](\d+)>/i))_0x1d8dcc[_0x1469fa(0x180)][0x7]=Number(RegExp['$1']);if(_0xe59830[_0x1469fa(0x34b)](/<EXP:[ ](\d+)>/i))_0x1d8dcc[_0x1469fa(0x18b)]=Number(RegExp['$1']);if(_0xe59830[_0x1469fa(0x34b)](/<GOLD:[ ](\d+)>/i))_0x1d8dcc['gold']=Number(RegExp['$1']);},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x15f)]=Graphics['_defaultStretchMode'],Graphics['_defaultStretchMode']=function(){const _0x1d6bdf=_0x38ed9b;switch(VisuMZ[_0x1d6bdf(0x35b)][_0x1d6bdf(0x222)][_0x1d6bdf(0xb0)][_0x1d6bdf(0x2fc)]){case _0x1d6bdf(0x5fc):return!![];case _0x1d6bdf(0x4cb):return![];default:return VisuMZ['CoreEngine'][_0x1d6bdf(0x15f)][_0x1d6bdf(0x434)](this);}},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x4d4)]=Graphics[_0x38ed9b(0x4c4)],Graphics[_0x38ed9b(0x4c4)]=function(_0xd2bcd5,_0x2fbc98,_0x3473a0=null){const _0x1d48fe=_0x38ed9b;VisuMZ['CoreEngine']['Graphics_printError']['call'](this,_0xd2bcd5,_0x2fbc98,_0x3473a0),VisuMZ[_0x1d48fe(0x4ed)](![]);},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x17c)]=Graphics[_0x38ed9b(0x37e)],Graphics[_0x38ed9b(0x37e)]=function(_0x47e5d5){const _0x5af146=_0x38ed9b;VisuMZ['CoreEngine']['Graphics_centerElement'][_0x5af146(0x434)](this,_0x47e5d5),this[_0x5af146(0x5b0)](_0x47e5d5);},Graphics['_centerElementCoreEngine']=function(_0x33b4c5){const _0x1b8816=_0x38ed9b;VisuMZ[_0x1b8816(0x35b)][_0x1b8816(0x222)]['QoL'][_0x1b8816(0x5b4)]&&(_0x33b4c5['style'][_0x1b8816(0x193)]=_0x1b8816(0x3a3));VisuMZ[_0x1b8816(0x35b)]['Settings'][_0x1b8816(0xb0)]['PixelateImageRendering']&&(_0x33b4c5[_0x1b8816(0xfb)]['image-rendering']='pixelated');const _0x4a005b=Math[_0x1b8816(0x414)](0x0,Math[_0x1b8816(0x5fa)](_0x33b4c5[_0x1b8816(0x3dc)]*this['_realScale'])),_0x45798b=Math[_0x1b8816(0x414)](0x0,Math['floor'](_0x33b4c5[_0x1b8816(0x2bb)]*this[_0x1b8816(0x160)]));_0x33b4c5[_0x1b8816(0xfb)][_0x1b8816(0x3dc)]=_0x4a005b+'px',_0x33b4c5['style'][_0x1b8816(0x2bb)]=_0x45798b+'px';},Bitmap[_0x38ed9b(0x1d7)][_0x38ed9b(0x4af)]=function(){const _0x54434b=_0x38ed9b;this[_0x54434b(0x5d3)]=!![];},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x497)]=Sprite[_0x38ed9b(0x1d7)][_0x38ed9b(0x20e)],Sprite['prototype'][_0x38ed9b(0x20e)]=function(){const _0x3d936d=_0x38ed9b;VisuMZ[_0x3d936d(0x35b)]['Sprite_destroy']['call'](this),this[_0x3d936d(0x624)]();},Sprite['prototype'][_0x38ed9b(0x624)]=function(){const _0x33493e=_0x38ed9b;if(!this['bitmap'])return;if(!this[_0x33493e(0x210)][_0x33493e(0x5d3)])return;this['bitmap']['_baseTexture']&&!this[_0x33493e(0x4f7)][_0x33493e(0x4a1)][_0x33493e(0x44b)]&&this['bitmap'][_0x33493e(0x20e)]();},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0xf9)]=Bitmap[_0x38ed9b(0x1d7)]['resize'],Bitmap[_0x38ed9b(0x1d7)][_0x38ed9b(0x105)]=function(_0x197c98,_0x378d75){const _0xd92d26=_0x38ed9b;VisuMZ[_0xd92d26(0x35b)][_0xd92d26(0xf9)][_0xd92d26(0x434)](this,_0x197c98,_0x378d75),this[_0xd92d26(0x4af)]();},VisuMZ[_0x38ed9b(0x35b)]['Bitmap_blt']=Bitmap[_0x38ed9b(0x1d7)]['blt'],Bitmap['prototype'][_0x38ed9b(0x581)]=function(_0x4430cf,_0x3e5f6d,_0x4c7dc5,_0x3785ed,_0x1edcef,_0x2771aa,_0x7f03a9,_0x3033b7,_0x3e40f9){const _0x4c9952=_0x38ed9b;VisuMZ[_0x4c9952(0x35b)]['Bitmap_blt'][_0x4c9952(0x434)](this,_0x4430cf,_0x3e5f6d,_0x4c7dc5,_0x3785ed,_0x1edcef,_0x2771aa,_0x7f03a9,_0x3033b7,_0x3e40f9),this[_0x4c9952(0x4af)]();},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0xec)]=Bitmap[_0x38ed9b(0x1d7)][_0x38ed9b(0x24b)],Bitmap[_0x38ed9b(0x1d7)][_0x38ed9b(0x24b)]=function(_0x243457,_0x4b5c1d,_0x45f63a,_0x4cd80d){const _0x5d2721=_0x38ed9b;VisuMZ[_0x5d2721(0x35b)]['Bitmap_clearRect']['call'](this,_0x243457,_0x4b5c1d,_0x45f63a,_0x4cd80d),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x38ed9b(0x66d)]=Bitmap[_0x38ed9b(0x1d7)][_0x38ed9b(0x4d1)],Bitmap[_0x38ed9b(0x1d7)]['fillRect']=function(_0x22c076,_0x1cd68a,_0x5b4760,_0x3da880,_0x32c78f){const _0x14670e=_0x38ed9b;VisuMZ[_0x14670e(0x35b)][_0x14670e(0x66d)][_0x14670e(0x434)](this,_0x22c076,_0x1cd68a,_0x5b4760,_0x3da880,_0x32c78f),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x38ed9b(0x3a8)]=Bitmap[_0x38ed9b(0x1d7)][_0x38ed9b(0x225)],Bitmap['prototype'][_0x38ed9b(0x225)]=function(_0x52230d,_0x50793b,_0x112f24,_0x4c1ba8,_0x59d6fd){const _0x5615f3=_0x38ed9b;VisuMZ[_0x5615f3(0x35b)][_0x5615f3(0x3a8)][_0x5615f3(0x434)](this,_0x52230d,_0x50793b,_0x112f24,_0x4c1ba8,_0x59d6fd),this[_0x5615f3(0x4af)]();},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x1cb)]=Bitmap['prototype']['gradientFillRect'],Bitmap['prototype'][_0x38ed9b(0x617)]=function(_0x2d93ed,_0x28eb94,_0x360227,_0x4fbf81,_0x5053c8,_0x48dae0,_0x1d3a5d){const _0x11b07a=_0x38ed9b;VisuMZ['CoreEngine'][_0x11b07a(0x1cb)][_0x11b07a(0x434)](this,_0x2d93ed,_0x28eb94,_0x360227,_0x4fbf81,_0x5053c8,_0x48dae0,_0x1d3a5d),this[_0x11b07a(0x4af)]();},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x2ab)]=Bitmap[_0x38ed9b(0x1d7)][_0x38ed9b(0x61e)],Bitmap[_0x38ed9b(0x1d7)]['drawCircle']=function(_0x94fd8c,_0x25cf5d,_0x133284,_0x4c37d0){const _0x2bcad5=_0x38ed9b;_0x94fd8c=Math[_0x2bcad5(0x343)](_0x94fd8c),_0x25cf5d=Math['round'](_0x25cf5d),_0x133284=Math[_0x2bcad5(0x343)](_0x133284),VisuMZ[_0x2bcad5(0x35b)]['Bitmap_drawCircle']['call'](this,_0x94fd8c,_0x25cf5d,_0x133284,_0x4c37d0),this[_0x2bcad5(0x4af)]();},VisuMZ['CoreEngine'][_0x38ed9b(0x117)]=Bitmap[_0x38ed9b(0x1d7)][_0x38ed9b(0x5d2)],Bitmap['prototype'][_0x38ed9b(0x5d2)]=function(_0x4da5b8){const _0x15f1f4=_0x38ed9b;return Math[_0x15f1f4(0x343)](VisuMZ['CoreEngine'][_0x15f1f4(0x117)]['call'](this,_0x4da5b8));},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x63c)]=Bitmap['prototype'][_0x38ed9b(0x623)],Bitmap[_0x38ed9b(0x1d7)][_0x38ed9b(0x623)]=function(_0x43df4e,_0xd09edb,_0x160218,_0x1c64c3,_0x3eeb0b,_0x12d6c4){const _0x273e7d=_0x38ed9b;_0xd09edb=Math['round'](_0xd09edb),_0x160218=Math[_0x273e7d(0x343)](_0x160218),_0x1c64c3=Math[_0x273e7d(0x343)](_0x1c64c3),_0x3eeb0b=Math[_0x273e7d(0x343)](_0x3eeb0b),VisuMZ[_0x273e7d(0x35b)][_0x273e7d(0x63c)]['call'](this,_0x43df4e,_0xd09edb,_0x160218,_0x1c64c3,_0x3eeb0b,_0x12d6c4),this[_0x273e7d(0x4af)]();},VisuMZ[_0x38ed9b(0x35b)]['Bitmap_drawTextOutline']=Bitmap[_0x38ed9b(0x1d7)]['_drawTextOutline'],Bitmap[_0x38ed9b(0x1d7)][_0x38ed9b(0x55e)]=function(_0x39291c,_0x12b816,_0x1abab1,_0x516499){const _0x43cb7b=_0x38ed9b;VisuMZ[_0x43cb7b(0x35b)][_0x43cb7b(0x222)][_0x43cb7b(0xb0)]['FontShadows']?this[_0x43cb7b(0x454)](_0x39291c,_0x12b816,_0x1abab1,_0x516499):VisuMZ[_0x43cb7b(0x35b)]['Bitmap_drawTextOutline'][_0x43cb7b(0x434)](this,_0x39291c,_0x12b816,_0x1abab1,_0x516499);},Bitmap['prototype']['_drawTextShadow']=function(_0x4575c8,_0x13fc21,_0x550fe5,_0x34a832){const _0x1bce18=_0x38ed9b,_0x2a4629=this[_0x1bce18(0x22f)];_0x2a4629[_0x1bce18(0x59f)]=this['outlineColor'],_0x2a4629[_0x1bce18(0x672)](_0x4575c8,_0x13fc21+0x2,_0x550fe5+0x2,_0x34a832);},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x3af)]=Input['clear'],Input[_0x38ed9b(0x3c0)]=function(){const _0xeab68f=_0x38ed9b;VisuMZ['CoreEngine'][_0xeab68f(0x3af)][_0xeab68f(0x434)](this),this['_inputString']=undefined,this[_0xeab68f(0x21c)]=undefined,this[_0xeab68f(0x4d7)]=Input['keyRepeatWait'];},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x208)]=Input['update'],Input['update']=function(){const _0x252b7d=_0x38ed9b;VisuMZ[_0x252b7d(0x35b)][_0x252b7d(0x208)]['call'](this);if(this['_gamepadWait'])this[_0x252b7d(0x4d7)]--;},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x45e)]=Input[_0x38ed9b(0x444)],Input[_0x38ed9b(0x444)]=function(){const _0x1b6f3d=_0x38ed9b;if(this[_0x1b6f3d(0x4d7)])return;VisuMZ[_0x1b6f3d(0x35b)][_0x1b6f3d(0x45e)]['call'](this);},VisuMZ['CoreEngine'][_0x38ed9b(0x544)]=Input[_0x38ed9b(0x133)],Input[_0x38ed9b(0x133)]=function(){const _0x53a098=_0x38ed9b;VisuMZ['CoreEngine'][_0x53a098(0x544)]['call'](this),document[_0x53a098(0x15b)](_0x53a098(0x9c),this[_0x53a098(0x3bb)][_0x53a098(0x5f3)](this));},VisuMZ['CoreEngine'][_0x38ed9b(0xf6)]=Input[_0x38ed9b(0x20c)],Input[_0x38ed9b(0x20c)]=function(_0x228599){const _0x25204d=_0x38ed9b;this['_inputSpecialKeyCode']=_0x228599[_0x25204d(0x294)],VisuMZ[_0x25204d(0x35b)][_0x25204d(0xf6)][_0x25204d(0x434)](this,_0x228599);},Input[_0x38ed9b(0x3bb)]=function(_0x5ad3cb){const _0x397c0d=_0x38ed9b;this[_0x397c0d(0x132)](_0x5ad3cb);},Input['_registerKeyInput']=function(_0x2eb3d9){const _0x18fc73=_0x38ed9b;this[_0x18fc73(0x21c)]=_0x2eb3d9[_0x18fc73(0x294)];let _0x5953b3=String[_0x18fc73(0x3fe)](_0x2eb3d9['charCode']);this[_0x18fc73(0x37c)]===undefined?this[_0x18fc73(0x37c)]=_0x5953b3:this['_inputString']+=_0x5953b3;},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0xcc)]=Input[_0x38ed9b(0x46a)],Input[_0x38ed9b(0x46a)]=function(_0x18f674){const _0x5a13b6=_0x38ed9b;if(_0x18f674===0x8)return![];return VisuMZ['CoreEngine'][_0x5a13b6(0xcc)]['call'](this,_0x18f674);},Input['isSpecialCode']=function(_0x152a05){const _0x526873=_0x38ed9b;if(_0x152a05[_0x526873(0x34b)](/backspace/i))return this[_0x526873(0x21c)]===0x8;if(_0x152a05['match'](/enter/i))return this[_0x526873(0x21c)]===0xd;if(_0x152a05[_0x526873(0x34b)](/escape/i))return this[_0x526873(0x21c)]===0x1b;},Input[_0x38ed9b(0x1a0)]=function(){const _0x4ab976=_0x38ed9b;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x4ab976(0x1b3)](this[_0x4ab976(0x21c)]);},Input['isArrowPressed']=function(){const _0x1d2638=_0x38ed9b;return[0x25,0x26,0x27,0x28][_0x1d2638(0x1b3)](this[_0x1d2638(0x21c)]);},Input[_0x38ed9b(0x4ea)]=function(){const _0x70758b=_0x38ed9b;if(navigator[_0x70758b(0x3fc)]){const _0x2106db=navigator[_0x70758b(0x3fc)]();if(_0x2106db)for(const _0x2a32a4 of _0x2106db){if(_0x2a32a4&&_0x2a32a4[_0x70758b(0x433)])return!![];}}return![];},Input[_0x38ed9b(0x653)]=function(){const _0x5b4282=_0x38ed9b;if(navigator[_0x5b4282(0x3fc)]){const _0x23c17b=navigator[_0x5b4282(0x3fc)]();if(_0x23c17b)for(const _0x11d11f of _0x23c17b){if(_0x11d11f&&_0x11d11f[_0x5b4282(0x433)]){if(this[_0x5b4282(0x57b)](_0x11d11f))return!![];}}}return![];},Input[_0x38ed9b(0x57b)]=function(_0x52ed65){const _0x473e7c=_0x38ed9b,_0x40bf47=_0x52ed65[_0x473e7c(0x5fd)];for(let _0x10809c=0x0;_0x10809c<_0x40bf47[_0x473e7c(0x276)];_0x10809c++){if(_0x40bf47[_0x10809c][_0x473e7c(0x19e)])return!![];}return![];},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x5e5)]=Tilemap[_0x38ed9b(0x1d7)][_0x38ed9b(0x3ae)],Tilemap[_0x38ed9b(0x1d7)][_0x38ed9b(0x3ae)]=function(_0x2f6a69,_0x135ab9,_0x4b5966,_0x67a853){const _0xd91be1=_0x38ed9b;if($gameMap&&$gameMap['areTileShadowsHidden']())return;VisuMZ[_0xd91be1(0x35b)][_0xd91be1(0x5e5)][_0xd91be1(0x434)](this,_0x2f6a69,_0x135ab9,_0x4b5966,_0x67a853);},Tilemap[_0x38ed9b(0x450)][_0x38ed9b(0x1d7)]['_createInternalTextures']=function(){const _0x40a725=_0x38ed9b;this[_0x40a725(0xd8)]();for(let _0xcb625d=0x0;_0xcb625d<Tilemap[_0x40a725(0x38c)][_0x40a725(0x4a7)];_0xcb625d++){const _0x5e2014=new PIXI['BaseTexture']();_0x5e2014[_0x40a725(0x345)](0x800,0x800),VisuMZ[_0x40a725(0x35b)][_0x40a725(0x222)][_0x40a725(0xb0)]['PixelateImageRendering']&&(_0x5e2014['scaleMode']=PIXI['SCALE_MODES'][_0x40a725(0x397)]),this[_0x40a725(0x2af)][_0x40a725(0x362)](_0x5e2014);}},WindowLayer[_0x38ed9b(0x1d7)][_0x38ed9b(0x19f)]=function(){const _0x5a6a81=_0x38ed9b;return SceneManager&&SceneManager[_0x5a6a81(0x134)]?SceneManager['_scene'][_0x5a6a81(0x486)]():!![];},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x484)]=WindowLayer[_0x38ed9b(0x1d7)][_0x38ed9b(0x22d)],WindowLayer[_0x38ed9b(0x1d7)][_0x38ed9b(0x22d)]=function render(_0x361ce8){const _0x42bce3=_0x38ed9b;this[_0x42bce3(0x19f)]()?VisuMZ['CoreEngine'][_0x42bce3(0x484)][_0x42bce3(0x434)](this,_0x361ce8):this['renderNoMask'](_0x361ce8);},WindowLayer[_0x38ed9b(0x1d7)][_0x38ed9b(0x11f)]=function render(_0x461e26){const _0x3d0d95=_0x38ed9b;if(!this[_0x3d0d95(0x5e8)])return;const _0xa4e934=new PIXI[(_0x3d0d95(0x260))](),_0x38a2c3=_0x461e26['gl'],_0x39b739=this[_0x3d0d95(0x1ef)][_0x3d0d95(0x44d)]();_0x461e26['framebuffer'][_0x3d0d95(0x527)](),_0xa4e934[_0x3d0d95(0x3b1)]=this[_0x3d0d95(0x3b1)],_0x461e26['batch'][_0x3d0d95(0x226)](),_0x38a2c3[_0x3d0d95(0x634)](_0x38a2c3[_0x3d0d95(0x272)]);while(_0x39b739[_0x3d0d95(0x276)]>0x0){const _0x1737a9=_0x39b739[_0x3d0d95(0x24f)]();_0x1737a9['_isWindow']&&_0x1737a9[_0x3d0d95(0x5e8)]&&_0x1737a9[_0x3d0d95(0x2cd)]>0x0&&(_0x38a2c3['stencilFunc'](_0x38a2c3[_0x3d0d95(0x578)],0x0,~0x0),_0x38a2c3[_0x3d0d95(0x120)](_0x38a2c3[_0x3d0d95(0x3d7)],_0x38a2c3['KEEP'],_0x38a2c3[_0x3d0d95(0x3d7)]),_0x1737a9[_0x3d0d95(0x22d)](_0x461e26),_0x461e26[_0x3d0d95(0x521)][_0x3d0d95(0x226)](),_0xa4e934[_0x3d0d95(0x3c0)](),_0x38a2c3[_0x3d0d95(0x16d)](_0x38a2c3['ALWAYS'],0x1,~0x0),_0x38a2c3[_0x3d0d95(0x120)](_0x38a2c3['REPLACE'],_0x38a2c3['REPLACE'],_0x38a2c3[_0x3d0d95(0x474)]),_0x38a2c3['blendFunc'](_0x38a2c3['ZERO'],_0x38a2c3['ONE']),_0xa4e934['render'](_0x461e26),_0x461e26[_0x3d0d95(0x521)][_0x3d0d95(0x226)](),_0x38a2c3[_0x3d0d95(0x5b3)](_0x38a2c3[_0x3d0d95(0x328)],_0x38a2c3[_0x3d0d95(0x34d)]));}_0x38a2c3['disable'](_0x38a2c3['STENCIL_TEST']),_0x38a2c3[_0x3d0d95(0x3c0)](_0x38a2c3['STENCIL_BUFFER_BIT']),_0x38a2c3[_0x3d0d95(0x224)](0x0),_0x461e26[_0x3d0d95(0x521)][_0x3d0d95(0x226)]();for(const _0x9aa92b of this[_0x3d0d95(0x1ef)]){!_0x9aa92b[_0x3d0d95(0x2c7)]&&_0x9aa92b['visible']&&_0x9aa92b[_0x3d0d95(0x22d)](_0x461e26);}_0x461e26[_0x3d0d95(0x521)][_0x3d0d95(0x226)]();},DataManager[_0x38ed9b(0xa1)]=function(_0x6bc69c){const _0xe79ee3=_0x38ed9b;return this[_0xe79ee3(0x33a)](_0x6bc69c)&&_0x6bc69c[_0xe79ee3(0x369)]===0x2;},VisuMZ['CoreEngine'][_0x38ed9b(0x425)]=DataManager[_0x38ed9b(0x5ef)],DataManager[_0x38ed9b(0x5ef)]=function(){const _0xf3e467=_0x38ed9b;VisuMZ[_0xf3e467(0x35b)][_0xf3e467(0x425)][_0xf3e467(0x434)](this),this['reservePlayTestNewGameCommonEvent'](),this[_0xf3e467(0x5a6)]();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x1a8694=_0x38ed9b;if($gameTemp[_0x1a8694(0x28b)]()){const _0x484f69=VisuMZ[_0x1a8694(0x35b)][_0x1a8694(0x222)]['QoL']['NewGameCommonEvent'];if(_0x484f69>0x0)$gameTemp[_0x1a8694(0x1e6)](_0x484f69);}},DataManager[_0x38ed9b(0x5a6)]=function(){const _0x5e435d=_0x38ed9b,_0x2f8029=VisuMZ[_0x5e435d(0x35b)]['Settings']['QoL'][_0x5e435d(0x323)]||0x0;if(_0x2f8029>0x0)$gameTemp[_0x5e435d(0x1e6)](_0x2f8029);},TextManager[_0x38ed9b(0x1f9)]=['','','',_0x38ed9b(0x32d),'','',_0x38ed9b(0x50c),'',_0x38ed9b(0x401),'TAB','','','CLEAR',_0x38ed9b(0x515),_0x38ed9b(0x5cd),'',_0x38ed9b(0xb9),_0x38ed9b(0x3ad),_0x38ed9b(0x656),_0x38ed9b(0x2de),_0x38ed9b(0x5b6),_0x38ed9b(0xe4),_0x38ed9b(0x509),_0x38ed9b(0x53b),_0x38ed9b(0xe2),_0x38ed9b(0x2c8),'',_0x38ed9b(0x43e),_0x38ed9b(0x2f9),_0x38ed9b(0x561),_0x38ed9b(0x23d),_0x38ed9b(0x199),'SPACE',_0x38ed9b(0x3ca),_0x38ed9b(0xa8),_0x38ed9b(0x51d),_0x38ed9b(0x196),_0x38ed9b(0x50b),'UP',_0x38ed9b(0xc1),_0x38ed9b(0x62d),_0x38ed9b(0x36a),_0x38ed9b(0x501),_0x38ed9b(0x430),_0x38ed9b(0x14d),_0x38ed9b(0x5af),_0x38ed9b(0x60e),'','0','1','2','3','4','5','6','7','8','9',_0x38ed9b(0x2ea),_0x38ed9b(0x601),'LESS_THAN','EQUALS','GREATER_THAN',_0x38ed9b(0x2d9),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0x38ed9b(0x4ca),'',_0x38ed9b(0x143),_0x38ed9b(0x45d),_0x38ed9b(0x3db),'NUMPAD2',_0x38ed9b(0x331),_0x38ed9b(0x4d6),_0x38ed9b(0x3e7),_0x38ed9b(0x510),_0x38ed9b(0x146),_0x38ed9b(0x31f),_0x38ed9b(0x1db),_0x38ed9b(0x3c1),'ADD',_0x38ed9b(0x35e),_0x38ed9b(0x5ad),_0x38ed9b(0x50d),_0x38ed9b(0x2b3),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x38ed9b(0x311),_0x38ed9b(0x548),_0x38ed9b(0x2f0),_0x38ed9b(0x4e7),'F14',_0x38ed9b(0x522),'F16',_0x38ed9b(0x5e3),_0x38ed9b(0x5cf),_0x38ed9b(0x154),'F20',_0x38ed9b(0x243),_0x38ed9b(0xa3),'F23',_0x38ed9b(0x457),'','','','','','','','',_0x38ed9b(0xa2),_0x38ed9b(0x190),_0x38ed9b(0x315),'WIN_OEM_FJ_MASSHOU',_0x38ed9b(0x1dd),_0x38ed9b(0x11d),_0x38ed9b(0x66c),'','','','','','','','','',_0x38ed9b(0x4dd),_0x38ed9b(0x394),_0x38ed9b(0x565),_0x38ed9b(0xc9),'DOLLAR',_0x38ed9b(0x26b),'AMPERSAND',_0x38ed9b(0x1cd),_0x38ed9b(0xb8),_0x38ed9b(0x25f),_0x38ed9b(0x14b),_0x38ed9b(0x514),_0x38ed9b(0x9a),'HYPHEN_MINUS',_0x38ed9b(0x342),_0x38ed9b(0x2ac),'TILDE','','','','',_0x38ed9b(0x259),_0x38ed9b(0x3bc),'VOLUME_UP','','',_0x38ed9b(0x601),'EQUALS',_0x38ed9b(0x2b2),_0x38ed9b(0x4cd),_0x38ed9b(0x64f),'SLASH','BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','','OPEN_BRACKET','BACK_SLASH',_0x38ed9b(0x2a9),_0x38ed9b(0x60b),'','META',_0x38ed9b(0x1d4),'',_0x38ed9b(0x347),'WIN_ICO_00','',_0x38ed9b(0x317),'','',_0x38ed9b(0x56e),_0x38ed9b(0x3d3),_0x38ed9b(0x2ee),_0x38ed9b(0x455),_0x38ed9b(0x126),_0x38ed9b(0x2b6),_0x38ed9b(0x5b9),_0x38ed9b(0x622),_0x38ed9b(0xd1),_0x38ed9b(0x201),_0x38ed9b(0x505),_0x38ed9b(0x27b),'WIN_OEM_BACKTAB',_0x38ed9b(0x15a),_0x38ed9b(0x3f8),'EXSEL','EREOF',_0x38ed9b(0x24d),_0x38ed9b(0x9f),'','PA1','WIN_OEM_CLEAR',''],TextManager['buttonAssistOk']=VisuMZ['CoreEngine'][_0x38ed9b(0x222)][_0x38ed9b(0x516)]['OkText'],TextManager['buttonAssistCancel']=VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x222)][_0x38ed9b(0x516)][_0x38ed9b(0x15e)],TextManager['buttonAssistSwitch']=VisuMZ['CoreEngine'][_0x38ed9b(0x222)]['ButtonAssist'][_0x38ed9b(0x340)],VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0xb1)]=TextManager[_0x38ed9b(0x1c7)],TextManager[_0x38ed9b(0x1c7)]=function(_0x228c24){const _0x5ee55c=_0x38ed9b;return typeof _0x228c24===_0x5ee55c(0x4c9)?VisuMZ[_0x5ee55c(0x35b)][_0x5ee55c(0xb1)][_0x5ee55c(0x434)](this,_0x228c24):this[_0x5ee55c(0x3d8)](_0x228c24);},TextManager['paramName']=function(_0x5bef7f){const _0x83207b=_0x38ed9b;_0x5bef7f=String(_0x5bef7f||'')[_0x83207b(0x4f3)]();const _0x4dd111=VisuMZ[_0x83207b(0x35b)][_0x83207b(0x222)][_0x83207b(0x665)];if(_0x5bef7f==='MAXHP')return $dataSystem['terms'][_0x83207b(0x180)][0x0];if(_0x5bef7f==='MAXMP')return $dataSystem['terms']['params'][0x1];if(_0x5bef7f===_0x83207b(0x30b))return $dataSystem[_0x83207b(0xfd)][_0x83207b(0x180)][0x2];if(_0x5bef7f===_0x83207b(0x482))return $dataSystem['terms'][_0x83207b(0x180)][0x3];if(_0x5bef7f==='MAT')return $dataSystem[_0x83207b(0xfd)][_0x83207b(0x180)][0x4];if(_0x5bef7f===_0x83207b(0x3e1))return $dataSystem[_0x83207b(0xfd)]['params'][0x5];if(_0x5bef7f===_0x83207b(0x616))return $dataSystem[_0x83207b(0xfd)][_0x83207b(0x180)][0x6];if(_0x5bef7f===_0x83207b(0x44c))return $dataSystem[_0x83207b(0xfd)][_0x83207b(0x180)][0x7];if(_0x5bef7f===_0x83207b(0x21a))return _0x4dd111[_0x83207b(0x39e)];if(_0x5bef7f===_0x83207b(0x16c))return _0x4dd111[_0x83207b(0x3ff)];if(_0x5bef7f===_0x83207b(0x4e8))return _0x4dd111[_0x83207b(0x30d)];if(_0x5bef7f===_0x83207b(0x12c))return _0x4dd111[_0x83207b(0x165)];if(_0x5bef7f===_0x83207b(0x47d))return _0x4dd111[_0x83207b(0x63f)];if(_0x5bef7f===_0x83207b(0x5a8))return _0x4dd111[_0x83207b(0x472)];if(_0x5bef7f===_0x83207b(0x608))return _0x4dd111[_0x83207b(0x38b)];if(_0x5bef7f===_0x83207b(0x5e2))return _0x4dd111[_0x83207b(0x5f8)];if(_0x5bef7f===_0x83207b(0x550))return _0x4dd111[_0x83207b(0x161)];if(_0x5bef7f===_0x83207b(0x2c6))return _0x4dd111['XParamVocab9'];if(_0x5bef7f==='TGR')return _0x4dd111['SParamVocab0'];if(_0x5bef7f==='GRD')return _0x4dd111[_0x83207b(0x399)];if(_0x5bef7f===_0x83207b(0x2d6))return _0x4dd111['SParamVocab2'];if(_0x5bef7f===_0x83207b(0x2a0))return _0x4dd111[_0x83207b(0x1ba)];if(_0x5bef7f===_0x83207b(0x4d8))return _0x4dd111[_0x83207b(0x5a2)];if(_0x5bef7f===_0x83207b(0x3ac))return _0x4dd111['SParamVocab5'];if(_0x5bef7f===_0x83207b(0x502))return _0x4dd111[_0x83207b(0x400)];if(_0x5bef7f===_0x83207b(0x158))return _0x4dd111['SParamVocab7'];if(_0x5bef7f===_0x83207b(0x654))return _0x4dd111[_0x83207b(0xd0)];if(_0x5bef7f==='EXR')return _0x4dd111[_0x83207b(0x116)];if(VisuMZ[_0x83207b(0x35b)][_0x83207b(0x247)][_0x5bef7f])return VisuMZ[_0x83207b(0x35b)][_0x83207b(0x247)][_0x5bef7f];return'';},TextManager['getInputButtonString']=function(_0x376d86){const _0x5026ba=_0x38ed9b;if(_0x376d86===_0x5026ba(0x567))_0x376d86='escape';let _0x1fd758=[];for(let _0x2941da in Input[_0x5026ba(0xaf)]){_0x2941da=Number(_0x2941da);if(_0x2941da>=0x60&&_0x2941da<=0x69)continue;if([0x12,0x20][_0x5026ba(0x4f2)](_0x2941da))continue;_0x376d86===Input['keyMapper'][_0x2941da]&&_0x1fd758[_0x5026ba(0x362)](_0x2941da);}for(let _0x28ec71=0x0;_0x28ec71<_0x1fd758[_0x5026ba(0x276)];_0x28ec71++){_0x1fd758[_0x28ec71]=TextManager[_0x5026ba(0x1f9)][_0x1fd758[_0x28ec71]];}return this[_0x5026ba(0x59c)](_0x1fd758);},TextManager[_0x38ed9b(0x59c)]=function(_0x48713d){const _0x5e3557=_0x38ed9b,_0x22847a=VisuMZ[_0x5e3557(0x35b)][_0x5e3557(0x222)][_0x5e3557(0x516)],_0x4b009e=_0x22847a[_0x5e3557(0x61a)],_0x5bdfb1=_0x48713d[_0x5e3557(0x1c2)](),_0x2b358a=_0x5e3557(0x5b1)[_0x5e3557(0x46c)](_0x5bdfb1);return _0x22847a[_0x2b358a]?_0x22847a[_0x2b358a]:_0x4b009e[_0x5e3557(0x46c)](_0x5bdfb1);},TextManager[_0x38ed9b(0x410)]=function(_0x119ef5,_0x2ca937){const _0x2cff91=_0x38ed9b,_0x5a9155=VisuMZ[_0x2cff91(0x35b)][_0x2cff91(0x222)][_0x2cff91(0x516)],_0x2abaed=_0x5a9155[_0x2cff91(0x4eb)],_0x51cf53=this['getInputButtonString'](_0x119ef5),_0x151002=this['getInputButtonString'](_0x2ca937);return _0x2abaed[_0x2cff91(0x46c)](_0x51cf53,_0x151002);},VisuMZ[_0x38ed9b(0x35b)]['ColorManager_loadWindowskin']=ColorManager[_0x38ed9b(0x314)],ColorManager[_0x38ed9b(0x314)]=function(){const _0x3dc8cb=_0x38ed9b;VisuMZ[_0x3dc8cb(0x35b)]['ColorManager_loadWindowskin']['call'](this),this[_0x3dc8cb(0x1e1)]=this['_colorCache']||{};},ColorManager[_0x38ed9b(0x495)]=function(_0x25b2fc,_0x5ed60f){const _0x4ebedb=_0x38ed9b;return _0x5ed60f=String(_0x5ed60f),this['_colorCache']=this[_0x4ebedb(0x1e1)]||{},_0x5ed60f[_0x4ebedb(0x34b)](/#(.*)/i)?this[_0x4ebedb(0x1e1)][_0x25b2fc]=_0x4ebedb(0x66a)[_0x4ebedb(0x46c)](String(RegExp['$1'])):this['_colorCache'][_0x25b2fc]=this[_0x4ebedb(0x32c)](Number(_0x5ed60f)),this[_0x4ebedb(0x1e1)][_0x25b2fc];},ColorManager['getColor']=function(_0x351151){const _0x3b37e1=_0x38ed9b;return _0x351151=String(_0x351151),_0x351151[_0x3b37e1(0x34b)](/#(.*)/i)?_0x3b37e1(0x66a)[_0x3b37e1(0x46c)](String(RegExp['$1'])):this[_0x3b37e1(0x32c)](Number(_0x351151));},ColorManager[_0x38ed9b(0x1f4)]=function(){const _0x1374b7=_0x38ed9b;this[_0x1374b7(0x1e1)]={};},ColorManager[_0x38ed9b(0x100)]=function(){const _0x231a9a=_0x38ed9b,_0xb53dde=_0x231a9a(0x3a6);this['_colorCache']=this[_0x231a9a(0x1e1)]||{};if(this[_0x231a9a(0x1e1)][_0xb53dde])return this[_0x231a9a(0x1e1)][_0xb53dde];const _0x43aaa6=VisuMZ[_0x231a9a(0x35b)][_0x231a9a(0x222)][_0x231a9a(0x575)][_0x231a9a(0x58b)];return this[_0x231a9a(0x495)](_0xb53dde,_0x43aaa6);},ColorManager[_0x38ed9b(0x5e1)]=function(){const _0x49566a=_0x38ed9b,_0xa85775=_0x49566a(0x4c2);this[_0x49566a(0x1e1)]=this[_0x49566a(0x1e1)]||{};if(this[_0x49566a(0x1e1)][_0xa85775])return this[_0x49566a(0x1e1)][_0xa85775];const _0x1cab47=VisuMZ['CoreEngine'][_0x49566a(0x222)]['Color']['ColorSystem'];return this[_0x49566a(0x495)](_0xa85775,_0x1cab47);},ColorManager['crisisColor']=function(){const _0x2e0f92=_0x38ed9b,_0x40e325=_0x2e0f92(0x46e);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x40e325])return this[_0x2e0f92(0x1e1)][_0x40e325];const _0xdc6a46=VisuMZ['CoreEngine']['Settings'][_0x2e0f92(0x575)][_0x2e0f92(0x361)];return this['getColorDataFromPluginParameters'](_0x40e325,_0xdc6a46);},ColorManager[_0x38ed9b(0x595)]=function(){const _0x317700=_0x38ed9b,_0x4dc89e=_0x317700(0xa4);this[_0x317700(0x1e1)]=this['_colorCache']||{};if(this[_0x317700(0x1e1)][_0x4dc89e])return this['_colorCache'][_0x4dc89e];const _0x535895=VisuMZ[_0x317700(0x35b)][_0x317700(0x222)][_0x317700(0x575)][_0x317700(0x281)];return this[_0x317700(0x495)](_0x4dc89e,_0x535895);},ColorManager[_0x38ed9b(0x382)]=function(){const _0x25a21a=_0x38ed9b,_0x2120a4=_0x25a21a(0x403);this[_0x25a21a(0x1e1)]=this[_0x25a21a(0x1e1)]||{};if(this[_0x25a21a(0x1e1)][_0x2120a4])return this[_0x25a21a(0x1e1)][_0x2120a4];const _0x3478ec=VisuMZ[_0x25a21a(0x35b)]['Settings'][_0x25a21a(0x575)]['ColorGaugeBack'];return this[_0x25a21a(0x495)](_0x2120a4,_0x3478ec);},ColorManager['hpGaugeColor1']=function(){const _0x533870=_0x38ed9b,_0x52d16a=_0x533870(0x30f);this[_0x533870(0x1e1)]=this[_0x533870(0x1e1)]||{};if(this['_colorCache'][_0x52d16a])return this[_0x533870(0x1e1)][_0x52d16a];const _0x1c09e1=VisuMZ[_0x533870(0x35b)][_0x533870(0x222)][_0x533870(0x575)][_0x533870(0x2f5)];return this[_0x533870(0x495)](_0x52d16a,_0x1c09e1);},ColorManager[_0x38ed9b(0x614)]=function(){const _0x434298=_0x38ed9b,_0xb2a994='_stored_hpGaugeColor2';this[_0x434298(0x1e1)]=this[_0x434298(0x1e1)]||{};if(this[_0x434298(0x1e1)][_0xb2a994])return this[_0x434298(0x1e1)][_0xb2a994];const _0x1cab55=VisuMZ['CoreEngine'][_0x434298(0x222)][_0x434298(0x575)][_0x434298(0x475)];return this[_0x434298(0x495)](_0xb2a994,_0x1cab55);},ColorManager[_0x38ed9b(0xe8)]=function(){const _0x3437c6=_0x38ed9b,_0x4f6d41=_0x3437c6(0x446);this['_colorCache']=this['_colorCache']||{};if(this[_0x3437c6(0x1e1)][_0x4f6d41])return this['_colorCache'][_0x4f6d41];const _0x41bc4e=VisuMZ[_0x3437c6(0x35b)]['Settings'][_0x3437c6(0x575)]['ColorMPGauge1'];return this[_0x3437c6(0x495)](_0x4f6d41,_0x41bc4e);},ColorManager['mpGaugeColor2']=function(){const _0xfab74b=_0x38ed9b,_0x5d1c0a=_0xfab74b(0x313);this[_0xfab74b(0x1e1)]=this['_colorCache']||{};if(this['_colorCache'][_0x5d1c0a])return this['_colorCache'][_0x5d1c0a];const _0x58b7ec=VisuMZ[_0xfab74b(0x35b)]['Settings'][_0xfab74b(0x575)][_0xfab74b(0x290)];return this[_0xfab74b(0x495)](_0x5d1c0a,_0x58b7ec);},ColorManager[_0x38ed9b(0x1de)]=function(){const _0x2f3067=_0x38ed9b,_0x460f73='_stored_mpCostColor';this['_colorCache']=this[_0x2f3067(0x1e1)]||{};if(this[_0x2f3067(0x1e1)][_0x460f73])return this[_0x2f3067(0x1e1)][_0x460f73];const _0x50cfe1=VisuMZ[_0x2f3067(0x35b)][_0x2f3067(0x222)][_0x2f3067(0x575)]['ColorMPCost'];return this[_0x2f3067(0x495)](_0x460f73,_0x50cfe1);},ColorManager[_0x38ed9b(0x51f)]=function(){const _0x4d394c=_0x38ed9b,_0x30305f='_stored_powerUpColor';this[_0x4d394c(0x1e1)]=this[_0x4d394c(0x1e1)]||{};if(this[_0x4d394c(0x1e1)][_0x30305f])return this[_0x4d394c(0x1e1)][_0x30305f];const _0x2c918b=VisuMZ[_0x4d394c(0x35b)]['Settings'][_0x4d394c(0x575)]['ColorPowerUp'];return this[_0x4d394c(0x495)](_0x30305f,_0x2c918b);},ColorManager[_0x38ed9b(0x55c)]=function(){const _0x671616=_0x38ed9b,_0x9220e3=_0x671616(0x4a0);this[_0x671616(0x1e1)]=this[_0x671616(0x1e1)]||{};if(this[_0x671616(0x1e1)][_0x9220e3])return this[_0x671616(0x1e1)][_0x9220e3];const _0x571031=VisuMZ['CoreEngine']['Settings']['Color'][_0x671616(0x4da)];return this[_0x671616(0x495)](_0x9220e3,_0x571031);},ColorManager[_0x38ed9b(0x13b)]=function(){const _0x5d03e2=_0x38ed9b,_0x3e54cc=_0x5d03e2(0x5c7);this[_0x5d03e2(0x1e1)]=this[_0x5d03e2(0x1e1)]||{};if(this[_0x5d03e2(0x1e1)][_0x3e54cc])return this[_0x5d03e2(0x1e1)][_0x3e54cc];const _0x455d69=VisuMZ[_0x5d03e2(0x35b)]['Settings']['Color']['ColorCTGauge1'];return this[_0x5d03e2(0x495)](_0x3e54cc,_0x455d69);},ColorManager[_0x38ed9b(0x416)]=function(){const _0x19afce=_0x38ed9b,_0x211ce7=_0x19afce(0xdb);this['_colorCache']=this[_0x19afce(0x1e1)]||{};if(this[_0x19afce(0x1e1)][_0x211ce7])return this[_0x19afce(0x1e1)][_0x211ce7];const _0x2283ec=VisuMZ[_0x19afce(0x35b)][_0x19afce(0x222)]['Color'][_0x19afce(0x4c1)];return this[_0x19afce(0x495)](_0x211ce7,_0x2283ec);},ColorManager[_0x38ed9b(0x291)]=function(){const _0x626848=_0x38ed9b,_0x282be8=_0x626848(0x619);this[_0x626848(0x1e1)]=this[_0x626848(0x1e1)]||{};if(this[_0x626848(0x1e1)][_0x282be8])return this[_0x626848(0x1e1)][_0x282be8];const _0x5a82ef=VisuMZ['CoreEngine'][_0x626848(0x222)][_0x626848(0x575)][_0x626848(0x61c)];return this[_0x626848(0x495)](_0x282be8,_0x5a82ef);},ColorManager[_0x38ed9b(0x10d)]=function(){const _0x25a4bc=_0x38ed9b,_0x46afc7=_0x25a4bc(0x461);this[_0x25a4bc(0x1e1)]=this[_0x25a4bc(0x1e1)]||{};if(this[_0x25a4bc(0x1e1)][_0x46afc7])return this[_0x25a4bc(0x1e1)][_0x46afc7];const _0x62bf2c=VisuMZ['CoreEngine'][_0x25a4bc(0x222)]['Color'][_0x25a4bc(0x5cc)];return this[_0x25a4bc(0x495)](_0x46afc7,_0x62bf2c);},ColorManager[_0x38ed9b(0x47a)]=function(){const _0x5b792b=_0x38ed9b,_0x2c5695=_0x5b792b(0x1d2);this['_colorCache']=this[_0x5b792b(0x1e1)]||{};if(this[_0x5b792b(0x1e1)][_0x2c5695])return this[_0x5b792b(0x1e1)][_0x2c5695];const _0x1c89ce=VisuMZ[_0x5b792b(0x35b)][_0x5b792b(0x222)]['Color'][_0x5b792b(0x5ec)];return this[_0x5b792b(0x495)](_0x2c5695,_0x1c89ce);},ColorManager[_0x38ed9b(0x3d4)]=function(){const _0x590bb6=_0x38ed9b,_0x10d0b4=_0x590bb6(0x3be);this[_0x590bb6(0x1e1)]=this[_0x590bb6(0x1e1)]||{};if(this['_colorCache'][_0x10d0b4])return this['_colorCache'][_0x10d0b4];const _0x2669d7=VisuMZ[_0x590bb6(0x35b)][_0x590bb6(0x222)]['Color'][_0x590bb6(0x5ec)];return this[_0x590bb6(0x495)](_0x10d0b4,_0x2669d7);},ColorManager['expGaugeColor1']=function(){const _0x4033fb=_0x38ed9b,_0x4ba4f5=_0x4033fb(0x637);this[_0x4033fb(0x1e1)]=this['_colorCache']||{};if(this[_0x4033fb(0x1e1)][_0x4ba4f5])return this[_0x4033fb(0x1e1)][_0x4ba4f5];const _0x50086d=VisuMZ[_0x4033fb(0x35b)][_0x4033fb(0x222)][_0x4033fb(0x575)]['ColorExpGauge1'];return this[_0x4033fb(0x495)](_0x4ba4f5,_0x50086d);},ColorManager[_0x38ed9b(0x4b8)]=function(){const _0x858647=_0x38ed9b,_0x43b0ac='_stored_expGaugeColor2';this['_colorCache']=this['_colorCache']||{};if(this[_0x858647(0x1e1)][_0x43b0ac])return this['_colorCache'][_0x43b0ac];const _0x2fb10d=VisuMZ[_0x858647(0x35b)][_0x858647(0x222)][_0x858647(0x575)][_0x858647(0x217)];return this[_0x858647(0x495)](_0x43b0ac,_0x2fb10d);},ColorManager[_0x38ed9b(0x4a4)]=function(){const _0x2c48ad=_0x38ed9b,_0x66352a=_0x2c48ad(0x4ef);this[_0x2c48ad(0x1e1)]=this[_0x2c48ad(0x1e1)]||{};if(this[_0x2c48ad(0x1e1)][_0x66352a])return this[_0x2c48ad(0x1e1)][_0x66352a];const _0x55116a=VisuMZ[_0x2c48ad(0x35b)]['Settings']['Color'][_0x2c48ad(0x662)];return this[_0x2c48ad(0x495)](_0x66352a,_0x55116a);},ColorManager[_0x38ed9b(0x395)]=function(){const _0x59a86b=_0x38ed9b,_0x112135='_stored_maxLvGaugeColor2';this[_0x59a86b(0x1e1)]=this['_colorCache']||{};if(this[_0x59a86b(0x1e1)][_0x112135])return this[_0x59a86b(0x1e1)][_0x112135];const _0x25ea43=VisuMZ[_0x59a86b(0x35b)]['Settings'][_0x59a86b(0x575)]['ColorMaxLvGauge2'];return this[_0x59a86b(0x495)](_0x112135,_0x25ea43);},ColorManager[_0x38ed9b(0x3ab)]=function(_0x190bde){const _0x586983=_0x38ed9b;return VisuMZ[_0x586983(0x35b)][_0x586983(0x222)][_0x586983(0x575)]['ActorHPColor'][_0x586983(0x434)](this,_0x190bde);},ColorManager[_0x38ed9b(0x668)]=function(_0x1006fd){const _0x573ac4=_0x38ed9b;return VisuMZ[_0x573ac4(0x35b)]['Settings']['Color']['ActorMPColor']['call'](this,_0x1006fd);},ColorManager[_0x38ed9b(0x348)]=function(_0x377b28){const _0x29c108=_0x38ed9b;return VisuMZ[_0x29c108(0x35b)][_0x29c108(0x222)][_0x29c108(0x575)]['ActorTPColor'][_0x29c108(0x434)](this,_0x377b28);},ColorManager[_0x38ed9b(0x61f)]=function(_0x394ebb){const _0x59e485=_0x38ed9b;return VisuMZ['CoreEngine'][_0x59e485(0x222)][_0x59e485(0x575)][_0x59e485(0x511)][_0x59e485(0x434)](this,_0x394ebb);},ColorManager[_0x38ed9b(0x551)]=function(_0x1622ef){const _0x34a990=_0x38ed9b;return VisuMZ[_0x34a990(0x35b)][_0x34a990(0x222)][_0x34a990(0x575)]['DamageColor'][_0x34a990(0x434)](this,_0x1622ef);},ColorManager[_0x38ed9b(0x488)]=function(){const _0x169210=_0x38ed9b;return VisuMZ[_0x169210(0x35b)][_0x169210(0x222)][_0x169210(0x575)][_0x169210(0x481)];},ColorManager['outlineColorDmg']=function(){const _0x3ae10d=_0x38ed9b;return VisuMZ[_0x3ae10d(0x35b)][_0x3ae10d(0x222)][_0x3ae10d(0x575)][_0x3ae10d(0xde)]||_0x3ae10d(0x43d);},ColorManager[_0x38ed9b(0x655)]=function(){const _0x5538e3=_0x38ed9b;return VisuMZ[_0x5538e3(0x35b)]['Settings'][_0x5538e3(0x575)][_0x5538e3(0x1ea)]||_0x5538e3(0x4c8);},ColorManager[_0x38ed9b(0x2a6)]=function(){const _0x4fbaa0=_0x38ed9b;return VisuMZ[_0x4fbaa0(0x35b)][_0x4fbaa0(0x222)][_0x4fbaa0(0x575)][_0x4fbaa0(0x3de)];},ColorManager[_0x38ed9b(0x4ff)]=function(){const _0x31b8de=_0x38ed9b;return VisuMZ[_0x31b8de(0x35b)][_0x31b8de(0x222)]['Color'][_0x31b8de(0x3e3)];},ColorManager['itemBackColor1']=function(){const _0x571ed6=_0x38ed9b;return VisuMZ[_0x571ed6(0x35b)][_0x571ed6(0x222)][_0x571ed6(0x575)][_0x571ed6(0x456)];},ColorManager['itemBackColor2']=function(){const _0x55fbad=_0x38ed9b;return VisuMZ[_0x55fbad(0x35b)][_0x55fbad(0x222)][_0x55fbad(0x575)][_0x55fbad(0x659)];},SceneManager[_0x38ed9b(0x39d)]=[],VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x4c5)]=SceneManager['initialize'],SceneManager[_0x38ed9b(0xb2)]=function(){const _0x15455b=_0x38ed9b;VisuMZ[_0x15455b(0x35b)]['SceneManager_initialize'][_0x15455b(0x434)](this),this[_0x15455b(0x1a8)]();},VisuMZ[_0x38ed9b(0x35b)]['SceneManager_onKeyDown']=SceneManager[_0x38ed9b(0x453)],SceneManager['onKeyDown']=function(_0x4f4f21){const _0x18dae7=_0x38ed9b;if($gameTemp)this[_0x18dae7(0x640)](_0x4f4f21);VisuMZ['CoreEngine']['SceneManager_onKeyDown'][_0x18dae7(0x434)](this,_0x4f4f21);},SceneManager[_0x38ed9b(0x640)]=function(_0xdee889){const _0x70269c=_0x38ed9b;if(!_0xdee889[_0x70269c(0x633)]&&!_0xdee889[_0x70269c(0x349)])switch(_0xdee889[_0x70269c(0x294)]){case 0x75:this[_0x70269c(0x3c2)]();break;case 0x76:if(Input[_0x70269c(0x351)](_0x70269c(0x24f))||Input[_0x70269c(0x351)]('ctrl'))return;this['playTestF7']();break;}},SceneManager['playTestF6']=function(){const _0x1ef12d=_0x38ed9b;if($gameTemp[_0x1ef12d(0x28b)]()&&VisuMZ['CoreEngine'][_0x1ef12d(0x222)][_0x1ef12d(0xb0)][_0x1ef12d(0x46d)]){ConfigManager[_0x1ef12d(0xb5)]!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0x1ef12d(0x5ee)]=0x0,ConfigManager[_0x1ef12d(0x234)]=0x0,ConfigManager[_0x1ef12d(0xb5)]=0x0):(ConfigManager['bgmVolume']=0x64,ConfigManager[_0x1ef12d(0x5ee)]=0x64,ConfigManager[_0x1ef12d(0x234)]=0x64,ConfigManager['seVolume']=0x64);ConfigManager[_0x1ef12d(0x3ba)]();if(this['_scene']['constructor']===Scene_Options){if(this[_0x1ef12d(0x134)][_0x1ef12d(0x255)])this[_0x1ef12d(0x134)][_0x1ef12d(0x255)][_0x1ef12d(0x2ca)]();if(this[_0x1ef12d(0x134)]['_listWindow'])this[_0x1ef12d(0x134)][_0x1ef12d(0x227)][_0x1ef12d(0x2ca)]();}}},SceneManager[_0x38ed9b(0x530)]=function(){const _0x4dc75c=_0x38ed9b;$gameTemp[_0x4dc75c(0x28b)]()&&VisuMZ[_0x4dc75c(0x35b)][_0x4dc75c(0x222)][_0x4dc75c(0xb0)][_0x4dc75c(0x352)]&&($gameTemp[_0x4dc75c(0x23f)]=!$gameTemp[_0x4dc75c(0x23f)]);},SceneManager[_0x38ed9b(0x1a8)]=function(){const _0x443f37=_0x38ed9b;this['_sideButtonLayout']=![],this[_0x443f37(0x261)]=!VisuMZ['CoreEngine'][_0x443f37(0x222)]['UI'][_0x443f37(0x4bb)];},SceneManager[_0x38ed9b(0x58a)]=function(_0xbfe1e7){const _0x55646e=_0x38ed9b;VisuMZ[_0x55646e(0x35b)][_0x55646e(0x222)]['UI']['SideButtons']&&(this['_sideButtonLayout']=_0xbfe1e7);},SceneManager[_0x38ed9b(0xf4)]=function(){const _0xe13f79=_0x38ed9b;return this[_0xe13f79(0x5e7)];},SceneManager[_0x38ed9b(0x580)]=function(){return this['_hideButtons'];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x4a8f04=_0x38ed9b;return this['areButtonsHidden']()||this[_0x4a8f04(0xf4)]();},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x4d9)]=SceneManager[_0x38ed9b(0x148)],SceneManager[_0x38ed9b(0x148)]=function(){const _0x455fe9=_0x38ed9b;return VisuMZ[_0x455fe9(0x35b)]['Settings']['QoL']['RequireFocus']?VisuMZ[_0x455fe9(0x35b)][_0x455fe9(0x4d9)][_0x455fe9(0x434)](this):!![];},SceneManager['catchException']=function(_0x2e0a54){const _0x5294de=_0x38ed9b;if(_0x2e0a54 instanceof Error)this[_0x5294de(0x670)](_0x2e0a54);else _0x2e0a54 instanceof Array&&_0x2e0a54[0x0]===_0x5294de(0x3d2)?this[_0x5294de(0x5df)](_0x2e0a54):this['catchUnknownError'](_0x2e0a54);this[_0x5294de(0x569)]();},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x3da)]=BattleManager[_0x38ed9b(0x40e)],BattleManager[_0x38ed9b(0x40e)]=function(){const _0x36d06b=_0x38ed9b;if(VisuMZ[_0x36d06b(0x35b)]['Settings'][_0x36d06b(0xb0)][_0x36d06b(0x388)])this['processAlwaysEscape']();else return VisuMZ[_0x36d06b(0x35b)][_0x36d06b(0x3da)][_0x36d06b(0x434)](this);},BattleManager[_0x38ed9b(0x2a8)]=function(){const _0x580d4a=_0x38ed9b;return $gameParty[_0x580d4a(0xcb)](),SoundManager[_0x580d4a(0x3ef)](),this['onEscapeSuccess'](),!![];},BattleManager[_0x38ed9b(0x1b0)]=function(){const _0x27c404=_0x38ed9b;return $gameSystem[_0x27c404(0x3e8)]()>=0x1;},BattleManager[_0x38ed9b(0x156)]=function(){const _0xd3c5b0=_0x38ed9b;return $gameSystem[_0xd3c5b0(0x3e8)]()===0x1;},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x38a)]=Game_Temp[_0x38ed9b(0x1d7)]['initialize'],Game_Temp['prototype'][_0x38ed9b(0xb2)]=function(){const _0x3baa04=_0x38ed9b;VisuMZ[_0x3baa04(0x35b)][_0x3baa04(0x38a)][_0x3baa04(0x434)](this),this[_0x3baa04(0x35f)](),this[_0x3baa04(0x3b2)]();},Game_Temp['prototype'][_0x38ed9b(0x35f)]=function(){const _0x4f4646=_0x38ed9b;VisuMZ[_0x4f4646(0x35b)][_0x4f4646(0x222)][_0x4f4646(0xb0)]['ForceNoPlayTest']&&(this['_isPlaytest']=![]);},Game_Temp['prototype']['createFauxAnimationQueue']=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x38ed9b(0x1d7)]['requestFauxAnimation']=function(_0x3c64da,_0x1fb472,_0x269150,_0x3804ef){const _0x5e979d=_0x38ed9b;if(!this[_0x5e979d(0x246)]())return;_0x269150=_0x269150||![],_0x3804ef=_0x3804ef||![];if($dataAnimations[_0x1fb472]){const _0x56944e={'targets':_0x3c64da,'animationId':_0x1fb472,'mirror':_0x269150,'mute':_0x3804ef};this[_0x5e979d(0xbb)]['push'](_0x56944e);for(const _0x4f9417 of _0x3c64da){_0x4f9417[_0x5e979d(0x5b8)]&&_0x4f9417[_0x5e979d(0x5b8)]();}}},Game_Temp['prototype'][_0x38ed9b(0x246)]=function(){return!![];},Game_Temp[_0x38ed9b(0x1d7)][_0x38ed9b(0xce)]=function(){const _0x4f07cd=_0x38ed9b;return this[_0x4f07cd(0xbb)][_0x4f07cd(0x24f)]();},Game_Temp['prototype']['setLastPluginCommandInterpreter']=function(_0x4c61a4){const _0x4168a8=_0x38ed9b;this[_0x4168a8(0x145)]=_0x4c61a4;},Game_Temp[_0x38ed9b(0x1d7)][_0x38ed9b(0x2da)]=function(){const _0xfb39eb=_0x38ed9b;return this[_0xfb39eb(0x145)];},Game_Temp[_0x38ed9b(0x1d7)][_0x38ed9b(0xf8)]=function(){const _0xac996c=_0x38ed9b;this[_0xac996c(0x44f)]=undefined,this['_forcedBattleSys']=undefined;},Game_Temp['prototype'][_0x38ed9b(0x3c4)]=function(_0x4b82b7){const _0x4a5be4=_0x38ed9b;$gameMap&&$dataMap&&$dataMap[_0x4a5be4(0x353)]&&this[_0x4a5be4(0xe0)]($dataMap[_0x4a5be4(0x353)]);const _0x3eae15=$dataTroops[_0x4b82b7];_0x3eae15&&this[_0x4a5be4(0xe0)](_0x3eae15[_0x4a5be4(0x11e)]);},Game_Temp[_0x38ed9b(0x1d7)]['parseForcedGameTroopSettingsCoreEngine']=function(_0x453001){const _0x5b512c=_0x38ed9b;if(!_0x453001)return;if(_0x453001[_0x5b512c(0x34b)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x5b512c(0x44f)]='FV';else{if(_0x453001['match'](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x453001['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x449ad7=String(RegExp['$1']);if(_0x449ad7['match'](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x5b512c(0x44f)]='FV';else _0x449ad7[_0x5b512c(0x34b)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x5b512c(0x44f)]='SV');}}}if(_0x453001['match'](/<(?:DTB)>/i))this['_forcedBattleSys']=0x0;else{if(_0x453001[_0x5b512c(0x34b)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x5b512c(0xdf)]=0x1;else{if(_0x453001[_0x5b512c(0x34b)](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x453001[_0x5b512c(0x34b)](/<(?:CTB)>/i))Imported[_0x5b512c(0x312)]&&(this[_0x5b512c(0xdf)]=_0x5b512c(0x297));else{if(_0x453001[_0x5b512c(0x34b)](/<(?:STB)>/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x5b512c(0xdf)]=_0x5b512c(0x9e));else{if(_0x453001[_0x5b512c(0x34b)](/<(?:BTB)>/i))Imported[_0x5b512c(0x273)]&&(this[_0x5b512c(0xdf)]=_0x5b512c(0x36d));else{if(_0x453001[_0x5b512c(0x34b)](/<(?:FTB)>/i))Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x5b512c(0xdf)]='FTB');else{if(_0x453001['match'](/<(?:OTB)>/i))Imported[_0x5b512c(0x428)]&&(this[_0x5b512c(0xdf)]=_0x5b512c(0x385));else{if(_0x453001[_0x5b512c(0x34b)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x428ad8=String(RegExp['$1']);if(_0x428ad8[_0x5b512c(0x34b)](/DTB/i))this[_0x5b512c(0xdf)]=0x0;else{if(_0x428ad8['match'](/(?:TPB|ATB)[ ]ACTIVE/i))this['_forcedBattleSys']=0x1;else{if(_0x428ad8[_0x5b512c(0x34b)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x5b512c(0xdf)]=0x2;else{if(_0x428ad8['match'](/CTB/i))Imported[_0x5b512c(0x312)]&&(this['_forcedBattleSys']='CTB');else{if(_0x428ad8['match'](/STB/i))Imported[_0x5b512c(0x9d)]&&(this[_0x5b512c(0xdf)]=_0x5b512c(0x9e));else{if(_0x428ad8[_0x5b512c(0x34b)](/BTB/i))Imported[_0x5b512c(0x273)]&&(this['_forcedBattleSys']=_0x5b512c(0x36d));else{if(_0x428ad8[_0x5b512c(0x34b)](/FTB/i))Imported[_0x5b512c(0x436)]&&(this['_forcedBattleSys']=_0x5b512c(0x18d));else _0x428ad8[_0x5b512c(0x34b)](/OTB/i)&&(Imported[_0x5b512c(0x428)]&&(this['_forcedBattleSys']=_0x5b512c(0x385)));}}}}}}}}}}}}}}}},VisuMZ['CoreEngine'][_0x38ed9b(0x1c4)]=Game_System[_0x38ed9b(0x1d7)][_0x38ed9b(0xb2)],Game_System['prototype']['initialize']=function(){const _0x3a02fb=_0x38ed9b;VisuMZ[_0x3a02fb(0x35b)][_0x3a02fb(0x1c4)][_0x3a02fb(0x434)](this),this[_0x3a02fb(0x538)]();},Game_System[_0x38ed9b(0x1d7)]['initCoreEngine']=function(){const _0x38e793=_0x38ed9b;this[_0x38e793(0x53a)]={'SideView':$dataSystem['optSideView'],'BattleSystem':this[_0x38e793(0x16b)](),'FontSize':$dataSystem['advanced']['fontSize'],'Padding':0xc};},Game_System[_0x38ed9b(0x1d7)][_0x38ed9b(0x404)]=function(){const _0x46dff=_0x38ed9b;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp[_0x46dff(0x44f)]==='FV')return![];}if(this[_0x46dff(0x53a)]===undefined)this['initCoreEngine']();if(this[_0x46dff(0x53a)][_0x46dff(0x59d)]===undefined)this['initCoreEngine']();return this[_0x46dff(0x53a)]['SideView'];},Game_System[_0x38ed9b(0x1d7)]['setSideView']=function(_0xcb7455){const _0x30ed2a=_0x38ed9b;if(this[_0x30ed2a(0x53a)]===undefined)this[_0x30ed2a(0x538)]();if(this[_0x30ed2a(0x53a)][_0x30ed2a(0x59d)]===undefined)this[_0x30ed2a(0x538)]();this[_0x30ed2a(0x53a)]['SideView']=_0xcb7455;},Game_System['prototype'][_0x38ed9b(0x3f2)]=function(){const _0x50fdcd=_0x38ed9b;if(this[_0x50fdcd(0x53a)]===undefined)this[_0x50fdcd(0x538)]();this[_0x50fdcd(0x53a)][_0x50fdcd(0x41f)]=this[_0x50fdcd(0x16b)]();},Game_System['prototype'][_0x38ed9b(0x16b)]=function(){const _0x26d2cf=_0x38ed9b,_0x46211e=(VisuMZ[_0x26d2cf(0x35b)]['Settings']['BattleSystem']||_0x26d2cf(0xb7))[_0x26d2cf(0x4f3)]()[_0x26d2cf(0x492)]();return VisuMZ[_0x26d2cf(0x35b)][_0x26d2cf(0x5d0)](_0x46211e);},Game_System[_0x38ed9b(0x1d7)][_0x38ed9b(0x3e8)]=function(){const _0x328fcf=_0x38ed9b;if($gameTemp[_0x328fcf(0xdf)]!==undefined)return $gameTemp[_0x328fcf(0xdf)];if(this['_CoreEngineSettings']===undefined)this[_0x328fcf(0x538)]();if(this[_0x328fcf(0x53a)][_0x328fcf(0x41f)]===undefined)this[_0x328fcf(0x3f2)]();return this['_CoreEngineSettings'][_0x328fcf(0x41f)];},Game_System['prototype'][_0x38ed9b(0x35a)]=function(_0x189040){const _0x3f5e95=_0x38ed9b;if(this['_CoreEngineSettings']===undefined)this[_0x3f5e95(0x538)]();if(this['_CoreEngineSettings'][_0x3f5e95(0x41f)]===undefined)this['resetBattleSystem']();this[_0x3f5e95(0x53a)][_0x3f5e95(0x41f)]=_0x189040;},Game_System[_0x38ed9b(0x1d7)][_0x38ed9b(0x18c)]=function(){const _0xd1b91e=_0x38ed9b;if(this[_0xd1b91e(0x53a)]===undefined)this[_0xd1b91e(0x538)]();if(this[_0xd1b91e(0x53a)][_0xd1b91e(0x300)]===undefined)this[_0xd1b91e(0x538)]();return this[_0xd1b91e(0x53a)][_0xd1b91e(0x300)];},Game_System[_0x38ed9b(0x1d7)][_0x38ed9b(0x62a)]=function(_0x3d955b){const _0x194320=_0x38ed9b;if(this[_0x194320(0x53a)]===undefined)this[_0x194320(0x538)]();if(this[_0x194320(0x53a)]['TimeProgress']===undefined)this[_0x194320(0x538)]();this[_0x194320(0x53a)]['FontSize']=_0x3d955b;},Game_System[_0x38ed9b(0x1d7)]['windowPadding']=function(){const _0x64a9c0=_0x38ed9b;if(this[_0x64a9c0(0x53a)]===undefined)this[_0x64a9c0(0x538)]();if(this['_CoreEngineSettings'][_0x64a9c0(0x99)]===undefined)this[_0x64a9c0(0x538)]();return this[_0x64a9c0(0x53a)]['Padding'];},Game_System[_0x38ed9b(0x1d7)]['setWindowPadding']=function(_0x1032a4){const _0x4978d4=_0x38ed9b;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x4978d4(0x53a)][_0x4978d4(0x576)]===undefined)this['initCoreEngine']();this[_0x4978d4(0x53a)]['Padding']=_0x1032a4;},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x2d2)]=Game_Screen['prototype']['initialize'],Game_Screen[_0x38ed9b(0x1d7)][_0x38ed9b(0xb2)]=function(){const _0x5be6e3=_0x38ed9b;VisuMZ[_0x5be6e3(0x35b)][_0x5be6e3(0x2d2)]['call'](this),this[_0x5be6e3(0x555)]();},Game_Screen[_0x38ed9b(0x1d7)][_0x38ed9b(0x555)]=function(){const _0x40e5e2=_0x38ed9b,_0x4daa6f=VisuMZ[_0x40e5e2(0x35b)]['Settings']['ScreenShake'];this[_0x40e5e2(0x609)]=_0x4daa6f?.[_0x40e5e2(0x412)]||_0x40e5e2(0x31c);},Game_Screen[_0x38ed9b(0x1d7)][_0x38ed9b(0x2b1)]=function(){if(this['_coreEngineShakeStyle']===undefined)this['initCoreEngineScreenShake']();return this['_coreEngineShakeStyle'];},Game_Screen[_0x38ed9b(0x1d7)][_0x38ed9b(0x621)]=function(_0x53b9cd){const _0x39b30a=_0x38ed9b;if(this[_0x39b30a(0x609)]===undefined)this['initCoreEngineScreenShake']();this[_0x39b30a(0x609)]=_0x53b9cd['toLowerCase']()[_0x39b30a(0x492)]();},Game_Picture[_0x38ed9b(0x1d7)][_0x38ed9b(0x5ff)]=function(){const _0x1b6f6f=_0x38ed9b;if($gameParty[_0x1b6f6f(0x541)]())return![];return this[_0x1b6f6f(0x11e)]()&&this['name']()[_0x1b6f6f(0x9b)](0x0)==='!';},VisuMZ['CoreEngine'][_0x38ed9b(0x29f)]=Game_Picture[_0x38ed9b(0x1d7)]['x'],Game_Picture[_0x38ed9b(0x1d7)]['x']=function(){const _0x28a74f=_0x38ed9b;return this[_0x28a74f(0x5ff)]()?this['xScrollLinkedOffset']():VisuMZ[_0x28a74f(0x35b)][_0x28a74f(0x29f)][_0x28a74f(0x434)](this);},Game_Picture[_0x38ed9b(0x1d7)][_0x38ed9b(0xa6)]=function(){const _0xb56a96=_0x38ed9b,_0xd6acfb=$gameMap[_0xb56a96(0x1ac)]()*$gameMap[_0xb56a96(0x123)]();return this['_x']-_0xd6acfb;},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x2fa)]=Game_Picture[_0x38ed9b(0x1d7)]['y'],Game_Picture[_0x38ed9b(0x1d7)]['y']=function(){const _0x3dce6a=_0x38ed9b;return this[_0x3dce6a(0x5ff)]()?this[_0x3dce6a(0x58c)]():VisuMZ['CoreEngine']['Game_Picture_y'][_0x3dce6a(0x434)](this);},Game_Picture['prototype'][_0x38ed9b(0x58c)]=function(){const _0x21201c=_0x38ed9b,_0x43a4d6=$gameMap[_0x21201c(0x17e)]()*$gameMap[_0x21201c(0x2eb)]();return this['_y']-_0x43a4d6;},Game_Picture[_0x38ed9b(0x1d7)]['setEasingType']=function(_0x5b56e3){const _0xad1d22=_0x38ed9b;this[_0xad1d22(0xab)]=_0x5b56e3;},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x1c8)]=Game_Picture['prototype'][_0x38ed9b(0x15c)],Game_Picture[_0x38ed9b(0x1d7)]['calcEasing']=function(_0x557338){const _0x3ac5b8=_0x38ed9b;return this[_0x3ac5b8(0xab)]=this[_0x3ac5b8(0xab)]||0x0,[0x0,0x1,0x2,0x3]['includes'](this[_0x3ac5b8(0xab)])?VisuMZ[_0x3ac5b8(0x35b)][_0x3ac5b8(0x1c8)][_0x3ac5b8(0x434)](this,_0x557338):VisuMZ[_0x3ac5b8(0x22c)](_0x557338,this[_0x3ac5b8(0xab)]);},VisuMZ['CoreEngine'][_0x38ed9b(0x174)]=Game_Action[_0x38ed9b(0x1d7)][_0x38ed9b(0x460)],Game_Action[_0x38ed9b(0x1d7)][_0x38ed9b(0x460)]=function(_0x567ffd){const _0x367939=_0x38ed9b;return VisuMZ['CoreEngine'][_0x367939(0x222)][_0x367939(0xb0)][_0x367939(0x14e)]?this[_0x367939(0x138)](_0x567ffd):VisuMZ[_0x367939(0x35b)][_0x367939(0x174)][_0x367939(0x434)](this,_0x567ffd);},Game_Action[_0x38ed9b(0x1d7)][_0x38ed9b(0x138)]=function(_0x1ca5b8){const _0x574b9b=_0x38ed9b,_0x40fd9d=this[_0x574b9b(0x108)](_0x1ca5b8),_0x478e5f=this[_0x574b9b(0x4e9)](_0x1ca5b8),_0x25d6f0=this[_0x574b9b(0x3e0)](_0x1ca5b8);return _0x40fd9d*(_0x478e5f-_0x25d6f0);},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x603)]=Game_Action[_0x38ed9b(0x1d7)][_0x38ed9b(0x41c)],Game_Action[_0x38ed9b(0x1d7)]['itemEva']=function(_0x43e55c){const _0x3624d7=_0x38ed9b;return VisuMZ['CoreEngine']['Settings']['QoL'][_0x3624d7(0x14e)]?0x0:VisuMZ[_0x3624d7(0x35b)]['Game_Action_itemEva'][_0x3624d7(0x434)](this,_0x43e55c);},Game_Action[_0x38ed9b(0x1d7)]['itemSuccessRate']=function(_0x50e8a3){const _0xd1f890=_0x38ed9b;return this[_0xd1f890(0x535)]()[_0xd1f890(0x1a2)]*0.01;},Game_Action[_0x38ed9b(0x1d7)]['subjectHitRate']=function(_0x145947){const _0x15e2c2=_0x38ed9b;if(VisuMZ['CoreEngine']['Settings'][_0x15e2c2(0xb0)][_0x15e2c2(0x17d)]&&this['isItem']())return 0x1;return this['isPhysical']()?VisuMZ['CoreEngine'][_0x15e2c2(0x222)][_0x15e2c2(0xb0)][_0x15e2c2(0x17d)]&&this[_0x15e2c2(0xe1)]()[_0x15e2c2(0x310)]()?this[_0x15e2c2(0xe1)]()[_0x15e2c2(0x485)]+0.05:this['subject']()[_0x15e2c2(0x485)]:0x1;},Game_Action['prototype'][_0x38ed9b(0x3e0)]=function(_0x377b4e){const _0x20e17a=_0x38ed9b;if(this[_0x20e17a(0xe1)]()[_0x20e17a(0x310)]()===_0x377b4e['isActor']())return 0x0;if(this[_0x20e17a(0x302)]())return VisuMZ['CoreEngine'][_0x20e17a(0x222)][_0x20e17a(0xb0)][_0x20e17a(0x17d)]&&_0x377b4e[_0x20e17a(0x18e)]()?_0x377b4e[_0x20e17a(0x33c)]-0.05:_0x377b4e[_0x20e17a(0x33c)];else return this[_0x20e17a(0x40f)]()?_0x377b4e[_0x20e17a(0x43b)]:0x0;},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x526)]=Game_Action[_0x38ed9b(0x1d7)][_0x38ed9b(0x26c)],Game_Action[_0x38ed9b(0x1d7)][_0x38ed9b(0x26c)]=function(_0x4e9e49){const _0x2ecc27=_0x38ed9b;VisuMZ[_0x2ecc27(0x35b)][_0x2ecc27(0x526)][_0x2ecc27(0x434)](this,_0x4e9e49);if(VisuMZ[_0x2ecc27(0x35b)][_0x2ecc27(0x222)][_0x2ecc27(0xb0)][_0x2ecc27(0x14e)])return;const _0xd5a8a6=_0x4e9e49['result']();_0xd5a8a6[_0x2ecc27(0x64b)]&&(0x1-this[_0x2ecc27(0x41c)](_0x4e9e49)>this['itemHit'](_0x4e9e49)&&(_0xd5a8a6[_0x2ecc27(0x64b)]=![],_0xd5a8a6[_0x2ecc27(0x292)]=!![]));},VisuMZ['CoreEngine'][_0x38ed9b(0xd3)]=Game_BattlerBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x66b)],Game_BattlerBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x66b)]=function(){const _0x7f7c23=_0x38ed9b;this[_0x7f7c23(0x45c)]={},VisuMZ[_0x7f7c23(0x35b)][_0x7f7c23(0xd3)]['call'](this);},VisuMZ['CoreEngine'][_0x38ed9b(0x216)]=Game_BattlerBase['prototype'][_0x38ed9b(0x2ca)],Game_BattlerBase[_0x38ed9b(0x1d7)]['refresh']=function(){const _0x31c5c0=_0x38ed9b;this[_0x31c5c0(0x45c)]={},VisuMZ[_0x31c5c0(0x35b)][_0x31c5c0(0x216)]['call'](this);},Game_BattlerBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x229)]=function(_0x57540f){const _0x179b1b=_0x38ed9b;return this[_0x179b1b(0x45c)]=this[_0x179b1b(0x45c)]||{},this[_0x179b1b(0x45c)][_0x57540f]!==undefined;},Game_BattlerBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x3b9)]=function(_0x70b8a3){const _0x34bf5d=_0x38ed9b,_0x9d1166=(_0x503704,_0x2165a2)=>{const _0x1e26b9=_0x5272;if(!_0x2165a2)return _0x503704;if(_0x2165a2[_0x1e26b9(0x353)][_0x1e26b9(0x34b)](VisuMZ['CoreEngine'][_0x1e26b9(0x31d)][_0x1e26b9(0x3b9)][_0x70b8a3])){var _0x428637=Number(RegExp['$1']);_0x503704+=_0x428637;}if(_0x2165a2['note'][_0x1e26b9(0x34b)](VisuMZ[_0x1e26b9(0x35b)][_0x1e26b9(0x31d)][_0x1e26b9(0x113)][_0x70b8a3])){var _0x32cc91=String(RegExp['$1']);try{_0x503704+=eval(_0x32cc91);}catch(_0x5cc06f){if($gameTemp['isPlaytest']())console[_0x1e26b9(0x236)](_0x5cc06f);}}return _0x503704;};return this[_0x34bf5d(0xa9)]()[_0x34bf5d(0x2d0)](_0x9d1166,this['_paramPlus'][_0x70b8a3]);},Game_BattlerBase['prototype']['paramMax']=function(_0x2fd6d5){const _0x3425c0=_0x38ed9b;var _0x430823='Basic'+(this['isActor']()?_0x3425c0(0x22a):_0x3425c0(0x185))+_0x3425c0(0xbe)+_0x2fd6d5;if(this['checkCacheKey'](_0x430823))return this[_0x3425c0(0x45c)][_0x430823];this['_cache'][_0x430823]=eval(VisuMZ['CoreEngine'][_0x3425c0(0x222)]['Param'][_0x430823]);const _0x483009=(_0xf26812,_0x20ed0c)=>{const _0x53b226=_0x3425c0;if(!_0x20ed0c)return _0xf26812;if(_0x20ed0c[_0x53b226(0x353)]['match'](VisuMZ['CoreEngine'][_0x53b226(0x31d)][_0x53b226(0x512)][_0x2fd6d5])){var _0xef32b2=Number(RegExp['$1']);if(_0xef32b2===0x0)_0xef32b2=Number[_0x53b226(0x198)];_0xf26812=Math[_0x53b226(0x414)](_0xf26812,_0xef32b2);}if(_0x20ed0c[_0x53b226(0x353)][_0x53b226(0x34b)](VisuMZ[_0x53b226(0x35b)][_0x53b226(0x31d)][_0x53b226(0x288)][_0x2fd6d5])){var _0x1169c5=String(RegExp['$1']);try{_0xf26812=Math[_0x53b226(0x414)](_0xf26812,Number(eval(_0x1169c5)));}catch(_0x4a1959){if($gameTemp[_0x53b226(0x28b)]())console[_0x53b226(0x236)](_0x4a1959);}}return _0xf26812;};if(this[_0x3425c0(0x45c)][_0x430823]===0x0)this[_0x3425c0(0x45c)][_0x430823]=Number[_0x3425c0(0x198)];return this[_0x3425c0(0x45c)][_0x430823]=this['traitObjects']()[_0x3425c0(0x2d0)](_0x483009,this[_0x3425c0(0x45c)][_0x430823]),this[_0x3425c0(0x45c)][_0x430823];},Game_BattlerBase['prototype']['paramRate']=function(_0x30198e){const _0x4c74e8=_0x38ed9b,_0x33dba6=this[_0x4c74e8(0x206)](Game_BattlerBase[_0x4c74e8(0x2c5)],_0x30198e),_0x1ef3af=(_0x34617c,_0x33d70e)=>{const _0x1f59d0=_0x4c74e8;if(!_0x33d70e)return _0x34617c;if(_0x33d70e['note'][_0x1f59d0(0x34b)](VisuMZ[_0x1f59d0(0x35b)][_0x1f59d0(0x31d)][_0x1f59d0(0x26f)][_0x30198e])){var _0x48ebcd=Number(RegExp['$1'])/0x64;_0x34617c*=_0x48ebcd;}if(_0x33d70e[_0x1f59d0(0x353)]['match'](VisuMZ[_0x1f59d0(0x35b)][_0x1f59d0(0x31d)][_0x1f59d0(0x2ef)][_0x30198e])){var _0x48ebcd=Number(RegExp['$1']);_0x34617c*=_0x48ebcd;}if(_0x33d70e[_0x1f59d0(0x353)][_0x1f59d0(0x34b)](VisuMZ['CoreEngine'][_0x1f59d0(0x31d)][_0x1f59d0(0x102)][_0x30198e])){var _0x4e76c3=String(RegExp['$1']);try{_0x34617c*=eval(_0x4e76c3);}catch(_0x41be09){if($gameTemp['isPlaytest']())console['log'](_0x41be09);}}return _0x34617c;};return this[_0x4c74e8(0xa9)]()[_0x4c74e8(0x2d0)](_0x1ef3af,_0x33dba6);},Game_BattlerBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x5b2)]=function(_0x1b7f27){const _0x668796=_0x38ed9b,_0x51d891=(_0x26141a,_0x528f13)=>{const _0x34464c=_0x5272;if(!_0x528f13)return _0x26141a;if(_0x528f13[_0x34464c(0x353)]['match'](VisuMZ[_0x34464c(0x35b)][_0x34464c(0x31d)][_0x34464c(0x4b1)][_0x1b7f27])){var _0x2154fe=Number(RegExp['$1']);_0x26141a+=_0x2154fe;}if(_0x528f13[_0x34464c(0x353)][_0x34464c(0x34b)](VisuMZ['CoreEngine'][_0x34464c(0x31d)][_0x34464c(0xaa)][_0x1b7f27])){var _0x44a706=String(RegExp['$1']);try{_0x26141a+=eval(_0x44a706);}catch(_0x3d5005){if($gameTemp[_0x34464c(0x28b)]())console[_0x34464c(0x236)](_0x3d5005);}}return _0x26141a;};return this[_0x668796(0xa9)]()['reduce'](_0x51d891,0x0);},Game_BattlerBase['prototype']['param']=function(_0x20b96e){const _0x5739c2=_0x38ed9b;let _0x5e1ce8=_0x5739c2(0x1c7)+_0x20b96e+_0x5739c2(0xb4);if(this[_0x5739c2(0x229)](_0x5e1ce8))return this[_0x5739c2(0x45c)][_0x5e1ce8];return this[_0x5739c2(0x45c)][_0x5e1ce8]=Math[_0x5739c2(0x343)](VisuMZ[_0x5739c2(0x35b)][_0x5739c2(0x222)][_0x5739c2(0x665)]['BasicParameterFormula'][_0x5739c2(0x434)](this,_0x20b96e)),this[_0x5739c2(0x45c)][_0x5e1ce8];},Game_BattlerBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x305)]=function(_0x5f040e){const _0x711416=_0x38ed9b,_0x1ced6d=(_0x4023f3,_0x98e0c5)=>{const _0x1c92ff=_0x5272;if(!_0x98e0c5)return _0x4023f3;if(_0x98e0c5[_0x1c92ff(0x353)]['match'](VisuMZ['CoreEngine'][_0x1c92ff(0x31d)][_0x1c92ff(0x476)][_0x5f040e])){var _0x226692=Number(RegExp['$1'])/0x64;_0x4023f3+=_0x226692;}if(_0x98e0c5['note']['match'](VisuMZ['CoreEngine']['RegExp'][_0x1c92ff(0x629)][_0x5f040e])){var _0x226692=Number(RegExp['$1']);_0x4023f3+=_0x226692;}if(_0x98e0c5[_0x1c92ff(0x353)]['match'](VisuMZ[_0x1c92ff(0x35b)][_0x1c92ff(0x31d)][_0x1c92ff(0x3f7)][_0x5f040e])){var _0x44109d=String(RegExp['$1']);try{_0x4023f3+=eval(_0x44109d);}catch(_0x14aac7){if($gameTemp[_0x1c92ff(0x28b)]())console[_0x1c92ff(0x236)](_0x14aac7);}}return _0x4023f3;};return this['traitObjects']()[_0x711416(0x2d0)](_0x1ced6d,0x0);},Game_BattlerBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x1f3)]=function(_0x5132d9){const _0x2143b7=_0x38ed9b,_0x4d07ce=(_0x2f352c,_0x4e2904)=>{const _0x4de284=_0x5272;if(!_0x4e2904)return _0x2f352c;if(_0x4e2904['note']['match'](VisuMZ[_0x4de284(0x35b)][_0x4de284(0x31d)]['xparamRate1'][_0x5132d9])){var _0x3d6d1a=Number(RegExp['$1'])/0x64;_0x2f352c*=_0x3d6d1a;}if(_0x4e2904['note'][_0x4de284(0x34b)](VisuMZ[_0x4de284(0x35b)][_0x4de284(0x31d)][_0x4de284(0x448)][_0x5132d9])){var _0x3d6d1a=Number(RegExp['$1']);_0x2f352c*=_0x3d6d1a;}if(_0x4e2904['note'][_0x4de284(0x34b)](VisuMZ['CoreEngine'][_0x4de284(0x31d)]['xparamRateJS'][_0x5132d9])){var _0x363262=String(RegExp['$1']);try{_0x2f352c*=eval(_0x363262);}catch(_0x522322){if($gameTemp[_0x4de284(0x28b)]())console[_0x4de284(0x236)](_0x522322);}}return _0x2f352c;};return this['traitObjects']()[_0x2143b7(0x2d0)](_0x4d07ce,0x1);},Game_BattlerBase[_0x38ed9b(0x1d7)]['xparamFlatBonus']=function(_0x38ea7b){const _0x5a1323=_0x38ed9b,_0x1ef4e7=(_0x533b09,_0x5d655e)=>{const _0x413fea=_0x5272;if(!_0x5d655e)return _0x533b09;if(_0x5d655e[_0x413fea(0x353)][_0x413fea(0x34b)](VisuMZ[_0x413fea(0x35b)][_0x413fea(0x31d)][_0x413fea(0x4a9)][_0x38ea7b])){var _0x5ec224=Number(RegExp['$1'])/0x64;_0x533b09+=_0x5ec224;}if(_0x5d655e[_0x413fea(0x353)][_0x413fea(0x34b)](VisuMZ[_0x413fea(0x35b)][_0x413fea(0x31d)]['xparamFlat2'][_0x38ea7b])){var _0x5ec224=Number(RegExp['$1']);_0x533b09+=_0x5ec224;}if(_0x5d655e[_0x413fea(0x353)][_0x413fea(0x34b)](VisuMZ['CoreEngine'][_0x413fea(0x31d)][_0x413fea(0x5d5)][_0x38ea7b])){var _0x1fe118=String(RegExp['$1']);try{_0x533b09+=eval(_0x1fe118);}catch(_0x81b0b3){if($gameTemp[_0x413fea(0x28b)]())console['log'](_0x81b0b3);}}return _0x533b09;};return this[_0x5a1323(0xa9)]()[_0x5a1323(0x2d0)](_0x1ef4e7,0x0);},Game_BattlerBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x55b)]=function(_0x3c39c6){const _0x90ef33=_0x38ed9b;let _0x2e128c=_0x90ef33(0x55b)+_0x3c39c6+_0x90ef33(0xb4);if(this[_0x90ef33(0x229)](_0x2e128c))return this[_0x90ef33(0x45c)][_0x2e128c];return this['_cache'][_0x2e128c]=VisuMZ[_0x90ef33(0x35b)][_0x90ef33(0x222)][_0x90ef33(0x665)]['XParameterFormula'][_0x90ef33(0x434)](this,_0x3c39c6),this[_0x90ef33(0x45c)][_0x2e128c];},Game_BattlerBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x396)]=function(_0x481162){const _0x40ec28=_0x38ed9b,_0x425450=(_0x274782,_0x5d8753)=>{const _0x1db10a=_0x5272;if(!_0x5d8753)return _0x274782;if(_0x5d8753[_0x1db10a(0x353)][_0x1db10a(0x34b)](VisuMZ[_0x1db10a(0x35b)][_0x1db10a(0x31d)][_0x1db10a(0x652)][_0x481162])){var _0x3c6487=Number(RegExp['$1'])/0x64;_0x274782+=_0x3c6487;}if(_0x5d8753[_0x1db10a(0x353)][_0x1db10a(0x34b)](VisuMZ[_0x1db10a(0x35b)][_0x1db10a(0x31d)][_0x1db10a(0x2a2)][_0x481162])){var _0x3c6487=Number(RegExp['$1']);_0x274782+=_0x3c6487;}if(_0x5d8753[_0x1db10a(0x353)][_0x1db10a(0x34b)](VisuMZ[_0x1db10a(0x35b)]['RegExp'][_0x1db10a(0x54d)][_0x481162])){var _0x18aa03=String(RegExp['$1']);try{_0x274782+=eval(_0x18aa03);}catch(_0x2ed3dd){if($gameTemp[_0x1db10a(0x28b)]())console[_0x1db10a(0x236)](_0x2ed3dd);}}return _0x274782;};return this[_0x40ec28(0xa9)]()[_0x40ec28(0x2d0)](_0x425450,0x0);},Game_BattlerBase['prototype'][_0x38ed9b(0x303)]=function(_0x34e4c1){const _0x1b284b=_0x38ed9b,_0x507c42=(_0x40570b,_0x54c6a8)=>{const _0x532aef=_0x5272;if(!_0x54c6a8)return _0x40570b;if(_0x54c6a8[_0x532aef(0x353)]['match'](VisuMZ[_0x532aef(0x35b)][_0x532aef(0x31d)][_0x532aef(0x5a7)][_0x34e4c1])){var _0x544fbe=Number(RegExp['$1'])/0x64;_0x40570b*=_0x544fbe;}if(_0x54c6a8[_0x532aef(0x353)][_0x532aef(0x34b)](VisuMZ[_0x532aef(0x35b)][_0x532aef(0x31d)][_0x532aef(0x553)][_0x34e4c1])){var _0x544fbe=Number(RegExp['$1']);_0x40570b*=_0x544fbe;}if(_0x54c6a8['note'][_0x532aef(0x34b)](VisuMZ[_0x532aef(0x35b)][_0x532aef(0x31d)][_0x532aef(0x4ae)][_0x34e4c1])){var _0x5b523b=String(RegExp['$1']);try{_0x40570b*=eval(_0x5b523b);}catch(_0x4f23b3){if($gameTemp[_0x532aef(0x28b)]())console[_0x532aef(0x236)](_0x4f23b3);}}return _0x40570b;};return this[_0x1b284b(0xa9)]()[_0x1b284b(0x2d0)](_0x507c42,0x1);},Game_BattlerBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x21f)]=function(_0x40762c){const _0x23621b=_0x38ed9b,_0x5a71a5=(_0x470f48,_0xd6fe32)=>{const _0x544e0c=_0x5272;if(!_0xd6fe32)return _0x470f48;if(_0xd6fe32['note']['match'](VisuMZ['CoreEngine'][_0x544e0c(0x31d)][_0x544e0c(0x221)][_0x40762c])){var _0x1d1418=Number(RegExp['$1'])/0x64;_0x470f48+=_0x1d1418;}if(_0xd6fe32['note'][_0x544e0c(0x34b)](VisuMZ[_0x544e0c(0x35b)]['RegExp']['sparamFlat2'][_0x40762c])){var _0x1d1418=Number(RegExp['$1']);_0x470f48+=_0x1d1418;}if(_0xd6fe32[_0x544e0c(0x353)][_0x544e0c(0x34b)](VisuMZ['CoreEngine']['RegExp'][_0x544e0c(0x1b2)][_0x40762c])){var _0x291db6=String(RegExp['$1']);try{_0x470f48+=eval(_0x291db6);}catch(_0x5eb986){if($gameTemp[_0x544e0c(0x28b)]())console[_0x544e0c(0x236)](_0x5eb986);}}return _0x470f48;};return this[_0x23621b(0xa9)]()['reduce'](_0x5a71a5,0x0);},Game_BattlerBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x571)]=function(_0xebd6b4){const _0x8e5d92=_0x38ed9b;let _0x4bf901='sparam'+_0xebd6b4+'Total';if(this[_0x8e5d92(0x229)](_0x4bf901))return this[_0x8e5d92(0x45c)][_0x4bf901];return this[_0x8e5d92(0x45c)][_0x4bf901]=VisuMZ[_0x8e5d92(0x35b)][_0x8e5d92(0x222)][_0x8e5d92(0x665)][_0x8e5d92(0x630)][_0x8e5d92(0x434)](this,_0xebd6b4),this[_0x8e5d92(0x45c)][_0x4bf901];},Game_BattlerBase[_0x38ed9b(0x1d7)]['paramValueByName']=function(_0x3500d4,_0x2fea3f){const _0x4a5efb=_0x38ed9b;if(typeof paramId==='number')return this[_0x4a5efb(0x1c7)](_0x3500d4);_0x3500d4=String(_0x3500d4||'')[_0x4a5efb(0x4f3)]();if(_0x3500d4===_0x4a5efb(0x2bc))return this[_0x4a5efb(0x1c7)](0x0);if(_0x3500d4==='MAXMP')return this[_0x4a5efb(0x1c7)](0x1);if(_0x3500d4===_0x4a5efb(0x30b))return this[_0x4a5efb(0x1c7)](0x2);if(_0x3500d4===_0x4a5efb(0x482))return this[_0x4a5efb(0x1c7)](0x3);if(_0x3500d4===_0x4a5efb(0x1e0))return this[_0x4a5efb(0x1c7)](0x4);if(_0x3500d4===_0x4a5efb(0x3e1))return this[_0x4a5efb(0x1c7)](0x5);if(_0x3500d4==='AGI')return this['param'](0x6);if(_0x3500d4==='LUK')return this[_0x4a5efb(0x1c7)](0x7);if(_0x3500d4===_0x4a5efb(0x21a))return _0x2fea3f?String(Math['round'](this[_0x4a5efb(0x55b)](0x0)*0x64))+'%':this[_0x4a5efb(0x55b)](0x0);if(_0x3500d4===_0x4a5efb(0x16c))return _0x2fea3f?String(Math['round'](this['xparam'](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x3500d4===_0x4a5efb(0x4e8))return _0x2fea3f?String(Math[_0x4a5efb(0x343)](this['xparam'](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x3500d4===_0x4a5efb(0x12c))return _0x2fea3f?String(Math[_0x4a5efb(0x343)](this[_0x4a5efb(0x55b)](0x3)*0x64))+'%':this[_0x4a5efb(0x55b)](0x3);if(_0x3500d4===_0x4a5efb(0x47d))return _0x2fea3f?String(Math[_0x4a5efb(0x343)](this[_0x4a5efb(0x55b)](0x4)*0x64))+'%':this[_0x4a5efb(0x55b)](0x4);if(_0x3500d4===_0x4a5efb(0x5a8))return _0x2fea3f?String(Math['round'](this[_0x4a5efb(0x55b)](0x5)*0x64))+'%':this[_0x4a5efb(0x55b)](0x5);if(_0x3500d4===_0x4a5efb(0x608))return _0x2fea3f?String(Math[_0x4a5efb(0x343)](this[_0x4a5efb(0x55b)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x3500d4===_0x4a5efb(0x5e2))return _0x2fea3f?String(Math[_0x4a5efb(0x343)](this['xparam'](0x7)*0x64))+'%':this['xparam'](0x7);if(_0x3500d4===_0x4a5efb(0x550))return _0x2fea3f?String(Math['round'](this[_0x4a5efb(0x55b)](0x8)*0x64))+'%':this[_0x4a5efb(0x55b)](0x8);if(_0x3500d4===_0x4a5efb(0x2c6))return _0x2fea3f?String(Math['round'](this[_0x4a5efb(0x55b)](0x9)*0x64))+'%':this[_0x4a5efb(0x55b)](0x9);if(_0x3500d4===_0x4a5efb(0x549))return _0x2fea3f?String(Math[_0x4a5efb(0x343)](this['sparam'](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x3500d4==='GRD')return _0x2fea3f?String(Math[_0x4a5efb(0x343)](this[_0x4a5efb(0x571)](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x3500d4===_0x4a5efb(0x2d6))return _0x2fea3f?String(Math[_0x4a5efb(0x343)](this[_0x4a5efb(0x571)](0x2)*0x64))+'%':this[_0x4a5efb(0x571)](0x2);if(_0x3500d4===_0x4a5efb(0x2a0))return _0x2fea3f?String(Math[_0x4a5efb(0x343)](this[_0x4a5efb(0x571)](0x3)*0x64))+'%':this[_0x4a5efb(0x571)](0x3);if(_0x3500d4===_0x4a5efb(0x4d8))return _0x2fea3f?String(Math[_0x4a5efb(0x343)](this[_0x4a5efb(0x571)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x3500d4===_0x4a5efb(0x3ac))return _0x2fea3f?String(Math['round'](this[_0x4a5efb(0x571)](0x5)*0x64))+'%':this[_0x4a5efb(0x571)](0x5);if(_0x3500d4===_0x4a5efb(0x502))return _0x2fea3f?String(Math[_0x4a5efb(0x343)](this['sparam'](0x6)*0x64))+'%':this[_0x4a5efb(0x571)](0x6);if(_0x3500d4===_0x4a5efb(0x158))return _0x2fea3f?String(Math[_0x4a5efb(0x343)](this[_0x4a5efb(0x571)](0x7)*0x64))+'%':this[_0x4a5efb(0x571)](0x7);if(_0x3500d4===_0x4a5efb(0x654))return _0x2fea3f?String(Math[_0x4a5efb(0x343)](this[_0x4a5efb(0x571)](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x3500d4==='EXR')return _0x2fea3f?String(Math[_0x4a5efb(0x343)](this[_0x4a5efb(0x571)](0x9)*0x64))+'%':this[_0x4a5efb(0x571)](0x9);if(VisuMZ['CoreEngine'][_0x4a5efb(0x5c6)][_0x3500d4]){const _0x323a3d=VisuMZ[_0x4a5efb(0x35b)][_0x4a5efb(0x5c6)][_0x3500d4],_0x4a0e29=this[_0x323a3d];return VisuMZ[_0x4a5efb(0x35b)][_0x4a5efb(0x97)][_0x3500d4]===_0x4a5efb(0x562)?_0x4a0e29:_0x2fea3f?String(Math[_0x4a5efb(0x343)](_0x4a0e29*0x64))+'%':_0x4a0e29;}return'';},Game_BattlerBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x4b0)]=function(){const _0x47d25a=_0x38ed9b;return this[_0x47d25a(0x47e)]()&&this[_0x47d25a(0x675)]<this['mhp']*VisuMZ[_0x47d25a(0x35b)][_0x47d25a(0x222)]['Param'][_0x47d25a(0x179)];},Game_Battler[_0x38ed9b(0x1d7)][_0x38ed9b(0x59e)]=function(){const _0x1dfb98=_0x38ed9b;SoundManager[_0x1dfb98(0x14a)](),this['requestMotion'](_0x1dfb98(0x163));},VisuMZ[_0x38ed9b(0x35b)]['Game_Actor_paramBase']=Game_Actor[_0x38ed9b(0x1d7)][_0x38ed9b(0x3d9)],Game_Actor[_0x38ed9b(0x1d7)][_0x38ed9b(0x3d9)]=function(_0x9a620b){const _0x303e48=_0x38ed9b;if(this[_0x303e48(0x4e1)]>0x63)return this[_0x303e48(0x1ad)](_0x9a620b);return VisuMZ[_0x303e48(0x35b)][_0x303e48(0x1aa)][_0x303e48(0x434)](this,_0x9a620b);},Game_Actor['prototype'][_0x38ed9b(0x1ad)]=function(_0x5a3423){const _0x3c2b21=_0x38ed9b,_0x47f5e1=this[_0x3c2b21(0x3b3)]()['params'][_0x5a3423][0x63],_0x41ee82=this[_0x3c2b21(0x3b3)]()[_0x3c2b21(0x180)][_0x5a3423][0x62];return _0x47f5e1+(_0x47f5e1-_0x41ee82)*(this[_0x3c2b21(0x4e1)]-0x63);},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x570)]=Game_Actor[_0x38ed9b(0x1d7)][_0x38ed9b(0x5e4)],Game_Actor[_0x38ed9b(0x1d7)]['changeClass']=function(_0x32142e,_0x4d1e76){const _0x4438c0=_0x38ed9b;$gameTemp[_0x4438c0(0x386)]=!![],VisuMZ[_0x4438c0(0x35b)][_0x4438c0(0x570)]['call'](this,_0x32142e,_0x4d1e76),$gameTemp[_0x4438c0(0x386)]=undefined;},VisuMZ['CoreEngine'][_0x38ed9b(0x149)]=Game_Actor[_0x38ed9b(0x1d7)][_0x38ed9b(0x648)],Game_Actor['prototype'][_0x38ed9b(0x648)]=function(){const _0x3aa999=_0x38ed9b;VisuMZ[_0x3aa999(0x35b)][_0x3aa999(0x149)][_0x3aa999(0x434)](this);if(!$gameTemp[_0x3aa999(0x386)])this[_0x3aa999(0x114)]();},Game_Actor[_0x38ed9b(0x1d7)]['levelUpRecovery']=function(){const _0x5aa9d7=_0x38ed9b;this['_cache']={};if(VisuMZ[_0x5aa9d7(0x35b)]['Settings'][_0x5aa9d7(0xb0)][_0x5aa9d7(0x493)])this['_hp']=this['mhp'];if(VisuMZ[_0x5aa9d7(0x35b)][_0x5aa9d7(0x222)]['QoL'][_0x5aa9d7(0x96)])this[_0x5aa9d7(0x107)]=this['mmp'];},Game_Actor['prototype'][_0x38ed9b(0x458)]=function(){const _0x554938=_0x38ed9b;if(this['isMaxLevel']())return 0x1;const _0x370af2=this[_0x554938(0x373)]()-this['currentLevelExp'](),_0x49701d=this[_0x554938(0x2bd)]()-this[_0x554938(0x650)]();return(_0x49701d/_0x370af2)[_0x554938(0x39c)](0x0,0x1);},Game_Actor[_0x38ed9b(0x1d7)][_0x38ed9b(0xa9)]=function(){const _0x56ca8f=_0x38ed9b,_0x327de4=Game_Battler[_0x56ca8f(0x1d7)][_0x56ca8f(0xa9)][_0x56ca8f(0x434)](this);for(const _0x56900e of this[_0x56ca8f(0x596)]()){_0x56900e&&_0x327de4[_0x56ca8f(0x362)](_0x56900e);}return _0x327de4[_0x56ca8f(0x362)](this[_0x56ca8f(0x3b3)](),this['actor']()),_0x327de4;},Object['defineProperty'](Game_Enemy[_0x38ed9b(0x1d7)],_0x38ed9b(0x4e1),{'get':function(){const _0x52bb0f=_0x38ed9b;return this[_0x52bb0f(0x2c2)]();},'configurable':!![]}),Game_Enemy[_0x38ed9b(0x1d7)]['getLevel']=function(){const _0x45b92a=_0x38ed9b;return this[_0x45b92a(0x56d)]()[_0x45b92a(0x4e1)];},Game_Enemy['prototype']['moveRelativeToResolutionChange']=function(){const _0x4fde45=_0x38ed9b;!this[_0x4fde45(0x34c)]&&(this[_0x4fde45(0x1ec)]+=Math['round']((Graphics[_0x4fde45(0x2bb)]-0x270)/0x2),this[_0x4fde45(0x1ec)]-=Math[_0x4fde45(0x5fa)]((Graphics[_0x4fde45(0x2bb)]-Graphics['boxHeight'])/0x2),$gameSystem['isSideView']()?this['_screenX']-=Math[_0x4fde45(0x5fa)]((Graphics['width']-Graphics['boxWidth'])/0x2):this['_screenX']+=Math[_0x4fde45(0x343)]((Graphics['boxWidth']-0x330)/0x2)),this[_0x4fde45(0x34c)]=!![];},Game_Party['prototype'][_0x38ed9b(0x27f)]=function(){const _0x4d61c4=_0x38ed9b;return VisuMZ[_0x4d61c4(0x35b)]['Settings'][_0x4d61c4(0x1a5)][_0x4d61c4(0x12f)];},VisuMZ[_0x38ed9b(0x35b)]['Game_Party_consumeItem']=Game_Party['prototype'][_0x38ed9b(0x479)],Game_Party[_0x38ed9b(0x1d7)][_0x38ed9b(0x479)]=function(_0x274451){const _0x513de0=_0x38ed9b;if(VisuMZ['CoreEngine'][_0x513de0(0x222)][_0x513de0(0xb0)][_0x513de0(0x63a)]&&DataManager[_0x513de0(0xa1)](_0x274451))return;VisuMZ[_0x513de0(0x35b)]['Game_Party_consumeItem'][_0x513de0(0x434)](this,_0x274451);},Game_Party[_0x38ed9b(0x1d7)][_0x38ed9b(0x4e4)]=function(){const _0x29ec07=_0x38ed9b,_0x59fb6d=VisuMZ[_0x29ec07(0x35b)][_0x29ec07(0x222)][_0x29ec07(0xb0)],_0x54f63d=_0x59fb6d[_0x29ec07(0xe6)]??0x63;let _0xb0fdaa=[];(_0x59fb6d['BTestItems']??!![])&&(_0xb0fdaa=_0xb0fdaa[_0x29ec07(0x67a)]($dataItems));(_0x59fb6d[_0x29ec07(0x1a7)]??!![])&&(_0xb0fdaa=_0xb0fdaa[_0x29ec07(0x67a)]($dataWeapons));(_0x59fb6d[_0x29ec07(0x29b)]??!![])&&(_0xb0fdaa=_0xb0fdaa[_0x29ec07(0x67a)]($dataArmors));for(const _0x705e8f of _0xb0fdaa){if(!_0x705e8f)continue;if(_0x705e8f[_0x29ec07(0x11e)]['trim']()<=0x0)continue;if(_0x705e8f[_0x29ec07(0x11e)][_0x29ec07(0x34b)](/-----/i))continue;this['gainItem'](_0x705e8f,_0x54f63d);}},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x280)]=Game_Troop['prototype']['setup'],Game_Troop[_0x38ed9b(0x1d7)][_0x38ed9b(0x212)]=function(_0xfdf0fb){const _0x159172=_0x38ed9b;$gameTemp[_0x159172(0xf8)](),$gameTemp[_0x159172(0x3c4)](_0xfdf0fb),VisuMZ[_0x159172(0x35b)][_0x159172(0x280)]['call'](this,_0xfdf0fb);},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0xf2)]=Game_Map[_0x38ed9b(0x1d7)][_0x38ed9b(0x212)],Game_Map[_0x38ed9b(0x1d7)]['setup']=function(_0x4a2303){const _0x466120=_0x38ed9b;VisuMZ[_0x466120(0x35b)][_0x466120(0xf2)][_0x466120(0x434)](this,_0x4a2303),this['setupCoreEngine'](_0x4a2303);},Game_Map[_0x38ed9b(0x1d7)]['setupCoreEngine']=function(){const _0x3f997c=_0x38ed9b;this['_hideTileShadows']=VisuMZ[_0x3f997c(0x35b)][_0x3f997c(0x222)][_0x3f997c(0xb0)][_0x3f997c(0x4a5)]||![];if($dataMap&&$dataMap[_0x3f997c(0x353)]){if($dataMap['note'][_0x3f997c(0x34b)](/<SHOW TILE SHADOWS>/i))this[_0x3f997c(0x642)]=![];if($dataMap['note']['match'](/<HIDE TILE SHADOWS>/i))this[_0x3f997c(0x642)]=!![];}},Game_Map[_0x38ed9b(0x1d7)]['areTileShadowsHidden']=function(){const _0x17ad0f=_0x38ed9b;if(this[_0x17ad0f(0x642)]===undefined)this[_0x17ad0f(0x176)]();return this['_hideTileShadows'];},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x4d2)]=Game_Character[_0x38ed9b(0x1d7)]['processMoveCommand'],Game_Character[_0x38ed9b(0x1d7)][_0x38ed9b(0x299)]=function(_0xf9f1b8){const _0x503f44=_0x38ed9b;try{VisuMZ[_0x503f44(0x35b)][_0x503f44(0x4d2)][_0x503f44(0x434)](this,_0xf9f1b8);}catch(_0x170342){if($gameTemp[_0x503f44(0x28b)]())console[_0x503f44(0x236)](_0x170342);}},Game_Player[_0x38ed9b(0x1d7)][_0x38ed9b(0x3fa)]=function(){const _0x199685=_0x38ed9b,_0x1844f1=$gameMap[_0x199685(0x268)]();this[_0x199685(0xe9)]=Math[_0x199685(0x184)](_0x1844f1)+Math[_0x199685(0x184)](_0x1844f1)+this[_0x199685(0x4f0)]();},Game_Player[_0x38ed9b(0x1d7)]['encounterStepsMinimum']=function(){const _0x510a50=_0x38ed9b;return $dataMap&&$dataMap[_0x510a50(0x353)]&&$dataMap[_0x510a50(0x353)][_0x510a50(0x34b)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x510a50(0x35b)][_0x510a50(0x222)]['QoL']['EncounterRateMinimum'];},VisuMZ['CoreEngine'][_0x38ed9b(0x332)]=Game_Event[_0x38ed9b(0x1d7)][_0x38ed9b(0x483)],Game_Event[_0x38ed9b(0x1d7)][_0x38ed9b(0x483)]=function(_0x22ec5c,_0x2e4bb3){const _0x49de8f=_0x38ed9b;return this[_0x49de8f(0x4f1)]()?this['checkSmartEventCollision'](_0x22ec5c,_0x2e4bb3):VisuMZ[_0x49de8f(0x35b)]['Game_Event_isCollidedWithEvents'][_0x49de8f(0x434)](this,_0x22ec5c,_0x2e4bb3);},Game_Event['prototype']['isSmartEventCollisionOn']=function(){const _0x57182c=_0x38ed9b;return VisuMZ[_0x57182c(0x35b)][_0x57182c(0x222)][_0x57182c(0xb0)][_0x57182c(0x4f4)];},Game_Event[_0x38ed9b(0x1d7)]['checkSmartEventCollision']=function(_0x2e86cd,_0x43835f){const _0x48f691=_0x38ed9b;if(!this[_0x48f691(0x463)]())return![];else{const _0x5ebf13=$gameMap['eventsXyNt'](_0x2e86cd,_0x43835f)[_0x48f691(0x35c)](_0x29cb12=>_0x29cb12['isNormalPriority']());return _0x5ebf13[_0x48f691(0x276)]>0x0;}},VisuMZ[_0x38ed9b(0x35b)]['Game_Interpreter_command105']=Game_Interpreter[_0x38ed9b(0x1d7)][_0x38ed9b(0x678)],Game_Interpreter[_0x38ed9b(0x1d7)][_0x38ed9b(0x678)]=function(_0x4fe00e){const _0x27579b=_0x38ed9b,_0x11a681=this[_0x27579b(0x378)]();return _0x11a681['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x27579b(0x500)](_0x11a681):VisuMZ[_0x27579b(0x35b)][_0x27579b(0x645)][_0x27579b(0x434)](this,_0x4fe00e);},Game_Interpreter['prototype']['getCombinedScrollingText']=function(){const _0x55ae68=_0x38ed9b;let _0x29435e='',_0x4afdc0=this[_0x55ae68(0x2c9)]+0x1;while(this[_0x55ae68(0x32a)][_0x4afdc0]&&this['_list'][_0x4afdc0][_0x55ae68(0x316)]===0x195){_0x29435e+=this[_0x55ae68(0x32a)][_0x4afdc0][_0x55ae68(0x4ec)][0x0]+'\x0a',_0x4afdc0++;}return _0x29435e;},Game_Interpreter[_0x38ed9b(0x1d7)][_0x38ed9b(0x500)]=function(_0x349bdc){const _0x520e33=_0x38ed9b;try{eval(_0x349bdc);}catch(_0x1cd9bf){$gameTemp[_0x520e33(0x28b)]()&&(console[_0x520e33(0x236)](_0x520e33(0xb3)),console[_0x520e33(0x236)](_0x1cd9bf));}return!![];},VisuMZ[_0x38ed9b(0x35b)]['Game_Interpreter_command111']=Game_Interpreter['prototype']['command111'],Game_Interpreter['prototype']['command111']=function(_0x361351){const _0x5487ee=_0x38ed9b;try{VisuMZ['CoreEngine'][_0x5487ee(0x5f5)][_0x5487ee(0x434)](this,_0x361351);}catch(_0x41afd2){$gameTemp[_0x5487ee(0x28b)]()&&(console[_0x5487ee(0x236)](_0x5487ee(0x49d)),console[_0x5487ee(0x236)](_0x41afd2)),this['skipBranch']();}return!![];},VisuMZ[_0x38ed9b(0x35b)]['Game_Interpreter_command122']=Game_Interpreter['prototype'][_0x38ed9b(0x49b)],Game_Interpreter[_0x38ed9b(0x1d7)][_0x38ed9b(0x49b)]=function(_0x162b50){const _0x112f44=_0x38ed9b;try{VisuMZ[_0x112f44(0x35b)][_0x112f44(0x58f)][_0x112f44(0x434)](this,_0x162b50);}catch(_0x196d39){$gameTemp['isPlaytest']()&&(console[_0x112f44(0x236)](_0x112f44(0x380)),console[_0x112f44(0x236)](_0x196d39));}return!![];},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x663)]=Game_Interpreter[_0x38ed9b(0x1d7)][_0x38ed9b(0x607)],Game_Interpreter[_0x38ed9b(0x1d7)][_0x38ed9b(0x607)]=function(){const _0x4dd87f=_0x38ed9b;try{VisuMZ[_0x4dd87f(0x35b)][_0x4dd87f(0x663)][_0x4dd87f(0x434)](this);}catch(_0x33125b){$gameTemp[_0x4dd87f(0x28b)]()&&(console[_0x4dd87f(0x236)](_0x4dd87f(0x45a)),console[_0x4dd87f(0x236)](_0x33125b));}return!![];},VisuMZ['CoreEngine'][_0x38ed9b(0x376)]=Game_Interpreter[_0x38ed9b(0x1d7)][_0x38ed9b(0xe5)],Game_Interpreter[_0x38ed9b(0x1d7)]['command357']=function(_0x4431e4){const _0x3cb5ae=_0x38ed9b;return $gameTemp[_0x3cb5ae(0x237)](this),VisuMZ['CoreEngine'][_0x3cb5ae(0x376)]['call'](this,_0x4431e4);},Scene_Base['prototype'][_0x38ed9b(0x25b)]=function(){const _0x321d98=_0x38ed9b;return VisuMZ[_0x321d98(0x35b)][_0x321d98(0x222)]['UI'][_0x321d98(0x443)];},Scene_Base[_0x38ed9b(0x1d7)]['isBottomHelpMode']=function(){const _0x51a5ec=_0x38ed9b;return VisuMZ[_0x51a5ec(0x35b)]['Settings']['UI'][_0x51a5ec(0x59b)];},Scene_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x39b)]=function(){const _0x212593=_0x38ed9b;return VisuMZ[_0x212593(0x35b)][_0x212593(0x222)]['UI'][_0x212593(0x339)];},Scene_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x374)]=function(){const _0x35ecb4=_0x38ed9b;return VisuMZ[_0x35ecb4(0x35b)][_0x35ecb4(0x222)]['UI'][_0x35ecb4(0x45f)];},Scene_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x1e3)]=function(){const _0x1ea9c5=_0x38ed9b;return VisuMZ[_0x1ea9c5(0x35b)]['Settings']['UI']['CommandWidth'];},Scene_Base[_0x38ed9b(0x1d7)]['buttonAreaHeight']=function(){const _0x3d2a73=_0x38ed9b;return VisuMZ[_0x3d2a73(0x35b)]['Settings']['UI'][_0x3d2a73(0x43f)];},Scene_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x486)]=function(){const _0x59cc39=_0x38ed9b;return VisuMZ['CoreEngine'][_0x59cc39(0x222)]['Window']['EnableMasking'];},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x51e)]=Scene_Base['prototype'][_0x38ed9b(0x5e9)],Scene_Base[_0x38ed9b(0x1d7)]['createWindowLayer']=function(){const _0x118e2a=_0x38ed9b;VisuMZ['CoreEngine'][_0x118e2a(0x51e)][_0x118e2a(0x434)](this),this[_0x118e2a(0xfa)](),this[_0x118e2a(0x106)]['x']=Math[_0x118e2a(0x343)](this[_0x118e2a(0x106)]['x']),this[_0x118e2a(0x106)]['y']=Math[_0x118e2a(0x343)](this[_0x118e2a(0x106)]['y']);},Scene_Base[_0x38ed9b(0x1d7)]['createButtonAssistWindow']=function(){},Scene_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x627)]=function(){const _0x262103=_0x38ed9b;return TextManager[_0x262103(0x410)]('pageup',_0x262103(0x1a1));},Scene_Base['prototype'][_0x38ed9b(0x122)]=function(){const _0xd4ca48=_0x38ed9b;return TextManager['getInputButtonString'](_0xd4ca48(0xcd));},Scene_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x252)]=function(){const _0x8ea9ac=_0x38ed9b;return TextManager[_0x8ea9ac(0x506)]('shift');},Scene_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x3ea)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x38ed9b(0x1d7)]['buttonAssistKey5']=function(){return TextManager['getInputButtonString']('cancel');},Scene_Base['prototype'][_0x38ed9b(0x253)]=function(){const _0x1c4d72=_0x38ed9b;return this[_0x1c4d72(0x554)]&&this[_0x1c4d72(0x554)][_0x1c4d72(0x5e8)]?TextManager['buttonAssistSwitch']:'';},Scene_Base['prototype'][_0x38ed9b(0xc2)]=function(){return'';},Scene_Base['prototype'][_0x38ed9b(0x602)]=function(){return'';},Scene_Base[_0x38ed9b(0x1d7)]['buttonAssistText4']=function(){return TextManager['buttonAssistOk'];},Scene_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x42f)]=function(){const _0x52ba0a=_0x38ed9b;return TextManager[_0x52ba0a(0x55f)];},Scene_Base['prototype'][_0x38ed9b(0x298)]=function(){return 0x0;},Scene_Base['prototype'][_0x38ed9b(0x135)]=function(){return 0x0;},Scene_Base['prototype'][_0x38ed9b(0x56f)]=function(){return 0x0;},Scene_Base[_0x38ed9b(0x1d7)]['buttonAssistOffset4']=function(){return 0x0;},Scene_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x4f8)]=function(){return 0x0;},VisuMZ[_0x38ed9b(0x35b)]['Scene_Boot_loadSystemImages']=Scene_Boot[_0x38ed9b(0x1d7)][_0x38ed9b(0x219)],Scene_Boot[_0x38ed9b(0x1d7)][_0x38ed9b(0x219)]=function(){const _0x333d6f=_0x38ed9b;VisuMZ[_0x333d6f(0x35b)][_0x333d6f(0x220)]['call'](this),this[_0x333d6f(0x58d)]();},Scene_Boot[_0x38ed9b(0x1d7)]['loadGameImagesCoreEngine']=function(){const _0x22eec3=_0x38ed9b,_0x3648e6=[_0x22eec3(0x389),_0x22eec3(0x4db),_0x22eec3(0x32e),_0x22eec3(0x1e7),'enemies','faces','parallaxes',_0x22eec3(0x5a5),_0x22eec3(0x3a7),_0x22eec3(0x111),_0x22eec3(0x19d),_0x22eec3(0x2b5),_0x22eec3(0x35d),_0x22eec3(0x520)];for(const _0x37365d of _0x3648e6){const _0x2fc71d=VisuMZ[_0x22eec3(0x35b)]['Settings'][_0x22eec3(0x469)][_0x37365d],_0x5d846f=_0x22eec3(0x3a2)[_0x22eec3(0x46c)](_0x37365d);for(const _0x8c238 of _0x2fc71d){ImageManager[_0x22eec3(0x4b5)](_0x5d846f,_0x8c238);}}},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x1ce)]=Scene_Boot[_0x38ed9b(0x1d7)]['startNormalGame'],Scene_Boot[_0x38ed9b(0x1d7)][_0x38ed9b(0x2b8)]=function(){const _0x5a3e8e=_0x38ed9b;Utils['isOptionValid'](_0x5a3e8e(0x1a3))&&VisuMZ[_0x5a3e8e(0x35b)][_0x5a3e8e(0x222)][_0x5a3e8e(0xb0)][_0x5a3e8e(0x283)]?this[_0x5a3e8e(0x2fe)]():VisuMZ[_0x5a3e8e(0x35b)][_0x5a3e8e(0x1ce)]['call'](this);},Scene_Boot[_0x38ed9b(0x1d7)][_0x38ed9b(0x2fe)]=function(){const _0x2ea09f=_0x38ed9b;DataManager[_0x2ea09f(0x5ef)](),SceneManager[_0x2ea09f(0x57d)](Scene_Map);},Scene_Boot[_0x38ed9b(0x1d7)][_0x38ed9b(0x2b9)]=function(){const _0x2d05a4=_0x38ed9b,_0x2ed325=$dataSystem[_0x2d05a4(0x64a)][_0x2d05a4(0x1da)],_0x1baa75=$dataSystem['advanced'][_0x2d05a4(0x48b)],_0x171b3d=VisuMZ[_0x2d05a4(0x35b)][_0x2d05a4(0x222)]['UI'][_0x2d05a4(0x335)];Graphics[_0x2d05a4(0x1b4)]=_0x2ed325-_0x171b3d*0x2,Graphics[_0x2d05a4(0x3a4)]=_0x1baa75-_0x171b3d*0x2,this[_0x2d05a4(0x40b)]();},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x3fd)]=Scene_Boot[_0x38ed9b(0x1d7)][_0x38ed9b(0x4ee)],Scene_Boot[_0x38ed9b(0x1d7)][_0x38ed9b(0x4ee)]=function(){const _0x239729=_0x38ed9b;this['isFullDocumentTitle']()?this[_0x239729(0x40a)]():VisuMZ[_0x239729(0x35b)][_0x239729(0x3fd)][_0x239729(0x434)](this);},Scene_Boot[_0x38ed9b(0x1d7)]['isFullDocumentTitle']=function(){const _0x4b125a=_0x38ed9b;if(Scene_Title[_0x4b125a(0x3dd)]==='')return![];if(Scene_Title[_0x4b125a(0x3dd)]===_0x4b125a(0x423))return![];if(Scene_Title[_0x4b125a(0x1c1)]==='')return![];if(Scene_Title[_0x4b125a(0x1c1)]===_0x4b125a(0x523))return![];return!![];},Scene_Boot['prototype']['makeDocumentTitle']=function(){const _0x1de330=_0x38ed9b,_0x1d02ca=$dataSystem['gameTitle'],_0x531da6=Scene_Title['subtitle']||'',_0x33ee96=Scene_Title[_0x1de330(0x1c1)]||'',_0x2d23c6=VisuMZ['CoreEngine'][_0x1de330(0x222)][_0x1de330(0x4f9)][_0x1de330(0x4aa)]['DocumentTitleFmt'],_0x3e90ea=_0x2d23c6[_0x1de330(0x46c)](_0x1d02ca,_0x531da6,_0x33ee96);document[_0x1de330(0x1f2)]=_0x3e90ea;},Scene_Boot[_0x38ed9b(0x1d7)][_0x38ed9b(0x40b)]=function(){const _0x33a3f6=_0x38ed9b;if(VisuMZ[_0x33a3f6(0x35b)][_0x33a3f6(0x222)]['UI']['SideButtons']){const _0x42da3c=Graphics['width']-Graphics[_0x33a3f6(0x1b4)]-VisuMZ[_0x33a3f6(0x35b)][_0x33a3f6(0x222)]['UI'][_0x33a3f6(0x335)]*0x2,_0x581264=Sprite_Button[_0x33a3f6(0x1d7)][_0x33a3f6(0x2dd)]['call'](this)*0x4;if(_0x42da3c>=_0x581264)SceneManager[_0x33a3f6(0x58a)](!![]);}},Scene_Title[_0x38ed9b(0x3dd)]=VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x222)][_0x38ed9b(0x4f9)]['Title'][_0x38ed9b(0x423)],Scene_Title[_0x38ed9b(0x1c1)]=VisuMZ[_0x38ed9b(0x35b)]['Settings'][_0x38ed9b(0x4f9)][_0x38ed9b(0x4aa)][_0x38ed9b(0x5d4)],Scene_Title['pictureButtons']=VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x222)]['TitlePicButtons'],VisuMZ[_0x38ed9b(0x35b)]['Scene_Title_drawGameTitle']=Scene_Title[_0x38ed9b(0x1d7)]['drawGameTitle'],Scene_Title[_0x38ed9b(0x1d7)]['drawGameTitle']=function(){const _0x3df78f=_0x38ed9b;VisuMZ['CoreEngine'][_0x3df78f(0x222)][_0x3df78f(0x4f9)][_0x3df78f(0x4aa)][_0x3df78f(0x462)]['call'](this);if(Scene_Title[_0x3df78f(0x3dd)]!==''&&Scene_Title[_0x3df78f(0x3dd)]!==_0x3df78f(0x423))this['drawGameSubtitle']();if(Scene_Title[_0x3df78f(0x1c1)]!==''&&Scene_Title[_0x3df78f(0x1c1)]!==_0x3df78f(0x523))this[_0x3df78f(0x464)]();},Scene_Title['prototype']['drawGameSubtitle']=function(){const _0xb737bd=_0x38ed9b;VisuMZ[_0xb737bd(0x35b)]['Settings'][_0xb737bd(0x4f9)][_0xb737bd(0x4aa)][_0xb737bd(0xd6)][_0xb737bd(0x434)](this);},Scene_Title['prototype'][_0x38ed9b(0x464)]=function(){const _0x48d42a=_0x38ed9b;VisuMZ[_0x48d42a(0x35b)][_0x48d42a(0x222)][_0x48d42a(0x4f9)][_0x48d42a(0x4aa)][_0x48d42a(0x464)][_0x48d42a(0x434)](this);},Scene_Title[_0x38ed9b(0x1d7)][_0x38ed9b(0x186)]=function(){const _0x2b871d=_0x38ed9b;this[_0x2b871d(0x494)]();const _0x37ce0a=$dataSystem['titleCommandWindow'][_0x2b871d(0x37a)],_0x52145a=this[_0x2b871d(0x491)]();this['_commandWindow']=new Window_TitleCommand(_0x52145a),this['_commandWindow'][_0x2b871d(0x398)](_0x37ce0a);const _0x498648=this[_0x2b871d(0x491)]();this[_0x2b871d(0x613)][_0x2b871d(0x112)](_0x498648['x'],_0x498648['y'],_0x498648['width'],_0x498648[_0x2b871d(0x2bb)]),this[_0x2b871d(0x65c)](this[_0x2b871d(0x613)]);},Scene_Title['prototype'][_0x38ed9b(0x278)]=function(){const _0x19660f=_0x38ed9b;return this[_0x19660f(0x613)]?this['_commandWindow'][_0x19660f(0x626)]():VisuMZ[_0x19660f(0x35b)][_0x19660f(0x222)][_0x19660f(0x1b6)][_0x19660f(0x276)];},Scene_Title[_0x38ed9b(0x1d7)][_0x38ed9b(0x491)]=function(){const _0x2b4948=_0x38ed9b;return VisuMZ['CoreEngine'][_0x2b4948(0x222)]['MenuLayout'][_0x2b4948(0x4aa)][_0x2b4948(0x1bb)][_0x2b4948(0x434)](this);},Scene_Title[_0x38ed9b(0x1d7)]['createTitleButtons']=function(){const _0x219147=_0x38ed9b;for(const _0x401eeb of Scene_Title[_0x219147(0x42a)]){const _0x36996c=new Sprite_TitlePictureButton(_0x401eeb);this['addChild'](_0x36996c);}},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x257)]=Scene_Map['prototype'][_0x38ed9b(0xb2)],Scene_Map['prototype']['initialize']=function(){const _0x508c37=_0x38ed9b;VisuMZ[_0x508c37(0x35b)]['Scene_Map_initialize']['call'](this),$gameTemp[_0x508c37(0xf8)]();},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x12b)]=Scene_Map[_0x38ed9b(0x1d7)][_0x38ed9b(0x37d)],Scene_Map[_0x38ed9b(0x1d7)][_0x38ed9b(0x37d)]=function(){const _0x4a6846=_0x38ed9b;VisuMZ[_0x4a6846(0x35b)]['Scene_Map_updateMainMultiply'][_0x4a6846(0x434)](this),$gameTemp['_playTestFastMode']&&!$gameMessage['isBusy']()&&(this['updateMain'](),SceneManager[_0x4a6846(0x23e)]());},Scene_Map['prototype'][_0x38ed9b(0x1d5)]=function(){const _0x435895=_0x38ed9b;Scene_Message['prototype'][_0x435895(0x1d5)][_0x435895(0x434)](this),!SceneManager[_0x435895(0x5e0)](Scene_Battle)&&(this[_0x435895(0x2dc)][_0x435895(0x5ba)](),this[_0x435895(0x531)]['hide'](),this[_0x435895(0x106)][_0x435895(0x5e8)]=![],SceneManager['snapForBackground']()),$gameScreen['clearZoom']();},VisuMZ[_0x38ed9b(0x35b)]['Scene_Map_createMenuButton']=Scene_Map[_0x38ed9b(0x1d7)][_0x38ed9b(0x144)],Scene_Map['prototype'][_0x38ed9b(0x144)]=function(){const _0x3cfc9a=_0x38ed9b;VisuMZ[_0x3cfc9a(0x35b)][_0x3cfc9a(0x354)][_0x3cfc9a(0x434)](this),SceneManager[_0x3cfc9a(0xf4)]()&&this['moveMenuButtonSideButtonLayout']();},Scene_Map[_0x38ed9b(0x1d7)][_0x38ed9b(0x547)]=function(){const _0x383c18=_0x38ed9b;this[_0x383c18(0x2e0)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x2c1)]=Scene_Map[_0x38ed9b(0x1d7)][_0x38ed9b(0x2fb)],Scene_Map[_0x38ed9b(0x1d7)][_0x38ed9b(0x2fb)]=function(){const _0x3644e2=_0x38ed9b;VisuMZ[_0x3644e2(0x35b)][_0x3644e2(0x2c1)][_0x3644e2(0x434)](this),this[_0x3644e2(0xdd)]();},Scene_Map['prototype']['updateDashToggle']=function(){const _0x245faa=_0x38ed9b;Input[_0x245faa(0x5a3)]('dashToggle')&&(ConfigManager[_0x245faa(0x346)]=!ConfigManager[_0x245faa(0x346)],ConfigManager['save']());},VisuMZ[_0x38ed9b(0x35b)]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x3f4)],Scene_MenuBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x3f4)]=function(){const _0x17df67=_0x38ed9b;let _0x328b4f=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x328b4f=this[_0x17df67(0xd2)]():_0x328b4f=VisuMZ[_0x17df67(0x35b)][_0x17df67(0x284)][_0x17df67(0x434)](this),this[_0x17df67(0x33e)]()&&this[_0x17df67(0x3e2)]()===_0x17df67(0x478)&&(_0x328b4f+=Window_ButtonAssist[_0x17df67(0x1d7)][_0x17df67(0x1ff)]()),_0x328b4f;},Scene_MenuBase[_0x38ed9b(0x1d7)][_0x38ed9b(0xd2)]=function(){const _0x1acd07=_0x38ed9b;return this[_0x1acd07(0x4a6)]()?this[_0x1acd07(0x3bf)]():0x0;},VisuMZ[_0x38ed9b(0x35b)]['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x194)],Scene_MenuBase[_0x38ed9b(0x1d7)]['mainAreaTop']=function(){const _0x4c0bdc=_0x38ed9b;return SceneManager['areButtonsOutsideMainUI']()?this[_0x4c0bdc(0x3b0)]():VisuMZ[_0x4c0bdc(0x35b)][_0x4c0bdc(0x235)][_0x4c0bdc(0x434)](this);},Scene_MenuBase['prototype'][_0x38ed9b(0x3b0)]=function(){return!this['isBottomHelpMode']()?this['helpAreaBottom']():0x0;},VisuMZ['CoreEngine'][_0x38ed9b(0x182)]=Scene_MenuBase[_0x38ed9b(0x1d7)]['mainAreaHeight'],Scene_MenuBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x14f)]=function(){const _0x1b03b4=_0x38ed9b;let _0x2f59ba=0x0;return SceneManager[_0x1b03b4(0x204)]()?_0x2f59ba=this[_0x1b03b4(0xd7)]():_0x2f59ba=VisuMZ[_0x1b03b4(0x35b)][_0x1b03b4(0x182)][_0x1b03b4(0x434)](this),this[_0x1b03b4(0x33e)]()&&this[_0x1b03b4(0x3e2)]()!==_0x1b03b4(0x532)&&(_0x2f59ba-=Window_ButtonAssist[_0x1b03b4(0x1d7)][_0x1b03b4(0x1ff)]()),_0x2f59ba;},Scene_MenuBase[_0x38ed9b(0x1d7)]['mainAreaHeightSideButtonLayout']=function(){const _0x5935f6=_0x38ed9b;return Graphics[_0x5935f6(0x3a4)]-this[_0x5935f6(0x130)]();},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x597)]=Scene_MenuBase['prototype'][_0x38ed9b(0x368)],Scene_MenuBase[_0x38ed9b(0x1d7)]['createBackground']=function(){const _0x2ffa12=_0x38ed9b;this[_0x2ffa12(0x3aa)]=new PIXI[(_0x2ffa12(0x250))]['BlurFilter'](clamp=!![]),this[_0x2ffa12(0x63e)]=new Sprite(),this[_0x2ffa12(0x63e)][_0x2ffa12(0x210)]=SceneManager[_0x2ffa12(0x64c)](),this[_0x2ffa12(0x63e)]['filters']=[this[_0x2ffa12(0x3aa)]],this[_0x2ffa12(0x139)](this[_0x2ffa12(0x63e)]),this[_0x2ffa12(0x465)](0xc0),this['setBackgroundOpacity'](this[_0x2ffa12(0x635)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x635)]=function(){const _0x2776da=_0x38ed9b,_0x1eba4b=String(this['constructor'][_0x2776da(0x11e)]),_0x1bad38=this[_0x2776da(0x43c)](_0x1eba4b);return _0x1bad38?_0x1bad38[_0x2776da(0x60c)]:0xc0;},Scene_MenuBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x1d3)]=function(){const _0x4d2b91=_0x38ed9b,_0x24832e=String(this[_0x4d2b91(0x594)]['name']),_0x56d043=this[_0x4d2b91(0x43c)](_0x24832e);_0x56d043&&(_0x56d043[_0x4d2b91(0x525)]!==''||_0x56d043[_0x4d2b91(0x44e)]!=='')&&(this[_0x4d2b91(0x5c3)]=new Sprite(ImageManager[_0x4d2b91(0x1d1)](_0x56d043[_0x4d2b91(0x525)])),this[_0x4d2b91(0x249)]=new Sprite(ImageManager['loadTitle2'](_0x56d043['BgFilename2'])),this[_0x4d2b91(0x139)](this[_0x4d2b91(0x5c3)]),this[_0x4d2b91(0x139)](this['_backSprite2']),this[_0x4d2b91(0x5c3)][_0x4d2b91(0x210)][_0x4d2b91(0x27c)](this[_0x4d2b91(0xed)][_0x4d2b91(0x5f3)](this,this['_backSprite1'])),this[_0x4d2b91(0x249)][_0x4d2b91(0x210)]['addLoadListener'](this['adjustSprite'][_0x4d2b91(0x5f3)](this,this[_0x4d2b91(0x249)])));},Scene_MenuBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x43c)]=function(_0x449184){const _0x190a10=_0x38ed9b;return VisuMZ['CoreEngine']['Settings']['MenuBg'][_0x449184]||VisuMZ[_0x190a10(0x35b)]['Settings'][_0x190a10(0x3f6)][_0x190a10(0x584)];},Scene_MenuBase[_0x38ed9b(0x1d7)][_0x38ed9b(0xed)]=function(_0x4c1cc4){const _0x25eb7b=_0x38ed9b;this[_0x25eb7b(0x2d7)](_0x4c1cc4),this[_0x25eb7b(0x529)](_0x4c1cc4);},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x4c3)]=Scene_MenuBase[_0x38ed9b(0x1d7)]['createCancelButton'],Scene_MenuBase['prototype']['createCancelButton']=function(){const _0x1b5b68=_0x38ed9b;VisuMZ['CoreEngine'][_0x1b5b68(0x4c3)][_0x1b5b68(0x434)](this),SceneManager[_0x1b5b68(0xf4)]()&&this[_0x1b5b68(0x370)]();},Scene_MenuBase[_0x38ed9b(0x1d7)]['moveCancelButtonSideButtonLayout']=function(){const _0x360982=_0x38ed9b;this[_0x360982(0x649)]['x']=Graphics[_0x360982(0x1b4)]+0x4;},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x1af)]=Scene_MenuBase[_0x38ed9b(0x1d7)]['createPageButtons'],Scene_MenuBase[_0x38ed9b(0x1d7)]['createPageButtons']=function(){const _0x5ee47d=_0x38ed9b;VisuMZ['CoreEngine'][_0x5ee47d(0x1af)]['call'](this),SceneManager[_0x5ee47d(0xf4)]()&&this[_0x5ee47d(0x53f)]();},Scene_MenuBase['prototype'][_0x38ed9b(0x53f)]=function(){const _0x4f8deb=_0x38ed9b;this['_pageupButton']['x']=-0x1*(this[_0x4f8deb(0x554)][_0x4f8deb(0x3dc)]+this[_0x4f8deb(0x582)]['width']+0x8),this['_pagedownButton']['x']=-0x1*(this[_0x4f8deb(0x582)]['width']+0x4);},Scene_MenuBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x33e)]=function(){const _0x2239fb=_0x38ed9b;return VisuMZ[_0x2239fb(0x35b)][_0x2239fb(0x222)][_0x2239fb(0x516)]['Enable'];},Scene_MenuBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x3e2)]=function(){const _0x51b65c=_0x38ed9b;return SceneManager[_0x51b65c(0xf4)]()||SceneManager[_0x51b65c(0x580)]()?VisuMZ['CoreEngine'][_0x51b65c(0x222)]['ButtonAssist'][_0x51b65c(0x3b7)]:_0x51b65c(0x532);},Scene_MenuBase['prototype']['createButtonAssistWindow']=function(){const _0x4e361e=_0x38ed9b;if(!this[_0x4e361e(0x33e)]())return;const _0x4fed15=this[_0x4e361e(0xf3)]();this[_0x4e361e(0x98)]=new Window_ButtonAssist(_0x4fed15),this['addWindow'](this[_0x4e361e(0x98)]);},Scene_MenuBase[_0x38ed9b(0x1d7)]['buttonAssistWindowRect']=function(){const _0x3b2e4d=_0x38ed9b;return this[_0x3b2e4d(0x3e2)]()==='button'?this[_0x3b2e4d(0x667)]():this['buttonAssistWindowSideRect']();},Scene_MenuBase['prototype']['buttonAssistWindowButtonRect']=function(){const _0x2a88a3=_0x38ed9b,_0xa225a9=ConfigManager['touchUI']?(Sprite_Button[_0x2a88a3(0x1d7)][_0x2a88a3(0x2dd)]()+0x6)*0x2:0x0,_0x29a555=this[_0x2a88a3(0x320)](),_0x36ba28=Graphics[_0x2a88a3(0x1b4)]-_0xa225a9*0x2,_0x5242f7=this['buttonAreaHeight']();return new Rectangle(_0xa225a9,_0x29a555,_0x36ba28,_0x5242f7);},Scene_MenuBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x2df)]=function(){const _0x10d947=_0x38ed9b,_0x29788a=Graphics[_0x10d947(0x1b4)],_0xc3eb29=Window_ButtonAssist[_0x10d947(0x1d7)][_0x10d947(0x1ff)](),_0x455fab=0x0;let _0xc40ccc=0x0;return this[_0x10d947(0x3e2)]()===_0x10d947(0x478)?_0xc40ccc=0x0:_0xc40ccc=Graphics['boxHeight']-_0xc3eb29,new Rectangle(_0x455fab,_0xc40ccc,_0x29788a,_0xc3eb29);},Scene_Menu[_0x38ed9b(0x1a9)]=VisuMZ['CoreEngine'][_0x38ed9b(0x222)][_0x38ed9b(0x4f9)][_0x38ed9b(0x238)],VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x5dc)]=Scene_Menu[_0x38ed9b(0x1d7)]['create'],Scene_Menu[_0x38ed9b(0x1d7)]['create']=function(){const _0x32d9fe=_0x38ed9b;VisuMZ[_0x32d9fe(0x35b)][_0x32d9fe(0x5dc)][_0x32d9fe(0x434)](this),this[_0x32d9fe(0x1b1)]();},Scene_Menu[_0x38ed9b(0x1d7)]['setCoreEngineUpdateWindowBg']=function(){const _0x519aa9=_0x38ed9b;this['_commandWindow']&&this[_0x519aa9(0x613)][_0x519aa9(0x398)](Scene_Menu[_0x519aa9(0x1a9)]['CommandBgType']),this[_0x519aa9(0x5fe)]&&this[_0x519aa9(0x5fe)][_0x519aa9(0x398)](Scene_Menu['layoutSettings'][_0x519aa9(0x498)]),this[_0x519aa9(0x17b)]&&this['_statusWindow']['setBackgroundType'](Scene_Menu[_0x519aa9(0x1a9)][_0x519aa9(0x12a)]);},Scene_Menu[_0x38ed9b(0x1d7)][_0x38ed9b(0x491)]=function(){const _0x5f2759=_0x38ed9b;return Scene_Menu[_0x5f2759(0x1a9)][_0x5f2759(0x1bb)][_0x5f2759(0x434)](this);},Scene_Menu[_0x38ed9b(0x1d7)]['goldWindowRect']=function(){const _0x251df2=_0x38ed9b;return Scene_Menu[_0x251df2(0x1a9)]['GoldRect'][_0x251df2(0x434)](this);},Scene_Menu[_0x38ed9b(0x1d7)][_0x38ed9b(0x5c1)]=function(){const _0x18e667=_0x38ed9b;return Scene_Menu[_0x18e667(0x1a9)][_0x18e667(0x200)][_0x18e667(0x434)](this);},Scene_Item['layoutSettings']=VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x222)]['MenuLayout'][_0x38ed9b(0x3d5)],VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x166)]=Scene_Item[_0x38ed9b(0x1d7)][_0x38ed9b(0x3f1)],Scene_Item['prototype'][_0x38ed9b(0x3f1)]=function(){const _0x34b7fc=_0x38ed9b;VisuMZ['CoreEngine'][_0x34b7fc(0x166)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item[_0x38ed9b(0x1d7)]['setCoreEngineUpdateWindowBg']=function(){const _0xfdaddb=_0x38ed9b;this[_0xfdaddb(0x560)]&&this['_helpWindow'][_0xfdaddb(0x398)](Scene_Item['layoutSettings'][_0xfdaddb(0x256)]),this[_0xfdaddb(0x4dc)]&&this[_0xfdaddb(0x4dc)][_0xfdaddb(0x398)](Scene_Item[_0xfdaddb(0x1a9)][_0xfdaddb(0x32f)]),this['_itemWindow']&&this[_0xfdaddb(0x618)]['setBackgroundType'](Scene_Item[_0xfdaddb(0x1a9)][_0xfdaddb(0x1dc)]),this['_actorWindow']&&this['_actorWindow'][_0xfdaddb(0x398)](Scene_Item[_0xfdaddb(0x1a9)][_0xfdaddb(0x137)]);},Scene_Item[_0x38ed9b(0x1d7)][_0x38ed9b(0x181)]=function(){const _0x2d8427=_0x38ed9b;return Scene_Item[_0x2d8427(0x1a9)]['HelpRect'][_0x2d8427(0x434)](this);},Scene_Item[_0x38ed9b(0x1d7)][_0x38ed9b(0x4b3)]=function(){const _0x32ab7e=_0x38ed9b;return Scene_Item[_0x32ab7e(0x1a9)][_0x32ab7e(0x66e)]['call'](this);},Scene_Item['prototype'][_0x38ed9b(0x5de)]=function(){const _0x4ace9a=_0x38ed9b;return Scene_Item[_0x4ace9a(0x1a9)][_0x4ace9a(0x48d)]['call'](this);},Scene_Item[_0x38ed9b(0x1d7)]['actorWindowRect']=function(){const _0x1f742d=_0x38ed9b;return Scene_Item[_0x1f742d(0x1a9)][_0x1f742d(0x1d9)]['call'](this);},Scene_Skill[_0x38ed9b(0x1a9)]=VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x222)][_0x38ed9b(0x4f9)][_0x38ed9b(0x651)],VisuMZ['CoreEngine'][_0x38ed9b(0x61d)]=Scene_Skill[_0x38ed9b(0x1d7)][_0x38ed9b(0x3f1)],Scene_Skill['prototype'][_0x38ed9b(0x3f1)]=function(){const _0x3bbe24=_0x38ed9b;VisuMZ[_0x3bbe24(0x35b)][_0x3bbe24(0x61d)][_0x3bbe24(0x434)](this),this[_0x3bbe24(0x1b1)]();},Scene_Skill['prototype'][_0x38ed9b(0x1b1)]=function(){const _0x3eec1e=_0x38ed9b;this[_0x3eec1e(0x560)]&&this[_0x3eec1e(0x560)][_0x3eec1e(0x398)](Scene_Skill['layoutSettings'][_0x3eec1e(0x256)]),this[_0x3eec1e(0xad)]&&this[_0x3eec1e(0xad)]['setBackgroundType'](Scene_Skill[_0x3eec1e(0x1a9)][_0x3eec1e(0x356)]),this['_statusWindow']&&this[_0x3eec1e(0x17b)]['setBackgroundType'](Scene_Skill[_0x3eec1e(0x1a9)]['StatusBgType']),this[_0x3eec1e(0x618)]&&this['_itemWindow'][_0x3eec1e(0x398)](Scene_Skill[_0x3eec1e(0x1a9)][_0x3eec1e(0x1dc)]),this[_0x3eec1e(0xf5)]&&this['_actorWindow'][_0x3eec1e(0x398)](Scene_Skill[_0x3eec1e(0x1a9)][_0x3eec1e(0x137)]);},Scene_Skill[_0x38ed9b(0x1d7)][_0x38ed9b(0x181)]=function(){const _0x135621=_0x38ed9b;return Scene_Skill[_0x135621(0x1a9)]['HelpRect'][_0x135621(0x434)](this);},Scene_Skill[_0x38ed9b(0x1d7)]['skillTypeWindowRect']=function(){const _0x5ee0be=_0x38ed9b;return Scene_Skill[_0x5ee0be(0x1a9)]['SkillTypeRect'][_0x5ee0be(0x434)](this);},Scene_Skill['prototype']['statusWindowRect']=function(){const _0x259434=_0x38ed9b;return Scene_Skill[_0x259434(0x1a9)][_0x259434(0x200)][_0x259434(0x434)](this);},Scene_Skill[_0x38ed9b(0x1d7)][_0x38ed9b(0x5de)]=function(){const _0x2b6cf3=_0x38ed9b;return Scene_Skill[_0x2b6cf3(0x1a9)][_0x2b6cf3(0x48d)][_0x2b6cf3(0x434)](this);},Scene_Skill[_0x38ed9b(0x1d7)][_0x38ed9b(0x2e6)]=function(){const _0xe8c358=_0x38ed9b;return Scene_Skill[_0xe8c358(0x1a9)]['ActorRect'][_0xe8c358(0x434)](this);},Scene_Equip['layoutSettings']=VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x222)][_0x38ed9b(0x4f9)][_0x38ed9b(0x496)],VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x1d6)]=Scene_Equip[_0x38ed9b(0x1d7)][_0x38ed9b(0x3f1)],Scene_Equip[_0x38ed9b(0x1d7)][_0x38ed9b(0x3f1)]=function(){const _0x47348e=_0x38ed9b;VisuMZ[_0x47348e(0x35b)]['Scene_Equip_create'][_0x47348e(0x434)](this),this[_0x47348e(0x1b1)]();},Scene_Equip['prototype'][_0x38ed9b(0x1b1)]=function(){const _0x113c48=_0x38ed9b;this[_0x113c48(0x560)]&&this[_0x113c48(0x560)][_0x113c48(0x398)](Scene_Equip[_0x113c48(0x1a9)][_0x113c48(0x256)]),this[_0x113c48(0x17b)]&&this['_statusWindow'][_0x113c48(0x398)](Scene_Equip[_0x113c48(0x1a9)][_0x113c48(0x12a)]),this['_commandWindow']&&this[_0x113c48(0x613)]['setBackgroundType'](Scene_Equip['layoutSettings'][_0x113c48(0x25d)]),this[_0x113c48(0x337)]&&this[_0x113c48(0x337)][_0x113c48(0x398)](Scene_Equip[_0x113c48(0x1a9)][_0x113c48(0x2e9)]),this[_0x113c48(0x618)]&&this[_0x113c48(0x618)][_0x113c48(0x398)](Scene_Equip[_0x113c48(0x1a9)][_0x113c48(0x1dc)]);},Scene_Equip['prototype'][_0x38ed9b(0x181)]=function(){const _0x194283=_0x38ed9b;return Scene_Equip[_0x194283(0x1a9)][_0x194283(0x151)][_0x194283(0x434)](this);},Scene_Equip[_0x38ed9b(0x1d7)][_0x38ed9b(0x5c1)]=function(){const _0x361dd2=_0x38ed9b;return Scene_Equip['layoutSettings'][_0x361dd2(0x200)][_0x361dd2(0x434)](this);},Scene_Equip[_0x38ed9b(0x1d7)][_0x38ed9b(0x491)]=function(){const _0x18c66a=_0x38ed9b;return Scene_Equip['layoutSettings'][_0x18c66a(0x1bb)]['call'](this);},Scene_Equip['prototype']['slotWindowRect']=function(){const _0x4ed8b7=_0x38ed9b;return Scene_Equip[_0x4ed8b7(0x1a9)][_0x4ed8b7(0x307)]['call'](this);},Scene_Equip['prototype'][_0x38ed9b(0x5de)]=function(){const _0x220654=_0x38ed9b;return Scene_Equip[_0x220654(0x1a9)][_0x220654(0x48d)][_0x220654(0x434)](this);},Scene_Status[_0x38ed9b(0x1a9)]=VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x222)][_0x38ed9b(0x4f9)][_0x38ed9b(0x177)],VisuMZ[_0x38ed9b(0x35b)]['Scene_Status_create']=Scene_Status[_0x38ed9b(0x1d7)]['create'],Scene_Status[_0x38ed9b(0x1d7)][_0x38ed9b(0x3f1)]=function(){const _0x43e709=_0x38ed9b;VisuMZ[_0x43e709(0x35b)][_0x43e709(0x4fa)]['call'](this),this[_0x43e709(0x1b1)]();},Scene_Status[_0x38ed9b(0x1d7)]['setCoreEngineUpdateWindowBg']=function(){const _0x5ca2e6=_0x38ed9b;this['_profileWindow']&&this[_0x5ca2e6(0x1b8)][_0x5ca2e6(0x398)](Scene_Status['layoutSettings'][_0x5ca2e6(0x53e)]),this[_0x5ca2e6(0x17b)]&&this[_0x5ca2e6(0x17b)]['setBackgroundType'](Scene_Status[_0x5ca2e6(0x1a9)][_0x5ca2e6(0x12a)]),this['_statusParamsWindow']&&this[_0x5ca2e6(0x4bc)]['setBackgroundType'](Scene_Status[_0x5ca2e6(0x1a9)][_0x5ca2e6(0x5f2)]),this[_0x5ca2e6(0xbf)]&&this[_0x5ca2e6(0xbf)][_0x5ca2e6(0x398)](Scene_Status[_0x5ca2e6(0x1a9)][_0x5ca2e6(0x590)]);},Scene_Status[_0x38ed9b(0x1d7)][_0x38ed9b(0x2cf)]=function(){const _0x4d0cc1=_0x38ed9b;return Scene_Status['layoutSettings'][_0x4d0cc1(0xfc)][_0x4d0cc1(0x434)](this);},Scene_Status[_0x38ed9b(0x1d7)][_0x38ed9b(0x5c1)]=function(){const _0x4f52c3=_0x38ed9b;return Scene_Status[_0x4f52c3(0x1a9)][_0x4f52c3(0x200)]['call'](this);},Scene_Status['prototype'][_0x38ed9b(0x1bf)]=function(){const _0xdeceed=_0x38ed9b;return Scene_Status[_0xdeceed(0x1a9)]['StatusParamsRect'][_0xdeceed(0x434)](this);},Scene_Status['prototype'][_0x38ed9b(0x42d)]=function(){const _0x5cd9d5=_0x38ed9b;return Scene_Status[_0x5cd9d5(0x1a9)][_0x5cd9d5(0x358)][_0x5cd9d5(0x434)](this);},Scene_Options[_0x38ed9b(0x1a9)]=VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x222)][_0x38ed9b(0x4f9)][_0x38ed9b(0x1c6)],VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x21b)]=Scene_Options[_0x38ed9b(0x1d7)][_0x38ed9b(0x3f1)],Scene_Options[_0x38ed9b(0x1d7)][_0x38ed9b(0x3f1)]=function(){const _0x5155fd=_0x38ed9b;VisuMZ[_0x5155fd(0x35b)]['Scene_Options_create'][_0x5155fd(0x434)](this),this[_0x5155fd(0x1b1)]();},Scene_Options[_0x38ed9b(0x1d7)][_0x38ed9b(0x1b1)]=function(){const _0x4c02b7=_0x38ed9b;this[_0x4c02b7(0x255)]&&this[_0x4c02b7(0x255)][_0x4c02b7(0x398)](Scene_Options[_0x4c02b7(0x1a9)][_0x4c02b7(0x228)]);},Scene_Options[_0x38ed9b(0x1d7)]['optionsWindowRect']=function(){const _0x359223=_0x38ed9b;return Scene_Options[_0x359223(0x1a9)]['OptionsRect']['call'](this);},Scene_Save['layoutSettings']=VisuMZ[_0x38ed9b(0x35b)]['Settings'][_0x38ed9b(0x4f9)][_0x38ed9b(0x631)],Scene_Save[_0x38ed9b(0x1d7)][_0x38ed9b(0x3f1)]=function(){const _0x32d5a2=_0x38ed9b;Scene_File['prototype']['create'][_0x32d5a2(0x434)](this),this[_0x32d5a2(0x1b1)]();},Scene_Save['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x2ca0cb=_0x38ed9b;this[_0x2ca0cb(0x560)]&&this[_0x2ca0cb(0x560)][_0x2ca0cb(0x398)](Scene_Save[_0x2ca0cb(0x1a9)][_0x2ca0cb(0x256)]),this['_listWindow']&&this[_0x2ca0cb(0x227)][_0x2ca0cb(0x398)](Scene_Save[_0x2ca0cb(0x1a9)][_0x2ca0cb(0xef)]);},Scene_Save[_0x38ed9b(0x1d7)][_0x38ed9b(0x181)]=function(){const _0x25d2bb=_0x38ed9b;return Scene_Save['layoutSettings'][_0x25d2bb(0x151)]['call'](this);},Scene_Save[_0x38ed9b(0x1d7)][_0x38ed9b(0x413)]=function(){const _0x2d3e85=_0x38ed9b;return Scene_Save[_0x2d3e85(0x1a9)]['ListRect']['call'](this);},Scene_Load[_0x38ed9b(0x1a9)]=VisuMZ[_0x38ed9b(0x35b)]['Settings']['MenuLayout']['LoadMenu'],Scene_Load[_0x38ed9b(0x1d7)]['create']=function(){const _0x29bc9e=_0x38ed9b;Scene_File[_0x29bc9e(0x1d7)][_0x29bc9e(0x3f1)]['call'](this),this[_0x29bc9e(0x1b1)]();},Scene_Load['prototype'][_0x38ed9b(0x1b1)]=function(){const _0x3cd0bb=_0x38ed9b;this['_helpWindow']&&this[_0x3cd0bb(0x560)][_0x3cd0bb(0x398)](Scene_Load[_0x3cd0bb(0x1a9)][_0x3cd0bb(0x256)]),this[_0x3cd0bb(0x227)]&&this[_0x3cd0bb(0x227)][_0x3cd0bb(0x398)](Scene_Load['layoutSettings'][_0x3cd0bb(0xef)]);},Scene_Load[_0x38ed9b(0x1d7)][_0x38ed9b(0x181)]=function(){const _0x3bfcd7=_0x38ed9b;return Scene_Load[_0x3bfcd7(0x1a9)][_0x3bfcd7(0x151)][_0x3bfcd7(0x434)](this);},Scene_Load[_0x38ed9b(0x1d7)]['listWindowRect']=function(){const _0x5f4ae9=_0x38ed9b;return Scene_Load['layoutSettings'][_0x5f4ae9(0x542)][_0x5f4ae9(0x434)](this);},Scene_GameEnd[_0x38ed9b(0x1a9)]=VisuMZ['CoreEngine'][_0x38ed9b(0x222)][_0x38ed9b(0x4f9)][_0x38ed9b(0x3f3)],VisuMZ['CoreEngine'][_0x38ed9b(0x12d)]=Scene_GameEnd['prototype']['createBackground'],Scene_GameEnd[_0x38ed9b(0x1d7)]['createBackground']=function(){const _0x11dcc8=_0x38ed9b;Scene_MenuBase['prototype'][_0x11dcc8(0x368)][_0x11dcc8(0x434)](this);},Scene_GameEnd[_0x38ed9b(0x1d7)][_0x38ed9b(0x186)]=function(){const _0x537862=_0x38ed9b,_0x331aec=this[_0x537862(0x491)]();this[_0x537862(0x613)]=new Window_GameEnd(_0x331aec),this[_0x537862(0x613)][_0x537862(0x546)](_0x537862(0x567),this[_0x537862(0xc8)][_0x537862(0x5f3)](this)),this[_0x537862(0x65c)](this[_0x537862(0x613)]),this[_0x537862(0x613)][_0x537862(0x398)](Scene_GameEnd[_0x537862(0x1a9)][_0x537862(0x25d)]);},Scene_GameEnd[_0x38ed9b(0x1d7)][_0x38ed9b(0x491)]=function(){const _0x38a648=_0x38ed9b;return Scene_GameEnd[_0x38a648(0x1a9)][_0x38a648(0x1bb)]['call'](this);},Scene_Shop['layoutSettings']=VisuMZ['CoreEngine'][_0x38ed9b(0x222)][_0x38ed9b(0x4f9)][_0x38ed9b(0x5ae)],VisuMZ[_0x38ed9b(0x35b)]['Scene_Shop_create']=Scene_Shop[_0x38ed9b(0x1d7)][_0x38ed9b(0x3f1)],Scene_Shop[_0x38ed9b(0x1d7)][_0x38ed9b(0x3f1)]=function(){const _0x2a3714=_0x38ed9b;VisuMZ['CoreEngine'][_0x2a3714(0x605)][_0x2a3714(0x434)](this),this[_0x2a3714(0x1b1)]();},Scene_Shop[_0x38ed9b(0x1d7)][_0x38ed9b(0x1b1)]=function(){const _0x3a0df5=_0x38ed9b;this[_0x3a0df5(0x560)]&&this[_0x3a0df5(0x560)]['setBackgroundType'](Scene_Shop[_0x3a0df5(0x1a9)][_0x3a0df5(0x256)]),this[_0x3a0df5(0x5fe)]&&this['_goldWindow']['setBackgroundType'](Scene_Shop[_0x3a0df5(0x1a9)]['GoldBgType']),this[_0x3a0df5(0x613)]&&this[_0x3a0df5(0x613)]['setBackgroundType'](Scene_Shop[_0x3a0df5(0x1a9)][_0x3a0df5(0x25d)]),this['_dummyWindow']&&this[_0x3a0df5(0x61b)][_0x3a0df5(0x398)](Scene_Shop[_0x3a0df5(0x1a9)][_0x3a0df5(0x56a)]),this['_numberWindow']&&this[_0x3a0df5(0x4f5)][_0x3a0df5(0x398)](Scene_Shop[_0x3a0df5(0x1a9)]['NumberBgType']),this['_statusWindow']&&this[_0x3a0df5(0x17b)][_0x3a0df5(0x398)](Scene_Shop['layoutSettings']['StatusBgType']),this['_buyWindow']&&this[_0x3a0df5(0x24e)]['setBackgroundType'](Scene_Shop[_0x3a0df5(0x1a9)]['BuyBgType']),this[_0x3a0df5(0x4dc)]&&this['_categoryWindow'][_0x3a0df5(0x398)](Scene_Shop[_0x3a0df5(0x1a9)][_0x3a0df5(0x32f)]),this['_sellWindow']&&this[_0x3a0df5(0x1fd)][_0x3a0df5(0x398)](Scene_Shop[_0x3a0df5(0x1a9)]['SellBgType']);},Scene_Shop[_0x38ed9b(0x1d7)]['helpWindowRect']=function(){const _0x41bfa9=_0x38ed9b;return Scene_Shop[_0x41bfa9(0x1a9)]['HelpRect'][_0x41bfa9(0x434)](this);},Scene_Shop[_0x38ed9b(0x1d7)][_0x38ed9b(0x5d9)]=function(){const _0x1d14cf=_0x38ed9b;return Scene_Shop[_0x1d14cf(0x1a9)]['GoldRect'][_0x1d14cf(0x434)](this);},Scene_Shop[_0x38ed9b(0x1d7)]['commandWindowRect']=function(){const _0x6d6ba4=_0x38ed9b;return Scene_Shop['layoutSettings'][_0x6d6ba4(0x1bb)][_0x6d6ba4(0x434)](this);},Scene_Shop[_0x38ed9b(0x1d7)][_0x38ed9b(0x3df)]=function(){const _0x33fcb3=_0x38ed9b;return Scene_Shop['layoutSettings'][_0x33fcb3(0x2ec)]['call'](this);},Scene_Shop[_0x38ed9b(0x1d7)][_0x38ed9b(0x4fc)]=function(){const _0xb17325=_0x38ed9b;return Scene_Shop[_0xb17325(0x1a9)][_0xb17325(0x625)]['call'](this);},Scene_Shop[_0x38ed9b(0x1d7)][_0x38ed9b(0x5c1)]=function(){const _0x2bccc0=_0x38ed9b;return Scene_Shop[_0x2bccc0(0x1a9)][_0x2bccc0(0x200)]['call'](this);},Scene_Shop['prototype'][_0x38ed9b(0x559)]=function(){const _0x2beebd=_0x38ed9b;return Scene_Shop[_0x2beebd(0x1a9)]['BuyRect'][_0x2beebd(0x434)](this);},Scene_Shop[_0x38ed9b(0x1d7)]['categoryWindowRect']=function(){const _0x34dad1=_0x38ed9b;return Scene_Shop['layoutSettings'][_0x34dad1(0x66e)]['call'](this);},Scene_Shop[_0x38ed9b(0x1d7)][_0x38ed9b(0x4fb)]=function(){const _0x2dcdc4=_0x38ed9b;return Scene_Shop[_0x2dcdc4(0x1a9)]['SellRect']['call'](this);},Scene_Name['layoutSettings']=VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x222)][_0x38ed9b(0x4f9)]['NameMenu'],VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x1e9)]=Scene_Name[_0x38ed9b(0x1d7)][_0x38ed9b(0x3f1)],Scene_Name[_0x38ed9b(0x1d7)][_0x38ed9b(0x3f1)]=function(){const _0x46e4e2=_0x38ed9b;VisuMZ[_0x46e4e2(0x35b)]['Scene_Name_create']['call'](this),this[_0x46e4e2(0x1b1)]();},Scene_Name[_0x38ed9b(0x1d7)]['setCoreEngineUpdateWindowBg']=function(){const _0x5a05b0=_0x38ed9b;this['_editWindow']&&this[_0x5a05b0(0x611)][_0x5a05b0(0x398)](Scene_Name[_0x5a05b0(0x1a9)][_0x5a05b0(0x2c0)]),this[_0x5a05b0(0x52d)]&&this[_0x5a05b0(0x52d)][_0x5a05b0(0x398)](Scene_Name[_0x5a05b0(0x1a9)][_0x5a05b0(0x192)]);},Scene_Name[_0x38ed9b(0x1d7)]['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x38ed9b(0x1d7)][_0x38ed9b(0x5f6)]=function(){const _0x48f59f=_0x38ed9b;return Scene_Name[_0x48f59f(0x1a9)][_0x48f59f(0x415)][_0x48f59f(0x434)](this);},Scene_Name[_0x38ed9b(0x1d7)][_0x38ed9b(0x628)]=function(){const _0x18928a=_0x38ed9b;return Scene_Name[_0x18928a(0x1a9)]['InputRect']['call'](this);},Scene_Name[_0x38ed9b(0x1d7)]['EnableNameInput']=function(){const _0x2a194b=_0x38ed9b;if(!this[_0x2a194b(0x52d)])return![];return VisuMZ[_0x2a194b(0x35b)]['Settings'][_0x2a194b(0x16e)][_0x2a194b(0x325)];},Scene_Name['prototype']['buttonAssistKey1']=function(){const _0x39cae9=_0x38ed9b;return this[_0x39cae9(0x325)]()?TextManager['getInputButtonString'](_0x39cae9(0xcd)):Scene_MenuBase[_0x39cae9(0x1d7)]['buttonAssistKey1'][_0x39cae9(0x434)](this);},Scene_Name[_0x38ed9b(0x1d7)]['buttonAssistText1']=function(){const _0x331133=_0x38ed9b;if(this[_0x331133(0x325)]()){const _0x1adde6=VisuMZ[_0x331133(0x35b)][_0x331133(0x222)][_0x331133(0x16e)];return this[_0x331133(0x52d)][_0x331133(0x213)]===_0x331133(0x1f1)?_0x1adde6[_0x331133(0x60a)]||_0x331133(0x60a):_0x1adde6[_0x331133(0x42b)]||'Manual';}else return Scene_MenuBase[_0x331133(0x1d7)]['buttonAssistText1']['call'](this);},VisuMZ[_0x38ed9b(0x35b)]['Scene_Name_onInputOk']=Scene_Name[_0x38ed9b(0x1d7)][_0x38ed9b(0x2aa)],Scene_Name[_0x38ed9b(0x1d7)][_0x38ed9b(0x2aa)]=function(){const _0x35df95=_0x38ed9b;this[_0x35df95(0x441)]()?this[_0x35df95(0x1fc)]():VisuMZ[_0x35df95(0x35b)][_0x35df95(0x48f)]['call'](this);},Scene_Name[_0x38ed9b(0x1d7)][_0x38ed9b(0x441)]=function(){const _0x5022f9=_0x38ed9b,_0x186203=VisuMZ['CoreEngine'][_0x5022f9(0x222)]['KeyboardInput'];if(!_0x186203)return![];const _0x4578d1=_0x186203[_0x5022f9(0x3d1)];if(!_0x4578d1)return![];const _0x25cbda=this[_0x5022f9(0x611)][_0x5022f9(0x11e)]()[_0x5022f9(0x28a)]();for(const _0x3a6e09 of _0x4578d1){if(_0x25cbda[_0x5022f9(0x4f2)](_0x3a6e09[_0x5022f9(0x28a)]()))return!![];}return![];},Scene_Name[_0x38ed9b(0x1d7)]['onInputBannedWords']=function(){const _0x5ee5fc=_0x38ed9b;SoundManager[_0x5ee5fc(0x5c5)]();},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x1f5)]=Scene_Battle[_0x38ed9b(0x1d7)][_0x38ed9b(0x5ba)],Scene_Battle[_0x38ed9b(0x1d7)][_0x38ed9b(0x5ba)]=function(){const _0x22c5cc=_0x38ed9b;VisuMZ[_0x22c5cc(0x35b)][_0x22c5cc(0x1f5)][_0x22c5cc(0x434)](this);if($gameTemp[_0x22c5cc(0x23f)])this[_0x22c5cc(0x10c)]();},Scene_Battle[_0x38ed9b(0x1d7)]['updatePlayTestF7']=function(){const _0x27bdd4=_0x38ed9b;!BattleManager[_0x27bdd4(0x3e9)]()&&!this[_0x27bdd4(0x17a)]&&!$gameMessage[_0x27bdd4(0x262)]()&&(this[_0x27bdd4(0x17a)]=!![],this['update'](),SceneManager[_0x27bdd4(0x23e)](),this[_0x27bdd4(0x17a)]=![]);},VisuMZ['CoreEngine']['Scene_Battle_createCancelButton']=Scene_Battle[_0x38ed9b(0x1d7)][_0x38ed9b(0x3cf)],Scene_Battle[_0x38ed9b(0x1d7)][_0x38ed9b(0x3cf)]=function(){const _0x4029db=_0x38ed9b;VisuMZ[_0x4029db(0x35b)]['Scene_Battle_createCancelButton']['call'](this),SceneManager[_0x4029db(0xf4)]()&&this[_0x4029db(0x5f7)]();},Scene_Battle[_0x38ed9b(0x1d7)]['repositionCancelButtonSideButtonLayout']=function(){const _0x43f777=_0x38ed9b;this[_0x43f777(0x649)]['x']=Graphics['boxWidth']+0x4,this[_0x43f777(0x39b)]()?this['_cancelButton']['y']=Graphics[_0x43f777(0x3a4)]-this[_0x43f777(0x38f)]():this['_cancelButton']['y']=0x0;},VisuMZ[_0x38ed9b(0x35b)]['Sprite_Button_initialize']=Sprite_Button[_0x38ed9b(0x1d7)][_0x38ed9b(0xb2)],Sprite_Button[_0x38ed9b(0x1d7)]['initialize']=function(_0x1dd982){const _0x23fce7=_0x38ed9b;VisuMZ[_0x23fce7(0x35b)][_0x23fce7(0x2ad)]['call'](this,_0x1dd982),this[_0x23fce7(0x336)]();},Sprite_Button[_0x38ed9b(0x1d7)][_0x38ed9b(0x336)]=function(){const _0x230653=_0x38ed9b,_0x1b51cf=VisuMZ[_0x230653(0x35b)][_0x230653(0x222)]['UI'];this[_0x230653(0x49e)]=![];switch(this['_buttonType']){case _0x230653(0x567):this['_isButtonHidden']=!_0x1b51cf['cancelShowButton'];break;case _0x230653(0x215):case _0x230653(0x1a1):this[_0x230653(0x49e)]=!_0x1b51cf[_0x230653(0xd4)];break;case _0x230653(0x2a3):case'up':case _0x230653(0x411):case _0x230653(0x170):case'ok':this['_isButtonHidden']=!_0x1b51cf[_0x230653(0x661)];break;case _0x230653(0x5c9):this['_isButtonHidden']=!_0x1b51cf[_0x230653(0x1c3)];break;}},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x2db)]=Sprite_Button[_0x38ed9b(0x1d7)][_0x38ed9b(0x20f)],Sprite_Button[_0x38ed9b(0x1d7)][_0x38ed9b(0x20f)]=function(){const _0x4358f2=_0x38ed9b;SceneManager[_0x4358f2(0x580)]()||this[_0x4358f2(0x49e)]?this['hideButtonFromView']():VisuMZ[_0x4358f2(0x35b)]['Sprite_Button_updateOpacity'][_0x4358f2(0x434)](this);},Sprite_Button[_0x38ed9b(0x1d7)][_0x38ed9b(0x1be)]=function(){const _0x15967e=_0x38ed9b;this[_0x15967e(0x5e8)]=![],this[_0x15967e(0x437)]=0x0,this['x']=Graphics[_0x15967e(0x3dc)]*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x322)]=Sprite_Battler[_0x38ed9b(0x1d7)][_0x38ed9b(0x51c)],Sprite_Battler[_0x38ed9b(0x1d7)][_0x38ed9b(0x51c)]=function(_0x12bd09,_0x19c5f2,_0x78fb7c){const _0x1dc3e4=_0x38ed9b;(this[_0x1dc3e4(0x11c)]!==_0x12bd09||this['_targetOffsetY']!==_0x19c5f2)&&(this[_0x1dc3e4(0x52a)](_0x1dc3e4(0x11b)),this['_movementWholeDuration']=_0x78fb7c),VisuMZ[_0x1dc3e4(0x35b)]['Sprite_Battler_startMove']['call'](this,_0x12bd09,_0x19c5f2,_0x78fb7c);},Sprite_Battler['prototype'][_0x38ed9b(0x52a)]=function(_0x153263){const _0x2eb4c2=_0x38ed9b;this[_0x2eb4c2(0x2e1)]=_0x153263;},Sprite_Battler[_0x38ed9b(0x1d7)]['updateMove']=function(){const _0x638145=_0x38ed9b;if(this['_movementDuration']<=0x0)return;const _0x4a45e7=this[_0x638145(0x599)],_0xa84261=this[_0x638145(0x40c)],_0x544a94=this[_0x638145(0x2e1)];this[_0x638145(0x16a)]=this['applyEasing'](this['_offsetX'],this[_0x638145(0x11c)],_0x4a45e7,_0xa84261,_0x544a94),this['_offsetY']=this[_0x638145(0x422)](this['_offsetY'],this[_0x638145(0x3a1)],_0x4a45e7,_0xa84261,_0x544a94),this['_movementDuration']--;if(this[_0x638145(0x599)]<=0x0)this[_0x638145(0x27d)]();},Sprite_Battler[_0x38ed9b(0x1d7)]['applyEasing']=function(_0x89151b,_0x201376,_0x5151d2,_0x12399a,_0x50c8cf){const _0x4e211f=_0x38ed9b,_0x905446=VisuMZ[_0x4e211f(0x22c)]((_0x12399a-_0x5151d2)/_0x12399a,_0x50c8cf||_0x4e211f(0x11b)),_0x48cc81=VisuMZ[_0x4e211f(0x22c)]((_0x12399a-_0x5151d2+0x1)/_0x12399a,_0x50c8cf||_0x4e211f(0x11b)),_0x5d79cf=(_0x89151b-_0x201376*_0x905446)/(0x1-_0x905446);return _0x5d79cf+(_0x201376-_0x5d79cf)*_0x48cc81;},VisuMZ['CoreEngine']['Sprite_Actor_setActorHome']=Sprite_Actor[_0x38ed9b(0x1d7)][_0x38ed9b(0x4de)],Sprite_Actor['prototype'][_0x38ed9b(0x4de)]=function(_0xd6b96e){const _0x23aa90=_0x38ed9b;VisuMZ[_0x23aa90(0x35b)][_0x23aa90(0x222)]['UI']['RepositionActors']?this[_0x23aa90(0x54a)](_0xd6b96e):VisuMZ[_0x23aa90(0x35b)]['Sprite_Actor_setActorHome'][_0x23aa90(0x434)](this,_0xd6b96e);},Sprite_Actor[_0x38ed9b(0x1d7)][_0x38ed9b(0x54a)]=function(_0x272eb2){const _0x2e6126=_0x38ed9b;let _0x276e11=Math[_0x2e6126(0x343)](Graphics[_0x2e6126(0x3dc)]/0x2+0xc0);_0x276e11-=Math['floor']((Graphics[_0x2e6126(0x3dc)]-Graphics['boxWidth'])/0x2),_0x276e11+=_0x272eb2*0x20;let _0x4a4d7f=Graphics[_0x2e6126(0x2bb)]-0xc8-$gameParty[_0x2e6126(0x57a)]()*0x30;_0x4a4d7f-=Math[_0x2e6126(0x5fa)]((Graphics['height']-Graphics[_0x2e6126(0x3a4)])/0x2),_0x4a4d7f+=_0x272eb2*0x30,this[_0x2e6126(0x187)](_0x276e11,_0x4a4d7f);},Sprite_Actor[_0x38ed9b(0x1d7)][_0x38ed9b(0x2f2)]=function(){const _0x3370d0=_0x38ed9b;this[_0x3370d0(0x51c)](0x4b0,0x0,0x78);},Sprite_Animation[_0x38ed9b(0x1d7)]['setMute']=function(_0x404792){const _0x2aa284=_0x38ed9b;this[_0x2aa284(0x417)]=_0x404792;},VisuMZ[_0x38ed9b(0x35b)]['Sprite_Animation_processSoundTimings']=Sprite_Animation[_0x38ed9b(0x1d7)][_0x38ed9b(0x2fd)],Sprite_Animation[_0x38ed9b(0x1d7)][_0x38ed9b(0x2fd)]=function(){const _0x2e013d=_0x38ed9b;if(this[_0x2e013d(0x417)])return;VisuMZ[_0x2e013d(0x35b)][_0x2e013d(0x3c3)]['call'](this);},VisuMZ['CoreEngine'][_0x38ed9b(0x1bd)]=Sprite_Animation['prototype'][_0x38ed9b(0x3c7)],Sprite_Animation[_0x38ed9b(0x1d7)][_0x38ed9b(0x3c7)]=function(_0x47ddbc){const _0x1c11b5=_0x38ed9b;this[_0x1c11b5(0x593)]()?this[_0x1c11b5(0x563)](_0x47ddbc):VisuMZ[_0x1c11b5(0x35b)][_0x1c11b5(0x1bd)][_0x1c11b5(0x434)](this,_0x47ddbc);},Sprite_Animation[_0x38ed9b(0x1d7)][_0x38ed9b(0x593)]=function(){const _0xe3c52f=_0x38ed9b;if(!this['_animation'])return![];const _0x404e02=this[_0xe3c52f(0x2d3)][_0xe3c52f(0x11e)]||'';if(_0x404e02[_0xe3c52f(0x34b)](/<MIRROR OFFSET X>/i))return!![];if(_0x404e02[_0xe3c52f(0x34b)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0xe3c52f(0x35b)][_0xe3c52f(0x222)]['QoL'][_0xe3c52f(0x39f)];},Sprite_Animation[_0x38ed9b(0x1d7)][_0x38ed9b(0x563)]=function(_0x4be639){const _0x98897e=_0x38ed9b,_0x107cb3=this[_0x98897e(0x22b)],_0x58b796=this[_0x98897e(0x22b)],_0x27dfd5=this[_0x98897e(0x2d3)][_0x98897e(0x2f3)]*(this['_mirror']?-0x1:0x1)-_0x107cb3/0x2,_0x41a87f=this[_0x98897e(0x2d3)][_0x98897e(0x62b)]-_0x58b796/0x2,_0x3a706e=this[_0x98897e(0x207)](_0x4be639);_0x4be639['gl'][_0x98897e(0x57f)](_0x27dfd5+_0x3a706e['x'],_0x41a87f+_0x3a706e['y'],_0x107cb3,_0x58b796);},Sprite_Animation[_0x38ed9b(0x1d7)][_0x38ed9b(0x50e)]=function(_0x4c567f){const _0x160071=_0x38ed9b;if(_0x4c567f['_mainSprite']){}const _0x4c886d=this[_0x160071(0x2d3)]['name'];let _0x4688b6=_0x4c567f['height']*_0x4c567f[_0x160071(0x1b9)]['y'],_0x42caad=0x0,_0x122211=-_0x4688b6/0x2;if(_0x4c886d['match'](/<(?:HEAD|HEADER|TOP)>/i))_0x122211=-_0x4688b6;if(_0x4c886d[_0x160071(0x34b)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x122211=0x0;if(_0x4c886d['match'](/<(?:LEFT)>/i))_0x42caad=-_0x4c567f['width']/0x2;if(_0x4c886d['match'](/<(?:RIGHT)>/i))_0x122211=_0x4c567f['width']/0x2;if(_0x4c886d[_0x160071(0x34b)](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x42caad=Number(RegExp['$1'])*_0x4c567f[_0x160071(0x3dc)];_0x4c886d[_0x160071(0x34b)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x122211=(0x1-Number(RegExp['$1']))*-_0x4688b6);_0x4c886d['match'](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x42caad=Number(RegExp['$1'])*_0x4c567f['width'],_0x122211=(0x1-Number(RegExp['$2']))*-_0x4688b6);if(_0x4c886d['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x42caad+=Number(RegExp['$1']);if(_0x4c886d[_0x160071(0x34b)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x122211+=Number(RegExp['$1']);_0x4c886d['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x42caad+=Number(RegExp['$1']),_0x122211+=Number(RegExp['$2']));const _0x49ad35=new Point(_0x42caad,_0x122211);return _0x4c567f[_0x160071(0x58e)](),_0x4c567f[_0x160071(0xbd)]['apply'](_0x49ad35);},Sprite_AnimationMV[_0x38ed9b(0x1d7)][_0x38ed9b(0x4fd)]=function(_0x3d6152){const _0xc9a2fc=_0x38ed9b;this[_0xc9a2fc(0x417)]=_0x3d6152;},VisuMZ['CoreEngine'][_0x38ed9b(0x23b)]=Sprite_AnimationMV[_0x38ed9b(0x1d7)][_0x38ed9b(0x65a)],Sprite_AnimationMV['prototype'][_0x38ed9b(0x65a)]=function(_0x21bce7){const _0x3fe68f=_0x38ed9b;this[_0x3fe68f(0x417)]&&(_0x21bce7=JsonEx[_0x3fe68f(0x103)](_0x21bce7),_0x21bce7['se']&&(_0x21bce7['se']['volume']=0x0)),VisuMZ[_0x3fe68f(0x35b)][_0x3fe68f(0x23b)][_0x3fe68f(0x434)](this,_0x21bce7);},Sprite_Damage[_0x38ed9b(0x1d7)][_0x38ed9b(0xff)]=function(_0x1a3a80){const _0x49531b=_0x38ed9b;let _0x2e2c34=Math[_0x49531b(0x489)](_0x1a3a80)[_0x49531b(0x26d)]();this[_0x49531b(0x406)]()&&(_0x2e2c34=VisuMZ['GroupDigits'](_0x2e2c34));const _0x6a23b6=this[_0x49531b(0x1a4)](),_0x461078=Math[_0x49531b(0x5fa)](_0x6a23b6*0.75);for(let _0x1eb3e5=0x0;_0x1eb3e5<_0x2e2c34[_0x49531b(0x276)];_0x1eb3e5++){const _0x3204da=this[_0x49531b(0x285)](_0x461078,_0x6a23b6);_0x3204da[_0x49531b(0x210)]['drawText'](_0x2e2c34[_0x1eb3e5],0x0,0x0,_0x461078,_0x6a23b6,'center'),_0x3204da['x']=(_0x1eb3e5-(_0x2e2c34['length']-0x1)/0x2)*_0x461078,_0x3204da['dy']=-_0x1eb3e5;}},Sprite_Damage[_0x38ed9b(0x1d7)][_0x38ed9b(0x406)]=function(){const _0x5ac7ab=_0x38ed9b;return VisuMZ[_0x5ac7ab(0x35b)][_0x5ac7ab(0x222)]['QoL'][_0x5ac7ab(0x341)];},Sprite_Damage[_0x38ed9b(0x1d7)][_0x38ed9b(0x295)]=function(){const _0x5d2a89=_0x38ed9b;return ColorManager[_0x5d2a89(0x5ac)]();},VisuMZ[_0x38ed9b(0x35b)]['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x38ed9b(0x1d7)][_0x38ed9b(0x2b0)],Sprite_Gauge[_0x38ed9b(0x1d7)][_0x38ed9b(0x2b0)]=function(){const _0x286dce=_0x38ed9b;return VisuMZ[_0x286dce(0x35b)]['Sprite_Gauge_gaugeRate'][_0x286dce(0x434)](this)[_0x286dce(0x39c)](0x0,0x1);},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x3cc)]=Sprite_Gauge['prototype'][_0x38ed9b(0x289)],Sprite_Gauge[_0x38ed9b(0x1d7)][_0x38ed9b(0x289)]=function(){const _0x1f0b6d=_0x38ed9b;let _0x31caf0=VisuMZ['CoreEngine'][_0x1f0b6d(0x3cc)][_0x1f0b6d(0x434)](this);return _0x31caf0;},Sprite_Gauge[_0x38ed9b(0x1d7)][_0x38ed9b(0x3a0)]=function(){const _0x2e5ec1=_0x38ed9b;let _0x15fc99=this[_0x2e5ec1(0x289)]();this[_0x2e5ec1(0x406)]()&&(_0x15fc99=VisuMZ[_0x2e5ec1(0x1cf)](_0x15fc99));const _0x323b88=this[_0x2e5ec1(0x3b5)]()-0x1,_0x5ec89c=this[_0x2e5ec1(0x152)]();this[_0x2e5ec1(0x5a9)](),this['bitmap'][_0x2e5ec1(0x623)](_0x15fc99,0x0,0x0,_0x323b88,_0x5ec89c,'right');},Sprite_Gauge['prototype'][_0x38ed9b(0x447)]=function(){return 0x3;},Sprite_Gauge[_0x38ed9b(0x1d7)][_0x38ed9b(0x406)]=function(){const _0x149998=_0x38ed9b;return VisuMZ[_0x149998(0x35b)][_0x149998(0x222)][_0x149998(0xb0)][_0x149998(0x240)];},Sprite_Gauge[_0x38ed9b(0x1d7)][_0x38ed9b(0x295)]=function(){const _0x34af7a=_0x38ed9b;return ColorManager[_0x34af7a(0x655)]();};function Sprite_TitlePictureButton(){const _0x33bd68=_0x38ed9b;this[_0x33bd68(0xb2)](...arguments);}Sprite_TitlePictureButton[_0x38ed9b(0x1d7)]=Object[_0x38ed9b(0x3f1)](Sprite_Clickable[_0x38ed9b(0x1d7)]),Sprite_TitlePictureButton['prototype']['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton['prototype'][_0x38ed9b(0xb2)]=function(_0x6bfb62){const _0x558048=_0x38ed9b;Sprite_Clickable[_0x558048(0x1d7)]['initialize'][_0x558048(0x434)](this),this['_data']=_0x6bfb62,this[_0x558048(0x3f9)]=null,this[_0x558048(0x212)]();},Sprite_TitlePictureButton[_0x38ed9b(0x1d7)][_0x38ed9b(0x212)]=function(){const _0x36ff25=_0x38ed9b;this['x']=Graphics[_0x36ff25(0x3dc)],this['y']=Graphics[_0x36ff25(0x2bb)],this[_0x36ff25(0x5e8)]=![],this[_0x36ff25(0x211)]();},Sprite_TitlePictureButton[_0x38ed9b(0x1d7)][_0x38ed9b(0x211)]=function(){const _0x208e43=_0x38ed9b;this[_0x208e43(0x210)]=ImageManager[_0x208e43(0x620)](this[_0x208e43(0x585)][_0x208e43(0x2a7)]),this[_0x208e43(0x210)]['addLoadListener'](this[_0x208e43(0x1c9)]['bind'](this));},Sprite_TitlePictureButton[_0x38ed9b(0x1d7)][_0x38ed9b(0x1c9)]=function(){const _0x5c7fe4=_0x38ed9b;this['_data']['OnLoadJS'][_0x5c7fe4(0x434)](this),this[_0x5c7fe4(0x585)][_0x5c7fe4(0xc5)][_0x5c7fe4(0x434)](this),this[_0x5c7fe4(0x671)](this[_0x5c7fe4(0x585)][_0x5c7fe4(0x63d)][_0x5c7fe4(0x5f3)](this));},Sprite_TitlePictureButton['prototype'][_0x38ed9b(0x5ba)]=function(){const _0x49464a=_0x38ed9b;Sprite_Clickable[_0x49464a(0x1d7)]['update'][_0x49464a(0x434)](this),this[_0x49464a(0x20f)](),this[_0x49464a(0x4bd)]();},Sprite_TitlePictureButton[_0x38ed9b(0x1d7)]['fadeSpeed']=function(){const _0x224002=_0x38ed9b;return VisuMZ[_0x224002(0x35b)]['Settings'][_0x224002(0x4f9)][_0x224002(0x4aa)]['ButtonFadeSpeed'];},Sprite_TitlePictureButton[_0x38ed9b(0x1d7)][_0x38ed9b(0x20f)]=function(){const _0x20baf5=_0x38ed9b;this[_0x20baf5(0x1e8)]||this[_0x20baf5(0x1ca)]?this[_0x20baf5(0x437)]=0xff:(this['opacity']+=this[_0x20baf5(0x5e8)]?this[_0x20baf5(0x25b)]():-0x1*this[_0x20baf5(0x25b)](),this['opacity']=Math[_0x20baf5(0x641)](0xc0,this['opacity']));},Sprite_TitlePictureButton[_0x38ed9b(0x1d7)][_0x38ed9b(0x671)]=function(_0x40b7ee){const _0x157807=_0x38ed9b;this[_0x157807(0x3f9)]=_0x40b7ee;},Sprite_TitlePictureButton[_0x38ed9b(0x1d7)][_0x38ed9b(0x59a)]=function(){const _0x250595=_0x38ed9b;this[_0x250595(0x3f9)]&&this['_clickHandler']();},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x577)]=Spriteset_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0xb2)],Spriteset_Base[_0x38ed9b(0x1d7)]['initialize']=function(){const _0x1195ae=_0x38ed9b;VisuMZ['CoreEngine'][_0x1195ae(0x577)][_0x1195ae(0x434)](this),this[_0x1195ae(0x66f)]();},Spriteset_Base[_0x38ed9b(0x1d7)]['initMembersCoreEngine']=function(){const _0x1df0cb=_0x38ed9b;this['_fauxAnimationSprites']=[],this[_0x1df0cb(0x266)]=this[_0x1df0cb(0x1b9)]['x'],this[_0x1df0cb(0x424)]=this['scale']['y'];},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x4d0)]=Spriteset_Base[_0x38ed9b(0x1d7)]['destroy'],Spriteset_Base['prototype'][_0x38ed9b(0x20e)]=function(_0x4b3e2d){const _0x27a5e6=_0x38ed9b;this[_0x27a5e6(0x51b)](),VisuMZ[_0x27a5e6(0x35b)][_0x27a5e6(0x4d0)][_0x27a5e6(0x434)](this,_0x4b3e2d);},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x16f)]=Spriteset_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x5ba)],Spriteset_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x5ba)]=function(){const _0x38d3cd=_0x38ed9b;VisuMZ[_0x38d3cd(0x35b)]['Spriteset_Base_update'][_0x38d3cd(0x434)](this),this[_0x38d3cd(0x62c)](),this['updateFauxAnimations']();},Spriteset_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x62c)]=function(){const _0x22d061=_0x38ed9b;if(!VisuMZ[_0x22d061(0x35b)][_0x22d061(0x222)][_0x22d061(0xb0)][_0x22d061(0x48c)])return;if(this[_0x22d061(0x266)]===this[_0x22d061(0x1b9)]['x']&&this[_0x22d061(0x424)]===this[_0x22d061(0x1b9)]['y'])return;this[_0x22d061(0x2bf)](),this['_cacheScaleX']=this['scale']['x'],this[_0x22d061(0x424)]=this[_0x22d061(0x1b9)]['y'];},Spriteset_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x2bf)]=function(){const _0x56b251=_0x38ed9b;this[_0x56b251(0x1b9)]['x']!==0x0&&(this[_0x56b251(0xb6)][_0x56b251(0x1b9)]['x']=0x1/this['scale']['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x56b251(0x1b9)]['x'])),this[_0x56b251(0x1b9)]['y']!==0x0&&(this['_pictureContainer']['scale']['y']=0x1/this['scale']['y'],this[_0x56b251(0xb6)]['y']=-(this['y']/this['scale']['y']));},Spriteset_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x47c)]=function(){const _0x1b89b9=_0x38ed9b;for(const _0x497a5a of this[_0x1b89b9(0x38e)]){!_0x497a5a['isPlaying']()&&this[_0x1b89b9(0x490)](_0x497a5a);}this[_0x1b89b9(0x647)]();},Spriteset_Base['prototype']['processFauxAnimationRequests']=function(){const _0x47e32e=_0x38ed9b;for(;;){const _0x5737ad=$gameTemp[_0x47e32e(0xce)]();if(_0x5737ad)this[_0x47e32e(0xfe)](_0x5737ad);else break;}},Spriteset_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0xfe)]=function(_0x42ee0d){const _0xf1908c=_0x38ed9b,_0x3fcac8=$dataAnimations[_0x42ee0d[_0xf1908c(0x33d)]],_0x515a8f=_0x42ee0d[_0xf1908c(0x5eb)],_0x5a3c2f=_0x42ee0d[_0xf1908c(0x49c)],_0x57dc06=_0x42ee0d['mute'];let _0x5541d2=this[_0xf1908c(0x592)]();const _0x5ae941=this[_0xf1908c(0x632)]();if(this['isAnimationForEach'](_0x3fcac8))for(const _0x89496a of _0x515a8f){this[_0xf1908c(0x301)]([_0x89496a],_0x3fcac8,_0x5a3c2f,_0x5541d2,_0x57dc06),_0x5541d2+=_0x5ae941;}else this['createFauxAnimationSprite'](_0x515a8f,_0x3fcac8,_0x5a3c2f,_0x5541d2,_0x57dc06);},Spriteset_Base['prototype']['createFauxAnimationSprite']=function(_0x29f342,_0x27d6ba,_0x41e934,_0x29eae0,_0x2ed65d){const _0xcd77f9=_0x38ed9b,_0x76c95b=this[_0xcd77f9(0x271)](_0x27d6ba),_0x197ed6=new(_0x76c95b?Sprite_AnimationMV:Sprite_Animation)(),_0x4f99cf=this[_0xcd77f9(0x129)](_0x29f342);this['animationShouldMirror'](_0x29f342[0x0])&&(_0x41e934=!_0x41e934),_0x197ed6[_0xcd77f9(0x1a6)]=_0x29f342,_0x197ed6['setup'](_0x4f99cf,_0x27d6ba,_0x41e934,_0x29eae0),_0x197ed6[_0xcd77f9(0x4fd)](_0x2ed65d),this[_0xcd77f9(0x664)][_0xcd77f9(0x139)](_0x197ed6),this['_fauxAnimationSprites'][_0xcd77f9(0x362)](_0x197ed6);},Spriteset_Base['prototype']['removeFauxAnimation']=function(_0x2dfb76){const _0x567f01=_0x38ed9b;this['_fauxAnimationSprites']['remove'](_0x2dfb76),this[_0x567f01(0x664)]['removeChild'](_0x2dfb76);for(const _0x5d0cce of _0x2dfb76[_0x567f01(0x1a6)]){_0x5d0cce[_0x567f01(0x591)]&&_0x5d0cce[_0x567f01(0x591)]();}_0x2dfb76[_0x567f01(0x20e)]();},Spriteset_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x51b)]=function(){const _0x463959=_0x38ed9b;for(const _0xa07c0 of this['_fauxAnimationSprites']){this[_0x463959(0x490)](_0xa07c0);}},Spriteset_Base[_0x38ed9b(0x1d7)]['isFauxAnimationPlaying']=function(){return this['_fauxAnimationSprites']['length']>0x0;},VisuMZ['CoreEngine'][_0x38ed9b(0x56c)]=Spriteset_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x1eb)],Spriteset_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x1eb)]=function(){const _0x4a94ef=_0x38ed9b;VisuMZ['CoreEngine'][_0x4a94ef(0x56c)][_0x4a94ef(0x434)](this),this[_0x4a94ef(0x127)]();},Spriteset_Base['prototype'][_0x38ed9b(0x127)]=function(){const _0x5af8d4=_0x38ed9b;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math['round']($gameScreen[_0x5af8d4(0xea)]());const _0x3fd9ce=$gameScreen[_0x5af8d4(0x2b1)]();switch($gameScreen[_0x5af8d4(0x2b1)]()){case'original':this[_0x5af8d4(0x41a)]();break;case'horizontal':this[_0x5af8d4(0x5da)]();break;case _0x5af8d4(0xdc):this[_0x5af8d4(0x1df)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x41a)]=function(){const _0x55c9e5=_0x38ed9b,_0x58560c=VisuMZ[_0x55c9e5(0x35b)]['Settings'][_0x55c9e5(0x2b4)];if(_0x58560c&&_0x58560c[_0x55c9e5(0x197)])return _0x58560c[_0x55c9e5(0x197)][_0x55c9e5(0x434)](this);this['x']+=Math[_0x55c9e5(0x343)]($gameScreen[_0x55c9e5(0xea)]());},Spriteset_Base['prototype'][_0x38ed9b(0x172)]=function(){const _0x38907b=_0x38ed9b,_0x36a9cf=VisuMZ[_0x38907b(0x35b)][_0x38907b(0x222)][_0x38907b(0x2b4)];if(_0x36a9cf&&_0x36a9cf[_0x38907b(0x5f9)])return _0x36a9cf[_0x38907b(0x5f9)][_0x38907b(0x434)](this);const _0x5b937d=$gameScreen[_0x38907b(0x141)]*0.75,_0x298276=$gameScreen[_0x38907b(0x1b7)]*0.6,_0x27c071=$gameScreen[_0x38907b(0x65d)];this['x']+=Math['round'](Math[_0x38907b(0x184)](_0x5b937d)-Math[_0x38907b(0x184)](_0x298276))*(Math[_0x38907b(0x641)](_0x27c071,0x1e)*0.5),this['y']+=Math['round'](Math['randomInt'](_0x5b937d)-Math[_0x38907b(0x184)](_0x298276))*(Math['min'](_0x27c071,0x1e)*0.5);},Spriteset_Base['prototype']['updatePositionCoreEngineShakeHorz']=function(){const _0x11e6d0=_0x38ed9b,_0x9ddc26=VisuMZ[_0x11e6d0(0x35b)][_0x11e6d0(0x222)][_0x11e6d0(0x2b4)];if(_0x9ddc26&&_0x9ddc26[_0x11e6d0(0x4e0)])return _0x9ddc26[_0x11e6d0(0x4e0)][_0x11e6d0(0x434)](this);const _0x493149=$gameScreen['_shakePower']*0.75,_0x568bd3=$gameScreen[_0x11e6d0(0x1b7)]*0.6,_0x41ff89=$gameScreen[_0x11e6d0(0x65d)];this['x']+=Math['round'](Math['randomInt'](_0x493149)-Math['randomInt'](_0x568bd3))*(Math[_0x11e6d0(0x641)](_0x41ff89,0x1e)*0.5);},Spriteset_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x1df)]=function(){const _0x2dbc8c=_0x38ed9b,_0x344838=VisuMZ[_0x2dbc8c(0x35b)][_0x2dbc8c(0x222)][_0x2dbc8c(0x2b4)];if(_0x344838&&_0x344838[_0x2dbc8c(0x610)])return _0x344838[_0x2dbc8c(0x610)]['call'](this);const _0x3eb426=$gameScreen[_0x2dbc8c(0x141)]*0.75,_0x5e323d=$gameScreen[_0x2dbc8c(0x1b7)]*0.6,_0xb3c20a=$gameScreen[_0x2dbc8c(0x65d)];this['y']+=Math['round'](Math[_0x2dbc8c(0x184)](_0x3eb426)-Math[_0x2dbc8c(0x184)](_0x5e323d))*(Math[_0x2dbc8c(0x641)](_0xb3c20a,0x1e)*0.5);},Spriteset_Battle['prototype'][_0x38ed9b(0x368)]=function(){const _0x2d020e=_0x38ed9b;this[_0x2d020e(0x3aa)]=new PIXI[(_0x2d020e(0x250))][(_0x2d020e(0x3ee))](clamp=!![]),this[_0x2d020e(0x63e)]=new Sprite(),this[_0x2d020e(0x63e)][_0x2d020e(0x210)]=SceneManager['backgroundBitmap'](),this[_0x2d020e(0x63e)]['filters']=[this[_0x2d020e(0x3aa)]],this[_0x2d020e(0x4b2)][_0x2d020e(0x139)](this[_0x2d020e(0x63e)]);},VisuMZ['CoreEngine'][_0x38ed9b(0x5db)]=Spriteset_Battle['prototype'][_0x38ed9b(0x604)],Spriteset_Battle['prototype']['createEnemies']=function(){const _0x4c1e77=_0x38ed9b;VisuMZ[_0x4c1e77(0x35b)][_0x4c1e77(0x222)]['UI'][_0x4c1e77(0x48e)]&&this[_0x4c1e77(0x60f)](),VisuMZ['CoreEngine'][_0x4c1e77(0x5db)][_0x4c1e77(0x434)](this);},Spriteset_Battle[_0x38ed9b(0x1d7)][_0x38ed9b(0x60f)]=function(){const _0x5b0a70=_0x38ed9b;for(member of $gameTroop['members']()){member[_0x5b0a70(0x1d8)]();}},VisuMZ['CoreEngine'][_0x38ed9b(0x468)]=Window_Base[_0x38ed9b(0x1d7)]['initialize'],Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0xb2)]=function(_0x42a42b){const _0x2829e8=_0x38ed9b;_0x42a42b['x']=Math['round'](_0x42a42b['x']),_0x42a42b['y']=Math['round'](_0x42a42b['y']),_0x42a42b['width']=Math['round'](_0x42a42b['width']),_0x42a42b[_0x2829e8(0x2bb)]=Math[_0x2829e8(0x343)](_0x42a42b[_0x2829e8(0x2bb)]),this[_0x2829e8(0x638)](),VisuMZ[_0x2829e8(0x35b)][_0x2829e8(0x468)]['call'](this,_0x42a42b),this[_0x2829e8(0x171)]();},Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x638)]=function(){const _0x3730e8=_0x38ed9b;this[_0x3730e8(0x167)]=VisuMZ[_0x3730e8(0x35b)][_0x3730e8(0x222)]['QoL'][_0x3730e8(0x4bf)],this[_0x3730e8(0x558)]=VisuMZ[_0x3730e8(0x35b)][_0x3730e8(0x222)][_0x3730e8(0xb0)][_0x3730e8(0x587)];},Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x1ff)]=function(){const _0xba233a=_0x38ed9b;return VisuMZ['CoreEngine']['Settings'][_0xba233a(0x20b)]['LineHeight'];},Window_Base[_0x38ed9b(0x1d7)]['itemPadding']=function(){const _0x248fcf=_0x38ed9b;return VisuMZ[_0x248fcf(0x35b)][_0x248fcf(0x222)][_0x248fcf(0x20b)][_0x248fcf(0x2d4)];},Window_Base['prototype']['updateBackOpacity']=function(){const _0x4303f6=_0x38ed9b;this[_0x4303f6(0xd9)]=VisuMZ[_0x4303f6(0x35b)][_0x4303f6(0x222)][_0x4303f6(0x20b)][_0x4303f6(0x4ba)];},Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x53c)]=function(){const _0x4540ff=_0x38ed9b;return VisuMZ[_0x4540ff(0x35b)]['Settings']['Window'][_0x4540ff(0x391)];},Window_Base['prototype'][_0x38ed9b(0x3b8)]=function(){const _0x82a144=_0x38ed9b;return VisuMZ[_0x82a144(0x35b)][_0x82a144(0x222)][_0x82a144(0x20b)]['OpenSpeed'];},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x15d)]=Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x5ba)],Window_Base[_0x38ed9b(0x1d7)]['update']=function(){const _0x52722d=_0x38ed9b;VisuMZ[_0x52722d(0x35b)]['Window_Base_update'][_0x52722d(0x434)](this),this[_0x52722d(0x5d6)]();},Window_Base['prototype'][_0x38ed9b(0x4e6)]=function(){const _0x596903=_0x38ed9b;this[_0x596903(0x203)]&&(this[_0x596903(0x2cd)]+=this[_0x596903(0x3b8)](),this[_0x596903(0x364)]()&&(this[_0x596903(0x203)]=![]));},Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x306)]=function(){const _0x8205f7=_0x38ed9b;this[_0x8205f7(0x274)]&&(this[_0x8205f7(0x2cd)]-=this[_0x8205f7(0x3b8)](),this[_0x8205f7(0x50f)]()&&(this[_0x8205f7(0x274)]=![]));},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x4ce)]=Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x623)],Window_Base['prototype']['drawText']=function(_0x30a994,_0x5a339e,_0x19bb94,_0x4c8752,_0x4ace67){const _0x2d022b=_0x38ed9b;if(this[_0x2d022b(0x406)]())_0x30a994=VisuMZ[_0x2d022b(0x1cf)](_0x30a994);VisuMZ[_0x2d022b(0x35b)][_0x2d022b(0x4ce)][_0x2d022b(0x434)](this,_0x30a994,_0x5a339e,_0x19bb94,_0x4c8752,_0x4ace67);},Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x406)]=function(){const _0x591315=_0x38ed9b;return this[_0x591315(0x167)];},VisuMZ['CoreEngine'][_0x38ed9b(0x390)]=Window_Base[_0x38ed9b(0x1d7)]['createTextState'],Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x13d)]=function(_0x162845,_0x11a9b5,_0x3678dc,_0x2b6fe9){const _0xd46878=_0x38ed9b;var _0x320894=VisuMZ[_0xd46878(0x35b)][_0xd46878(0x390)][_0xd46878(0x434)](this,_0x162845,_0x11a9b5,_0x3678dc,_0x2b6fe9);if(this[_0xd46878(0x407)]())_0x320894[_0xd46878(0x264)]=VisuMZ[_0xd46878(0x1cf)](_0x320894[_0xd46878(0x264)]);return _0x320894;},Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x407)]=function(){const _0x5aaef1=_0x38ed9b;return this[_0x5aaef1(0x558)];},Window_Base[_0x38ed9b(0x1d7)]['enableDigitGrouping']=function(_0x4d5ea8){const _0x567a70=_0x38ed9b;this[_0x567a70(0x167)]=_0x4d5ea8;},Window_Base['prototype'][_0x38ed9b(0x52e)]=function(_0x539377){const _0x2cdeba=_0x38ed9b;this[_0x2cdeba(0x558)]=_0x539377;},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x2e3)]=Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x47f)],Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x47f)]=function(_0x36b698,_0x3436fb,_0x289bdd){const _0x758c9e=_0x38ed9b;_0x3436fb=Math[_0x758c9e(0x343)](_0x3436fb),_0x289bdd=Math[_0x758c9e(0x343)](_0x289bdd),VisuMZ['CoreEngine']['Window_Base_drawIcon']['call'](this,_0x36b698,_0x3436fb,_0x289bdd);},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x1c0)]=Window_Base['prototype'][_0x38ed9b(0x18a)],Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x18a)]=function(_0xaa486,_0x2eb43f,_0x29d4e6,_0x26ad5d,_0x363c55,_0x4d83e9){const _0x151b12=_0x38ed9b;_0x363c55=_0x363c55||ImageManager[_0x151b12(0xa5)],_0x4d83e9=_0x4d83e9||ImageManager['faceHeight'],_0x29d4e6=Math[_0x151b12(0x343)](_0x29d4e6),_0x26ad5d=Math['round'](_0x26ad5d),_0x363c55=Math['round'](_0x363c55),_0x4d83e9=Math['round'](_0x4d83e9),VisuMZ[_0x151b12(0x35b)][_0x151b12(0x1c0)][_0x151b12(0x434)](this,_0xaa486,_0x2eb43f,_0x29d4e6,_0x26ad5d,_0x363c55,_0x4d83e9);},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x3ec)]=Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x52f)],Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x52f)]=function(_0x1d0720,_0x453604,_0x1a3e63,_0x482144){const _0x533af4=_0x38ed9b;_0x1a3e63=Math['round'](_0x1a3e63),_0x482144=Math[_0x533af4(0x343)](_0x482144),VisuMZ[_0x533af4(0x35b)][_0x533af4(0x3ec)][_0x533af4(0x434)](this,_0x1d0720,_0x453604,_0x1a3e63,_0x482144);},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x431)]=Window_Selectable[_0x38ed9b(0x1d7)]['itemRect'],Window_Selectable[_0x38ed9b(0x1d7)][_0x38ed9b(0x189)]=function(_0x32fc77){const _0x4ef36b=_0x38ed9b;let _0x3f41fe=VisuMZ['CoreEngine'][_0x4ef36b(0x431)]['call'](this,_0x32fc77);return _0x3f41fe['x']=Math[_0x4ef36b(0x343)](_0x3f41fe['x']),_0x3f41fe['y']=Math['round'](_0x3f41fe['y']),_0x3f41fe[_0x4ef36b(0x3dc)]=Math['round'](_0x3f41fe['width']),_0x3f41fe[_0x4ef36b(0x2bb)]=Math[_0x4ef36b(0x343)](_0x3f41fe[_0x4ef36b(0x2bb)]),_0x3f41fe;},VisuMZ['CoreEngine'][_0x38ed9b(0x44a)]=Window_StatusBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x5b7)],Window_StatusBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x5b7)]=function(_0x337eb1,_0x5d47ef,_0x38b743){const _0x39f378=_0x38ed9b;_0x5d47ef=Math[_0x39f378(0x343)](_0x5d47ef),_0x38b743=Math[_0x39f378(0x343)](_0x38b743),VisuMZ['CoreEngine'][_0x39f378(0x44a)][_0x39f378(0x434)](this,_0x337eb1,_0x5d47ef,_0x38b743);},Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x171)]=function(){const _0x32cb4d=_0x38ed9b;this[_0x32cb4d(0x47b)]={'duration':0x0,'wholeDuration':0x0,'type':_0x32cb4d(0x142),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x32cb4d(0x1b9)]['x'],'targetScaleY':this[_0x32cb4d(0x1b9)]['y'],'targetOpacity':this[_0x32cb4d(0x437)],'targetBackOpacity':this[_0x32cb4d(0xd9)],'targetContentsOpacity':this[_0x32cb4d(0x359)]};},Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x5d6)]=function(){const _0x4a8d3d=_0x38ed9b;if(!this[_0x4a8d3d(0x47b)])return;if(this[_0x4a8d3d(0x47b)][_0x4a8d3d(0x2d1)]<=0x0)return;this['x']=this[_0x4a8d3d(0x355)](this['x'],this[_0x4a8d3d(0x47b)]['targetX']),this['y']=this[_0x4a8d3d(0x355)](this['y'],this[_0x4a8d3d(0x47b)][_0x4a8d3d(0x421)]),this['scale']['x']=this[_0x4a8d3d(0x355)](this[_0x4a8d3d(0x1b9)]['x'],this[_0x4a8d3d(0x47b)][_0x4a8d3d(0x2b7)]),this['scale']['y']=this['applyCoreEasing'](this[_0x4a8d3d(0x1b9)]['y'],this[_0x4a8d3d(0x47b)]['targetScaleY']),this[_0x4a8d3d(0x437)]=this[_0x4a8d3d(0x355)](this[_0x4a8d3d(0x437)],this[_0x4a8d3d(0x47b)][_0x4a8d3d(0x473)]),this[_0x4a8d3d(0xd9)]=this[_0x4a8d3d(0x355)](this['backOpacity'],this[_0x4a8d3d(0x47b)][_0x4a8d3d(0x5e6)]),this[_0x4a8d3d(0x359)]=this[_0x4a8d3d(0x355)](this['contentsOpacity'],this['_coreEasing'][_0x4a8d3d(0x4c7)]),this[_0x4a8d3d(0x47b)]['duration']--;},Window_Base['prototype'][_0x38ed9b(0x355)]=function(_0x12e6ff,_0x2a4748){const _0x4383f3=_0x38ed9b;if(!this[_0x4383f3(0x47b)])return _0x2a4748;const _0x291c21=this[_0x4383f3(0x47b)][_0x4383f3(0x2d1)],_0x3a1ce7=this[_0x4383f3(0x47b)][_0x4383f3(0xc0)],_0xd854df=this[_0x4383f3(0x387)]((_0x3a1ce7-_0x291c21)/_0x3a1ce7),_0xae6ad9=this[_0x4383f3(0x387)]((_0x3a1ce7-_0x291c21+0x1)/_0x3a1ce7),_0x42ce88=(_0x12e6ff-_0x2a4748*_0xd854df)/(0x1-_0xd854df);return _0x42ce88+(_0x2a4748-_0x42ce88)*_0xae6ad9;},Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x387)]=function(_0x3c8a21){const _0x7b91d5=_0x38ed9b;if(!this['_coreEasing'])return _0x3c8a21;return VisuMZ[_0x7b91d5(0x22c)](_0x3c8a21,this[_0x7b91d5(0x47b)][_0x7b91d5(0x5ce)]||_0x7b91d5(0x142));},Window_Base['prototype'][_0x38ed9b(0x1f8)]=function(_0x407bf4,_0x13462f){const _0x59cd94=_0x38ed9b;if(!this[_0x59cd94(0x47b)])return;this['x']=this['_coreEasing'][_0x59cd94(0x676)],this['y']=this[_0x59cd94(0x47b)]['targetY'],this[_0x59cd94(0x1b9)]['x']=this[_0x59cd94(0x47b)][_0x59cd94(0x2b7)],this[_0x59cd94(0x1b9)]['y']=this[_0x59cd94(0x47b)][_0x59cd94(0x20a)],this['opacity']=this[_0x59cd94(0x47b)]['targetOpacity'],this[_0x59cd94(0xd9)]=this['_coreEasing'][_0x59cd94(0x5e6)],this[_0x59cd94(0x359)]=this['_coreEasing']['targetContentsOpacity'],this[_0x59cd94(0x31a)](_0x407bf4,_0x13462f,this['x'],this['y'],this['scale']['x'],this[_0x59cd94(0x1b9)]['y'],this[_0x59cd94(0x437)],this[_0x59cd94(0xd9)],this['contentsOpacity']);},Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x31a)]=function(_0x585b5e,_0x117b1a,_0x58f0b6,_0x6bc3d3,_0x77164a,_0x49a762,_0x418b6e,_0x1c4190,_0x5513f1){const _0x2d9e24=_0x38ed9b;this[_0x2d9e24(0x47b)]={'duration':_0x585b5e,'wholeDuration':_0x585b5e,'type':_0x117b1a,'targetX':_0x58f0b6,'targetY':_0x6bc3d3,'targetScaleX':_0x77164a,'targetScaleY':_0x49a762,'targetOpacity':_0x418b6e,'targetBackOpacity':_0x1c4190,'targetContentsOpacity':_0x5513f1};},Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0xba)]=function(_0x166c54,_0x1342ce,_0x59e4ae,_0x58f784,_0x1365c7){const _0x2eab08=_0x38ed9b;this[_0x2eab08(0x426)](),this[_0x2eab08(0x5bc)][_0x2eab08(0x1a4)]=VisuMZ['CoreEngine'][_0x2eab08(0x222)][_0x2eab08(0x1a5)]['GoldFontSize'];const _0x3f0f05=VisuMZ[_0x2eab08(0x35b)][_0x2eab08(0x222)]['Gold'][_0x2eab08(0x442)];if(_0x3f0f05>0x0&&_0x1342ce===TextManager['currencyUnit']){const _0x1c677f=_0x58f784+(this['lineHeight']()-ImageManager['iconHeight'])/0x2;this[_0x2eab08(0x47f)](_0x3f0f05,_0x59e4ae+(_0x1365c7-ImageManager[_0x2eab08(0x334)]),_0x1c677f),_0x1365c7-=ImageManager[_0x2eab08(0x334)]+0x4;}else this[_0x2eab08(0x4a3)](ColorManager['systemColor']()),this[_0x2eab08(0x623)](_0x1342ce,_0x59e4ae,_0x58f784,_0x1365c7,_0x2eab08(0x3b4)),_0x1365c7-=this['textWidth'](_0x1342ce)+0x6;this[_0x2eab08(0x381)]();const _0x12eafa=this[_0x2eab08(0xc7)](this[_0x2eab08(0x167)]?VisuMZ[_0x2eab08(0x1cf)](_0x166c54):_0x166c54);_0x12eafa>_0x1365c7?this[_0x2eab08(0x623)](VisuMZ[_0x2eab08(0x35b)][_0x2eab08(0x222)]['Gold'][_0x2eab08(0x660)],_0x59e4ae,_0x58f784,_0x1365c7,'right'):this['drawText'](_0x166c54,_0x59e4ae,_0x58f784,_0x1365c7,_0x2eab08(0x3b4)),this[_0x2eab08(0x426)]();},Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x499)]=function(_0x443f89,_0x108362,_0x4b3837,_0x3cb736,_0x1ebfeb){const _0x443e72=_0x38ed9b,_0x14a964=ImageManager[_0x443e72(0x329)](_0x443e72(0x533)),_0x294577=ImageManager[_0x443e72(0x334)],_0x2e44b1=ImageManager[_0x443e72(0x1f6)],_0x4eeb64=_0x443f89%0x10*_0x294577,_0x1fd97e=Math['floor'](_0x443f89/0x10)*_0x2e44b1,_0xd9d91=_0x3cb736,_0x4d19a5=_0x3cb736;this[_0x443e72(0x5bc)][_0x443e72(0xf0)][_0x443e72(0x1ae)]=_0x1ebfeb,this[_0x443e72(0x5bc)]['blt'](_0x14a964,_0x4eeb64,_0x1fd97e,_0x294577,_0x2e44b1,_0x108362,_0x4b3837,_0xd9d91,_0x4d19a5),this['contents'][_0x443e72(0xf0)][_0x443e72(0x1ae)]=!![];},Window_Base[_0x38ed9b(0x1d7)][_0x38ed9b(0x3c5)]=function(_0x16b77f,_0x5e5ee5,_0x1366e6,_0x36ea97,_0x447ca3,_0x25d138){const _0x1aaef0=_0x38ed9b,_0x2c520a=Math[_0x1aaef0(0x5fa)]((_0x1366e6-0x2)*_0x36ea97),_0x271e59=Sprite_Gauge[_0x1aaef0(0x1d7)]['gaugeHeight'][_0x1aaef0(0x434)](this),_0x339fcc=_0x5e5ee5+this[_0x1aaef0(0x1ff)]()-_0x271e59-0x2;this[_0x1aaef0(0x5bc)][_0x1aaef0(0x4d1)](_0x16b77f,_0x339fcc,_0x1366e6,_0x271e59,ColorManager[_0x1aaef0(0x382)]()),this['contents'][_0x1aaef0(0x617)](_0x16b77f+0x1,_0x339fcc+0x1,_0x2c520a,_0x271e59-0x2,_0x447ca3,_0x25d138);},Window_Selectable[_0x38ed9b(0x1d7)][_0x38ed9b(0x173)]=function(_0x5e18dd){const _0x8c4d3d=_0x38ed9b;let _0x2a8cfc=this[_0x8c4d3d(0x41e)]();const _0xfe6da4=this[_0x8c4d3d(0x626)](),_0x422a8f=this[_0x8c4d3d(0x371)]();if(this[_0x8c4d3d(0x23c)]()&&(_0x2a8cfc<_0xfe6da4||_0x5e18dd&&_0x422a8f===0x1)){_0x2a8cfc+=_0x422a8f;if(_0x2a8cfc>=_0xfe6da4)_0x2a8cfc=_0xfe6da4-0x1;this[_0x8c4d3d(0x451)](_0x2a8cfc);}else!this[_0x8c4d3d(0x23c)]()&&((_0x2a8cfc<_0xfe6da4-_0x422a8f||_0x5e18dd&&_0x422a8f===0x1)&&this[_0x8c4d3d(0x451)]((_0x2a8cfc+_0x422a8f)%_0xfe6da4));},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x3e6)]=Window_Selectable[_0x38ed9b(0x1d7)]['cursorDown'],Window_Selectable['prototype'][_0x38ed9b(0x173)]=function(_0x278c0b){const _0x5c4c76=_0x38ed9b;this[_0x5c4c76(0x23c)]()&&_0x278c0b&&this[_0x5c4c76(0x371)]()===0x1&&this[_0x5c4c76(0x41e)]()===this[_0x5c4c76(0x626)]()-0x1?this[_0x5c4c76(0x451)](0x0):VisuMZ[_0x5c4c76(0x35b)]['Window_Selectable_cursorDown']['call'](this,_0x278c0b);},Window_Selectable[_0x38ed9b(0x1d7)][_0x38ed9b(0x60d)]=function(_0x450b7d){const _0x37ac73=_0x38ed9b;let _0x5183ce=Math[_0x37ac73(0x414)](0x0,this[_0x37ac73(0x41e)]());const _0x33c3c1=this[_0x37ac73(0x626)](),_0x27d1fa=this['maxCols']();if(this['isUseModernControls']()&&_0x5183ce>0x0||_0x450b7d&&_0x27d1fa===0x1){_0x5183ce-=_0x27d1fa;if(_0x5183ce<=0x0)_0x5183ce=0x0;this[_0x37ac73(0x451)](_0x5183ce);}else!this['isUseModernControls']()&&((_0x5183ce>=_0x27d1fa||_0x450b7d&&_0x27d1fa===0x1)&&this['smoothSelect']((_0x5183ce-_0x27d1fa+_0x33c3c1)%_0x33c3c1));},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x251)]=Window_Selectable[_0x38ed9b(0x1d7)][_0x38ed9b(0x60d)],Window_Selectable[_0x38ed9b(0x1d7)][_0x38ed9b(0x60d)]=function(_0x5cbb86){const _0x2a9f51=_0x38ed9b;this[_0x2a9f51(0x23c)]()&&_0x5cbb86&&this[_0x2a9f51(0x371)]()===0x1&&this[_0x2a9f51(0x41e)]()===0x0?this[_0x2a9f51(0x451)](this[_0x2a9f51(0x626)]()-0x1):VisuMZ[_0x2a9f51(0x35b)][_0x2a9f51(0x251)]['call'](this,_0x5cbb86);},Window_Selectable['prototype'][_0x38ed9b(0x23c)]=function(){const _0x24b6c4=_0x38ed9b;return VisuMZ[_0x24b6c4(0x35b)][_0x24b6c4(0x222)][_0x24b6c4(0xb0)][_0x24b6c4(0x4fe)];},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x27a)]=Window_Selectable[_0x38ed9b(0x1d7)]['processCursorMove'],Window_Selectable['prototype'][_0x38ed9b(0x25e)]=function(){const _0x46390a=_0x38ed9b;this[_0x46390a(0x23c)]()?(this[_0x46390a(0x38d)](),this['processCursorHomeEndTrigger']()):VisuMZ[_0x46390a(0x35b)][_0x46390a(0x27a)]['call'](this);},Window_Selectable['prototype']['allowShiftScrolling']=function(){return!![];},Window_Selectable[_0x38ed9b(0x1d7)][_0x38ed9b(0x38d)]=function(){const _0x24a57c=_0x38ed9b;if(this['isCursorMovable']()){const _0x5efb79=this['index']();Input[_0x24a57c(0x1e2)](_0x24a57c(0x2a3))&&(Input[_0x24a57c(0x351)]('shift')&&this[_0x24a57c(0x37f)]()?this[_0x24a57c(0x31e)]():this[_0x24a57c(0x173)](Input['isTriggered'](_0x24a57c(0x2a3)))),Input[_0x24a57c(0x1e2)]('up')&&(Input['isPressed'](_0x24a57c(0x24f))&&this['allowShiftScrolling']()?this[_0x24a57c(0x36b)]():this[_0x24a57c(0x60d)](Input[_0x24a57c(0x5a3)]('up'))),Input[_0x24a57c(0x1e2)](_0x24a57c(0x3b4))&&this[_0x24a57c(0x296)](Input[_0x24a57c(0x5a3)](_0x24a57c(0x3b4))),Input[_0x24a57c(0x1e2)](_0x24a57c(0x1ed))&&this['cursorLeft'](Input[_0x24a57c(0x5a3)](_0x24a57c(0x1ed))),!this['isHandled']('pagedown')&&Input[_0x24a57c(0x1e2)]('pagedown')&&this[_0x24a57c(0x31e)](),!this[_0x24a57c(0x119)](_0x24a57c(0x215))&&Input['isRepeated'](_0x24a57c(0x215))&&this['cursorPageup'](),this[_0x24a57c(0x41e)]()!==_0x5efb79&&this['playCursorSound']();}},Window_Selectable[_0x38ed9b(0x1d7)][_0x38ed9b(0x136)]=function(){const _0x1ab59d=_0x38ed9b;if(this[_0x1ab59d(0x239)]()){const _0x5d4b88=this['index']();Input[_0x1ab59d(0x5a3)](_0x1ab59d(0x1e5))&&this[_0x1ab59d(0x451)](Math[_0x1ab59d(0x641)](this[_0x1ab59d(0x41e)](),0x0)),Input[_0x1ab59d(0x5a3)](_0x1ab59d(0x3c8))&&this[_0x1ab59d(0x451)](Math[_0x1ab59d(0x414)](this[_0x1ab59d(0x41e)](),this[_0x1ab59d(0x626)]()-0x1)),this[_0x1ab59d(0x41e)]()!==_0x5d4b88&&this[_0x1ab59d(0x440)]();}},VisuMZ[_0x38ed9b(0x35b)]['Window_Selectable_processTouch']=Window_Selectable[_0x38ed9b(0x1d7)][_0x38ed9b(0x4bd)],Window_Selectable[_0x38ed9b(0x1d7)]['processTouch']=function(){const _0x131dcb=_0x38ed9b;this[_0x131dcb(0x23c)]()?this[_0x131dcb(0x402)]():VisuMZ[_0x131dcb(0x35b)][_0x131dcb(0x26e)][_0x131dcb(0x434)](this);},Window_Selectable[_0x38ed9b(0x1d7)][_0x38ed9b(0x402)]=function(){const _0x27795c=_0x38ed9b;VisuMZ['CoreEngine'][_0x27795c(0x26e)][_0x27795c(0x434)](this);},Window_Selectable[_0x38ed9b(0x1d7)][_0x38ed9b(0x202)]=function(){const _0x464eef=_0x38ed9b;return VisuMZ[_0x464eef(0x35b)][_0x464eef(0x222)]['Window'][_0x464eef(0x18f)];},Window_Selectable[_0x38ed9b(0x1d7)][_0x38ed9b(0x5aa)]=function(){const _0x11e0cc=_0x38ed9b;return VisuMZ[_0x11e0cc(0x35b)][_0x11e0cc(0x222)][_0x11e0cc(0x20b)][_0x11e0cc(0x51a)];},Window_Selectable[_0x38ed9b(0x1d7)]['itemHeight']=function(){const _0x4b72ad=_0x38ed9b;return Window_Scrollable[_0x4b72ad(0x1d7)][_0x4b72ad(0x153)][_0x4b72ad(0x434)](this)+VisuMZ['CoreEngine'][_0x4b72ad(0x222)]['Window'][_0x4b72ad(0x5bf)];;},VisuMZ['CoreEngine']['Window_Selectable_drawBackgroundRect']=Window_Selectable[_0x38ed9b(0x1d7)][_0x38ed9b(0xca)],Window_Selectable[_0x38ed9b(0x1d7)][_0x38ed9b(0xca)]=function(_0x561239){const _0x55d54d=_0x38ed9b,_0x1c8302=VisuMZ[_0x55d54d(0x35b)][_0x55d54d(0x222)][_0x55d54d(0x20b)];if(_0x1c8302['ShowItemBackground']===![])return;_0x1c8302[_0x55d54d(0x405)]?_0x1c8302[_0x55d54d(0x405)]['call'](this,_0x561239):VisuMZ[_0x55d54d(0x35b)][_0x55d54d(0x324)][_0x55d54d(0x434)](this,_0x561239);},VisuMZ['CoreEngine'][_0x38ed9b(0x241)]=Window_Gold['prototype'][_0x38ed9b(0x2ca)],Window_Gold[_0x38ed9b(0x1d7)][_0x38ed9b(0x2ca)]=function(){const _0x223824=_0x38ed9b;this[_0x223824(0x27e)]()?this['drawGoldItemStyle']():VisuMZ['CoreEngine'][_0x223824(0x241)][_0x223824(0x434)](this);},Window_Gold[_0x38ed9b(0x1d7)][_0x38ed9b(0x27e)]=function(){const _0x4dd740=_0x38ed9b;if(TextManager[_0x4dd740(0x2c3)]!==this[_0x4dd740(0x2c3)]())return![];return VisuMZ[_0x4dd740(0x35b)][_0x4dd740(0x222)]['Gold'][_0x4dd740(0x150)];},Window_Gold[_0x38ed9b(0x1d7)]['drawGoldItemStyle']=function(){const _0x59d270=_0x38ed9b;this['resetFontSettings'](),this[_0x59d270(0x5bc)][_0x59d270(0x3c0)](),this['contents']['fontSize']=VisuMZ['CoreEngine'][_0x59d270(0x222)][_0x59d270(0x1a5)][_0x59d270(0x33b)];const _0x16be78=VisuMZ[_0x59d270(0x35b)][_0x59d270(0x222)][_0x59d270(0x1a5)]['GoldIcon'],_0x1d0d27=this[_0x59d270(0x5cb)](0x0);if(_0x16be78>0x0){const _0xa64615=_0x1d0d27['y']+(this[_0x59d270(0x1ff)]()-ImageManager['iconHeight'])/0x2;this[_0x59d270(0x47f)](_0x16be78,_0x1d0d27['x'],_0xa64615);const _0x4fd527=ImageManager[_0x59d270(0x334)]+0x4;_0x1d0d27['x']+=_0x4fd527,_0x1d0d27[_0x59d270(0x3dc)]-=_0x4fd527;}this[_0x59d270(0x4a3)](ColorManager['systemColor']()),this[_0x59d270(0x623)](this[_0x59d270(0x2c3)](),_0x1d0d27['x'],_0x1d0d27['y'],_0x1d0d27[_0x59d270(0x3dc)],_0x59d270(0x1ed));const _0x22ea5a=this[_0x59d270(0xc7)](this[_0x59d270(0x2c3)]())+0x6;;_0x1d0d27['x']+=_0x22ea5a,_0x1d0d27[_0x59d270(0x3dc)]-=_0x22ea5a,this[_0x59d270(0x381)]();const _0x3b2a9a=this[_0x59d270(0x24c)](),_0x5643a6=this['textWidth'](this['_digitGrouping']?VisuMZ[_0x59d270(0x1cf)](this['value']()):this['value']());_0x5643a6>_0x1d0d27[_0x59d270(0x3dc)]?this[_0x59d270(0x623)](VisuMZ[_0x59d270(0x35b)][_0x59d270(0x222)][_0x59d270(0x1a5)][_0x59d270(0x660)],_0x1d0d27['x'],_0x1d0d27['y'],_0x1d0d27[_0x59d270(0x3dc)],'right'):this[_0x59d270(0x623)](this['value'](),_0x1d0d27['x'],_0x1d0d27['y'],_0x1d0d27['width'],_0x59d270(0x3b4)),this[_0x59d270(0x426)]();},Window_StatusBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x4a2)]=function(_0x5733c4,_0x1e85bb,_0x336402,_0x594164,_0x55f49e){const _0x3133d2=_0x38ed9b;_0x594164=String(_0x594164||'')[_0x3133d2(0x4f3)]();if(VisuMZ[_0x3133d2(0x35b)][_0x3133d2(0x222)]['Param']['DrawIcons']){const _0x203f3b=VisuMZ['GetParamIcon'](_0x594164);_0x55f49e?(this[_0x3133d2(0x499)](_0x203f3b,_0x5733c4,_0x1e85bb,this['gaugeLineHeight']()),_0x336402-=this[_0x3133d2(0x658)]()+0x2,_0x5733c4+=this[_0x3133d2(0x658)]()+0x2):(this[_0x3133d2(0x47f)](_0x203f3b,_0x5733c4+0x2,_0x1e85bb+0x2),_0x336402-=ImageManager[_0x3133d2(0x334)]+0x4,_0x5733c4+=ImageManager['iconWidth']+0x4);}const _0x3aa54f=TextManager[_0x3133d2(0x1c7)](_0x594164);this[_0x3133d2(0x426)](),this[_0x3133d2(0x4a3)](ColorManager['systemColor']()),_0x55f49e?(this[_0x3133d2(0x5bc)][_0x3133d2(0x1a4)]=this[_0x3133d2(0x4b7)](),this[_0x3133d2(0x5bc)][_0x3133d2(0x623)](_0x3aa54f,_0x5733c4,_0x1e85bb,_0x336402,this['gaugeLineHeight'](),_0x3133d2(0x1ed))):this[_0x3133d2(0x623)](_0x3aa54f,_0x5733c4,_0x1e85bb,_0x336402),this[_0x3133d2(0x426)]();},Window_StatusBase['prototype'][_0x38ed9b(0x4b7)]=function(){const _0x49023a=_0x38ed9b;return $gameSystem[_0x49023a(0x18c)]()-0x8;},Window_StatusBase[_0x38ed9b(0x1d7)][_0x38ed9b(0xda)]=function(_0x56c4c4,_0xe894e3,_0xe2dbd5,_0x141f76){const _0x192071=_0x38ed9b;_0x141f76=_0x141f76||0xa8,this['resetTextColor']();if(VisuMZ[_0x192071(0x35b)][_0x192071(0x222)]['UI'][_0x192071(0x480)])this['drawTextEx'](_0x56c4c4[_0x192071(0x3b3)]()[_0x192071(0x11e)],_0xe894e3,_0xe2dbd5,_0x141f76);else{const _0xd78912=_0x56c4c4['currentClass']()[_0x192071(0x11e)]['replace'](/\\I\[(\d+)\]/gi,'');this[_0x192071(0x623)](_0xd78912,_0xe894e3,_0xe2dbd5,_0x141f76);}},Window_StatusBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x1fb)]=function(_0x534315,_0x4ccf30,_0x2f129f,_0x33f7e4){const _0x1e5177=_0x38ed9b;_0x33f7e4=_0x33f7e4||0x10e,this['resetTextColor']();if(VisuMZ[_0x1e5177(0x35b)][_0x1e5177(0x222)]['UI'][_0x1e5177(0x277)])this[_0x1e5177(0x10f)](_0x534315[_0x1e5177(0x644)](),_0x4ccf30,_0x2f129f,_0x33f7e4);else{const _0x2cc85f=_0x534315[_0x1e5177(0x644)]()[_0x1e5177(0x2f4)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x534315[_0x1e5177(0x644)](),_0x4ccf30,_0x2f129f,_0x33f7e4);}},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x4ac)]=Window_StatusBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x30c)],Window_StatusBase[_0x38ed9b(0x1d7)]['drawActorLevel']=function(_0x18d935,_0x17eb25,_0x404f9d){const _0x10bb0b=_0x38ed9b;if(this[_0x10bb0b(0x3f5)]())this[_0x10bb0b(0x24a)](_0x18d935,_0x17eb25,_0x404f9d);VisuMZ[_0x10bb0b(0x35b)][_0x10bb0b(0x4ac)]['call'](this,_0x18d935,_0x17eb25,_0x404f9d);},Window_StatusBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x3f5)]=function(){const _0x5e9860=_0x38ed9b;return VisuMZ[_0x5e9860(0x35b)][_0x5e9860(0x222)]['UI']['LvExpGauge'];},Window_StatusBase[_0x38ed9b(0x1d7)][_0x38ed9b(0x24a)]=function(_0x1f0359,_0x376db9,_0x4ae411){const _0x284553=_0x38ed9b;if(!_0x1f0359)return;if(!_0x1f0359[_0x284553(0x310)]())return;const _0x4c0556=0x80,_0x5b61c7=_0x1f0359['expRate']();let _0x3ad0bf=ColorManager[_0x284553(0x2e2)](),_0xf447b=ColorManager['expGaugeColor2']();_0x5b61c7>=0x1&&(_0x3ad0bf=ColorManager[_0x284553(0x4a4)](),_0xf447b=ColorManager['maxLvGaugeColor2']()),this[_0x284553(0x3c5)](_0x376db9,_0x4ae411,_0x4c0556,_0x5b61c7,_0x3ad0bf,_0xf447b);},Window_EquipStatus[_0x38ed9b(0x1d7)][_0x38ed9b(0x1ab)]=function(){const _0x221955=_0x38ed9b;let _0x24fa48=0x0;for(const _0x15cc5c of VisuMZ[_0x221955(0x35b)][_0x221955(0x222)][_0x221955(0x665)]['DisplayedParams']){const _0x9c38e8=this[_0x221955(0x452)](),_0x1d8c7a=this[_0x221955(0x669)](_0x24fa48);this[_0x221955(0x54e)](_0x9c38e8,_0x1d8c7a,_0x15cc5c),_0x24fa48++;}},Window_EquipStatus[_0x38ed9b(0x1d7)]['drawParamName']=function(_0x367a28,_0x1f8667,_0x23abdb){const _0xce551b=_0x38ed9b,_0x108b33=this[_0xce551b(0x29d)]()-this[_0xce551b(0x452)]()*0x2;this['drawParamText'](_0x367a28,_0x1f8667,_0x108b33,_0x23abdb,![]);},Window_EquipStatus[_0x38ed9b(0x1d7)][_0x38ed9b(0x5a1)]=function(_0x162426,_0x41c9f3,_0x1ecec4){const _0x3b8db3=_0x38ed9b,_0x2ca8b9=this[_0x3b8db3(0x636)]();this['resetTextColor'](),this[_0x3b8db3(0x623)](this[_0x3b8db3(0xf1)][_0x3b8db3(0x3ce)](_0x1ecec4,!![]),_0x162426,_0x41c9f3,_0x2ca8b9,_0x3b8db3(0x3b4));},Window_EquipStatus[_0x38ed9b(0x1d7)][_0x38ed9b(0x2a5)]=function(_0xfeff54,_0x5bacd7){const _0x114406=_0x38ed9b,_0x2f1886=this[_0x114406(0x270)]();this['changeTextColor'](ColorManager['systemColor']());const _0x3307ed=VisuMZ[_0x114406(0x35b)][_0x114406(0x222)]['UI'][_0x114406(0x62e)];this[_0x114406(0x623)](_0x3307ed,_0xfeff54,_0x5bacd7,_0x2f1886,_0x114406(0x125));},Window_EquipStatus[_0x38ed9b(0x1d7)][_0x38ed9b(0x57e)]=function(_0x5635fb,_0xa0aa08,_0x62b3b3){const _0x56e7e8=_0x38ed9b,_0x48e7d5=this[_0x56e7e8(0x636)](),_0x4243ab=this[_0x56e7e8(0x40d)][_0x56e7e8(0x3ce)](_0x62b3b3),_0x3261ac=_0x4243ab-this[_0x56e7e8(0xf1)][_0x56e7e8(0x3ce)](_0x62b3b3);this[_0x56e7e8(0x4a3)](ColorManager[_0x56e7e8(0x61f)](_0x3261ac)),this[_0x56e7e8(0x623)](VisuMZ['ConvertNumberToString'](_0x4243ab,0x0,_0x62b3b3),_0x5635fb,_0xa0aa08,_0x48e7d5,'right');},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x1f7)]=Window_EquipItem[_0x38ed9b(0x1d7)][_0x38ed9b(0x1e4)],Window_EquipItem[_0x38ed9b(0x1d7)]['isEnabled']=function(_0x31a79b){const _0x555828=_0x38ed9b;return _0x31a79b&&this[_0x555828(0xf1)]?this[_0x555828(0xf1)]['canEquip'](_0x31a79b):VisuMZ[_0x555828(0x35b)][_0x555828(0x1f7)][_0x555828(0x434)](this,_0x31a79b);},Window_StatusParams[_0x38ed9b(0x1d7)][_0x38ed9b(0x626)]=function(){const _0x46f9b4=_0x38ed9b;return VisuMZ[_0x46f9b4(0x35b)]['Settings'][_0x46f9b4(0x665)][_0x46f9b4(0x64d)]['length'];},Window_StatusParams[_0x38ed9b(0x1d7)]['drawItem']=function(_0x3524a1){const _0x282fb1=_0x38ed9b,_0x298739=this[_0x282fb1(0x5cb)](_0x3524a1),_0x4ba70d=VisuMZ['CoreEngine'][_0x282fb1(0x222)]['Param'][_0x282fb1(0x64d)][_0x3524a1],_0x4a12b4=TextManager[_0x282fb1(0x1c7)](_0x4ba70d),_0x4f43e5=this[_0x282fb1(0xf1)][_0x282fb1(0x3ce)](_0x4ba70d,!![]);this['drawParamText'](_0x298739['x'],_0x298739['y'],0xa0,_0x4ba70d,![]),this['resetTextColor'](),this[_0x282fb1(0x623)](_0x4f43e5,_0x298739['x']+0xa0,_0x298739['y'],0x3c,_0x282fb1(0x3b4));};if(VisuMZ[_0x38ed9b(0x35b)]['Settings'][_0x38ed9b(0x16e)][_0x38ed9b(0x325)]){VisuMZ[_0x38ed9b(0x35b)]['Settings'][_0x38ed9b(0x16e)][_0x38ed9b(0x232)]&&(Window_NameInput[_0x38ed9b(0x568)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x38ed9b(0x519),'OK']);;VisuMZ[_0x38ed9b(0x35b)]['Window_NameInput_initialize']=Window_NameInput[_0x38ed9b(0x1d7)][_0x38ed9b(0xb2)],Window_NameInput[_0x38ed9b(0x1d7)][_0x38ed9b(0xb2)]=function(_0x1871af){const _0x1b6eca=_0x38ed9b;this[_0x1b6eca(0x213)]=this['defaultInputMode'](),VisuMZ[_0x1b6eca(0x35b)][_0x1b6eca(0x214)][_0x1b6eca(0x434)](this,_0x1871af),this['_mode']==='default'?this[_0x1b6eca(0xbc)](0x0):(Input[_0x1b6eca(0x3c0)](),this[_0x1b6eca(0x487)]());},Window_NameInput['prototype']['defaultInputMode']=function(){const _0x50cae8=_0x38ed9b;if(Input['isGamepadConnected']())return _0x50cae8(0x53d);return VisuMZ[_0x50cae8(0x35b)][_0x50cae8(0x222)]['KeyboardInput']['DefaultMode']||_0x50cae8(0x1f1);},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x467)]=Window_NameInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x3bd)],Window_NameInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x3bd)]=function(){const _0x8c38ab=_0x38ed9b;if(!this[_0x8c38ab(0x364)]())return;if(!this[_0x8c38ab(0x384)])return;if(this['_mode']===_0x8c38ab(0x1f1)&&Input[_0x8c38ab(0x653)]())this[_0x8c38ab(0x233)]('default');else{if(Input[_0x8c38ab(0x1cc)](_0x8c38ab(0x419)))Input['clear'](),this[_0x8c38ab(0x37b)]();else{if(Input[_0x8c38ab(0x5a3)]('tab'))Input[_0x8c38ab(0x3c0)](),this[_0x8c38ab(0x213)]==='keyboard'?this[_0x8c38ab(0x233)](_0x8c38ab(0x53d)):this[_0x8c38ab(0x233)](_0x8c38ab(0x1f1));else{if(this[_0x8c38ab(0x213)]===_0x8c38ab(0x1f1))this[_0x8c38ab(0x3d6)]();else Input[_0x8c38ab(0x1cc)](_0x8c38ab(0x517))?(Input['clear'](),this[_0x8c38ab(0x233)](_0x8c38ab(0x1f1))):VisuMZ[_0x8c38ab(0x35b)]['Window_NameInput_processHandling'][_0x8c38ab(0x434)](this);}}}},VisuMZ['CoreEngine'][_0x38ed9b(0x168)]=Window_NameInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x4bd)],Window_NameInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x4bd)]=function(){const _0x7d4c70=_0x38ed9b;if(!this[_0x7d4c70(0x1b5)]())return;if(this['_mode']==='keyboard'){if(TouchInput[_0x7d4c70(0x5a3)]()&&this['isTouchedInsideFrame']())this[_0x7d4c70(0x233)](_0x7d4c70(0x53d));else TouchInput[_0x7d4c70(0x536)]()&&this['switchModes'](_0x7d4c70(0x53d));}else VisuMZ[_0x7d4c70(0x35b)][_0x7d4c70(0x168)][_0x7d4c70(0x434)](this);},Window_NameInput['prototype'][_0x38ed9b(0x3d6)]=function(){const _0x2d6888=_0x38ed9b;if(Input['isSpecialCode'](_0x2d6888(0x2f7)))Input[_0x2d6888(0x3c0)](),this[_0x2d6888(0x13c)]();else{if(Input['_inputString']!==undefined){let _0x551973=Input[_0x2d6888(0x37c)],_0x4c1218=_0x551973['length'];for(let _0x20d39f=0x0;_0x20d39f<_0x4c1218;++_0x20d39f){this['_editWindow'][_0x2d6888(0xae)](_0x551973[_0x20d39f])?SoundManager[_0x2d6888(0x420)]():SoundManager[_0x2d6888(0x5c5)]();}Input[_0x2d6888(0x3c0)]();}}},Window_NameInput['prototype'][_0x38ed9b(0x233)]=function(_0x225516){const _0x18fae7=_0x38ed9b;let _0x5c6f5d=this[_0x18fae7(0x213)];this[_0x18fae7(0x213)]=_0x225516,_0x5c6f5d!==this[_0x18fae7(0x213)]&&(this[_0x18fae7(0x2ca)](),SoundManager[_0x18fae7(0x420)](),this[_0x18fae7(0x213)]===_0x18fae7(0x53d)?this[_0x18fae7(0xbc)](0x0):this[_0x18fae7(0xbc)](-0x1));},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x242)]=Window_NameInput[_0x38ed9b(0x1d7)]['cursorDown'],Window_NameInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x173)]=function(_0xd4cf56){const _0x571f43=_0x38ed9b;if(this[_0x571f43(0x213)]===_0x571f43(0x1f1)&&!Input['isArrowPressed']())return;if(Input[_0x571f43(0x1a0)]())return;VisuMZ['CoreEngine'][_0x571f43(0x242)]['call'](this,_0xd4cf56),this['switchModes'](_0x571f43(0x53d));},VisuMZ[_0x38ed9b(0x35b)]['Window_NameInput_cursorUp']=Window_NameInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x60d)],Window_NameInput[_0x38ed9b(0x1d7)]['cursorUp']=function(_0x286a84){const _0x43eadb=_0x38ed9b;if(this[_0x43eadb(0x213)]===_0x43eadb(0x1f1)&&!Input['isArrowPressed']())return;if(Input[_0x43eadb(0x1a0)]())return;VisuMZ['CoreEngine'][_0x43eadb(0x2be)][_0x43eadb(0x434)](this,_0x286a84),this['switchModes'](_0x43eadb(0x53d));},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x159)]=Window_NameInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x296)],Window_NameInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x296)]=function(_0xa22399){const _0x3ccf58=_0x38ed9b;if(this[_0x3ccf58(0x213)]===_0x3ccf58(0x1f1)&&!Input[_0x3ccf58(0x52c)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x3ccf58(0x35b)][_0x3ccf58(0x159)][_0x3ccf58(0x434)](this,_0xa22399),this['switchModes']('default');},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x36f)]=Window_NameInput['prototype'][_0x38ed9b(0x3b6)],Window_NameInput[_0x38ed9b(0x1d7)]['cursorLeft']=function(_0x40d5ce){const _0x4abc43=_0x38ed9b;if(this[_0x4abc43(0x213)]===_0x4abc43(0x1f1)&&!Input[_0x4abc43(0x52c)]())return;if(Input[_0x4abc43(0x1a0)]())return;VisuMZ[_0x4abc43(0x35b)][_0x4abc43(0x36f)][_0x4abc43(0x434)](this,_0x40d5ce),this['switchModes'](_0x4abc43(0x53d));},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x2f6)]=Window_NameInput['prototype']['cursorPagedown'],Window_NameInput[_0x38ed9b(0x1d7)]['cursorPagedown']=function(){const _0x1f64eb=_0x38ed9b;if(this[_0x1f64eb(0x213)]===_0x1f64eb(0x1f1))return;if(Input[_0x1f64eb(0x1a0)]())return;VisuMZ[_0x1f64eb(0x35b)][_0x1f64eb(0x2f6)][_0x1f64eb(0x434)](this),this[_0x1f64eb(0x233)](_0x1f64eb(0x53d));},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x5fb)]=Window_NameInput['prototype'][_0x38ed9b(0x36b)],Window_NameInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x36b)]=function(){const _0x28fb26=_0x38ed9b;if(this[_0x28fb26(0x213)]===_0x28fb26(0x1f1))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x28fb26(0x35b)][_0x28fb26(0x5fb)][_0x28fb26(0x434)](this),this[_0x28fb26(0x233)](_0x28fb26(0x53d));},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x674)]=Window_NameInput[_0x38ed9b(0x1d7)]['refresh'],Window_NameInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x2ca)]=function(){const _0x3b8ecc=_0x38ed9b;if(this[_0x3b8ecc(0x213)]==='keyboard'){this[_0x3b8ecc(0x5bc)][_0x3b8ecc(0x3c0)](),this[_0x3b8ecc(0x62f)]['clear'](),this[_0x3b8ecc(0x381)]();let _0x1c4446=VisuMZ[_0x3b8ecc(0x35b)]['Settings'][_0x3b8ecc(0x16e)][_0x3b8ecc(0x244)][_0x3b8ecc(0x572)]('\x0a'),_0xecc043=_0x1c4446['length'],_0x14d505=(this['innerHeight']-_0xecc043*this[_0x3b8ecc(0x1ff)]())/0x2;for(let _0x1c0b3e=0x0;_0x1c0b3e<_0xecc043;++_0x1c0b3e){let _0x23c38a=_0x1c4446[_0x1c0b3e],_0x318276=this['textSizeEx'](_0x23c38a)['width'],_0x4c6206=Math[_0x3b8ecc(0x5fa)]((this[_0x3b8ecc(0x5bc)]['width']-_0x318276)/0x2);this[_0x3b8ecc(0x10f)](_0x23c38a,_0x4c6206,_0x14d505),_0x14d505+=this[_0x3b8ecc(0x1ff)]();}}else VisuMZ[_0x3b8ecc(0x35b)]['Window_NameInput_refresh'][_0x3b8ecc(0x434)](this);};};VisuMZ[_0x38ed9b(0x35b)]['Window_ShopSell_isEnabled']=Window_ShopSell[_0x38ed9b(0x1d7)]['isEnabled'],Window_ShopSell[_0x38ed9b(0x1d7)][_0x38ed9b(0x1e4)]=function(_0x35212a){const _0x5cd655=_0x38ed9b;return VisuMZ[_0x5cd655(0x35b)][_0x5cd655(0x222)][_0x5cd655(0xb0)][_0x5cd655(0x63a)]&&DataManager['isKeyItem'](_0x35212a)?![]:VisuMZ[_0x5cd655(0x35b)][_0x5cd655(0x46b)][_0x5cd655(0x434)](this,_0x35212a);},Window_NumberInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x23c)]=function(){return![];};VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x222)][_0x38ed9b(0x16e)][_0x38ed9b(0x115)]&&(VisuMZ[_0x38ed9b(0x35b)]['Window_NumberInput_start']=Window_NumberInput['prototype'][_0x38ed9b(0x2e5)],Window_NumberInput[_0x38ed9b(0x1d7)]['start']=function(){const _0x5051b8=_0x38ed9b;VisuMZ[_0x5051b8(0x35b)][_0x5051b8(0x39a)]['call'](this),this[_0x5051b8(0xbc)](this[_0x5051b8(0x49a)]-0x1);},VisuMZ[_0x38ed9b(0x35b)]['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x327)],Window_NumberInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x327)]=function(){const _0x8079f7=_0x38ed9b;if(!this[_0x8079f7(0x1b5)]())return;if(Input['isNumpadPressed']())this[_0x8079f7(0x1fa)]();else{if(Input[_0x8079f7(0x1cc)](_0x8079f7(0x419)))this[_0x8079f7(0x666)]();else{if(Input['_inputSpecialKeyCode']===0x2e)this[_0x8079f7(0x10b)]();else{if(Input[_0x8079f7(0x21c)]===0x24)this[_0x8079f7(0x191)]();else Input[_0x8079f7(0x21c)]===0x23?this[_0x8079f7(0x432)]():(VisuMZ['CoreEngine'][_0x8079f7(0x14c)]['call'](this),Input[_0x8079f7(0x3c0)]());}}}},Window_NumberInput[_0x38ed9b(0x1d7)]['processCursorMove']=function(){const _0x1d7bae=_0x38ed9b;if(!this[_0x1d7bae(0x239)]())return;Input[_0x1d7bae(0x1a0)]()?this[_0x1d7bae(0x1fa)]():Window_Selectable[_0x1d7bae(0x1d7)][_0x1d7bae(0x25e)][_0x1d7bae(0x434)](this);},Window_NumberInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x136)]=function(){},Window_NumberInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x1fa)]=function(){const _0x26e0b9=_0x38ed9b;if(String(this[_0x26e0b9(0x101)])[_0x26e0b9(0x276)]>=this[_0x26e0b9(0x49a)])return;this[_0x26e0b9(0x101)]=Number(String(this[_0x26e0b9(0x101)])+Input[_0x26e0b9(0x37c)]);const _0x1cfd0f='9'[_0x26e0b9(0x583)](this[_0x26e0b9(0x49a)]);this[_0x26e0b9(0x101)]=this[_0x26e0b9(0x101)][_0x26e0b9(0x39c)](0x0,_0x1cfd0f),Input[_0x26e0b9(0x3c0)](),this[_0x26e0b9(0x2ca)](),SoundManager['playCursor'](),this[_0x26e0b9(0xbc)](this[_0x26e0b9(0x49a)]-0x1);},Window_NumberInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x666)]=function(){const _0x317e6a=_0x38ed9b;this[_0x317e6a(0x101)]=Number(String(this['_number'])[_0x317e6a(0x29e)](0x0,-0x1)),this[_0x317e6a(0x101)]=Math[_0x317e6a(0x414)](0x0,this[_0x317e6a(0x101)]),Input[_0x317e6a(0x3c0)](),this[_0x317e6a(0x2ca)](),SoundManager[_0x317e6a(0x5c0)](),this[_0x317e6a(0xbc)](this[_0x317e6a(0x49a)]-0x1);},Window_NumberInput[_0x38ed9b(0x1d7)][_0x38ed9b(0x10b)]=function(){const _0x37d1d3=_0x38ed9b;this['_number']=Number(String(this[_0x37d1d3(0x101)])['substring'](0x1)),this['_number']=Math['max'](0x0,this[_0x37d1d3(0x101)]),Input['clear'](),this[_0x37d1d3(0x2ca)](),SoundManager[_0x37d1d3(0x5c0)](),this[_0x37d1d3(0xbc)](this[_0x37d1d3(0x49a)]-0x1);});;Window_TitleCommand[_0x38ed9b(0x537)]=VisuMZ['CoreEngine']['Settings']['TitleCommandList'],Window_TitleCommand[_0x38ed9b(0x1d7)][_0x38ed9b(0x344)]=function(){const _0x17baa0=_0x38ed9b;this[_0x17baa0(0x539)]();},Window_TitleCommand[_0x38ed9b(0x1d7)][_0x38ed9b(0x539)]=function(){const _0x560d4c=_0x38ed9b;for(const _0x6d57b8 of Window_TitleCommand['_commandList']){if(_0x6d57b8['ShowJS'][_0x560d4c(0x434)](this)){const _0x2d8104=_0x6d57b8[_0x560d4c(0x3d0)];let _0x199352=_0x6d57b8[_0x560d4c(0x4a8)];if(['','Untitled']['includes'](_0x199352))_0x199352=_0x6d57b8[_0x560d4c(0x507)][_0x560d4c(0x434)](this);const _0x34caca=_0x6d57b8['EnableJS'][_0x560d4c(0x434)](this),_0x32a8da=_0x6d57b8[_0x560d4c(0x534)][_0x560d4c(0x434)](this);this[_0x560d4c(0x304)](_0x199352,_0x2d8104,_0x34caca,_0x32a8da),this['setHandler'](_0x2d8104,_0x6d57b8[_0x560d4c(0x63d)][_0x560d4c(0x5f3)](this,_0x32a8da));}}},Window_GameEnd['_commandList']=VisuMZ[_0x38ed9b(0x35b)]['Settings'][_0x38ed9b(0x4f9)][_0x38ed9b(0x3f3)][_0x38ed9b(0x118)],Window_GameEnd['prototype'][_0x38ed9b(0x344)]=function(){const _0x2aba74=_0x38ed9b;this[_0x2aba74(0x539)]();},Window_GameEnd['prototype'][_0x38ed9b(0x539)]=function(){const _0xc3c68a=_0x38ed9b;for(const _0x215e3c of Window_GameEnd[_0xc3c68a(0x537)]){if(_0x215e3c[_0xc3c68a(0x309)][_0xc3c68a(0x434)](this)){const _0x4521a1=_0x215e3c[_0xc3c68a(0x3d0)];let _0x32c688=_0x215e3c[_0xc3c68a(0x4a8)];if(['',_0xc3c68a(0x366)]['includes'](_0x32c688))_0x32c688=_0x215e3c[_0xc3c68a(0x507)][_0xc3c68a(0x434)](this);const _0x512c5d=_0x215e3c[_0xc3c68a(0x545)][_0xc3c68a(0x434)](this),_0x46f86b=_0x215e3c[_0xc3c68a(0x534)][_0xc3c68a(0x434)](this);this[_0xc3c68a(0x304)](_0x32c688,_0x4521a1,_0x512c5d,_0x46f86b),this['setHandler'](_0x4521a1,_0x215e3c[_0xc3c68a(0x63d)][_0xc3c68a(0x5f3)](this,_0x46f86b));}}};function Window_ButtonAssist(){const _0x34fa4f=_0x38ed9b;this[_0x34fa4f(0xb2)](...arguments);}Window_ButtonAssist[_0x38ed9b(0x1d7)]=Object['create'](Window_Base[_0x38ed9b(0x1d7)]),Window_ButtonAssist[_0x38ed9b(0x1d7)][_0x38ed9b(0x594)]=Window_ButtonAssist,Window_ButtonAssist[_0x38ed9b(0x1d7)][_0x38ed9b(0xb2)]=function(_0x1a48c0){const _0x393270=_0x38ed9b;this[_0x393270(0x585)]={},Window_Base['prototype']['initialize'][_0x393270(0x434)](this,_0x1a48c0),this[_0x393270(0x398)](VisuMZ[_0x393270(0x35b)][_0x393270(0x222)][_0x393270(0x516)][_0x393270(0x598)]||0x0),this[_0x393270(0x2ca)]();},Window_ButtonAssist[_0x38ed9b(0x1d7)][_0x38ed9b(0x5bb)]=function(){const _0xb55c99=_0x38ed9b;this[_0xb55c99(0x5bc)]['fontSize']<=0x60&&(this[_0xb55c99(0x5bc)]['fontSize']+=0x6);},Window_ButtonAssist[_0x38ed9b(0x1d7)]['makeFontSmaller']=function(){const _0x531e8b=_0x38ed9b;this['contents']['fontSize']>=0x18&&(this[_0x531e8b(0x5bc)][_0x531e8b(0x1a4)]-=0x6);},Window_ButtonAssist[_0x38ed9b(0x1d7)][_0x38ed9b(0x5ba)]=function(){const _0x4907c7=_0x38ed9b;Window_Base['prototype']['update'][_0x4907c7(0x434)](this),this[_0x4907c7(0x2e8)]();},Window_ButtonAssist['prototype']['updatePadding']=function(){const _0xe53229=_0x38ed9b;this[_0xe53229(0x26a)]=SceneManager[_0xe53229(0x134)]['getButtonAssistLocation']()!==_0xe53229(0x532)?0x0:0x8;},Window_ButtonAssist[_0x38ed9b(0x1d7)][_0x38ed9b(0x2e8)]=function(){const _0x2783d4=_0x38ed9b,_0x5e89f7=SceneManager[_0x2783d4(0x134)];for(let _0x4c84fc=0x1;_0x4c84fc<=0x5;_0x4c84fc++){if(this[_0x2783d4(0x585)][_0x2783d4(0x65f)['format'](_0x4c84fc)]!==_0x5e89f7[_0x2783d4(0x513)[_0x2783d4(0x46c)](_0x4c84fc)]())return this[_0x2783d4(0x2ca)]();if(this[_0x2783d4(0x585)][_0x2783d4(0x218)[_0x2783d4(0x46c)](_0x4c84fc)]!==_0x5e89f7[_0x2783d4(0x4cf)['format'](_0x4c84fc)]())return this[_0x2783d4(0x2ca)]();}},Window_ButtonAssist[_0x38ed9b(0x1d7)][_0x38ed9b(0x2ca)]=function(){const _0x2a0f88=_0x38ed9b;this[_0x2a0f88(0x5bc)][_0x2a0f88(0x3c0)]();for(let _0x2e6003=0x1;_0x2e6003<=0x5;_0x2e6003++){this[_0x2a0f88(0x3c6)](_0x2e6003);}},Window_ButtonAssist[_0x38ed9b(0x1d7)]['drawSegment']=function(_0x3d1c7e){const _0x43d9d5=_0x38ed9b,_0x4f6078=this['innerWidth']/0x5,_0x5e52cb=SceneManager[_0x43d9d5(0x134)],_0x37d4b2=_0x5e52cb[_0x43d9d5(0x513)['format'](_0x3d1c7e)](),_0x515b06=_0x5e52cb[_0x43d9d5(0x4cf)[_0x43d9d5(0x46c)](_0x3d1c7e)]();this[_0x43d9d5(0x585)][_0x43d9d5(0x65f)[_0x43d9d5(0x46c)](_0x3d1c7e)]=_0x37d4b2,this['_data'][_0x43d9d5(0x218)[_0x43d9d5(0x46c)](_0x3d1c7e)]=_0x515b06;if(_0x37d4b2==='')return;if(_0x515b06==='')return;const _0x173db3=_0x5e52cb[_0x43d9d5(0x195)['format'](_0x3d1c7e)](),_0x38d304=this[_0x43d9d5(0x452)](),_0x252cb8=_0x4f6078*(_0x3d1c7e-0x1)+_0x38d304+_0x173db3,_0x56df18=VisuMZ[_0x43d9d5(0x35b)][_0x43d9d5(0x222)][_0x43d9d5(0x516)]['TextFmt'];this[_0x43d9d5(0x10f)](_0x56df18[_0x43d9d5(0x46c)](_0x37d4b2,_0x515b06),_0x252cb8,0x0,_0x4f6078-_0x38d304*0x2);},VisuMZ[_0x38ed9b(0x4ed)]=function(_0x1ab63d){const _0x3f9ce4=_0x38ed9b;if(Utils[_0x3f9ce4(0x408)](_0x3f9ce4(0x1a3))){var _0x1c6f23=require(_0x3f9ce4(0xe3))[_0x3f9ce4(0x20b)]['get']();SceneManager[_0x3f9ce4(0x508)]();if(_0x1ab63d)setTimeout(_0x1c6f23[_0x3f9ce4(0xf7)][_0x3f9ce4(0x5f3)](_0x1c6f23),0x190);}},VisuMZ[_0x38ed9b(0x22c)]=function(_0x5cada0,_0xd63f94){const _0x52f6a3=_0x38ed9b;_0xd63f94=_0xd63f94['toUpperCase']();var _0x520594=1.70158,_0x5cfbc2=0.7;switch(_0xd63f94){case _0x52f6a3(0x142):return _0x5cada0;case'INSINE':return-0x1*Math[_0x52f6a3(0x104)](_0x5cada0*(Math['PI']/0x2))+0x1;case _0x52f6a3(0x639):return Math[_0x52f6a3(0x231)](_0x5cada0*(Math['PI']/0x2));case'INOUTSINE':return-0.5*(Math['cos'](Math['PI']*_0x5cada0)-0x1);case _0x52f6a3(0x11a):return _0x5cada0*_0x5cada0;case'OUTQUAD':return _0x5cada0*(0x2-_0x5cada0);case _0x52f6a3(0x566):return _0x5cada0<0.5?0x2*_0x5cada0*_0x5cada0:-0x1+(0x4-0x2*_0x5cada0)*_0x5cada0;case _0x52f6a3(0x269):return _0x5cada0*_0x5cada0*_0x5cada0;case _0x52f6a3(0x3e4):var _0x466686=_0x5cada0-0x1;return _0x466686*_0x466686*_0x466686+0x1;case _0x52f6a3(0x34f):return _0x5cada0<0.5?0x4*_0x5cada0*_0x5cada0*_0x5cada0:(_0x5cada0-0x1)*(0x2*_0x5cada0-0x2)*(0x2*_0x5cada0-0x2)+0x1;case _0x52f6a3(0x282):return _0x5cada0*_0x5cada0*_0x5cada0*_0x5cada0;case _0x52f6a3(0x5a4):var _0x466686=_0x5cada0-0x1;return 0x1-_0x466686*_0x466686*_0x466686*_0x466686;case _0x52f6a3(0x528):var _0x466686=_0x5cada0-0x1;return _0x5cada0<0.5?0x8*_0x5cada0*_0x5cada0*_0x5cada0*_0x5cada0:0x1-0x8*_0x466686*_0x466686*_0x466686*_0x466686;case _0x52f6a3(0x333):return _0x5cada0*_0x5cada0*_0x5cada0*_0x5cada0*_0x5cada0;case _0x52f6a3(0x615):var _0x466686=_0x5cada0-0x1;return 0x1+_0x466686*_0x466686*_0x466686*_0x466686*_0x466686;case _0x52f6a3(0x2cb):var _0x466686=_0x5cada0-0x1;return _0x5cada0<0.5?0x10*_0x5cada0*_0x5cada0*_0x5cada0*_0x5cada0*_0x5cada0:0x1+0x10*_0x466686*_0x466686*_0x466686*_0x466686*_0x466686;case _0x52f6a3(0x2e7):if(_0x5cada0===0x0)return 0x0;return Math[_0x52f6a3(0x579)](0x2,0xa*(_0x5cada0-0x1));case _0x52f6a3(0xa7):if(_0x5cada0===0x1)return 0x1;return-Math[_0x52f6a3(0x579)](0x2,-0xa*_0x5cada0)+0x1;case _0x52f6a3(0x34a):if(_0x5cada0===0x0||_0x5cada0===0x1)return _0x5cada0;var _0x5d8e6e=_0x5cada0*0x2,_0x8f727f=_0x5d8e6e-0x1;if(_0x5d8e6e<0x1)return 0.5*Math[_0x52f6a3(0x579)](0x2,0xa*_0x8f727f);return 0.5*(-Math[_0x52f6a3(0x579)](0x2,-0xa*_0x8f727f)+0x2);case _0x52f6a3(0x55a):var _0x5d8e6e=_0x5cada0/0x1;return-0x1*(Math[_0x52f6a3(0x3c9)](0x1-_0x5d8e6e*_0x5cada0)-0x1);case _0x52f6a3(0x5c4):var _0x466686=_0x5cada0-0x1;return Math['sqrt'](0x1-_0x466686*_0x466686);case'INOUTCIRC':var _0x5d8e6e=_0x5cada0*0x2,_0x8f727f=_0x5d8e6e-0x2;if(_0x5d8e6e<0x1)return-0.5*(Math[_0x52f6a3(0x3c9)](0x1-_0x5d8e6e*_0x5d8e6e)-0x1);return 0.5*(Math[_0x52f6a3(0x3c9)](0x1-_0x8f727f*_0x8f727f)+0x1);case _0x52f6a3(0x209):return _0x5cada0*_0x5cada0*((_0x520594+0x1)*_0x5cada0-_0x520594);case _0x52f6a3(0x28c):var _0x5d8e6e=_0x5cada0/0x1-0x1;return _0x5d8e6e*_0x5d8e6e*((_0x520594+0x1)*_0x5d8e6e+_0x520594)+0x1;break;case'INOUTBACK':var _0x5d8e6e=_0x5cada0*0x2,_0x339063=_0x5d8e6e-0x2,_0x41adcb=_0x520594*1.525;if(_0x5d8e6e<0x1)return 0.5*_0x5d8e6e*_0x5d8e6e*((_0x41adcb+0x1)*_0x5d8e6e-_0x41adcb);return 0.5*(_0x339063*_0x339063*((_0x41adcb+0x1)*_0x339063+_0x41adcb)+0x2);case _0x52f6a3(0x31b):if(_0x5cada0===0x0||_0x5cada0===0x1)return _0x5cada0;var _0x5d8e6e=_0x5cada0/0x1,_0x8f727f=_0x5d8e6e-0x1,_0x1413e6=0x1-_0x5cfbc2,_0x41adcb=_0x1413e6/(0x2*Math['PI'])*Math[_0x52f6a3(0x223)](0x1);return-(Math['pow'](0x2,0xa*_0x8f727f)*Math[_0x52f6a3(0x231)]((_0x8f727f-_0x41adcb)*(0x2*Math['PI'])/_0x1413e6));case _0x52f6a3(0x557):var _0x1413e6=0x1-_0x5cfbc2,_0x5d8e6e=_0x5cada0*0x2;if(_0x5cada0===0x0||_0x5cada0===0x1)return _0x5cada0;var _0x41adcb=_0x1413e6/(0x2*Math['PI'])*Math[_0x52f6a3(0x223)](0x1);return Math[_0x52f6a3(0x579)](0x2,-0xa*_0x5d8e6e)*Math[_0x52f6a3(0x231)]((_0x5d8e6e-_0x41adcb)*(0x2*Math['PI'])/_0x1413e6)+0x1;case _0x52f6a3(0xc6):var _0x1413e6=0x1-_0x5cfbc2;if(_0x5cada0===0x0||_0x5cada0===0x1)return _0x5cada0;var _0x5d8e6e=_0x5cada0*0x2,_0x8f727f=_0x5d8e6e-0x1,_0x41adcb=_0x1413e6/(0x2*Math['PI'])*Math[_0x52f6a3(0x223)](0x1);if(_0x5d8e6e<0x1)return-0.5*(Math[_0x52f6a3(0x579)](0x2,0xa*_0x8f727f)*Math['sin']((_0x8f727f-_0x41adcb)*(0x2*Math['PI'])/_0x1413e6));return Math['pow'](0x2,-0xa*_0x8f727f)*Math[_0x52f6a3(0x231)]((_0x8f727f-_0x41adcb)*(0x2*Math['PI'])/_0x1413e6)*0.5+0x1;case _0x52f6a3(0x48a):var _0x5d8e6e=_0x5cada0/0x1;if(_0x5d8e6e<0x1/2.75)return 7.5625*_0x5d8e6e*_0x5d8e6e;else{if(_0x5d8e6e<0x2/2.75){var _0x339063=_0x5d8e6e-1.5/2.75;return 7.5625*_0x339063*_0x339063+0.75;}else{if(_0x5d8e6e<2.5/2.75){var _0x339063=_0x5d8e6e-2.25/2.75;return 7.5625*_0x339063*_0x339063+0.9375;}else{var _0x339063=_0x5d8e6e-2.625/2.75;return 7.5625*_0x339063*_0x339063+0.984375;}}}case _0x52f6a3(0x25c):var _0x357ac4=0x1-VisuMZ[_0x52f6a3(0x22c)](0x1-_0x5cada0,_0x52f6a3(0x504));return _0x357ac4;case'INOUTBOUNCE':if(_0x5cada0<0.5)var _0x357ac4=VisuMZ['ApplyEasing'](_0x5cada0*0x2,'inbounce')*0.5;else var _0x357ac4=VisuMZ[_0x52f6a3(0x22c)](_0x5cada0*0x2-0x1,_0x52f6a3(0x504))*0.5+0.5;return _0x357ac4;default:return _0x5cada0;}},VisuMZ[_0x38ed9b(0x2f1)]=function(_0x34f921){const _0x2980f7=_0x38ed9b;_0x34f921=String(_0x34f921)[_0x2980f7(0x4f3)]();const _0x9c3e4f=VisuMZ[_0x2980f7(0x35b)][_0x2980f7(0x222)][_0x2980f7(0x665)];if(_0x34f921===_0x2980f7(0x2bc))return _0x9c3e4f[_0x2980f7(0x13f)];if(_0x34f921==='MAXMP')return _0x9c3e4f['IconParam1'];if(_0x34f921==='ATK')return _0x9c3e4f[_0x2980f7(0x2cc)];if(_0x34f921===_0x2980f7(0x482))return _0x9c3e4f['IconParam3'];if(_0x34f921===_0x2980f7(0x1e0))return _0x9c3e4f[_0x2980f7(0x5ed)];if(_0x34f921===_0x2980f7(0x3e1))return _0x9c3e4f[_0x2980f7(0x36c)];if(_0x34f921===_0x2980f7(0x616))return _0x9c3e4f[_0x2980f7(0x350)];if(_0x34f921===_0x2980f7(0x44c))return _0x9c3e4f['IconParam7'];if(_0x34f921===_0x2980f7(0x21a))return _0x9c3e4f[_0x2980f7(0x4e2)];if(_0x34f921===_0x2980f7(0x16c))return _0x9c3e4f[_0x2980f7(0x5ab)];if(_0x34f921===_0x2980f7(0x4e8))return _0x9c3e4f['IconXParam2'];if(_0x34f921===_0x2980f7(0x12c))return _0x9c3e4f['IconXParam3'];if(_0x34f921===_0x2980f7(0x47d))return _0x9c3e4f['IconXParam4'];if(_0x34f921===_0x2980f7(0x5a8))return _0x9c3e4f[_0x2980f7(0x392)];if(_0x34f921===_0x2980f7(0x608))return _0x9c3e4f['IconXParam6'];if(_0x34f921===_0x2980f7(0x5e2))return _0x9c3e4f[_0x2980f7(0x13e)];if(_0x34f921==='MRG')return _0x9c3e4f[_0x2980f7(0x64e)];if(_0x34f921===_0x2980f7(0x2c6))return _0x9c3e4f['IconXParam9'];if(_0x34f921===_0x2980f7(0x549))return _0x9c3e4f['IconSParam0'];if(_0x34f921===_0x2980f7(0x471))return _0x9c3e4f[_0x2980f7(0x5dd)];if(_0x34f921===_0x2980f7(0x2d6))return _0x9c3e4f[_0x2980f7(0x19a)];if(_0x34f921==='PHA')return _0x9c3e4f[_0x2980f7(0x245)];if(_0x34f921==='MCR')return _0x9c3e4f[_0x2980f7(0x263)];if(_0x34f921===_0x2980f7(0x3ac))return _0x9c3e4f[_0x2980f7(0x2d8)];if(_0x34f921===_0x2980f7(0x502))return _0x9c3e4f[_0x2980f7(0x164)];if(_0x34f921===_0x2980f7(0x158))return _0x9c3e4f['IconSParam7'];if(_0x34f921===_0x2980f7(0x654))return _0x9c3e4f[_0x2980f7(0x29c)];if(_0x34f921==='EXR')return _0x9c3e4f[_0x2980f7(0x54c)];if(VisuMZ[_0x2980f7(0x35b)][_0x2980f7(0x379)][_0x34f921])return VisuMZ['CoreEngine'][_0x2980f7(0x379)][_0x34f921]||0x0;return 0x0;},VisuMZ[_0x38ed9b(0x41b)]=function(_0x818475,_0x4d41d5,_0x1e8d46){const _0x34792e=_0x38ed9b;if(_0x1e8d46===undefined&&_0x818475%0x1===0x0)return _0x818475;if(_0x1e8d46!==undefined&&[_0x34792e(0x2bc),_0x34792e(0x2ba),_0x34792e(0x30b),'DEF',_0x34792e(0x1e0),_0x34792e(0x3e1),'AGI','LUK'][_0x34792e(0x4f2)](String(_0x1e8d46)['toUpperCase']()[_0x34792e(0x492)]()))return _0x818475;return _0x4d41d5=_0x4d41d5||0x0,String((_0x818475*0x64)[_0x34792e(0x574)](_0x4d41d5))+'%';},VisuMZ[_0x38ed9b(0x1cf)]=function(_0x19df24){const _0x346b5e=_0x38ed9b;_0x19df24=String(_0x19df24);if(!_0x19df24)return _0x19df24;if(typeof _0x19df24!==_0x346b5e(0xe7))return _0x19df24;const _0x31a5a4=VisuMZ[_0x346b5e(0x35b)][_0x346b5e(0x222)][_0x346b5e(0xb0)]['DigitGroupingLocale']||_0x346b5e(0x28f),_0x57455b={'maximumFractionDigits':0x6};_0x19df24=_0x19df24[_0x346b5e(0x2f4)](/\[(.*?)\]/g,(_0x3b52d8,_0xa021f7)=>{const _0x2b1025=_0x346b5e;return VisuMZ[_0x2b1025(0x679)](_0xa021f7,'[',']');}),_0x19df24=_0x19df24[_0x346b5e(0x2f4)](/<(.*?)>/g,(_0x3e8799,_0x1c644d)=>{const _0x6b801e=_0x346b5e;return VisuMZ[_0x6b801e(0x679)](_0x1c644d,'<','>');}),_0x19df24=_0x19df24[_0x346b5e(0x2f4)](/\{\{(.*?)\}\}/g,(_0x46bcc0,_0x30c379)=>{return VisuMZ['PreserveNumbers'](_0x30c379,'','');}),_0x19df24=_0x19df24[_0x346b5e(0x2f4)](/(\d+\.?\d*)/g,(_0x188dd3,_0xc370e9)=>{const _0x38723e=_0x346b5e;let _0x4b8760=_0xc370e9;if(_0x4b8760[0x0]==='0')return _0x4b8760;if(_0x4b8760[_0x4b8760['length']-0x1]==='.')return Number(_0x4b8760)[_0x38723e(0x677)](_0x31a5a4,_0x57455b)+'.';else return _0x4b8760[_0x4b8760['length']-0x1]===','?Number(_0x4b8760)[_0x38723e(0x677)](_0x31a5a4,_0x57455b)+',':Number(_0x4b8760)[_0x38723e(0x677)](_0x31a5a4,_0x57455b);});let _0x55fbcc=0x3;while(_0x55fbcc--){_0x19df24=VisuMZ['RevertPreserveNumbers'](_0x19df24);}return _0x19df24;},VisuMZ[_0x38ed9b(0x679)]=function(_0x50fd33,_0x4952a7,_0x50db18){const _0x592b61=_0x38ed9b;return _0x50fd33=_0x50fd33['replace'](/(\d)/gi,(_0x45c92d,_0x453cd9)=>_0x592b61(0x13a)[_0x592b61(0x46c)](Number(_0x453cd9))),_0x592b61(0x643)['format'](_0x50fd33,_0x4952a7,_0x50db18);},VisuMZ[_0x38ed9b(0x254)]=function(_0x274194){return _0x274194=_0x274194['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x3bddd0,_0x5402b0)=>Number(parseInt(_0x5402b0))),_0x274194;},VisuMZ[_0x38ed9b(0x43a)]=function(_0x3476f5){const _0x1c6af5=_0x38ed9b;SoundManager[_0x1c6af5(0x420)]();if(!Utils[_0x1c6af5(0x20d)]()){const _0x3f9fd6=window['open'](_0x3476f5,'_blank');}else{const _0x35f532=process['platform']==_0x1c6af5(0x124)?_0x1c6af5(0x287):process[_0x1c6af5(0x543)]==_0x1c6af5(0x556)?_0x1c6af5(0x2e5):_0x1c6af5(0x22e);require(_0x1c6af5(0x4b4))[_0x1c6af5(0x377)](_0x35f532+'\x20'+_0x3476f5);}},Game_Picture['prototype'][_0x38ed9b(0x3fb)]=function(){return this['_anchor'];},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0xc3)]=Game_Picture[_0x38ed9b(0x1d7)]['initBasic'],Game_Picture['prototype'][_0x38ed9b(0x1c5)]=function(){const _0x3ff477=_0x38ed9b;VisuMZ['CoreEngine'][_0x3ff477(0xc3)][_0x3ff477(0x434)](this),this[_0x3ff477(0x267)]={'x':0x0,'y':0x0},this[_0x3ff477(0x4e3)]={'x':0x0,'y':0x0};},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x4e5)]=Game_Picture[_0x38ed9b(0x1d7)]['updateMove'],Game_Picture['prototype'][_0x38ed9b(0x5f1)]=function(){const _0x118909=_0x38ed9b;this[_0x118909(0x2f8)](),VisuMZ[_0x118909(0x35b)][_0x118909(0x4e5)][_0x118909(0x434)](this);},VisuMZ['CoreEngine'][_0x38ed9b(0x230)]=Game_Picture[_0x38ed9b(0x1d7)][_0x38ed9b(0x293)],Game_Picture[_0x38ed9b(0x1d7)]['show']=function(_0x49ad77,_0x3cf5fe,_0x1770a8,_0x31f47e,_0x2885ef,_0x3a99ee,_0x43d972,_0x27a5bb){const _0x1beea7=_0x38ed9b;VisuMZ[_0x1beea7(0x35b)][_0x1beea7(0x230)][_0x1beea7(0x434)](this,_0x49ad77,_0x3cf5fe,_0x1770a8,_0x31f47e,_0x2885ef,_0x3a99ee,_0x43d972,_0x27a5bb),this[_0x1beea7(0x33f)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3cf5fe]||{'x':0x0,'y':0x0});},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x19b)]=Game_Picture[_0x38ed9b(0x1d7)][_0x38ed9b(0x112)],Game_Picture[_0x38ed9b(0x1d7)][_0x38ed9b(0x112)]=function(_0xef7242,_0x2ddd3f,_0x337686,_0x47fd2e,_0xe4917d,_0xcf04ec,_0x594311,_0x5c777e,_0x3b48db){const _0x19feb3=_0x38ed9b;VisuMZ['CoreEngine']['Game_Picture_move']['call'](this,_0xef7242,_0x2ddd3f,_0x337686,_0x47fd2e,_0xe4917d,_0xcf04ec,_0x594311,_0x5c777e,_0x3b48db),this[_0x19feb3(0xcf)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0xef7242]||{'x':0x0,'y':0x0});},Game_Picture['prototype'][_0x38ed9b(0x2f8)]=function(){const _0x4bb432=_0x38ed9b;this['_duration']>0x0&&(this[_0x4bb432(0x267)]['x']=this[_0x4bb432(0x422)](this[_0x4bb432(0x267)]['x'],this['_targetAnchor']['x']),this[_0x4bb432(0x267)]['y']=this[_0x4bb432(0x422)](this['_anchor']['y'],this[_0x4bb432(0x4e3)]['y']));},Game_Picture[_0x38ed9b(0x1d7)][_0x38ed9b(0x33f)]=function(_0x484c58){const _0x3c7bc4=_0x38ed9b;this[_0x3c7bc4(0x267)]=_0x484c58,this[_0x3c7bc4(0x4e3)]=JsonEx[_0x3c7bc4(0x103)](this['_anchor']);},Game_Picture[_0x38ed9b(0x1d7)][_0x38ed9b(0xcf)]=function(_0x39b8d4){this['_targetAnchor']=_0x39b8d4;},VisuMZ['CoreEngine']['Sprite_Picture_updateOrigin']=Sprite_Picture[_0x38ed9b(0x1d7)]['updateOrigin'],Sprite_Picture[_0x38ed9b(0x1d7)][_0x38ed9b(0x32b)]=function(){const _0x392de0=_0x38ed9b,_0x4e9d45=this['picture']();!_0x4e9d45[_0x392de0(0x3fb)]()?VisuMZ['CoreEngine'][_0x392de0(0x503)][_0x392de0(0x434)](this):(this['anchor']['x']=_0x4e9d45[_0x392de0(0x3fb)]()['x'],this[_0x392de0(0x3fb)]['y']=_0x4e9d45[_0x392de0(0x3fb)]()['y']);},Game_Action['prototype']['setEnemyAction']=function(_0x3b1371){const _0x15db87=_0x38ed9b;if(_0x3b1371){const _0xd9870d=_0x3b1371['skillId'];if(_0xd9870d===0x1&&this['subject']()['attackSkillId']()!==0x1)this['setAttack']();else _0xd9870d===0x2&&this['subject']()[_0x15db87(0x5ea)]()!==0x2?this[_0x15db87(0x30a)]():this[_0x15db87(0x518)](_0xd9870d);}else this[_0x15db87(0x3c0)]();},Game_Actor[_0x38ed9b(0x1d7)][_0x38ed9b(0x3ed)]=function(){const _0xf59bca=_0x38ed9b;return this[_0xf59bca(0x338)]()[_0xf59bca(0x35c)](_0x44a43f=>this[_0xf59bca(0x4cc)](_0x44a43f)&&this[_0xf59bca(0x29a)]()[_0xf59bca(0x4f2)](_0x44a43f[_0xf59bca(0x178)]));},Window_Base['prototype'][_0x38ed9b(0x365)]=function(){const _0x5ddf75=_0x38ed9b;this[_0x5ddf75(0x4c0)]=new Sprite(),this['_dimmerSprite']['bitmap']=new Bitmap(0x0,0x0),this[_0x5ddf75(0x4c0)]['x']=0x0,this[_0x5ddf75(0x466)](this[_0x5ddf75(0x4c0)]);},Window_Base['prototype'][_0x38ed9b(0x427)]=function(){const _0x41ac97=_0x38ed9b;if(this[_0x41ac97(0x4c0)]){const _0x526ea9=this[_0x41ac97(0x4c0)][_0x41ac97(0x210)],_0x531625=this[_0x41ac97(0x3dc)],_0x2babe7=this['height'],_0x42da97=this[_0x41ac97(0x26a)],_0x3c5ca3=ColorManager[_0x41ac97(0x2a6)](),_0x8cc659=ColorManager['dimColor2']();_0x526ea9[_0x41ac97(0x105)](_0x531625,_0x2babe7),_0x526ea9[_0x41ac97(0x617)](0x0,0x0,_0x531625,_0x42da97,_0x8cc659,_0x3c5ca3,!![]),_0x526ea9['fillRect'](0x0,_0x42da97,_0x531625,_0x2babe7-_0x42da97*0x2,_0x3c5ca3),_0x526ea9[_0x41ac97(0x617)](0x0,_0x2babe7-_0x42da97,_0x531625,_0x42da97,_0x3c5ca3,_0x8cc659,!![]),this[_0x41ac97(0x4c0)][_0x41ac97(0x50a)](0x0,0x0,_0x531625,_0x2babe7);}},Game_Actor[_0x38ed9b(0x1d7)][_0x38ed9b(0x438)]=function(){const _0x583ab7=_0x38ed9b;for(let _0x6f1b84=0x0;_0x6f1b84<this[_0x583ab7(0x169)]();_0x6f1b84++){const _0x190013=this[_0x583ab7(0x63b)]();let _0x405606=Number['MIN_SAFE_INTEGER'];this[_0x583ab7(0x10a)](_0x6f1b84,_0x190013[0x0]);for(const _0x58d660 of _0x190013){const _0x2dc4c7=_0x58d660[_0x583ab7(0x5c2)]();_0x2dc4c7>_0x405606&&(_0x405606=_0x2dc4c7,this[_0x583ab7(0x10a)](_0x6f1b84,_0x58d660));}}this['setActionState']('waiting');},Window_BattleItem[_0x38ed9b(0x1d7)][_0x38ed9b(0x1e4)]=function(_0x3b1626){const _0x43f6d1=_0x38ed9b;return BattleManager[_0x43f6d1(0x367)]()?BattleManager[_0x43f6d1(0x367)]()[_0x43f6d1(0x4cc)](_0x3b1626):Window_ItemList[_0x43f6d1(0x1d7)][_0x43f6d1(0x1e4)][_0x43f6d1(0x434)](this,_0x3b1626);},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x477)]=Scene_Map[_0x38ed9b(0x1d7)][_0x38ed9b(0x657)],Scene_Map[_0x38ed9b(0x1d7)][_0x38ed9b(0x657)]=function(){const _0x37189a=_0x38ed9b;VisuMZ['CoreEngine'][_0x37189a(0x477)]['call'](this);const _0x4faba0=this[_0x37189a(0x2dc)][_0x37189a(0x65e)];if(_0x4faba0)this[_0x37189a(0x139)](_0x4faba0);},VisuMZ[_0x38ed9b(0x35b)][_0x38ed9b(0x42c)]=Scene_Battle[_0x38ed9b(0x1d7)]['createSpriteset'],Scene_Battle[_0x38ed9b(0x1d7)]['createSpriteset']=function(){const _0x3f264a=_0x38ed9b;VisuMZ['CoreEngine']['Scene_Battle_createSpriteset'][_0x3f264a(0x434)](this);const _0x56387a=this[_0x3f264a(0x2dc)]['_timerSprite'];if(_0x56387a)this[_0x3f264a(0x139)](_0x56387a);},Sprite_Actor[_0x38ed9b(0x1d7)][_0x38ed9b(0x5ba)]=function(){const _0xe16eb5=_0x38ed9b;Sprite_Battler[_0xe16eb5(0x1d7)][_0xe16eb5(0x5ba)][_0xe16eb5(0x434)](this),this[_0xe16eb5(0x393)]();if(this['_actor'])this['updateMotion']();else this[_0xe16eb5(0x36e)]!==''&&(this[_0xe16eb5(0x36e)]='');},Window[_0x38ed9b(0x1d7)]['_refreshArrows']=function(){const _0x57ad4f=_0x38ed9b,_0x5653c2=this[_0x57ad4f(0x205)],_0x5c9ada=this[_0x57ad4f(0x4b6)],_0x43560d=0x18,_0x295f7a=_0x43560d/0x2,_0x367e45=0x60+_0x43560d,_0x1cd07c=0x0+_0x43560d;this[_0x57ad4f(0xa0)]['bitmap']=this[_0x57ad4f(0x5b5)],this[_0x57ad4f(0xa0)][_0x57ad4f(0x3fb)]['x']=0.5,this['_downArrowSprite'][_0x57ad4f(0x3fb)]['y']=0.5,this[_0x57ad4f(0xa0)][_0x57ad4f(0x50a)](_0x367e45+_0x295f7a,_0x1cd07c+_0x295f7a+_0x43560d,_0x43560d,_0x295f7a),this[_0x57ad4f(0xa0)][_0x57ad4f(0x112)](Math[_0x57ad4f(0x343)](_0x5653c2/0x2),Math[_0x57ad4f(0x343)](_0x5c9ada-_0x295f7a)),this['_upArrowSprite'][_0x57ad4f(0x210)]=this[_0x57ad4f(0x5b5)],this[_0x57ad4f(0x54b)][_0x57ad4f(0x3fb)]['x']=0.5,this[_0x57ad4f(0x54b)][_0x57ad4f(0x3fb)]['y']=0.5,this[_0x57ad4f(0x54b)][_0x57ad4f(0x50a)](_0x367e45+_0x295f7a,_0x1cd07c,_0x43560d,_0x295f7a),this['_upArrowSprite'][_0x57ad4f(0x112)](Math[_0x57ad4f(0x343)](_0x5653c2/0x2),Math[_0x57ad4f(0x343)](_0x295f7a));},Window[_0x38ed9b(0x1d7)][_0x38ed9b(0x5f4)]=function(){const _0x23f65f=_0x38ed9b,_0x70c290=0x90,_0x26785e=0x60,_0xc285c2=0x18;this['_pauseSignSprite'][_0x23f65f(0x210)]=this[_0x23f65f(0x5b5)],this[_0x23f65f(0x2c4)][_0x23f65f(0x3fb)]['x']=0.5,this[_0x23f65f(0x2c4)]['anchor']['y']=0x1,this['_pauseSignSprite'][_0x23f65f(0x112)](Math[_0x23f65f(0x343)](this['_width']/0x2),this[_0x23f65f(0x4b6)]),this[_0x23f65f(0x2c4)][_0x23f65f(0x50a)](_0x70c290,_0x26785e,_0xc285c2,_0xc285c2),this[_0x23f65f(0x2c4)][_0x23f65f(0x34e)]=0x0;},Window[_0x38ed9b(0x1d7)]['_updateFilterArea']=function(){const _0x51a29c=_0x38ed9b,_0x5b8c71=this[_0x51a29c(0x673)]['worldTransform'][_0x51a29c(0x45b)](new Point(0x0,0x0)),_0x1cecfb=this[_0x51a29c(0x673)][_0x51a29c(0x2d5)];_0x1cecfb['x']=_0x5b8c71['x']+this[_0x51a29c(0x46f)]['x'],_0x1cecfb['y']=_0x5b8c71['y']+this[_0x51a29c(0x46f)]['y'],_0x1cecfb[_0x51a29c(0x3dc)]=Math[_0x51a29c(0x612)](this[_0x51a29c(0x360)]*this[_0x51a29c(0x1b9)]['x']),_0x1cecfb[_0x51a29c(0x2bb)]=Math[_0x51a29c(0x612)](this[_0x51a29c(0x330)]*this[_0x51a29c(0x1b9)]['y']);};