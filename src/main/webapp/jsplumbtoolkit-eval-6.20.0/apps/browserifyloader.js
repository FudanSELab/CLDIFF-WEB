const browserify = require("browserify")
const fs = require('fs')
const aaa = browserify("./app.js", {
    debug: true,
    standalone: "util"
})
const bbb = aaa.transform(['babelify', { compact: false }], {
    global: true,
    // ignore: [/\/node_modules\/(?!@vizuaalog\/)/],
    presets: [
        ["@babel/preset-env", {
            modules: "amd" // Convert to AMD format
        }],
        "@babel/preset-react"
    ]
})
bbb.bundle().on('error', function(err) {
    console.log(err);
}).pipe(fs.createWriteStream('./out.js')).on('end', function() {
    console.log('finished writing the browserify file');
});