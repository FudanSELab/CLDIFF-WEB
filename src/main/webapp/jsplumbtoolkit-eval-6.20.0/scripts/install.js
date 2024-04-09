const g = require('./gatlight')
const childProcess = require('child_process')
const p = require('../package.json')
const c = require('./common')

function install(base, app, lib) {

    const libs = lib === c.VANILLA ? [c.VANILLA, c.TS, c.ES5, c.ES6] : [lib]

    libs.forEach(l => {
        const appDir = `./${base}/${app}`,
            libDir = `${appDir}/${l}`

        if (g.exists(libDir)) {
            try {
                childProcess.execSync("npm i", { cwd: libDir, env: process.env, stdio: 'inherit' })
                console.log(`Installed dependencies in ${libDir}`)
            } catch (e) {
                console.log(`Could not install dependencies in ${libDir}`)
            }
        } else {
            //console.log(`${libDir} not found`)
        }
    })
}


const lib = process.argv[2]

g.ls(`./${c.APP_ROOT}`).forEach(d => {
    if (d != 'image-processor') {
        return;
    }
    if (lib == null) {
        console.log(`Installing dependencies for all libs for app ${d}`)
            // console.log(p)
            // console.log(p.scripts)
            // p.dependencies.forEach(lib => {
        install(c.APP_ROOT, d, '@jsplumbtoolkit/browser-ui-react')
            // })
    } else {
        install(c.APP_ROOT, d, lib)
    }

})

// g.ls(`./${c.FEATURE_DEMO_ROOT}`).forEach(d => {
//     if (d == '.DS_Store') {
//         return;
//     }
//     if (lib == null) {
//         console.log(`Installing dependencies for all libs for app ${d}`)
//         install(c.APP_ROOT, d, '@jsplumbtoolkit/browser-ui-react')
//             // p.libs.forEach(lib => {
//             //     install(c.FEATURE_DEMO_ROOT, d, lib)
//             // })
//     } else {
//         // install(c.FEATURE_DEMO_ROOT, d, lib)
//     }

// })