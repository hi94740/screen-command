const term = require('terminal-kit')
const shell = require('shelljs')
const fs = require('fs')

const exit = _ => term.terminal.processExit()

const ls = shell.exec("screen -ls",{silent:true}).split("\n").map(l => l.trim())
ls.pop()
ls.pop()
ls.shift()
ls.unshift("+ Start a new screen...")

function saveCommand(c) {
  fs.writeFileSync("/home/pi/Scripts/screen-command.sh",c,{mode:0777})
}

module.exports = _ => {
  term.terminal.blue("\nThere are ").green(ls.length - 1).blue(" running screens: ")
  term.terminal.singleColumnMenu(ls,{cancelable:true}).promise.then(result => {
    if (result.canceled) {
      saveCommand("")
      exit()
    } else {
      result = result.selectedText
      if (result == "+ Start a new screen...") {
        term.terminal.blue("\nEnter a name for new screen: ")
        term.terminal.inputField({cancelable:true}).promise.then(result => {
          if (result == undefined) {
            saveCommand("")
          } else {
            if (result == "") {
              term.terminal("\n[starting unnamed new screen]\n")
              saveCommand("screen")
            } else {
              term.terminal("\n[starting new screen named " + result + "]\n")
              saveCommand("screen -S " + result)
            }
          }
          exit()
        })
      } else {
        result = result.split("\t")[0]
        term.terminal("\n[attaching to " + result + "]\n")
        let command = "screen -A -r -x " + result
        saveCommand(command)
        exit()
      }
    }
  })
}