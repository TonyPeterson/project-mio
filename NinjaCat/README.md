# Prerequisites
1. Install [NodeJS][1]
2. Open a command prompt and navigate to the project's root directory (where you cloned the repository)
3. Run the command `npm install` to install grunt and its plugins

# Basic Build (debug)
Run `grunt` from the project's root directory.

# Ship build (minifies JS and CSS)
Run `grunt ship`

# Other Tasks
- Run `grunt watch` to start watching for any changes to automatically be built.

# Running server locally
- Run the command `npm install -g nodemon` to install nodemon
- Run the command `nodemon` to start the webserver. It will automatically restart when changes are detected from a rebuild.

# Deploying to Azure
- The repository is ready to be linked to an Azure Website. It's ideal to create a branch named "azure" that will autodeploy.

# Adding Generic Sprites to a Level Definition

Requires [TexturePacker Pro][2] and installation of TexturePacker command line tools.

Here is the syntax for adding generic sprites to the game:

## Single Image Sprite

The create a single image sprite, just use the type ‘sprite’ and provide a key and frame to select the image to be shown.

	{
	    // tells the level engine that this is animated
	    type: 'sprite',
	
	    // the name of the image that contains the sprite (this corresponds
	    // to a subfolder of /sprites
	    key: 'platform_landscape_misc',
	
	    // the name of the frame that should be displayed (this will be the
	    // filename of the image you want to show, with no extension
	    key: 'mountains_01'
	}

## Animated Sprite

To create an animated sprite, add an object with type set to `animatedsprite` and provide a frameSet. Valid values for frameSet are all defined in FrameSets.js.

	{
	    // tells the level engine that this is animated 
	    type: 'animatedsprite',
	
	    // tells the level engine which sprite sequence to use
	    frameSet: 'palm_breathe',
	
	    // the framerate for the animation (defaults to 30)
	    fps: 30,
	}

## Interactive (Collidable) Sprite

To create a simple sprite with a physics body that supports collision, set type to `collidable` and provide either a frameSet (for an animated sprite) or a key and frame combination (for a regular, non-animated sprite).

	{
		   // tells the level engine that this is a collision sprite
	   type: 'collidable',
	
	   // provide a frameSet for animated sprites or key/frame for images
	   frameSet: 'plant02', 
	
	   bodyOffset: {
	       // modify the width of the collision body by this many pixels
	       width: -100,
	
	       // modify the height of the collission body by this many pixels
	       height: -100,
	   },
	}

## Shared Options

The following options can be set on any sprite (animated or otherwise).

	{
	    // position relative to the game or the parent group
	    x: 5600,
	    y: 1900,
	
	    // [optional] the anchor point of the sprite (used for positioning, scaling 
	    // and rotation), specified as a number between 0 and 1 that is relative to 
	    // dimensions of the sprit itself
	    anchor: {
	        x: 0.5,
	        y: 0.5
	    },
	
	    // [optional] change the rotation, scale or opacity of the sprite
	    angle: 0,
	    scale: 1,
	    alpha: 1,
	
	    // used for calculating the sprites parallax movement
	    backgroundDistance: 0
	}
	
## Grunt task

Run `grunt sprites`

[1]:	http://nodejs.org/
[2]:	https://www.codeandweb.com/texturepacker
