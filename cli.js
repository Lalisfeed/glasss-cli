#!/usr/bin/node
'use strict'
const fs = require('fs')
const path = require('path')
const clr = require('colors')
let pjson = require('./package.json')
// console.log(clr)
const args = process.argv.slice(2)

const pkgJX = (argx) => {
    return `{
  "name": "${argx}",
  "version": "1.0.0",
  "main": "app.js",
  "keywords": [],
  "scripts": {
    "start": "node app.js",
    "test": "echo 'Error: no test specified' && exit 1"
  },
  "dependencies": {
    "glasss": "^1.1.3"
  },
  "author": "Lali Akhil Raj",
  "license": "MIT",
  "description": ""
}
`
}

const indEX = (argx) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>`+ argx +`</title>
</head>
<body background="#333">
    <div class="glasscss">
        <h1>HELLO WORLD :)</h1>
    </div>

    <div class="class1">
        <h1>HELLO WORLD :)</h1>
    </div>

    <div class="class2">
        <h1>HELLO WORLD :)</h1>
    </div>

    <div class="class3">
        <h1>HELLO WORLD :)</h1>
    </div>

    <script src="./app.js"></script>
</body>
</html>`
}

const appJS = (argx) => {
    return  `import { glasscss, glassClass } from "glasss"

glasscss({
    back_ground: "rgba( 255, 255, 255, 0.25)", // alphalimit at [0 - 1] 
    backdrop_filter: "4px", // filter limit at [0.0 - 20.0] recommended
    border_radius: "10px", // 10px is recommended
    border_wide: true, // true for best results
    color_value: "white", // your color
    margin_value: "10px", // your value 
    padding_value: "10px", // your value 
});

glassClass({
    "class1": {
        back_ground: "rgba( 255, 255 , 255, 0.25)", 
        backdrop_filter: "5px", 
        border_radius: "0px", 
        border_wide: true, 
        color_value: "white", 
        margin_value: "0px", 
        padding_value: "0px"
    },
    "class2": {
        back_ground: "rgba( 225, 0, 0, 0.42)", 
        backdrop_filter: "10px", 
        border_radius: "10px", 
        border_wide: false, 
        color_value: "yellow", 
        margin_value: "10px", 
        padding_value: "10px"
    }, 
    "class3": {
        back_ground: "rgba( 0, 100, 255, 0.75)", 
        backdrop_filter: "10px", 
        border_radius: "10px", 
        border_wide: true, 
        color_value: "white", 
        margin_value: "20px", 
        padding_value: "20px"
    }
});
// Have a great day :)`
}



if (args.length == 1 && (args[0] === "--help" || args[0] === "-h")) {
    console.log("----------"+ " glasss-cli ".green + "----------")
    console.log("A " + "Command Line Interface".yellow + " for the "+ "glasss".green + " NPM package.")
    console.log("Usage:".yellow + " glasss [OPTION]... [DIRECTORY]...".white)
    console.log(" ")
    console.log("Here are the list of ways for using the " + "glasss-cli".green)
    console.log("  [OPTION]...                  [INFO]...") 
    console.log("  init                       - This will create a glasss app in the current working directory.") 
    console.log("  create-app [DIRECTORY]...  - This will create a glasss app with the arguments as directory name .")
    console.log("  -h,      --help      display help and exit")
    console.log("  -v,      --version      display version and exit")
    console.log(" ")
    console.log(" ")
    console.log(" ")
    console.log("glasss-cli v".green + pjson.version.green)
    console.log("For more details visit https://github.com/Lalisfeed/glasss-cli/ ".white)
    console.log("MIT License.".white)
}
else if (args.length == 1 && args[0] === "--version") {
    console.log("glass-cli".yellow + " version " + pjson.version.green)
    console.log(" ")
}
else if (args.length == 1 && args[0] === "-v") {
    console.log(pjson.version)
}

// create a file
else if (args.length == 1 && args[0] === "init") {
    console.log(args[0]) 
    console.log(path.basename(process.cwd())) 
    let door = path.basename(process.cwd())
    fs.writeFileSync(__dirname + "/index.html", indEX(door));
    fs.writeFileSync(__dirname + "/package.json", pkgJX(door));
    fs.writeFileSync(__dirname + "/app.js", appJS(door));
 
}
else if (args.length == 1 && args[0] === "create-app") {
    console.log("Usage :".red +" glasss create-app " + "[DIRECTORY]...")
    console.log(" ")
    console.log("For Example:".white)
    console.log("> glasss create-app dir1 dir2 dir3".white)
    console.log(" ")
    console.log("NOTE: You can create as many as directories you want. Seperate them with spaces.")
}
// create a directory
else if (args.length >= 2 && args[0] === "create-app") {
    args.forEach((arg, ind) => {
        if (ind > 0) {
            // accessing input dirnames
            // console.log(arg + " " + ind)
            // create a directory with given name
            fs.mkdir(path.join(__dirname, arg), err => {
                if (err) {
                    if (err.code == "EEXIST") {
                        console.log(":/ ".red +  arg.red + " directory already exists.")
                    }
                    else {
                        console.log(":/ UnCaught Error.".red)
                        console.log("Please raise an issue at https://github.com/Lalisfeed/glasss-cli/issues/new")
                    }
                }
                else {
                    console.log(":) ".green + "Created " + arg.green + " glasss application.")
                    fs.writeFileSync(__dirname +"/"+  arg + "/index.html", indEX(arg));
                    fs.writeFileSync(__dirname +"/"+  arg + "/package.json", pkgJX(arg));
                    fs.writeFileSync(__dirname +"/"+ arg + "/app.js", appJS(arg));
                }
            })
        }
    }) 
}
else if (args.length <= 1) {
    console.log("glasss: Invalid Option.".white)
    console.log("Try 'glasss --help' for more information.".white)
    console.log(" ")
}