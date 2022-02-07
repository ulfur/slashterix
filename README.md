# slashterix-templates
the comment based "template system" for ES6

It leverages ES6 template strings to allow you to write HTML templates directly in javascript functions as comments. For example:

```
element.innerHTML = /*template with data
	<ul>
		for item in data
        	if item.size === 'large' then
            	<li class="icn-big">${item.title}</li>
            else
            	<li class="icn-small">${item.title}</li>
            endif
        endfor
     </ul>

```

slashterix-templates may or may not be a good idea but can be useful if you are writing a pure js component and need a small amount of basic templating. The idea is based on template strings and effectively adds nothing but "syntactic sugar". It requires a pre-processor to parse the js files and convert ```/*templates``` into template strings and slashtrix flow statements. Currently a pre-processor has only been developed for gulp.

To integrate in your gulp workflow:

```
	npm install slashterix-templates --save-dev
```

* Require slashterix-templates in your gulpile
* Call slashterix.parse to convert comments to templates
* Call slashterix.use to inject the template flow logic
* Enjoy

```
const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const slashterix = require('slashterix-templates');

const jsBundle = () =>
  src([ 'file1.js', 'file2.js', ...]))
  .pipe(slashterix.parse())  // Process slashterix templates file by file, quicker
  .pipe(concat('main.js')) 	 // Concat everything
  .pipe(slashterix.use()) 	 // Inject slashterix parser
  .pipe(dest('dist/js'));	 // That's it!

function defaultTask(cb) {
  return jsBundle();
}

exports.default = defaultTask
```
