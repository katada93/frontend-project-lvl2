install: 
	npm install
gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run