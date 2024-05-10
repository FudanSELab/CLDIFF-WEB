# tsc --outFile bundle2.js ./model/basic.ts ./model/filters.ts  ./model/inputs.ts ./model/math.ts ./model/transforms.ts app.ts definitions.ts generate-templates.ts inspector.ts native-drop-handler.ts palette.ts process.ts


# browserify ./model/basic.js ./model/filters.js ./model/inputs.js ./model/math.js ./model/transforms.js  app.js definitions.js generate-templates.js inspector.js native-drop-handler.js palette.js process.js > bundle2.js
# tsc --outFile bundle2.js
# tsc xxx.ts
./node_modules/.bin/esbuild app.js --bundle --outfile=out.js
browserify app.js -o out.js
npm run build



