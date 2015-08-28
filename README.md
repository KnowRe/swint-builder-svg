# swint-builder-svg
SVG sprite builder for Swint

**Warning: This is not the final draft yet, so do not use this until its official version is launched**

## Installation
```sh
$ npm install --save swint-builder-svg
```

## Options
* `name` : `String`, default: `Project`
* `inDir` : `String`, default: `path.dirname(require.main.filename)`
* `outDir` : `String`, default: `path.join(path.dirname(require.main.filename), '../out')`
* `walkOption` : `Object`, default: `{ ext: 'svg' }`

## Usage
```javascript
buildSVG({
	name: 'Test',
	inDir: path.join(__dirname, 'png'),
	outDir: path.join(__dirname, 'out')
}, function() {
	// Build complete
});
```
