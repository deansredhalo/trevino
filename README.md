![Rick Trevino](https://universocountrybrasil.files.wordpress.com/2012/07/rick-trevino-ucb-universo-country-brasil.jpg?w=676) 

# Trevino [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

### Import your Tritt-based custom elements

Trevino is a simple tool to allow you to import your custom Tritt elements into your page and have them live completely autonomously. Tritt and the Trevino is built on top of Google's [webcomponentsjs](https://www.github.com/webcomponents/webcomponentsjs) polyfills.

Like all of my current projects, it's named after a 90s era country star, this one being named after Rick Trevino.

## Installation

Installation is simplest by using [Bower](http://www.bower.io) with the following command
	
	$ bower install trevino --save

to ensure that Trevino is saved in your application's dependencies.  Trevino will be automatically installed into your `bower_components` directory, along with Tritt's own dependencies.

Once installation is completed, you can import Trevino and webcomponentsjs polyfill into the page by placing the following lines in the HEAD of your HTML file

```html
<script src="bower_components/tritt/bower_components/webcomponentsjs/webcomponents.js"></script>
<script type="text/javascript" src="bower_components/trevino/trevino.js"></script>
```

At the end of your body, right before the closing **BODY** tag, import Tritt.

```html
<script type="text/javascript" src="bower_components/tritt/tritt.js"></script>
```

You're ready to roll at this point.

## Usage

After including Trevino, you'll want to run the import of your custom element.

```html
<link rel="import" href="path/to/custom-element.html">
```

Now you can use your custom element in your page's BODY anywhere you'd like, free with distributed content.

```html
<custom-element>
	<span>This content will be placed inside the rendered custom element!</span>
</custom-element>
```

### Formatting your custom element

There are a few standards that you should adhere to when making a standalone custom element with Tritt if you want Trevino to parse it correctly.  First, avoid unncessary markup. Check out the example below:

```html
<script src="../bower_components/object.observe/dist/object-observe.min.js"></script>
<script type="text/javascript" src="../bower_components/tritt/tritt.js"></script>
<custom-element shadow style="style.css">
	<content></content>
</custom-element>
<script type="text/javascript" src="custom-element.js"></script>
```

Notice the lack of traditional HTML markup tags such as HTML, HEAD, BODY, etc.  Trevino is going to ignore these, so they are not necessary.  It also necessary to place your Tritt Javascript in a **separate .js file and __include it at the end of the file.__**

That's about it! Trevino will take care of the rest and will drop your element in with full functionality into your page.
