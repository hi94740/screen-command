#!/usr/bin/env node

const term = require('terminal-kit').terminal
const shell = require('shelljs')
const fs = require('fs')
const AutoComplete = require("./autocomplete-fixed")

const exit = _ => term.processExit()

var ls = shell.exec("screen -ls",{silent:true}).split("\n").map(l => l.trim())
while(!(ls.pop().split(" ")[1] + "").startsWith("Socket")) {}
ls.shift()
ls = ls.map(l => {
  return {
    name:l,
    message:" > " + l
  }
})
ls.unshift(" + Start a new screen...")

function saveCommand(c) {
  fs.writeFileSync("/tmp/screen-command.sh",c,{mode:0777})
  exit()
}

function err(e) {
  console.error(e)
  exit()
}


fs.writeFileSync("/tmp/screen-command.sh","",{mode:0777})
term.blue("\nThere are ").green((ls.length - 1) + "").blue(ls.length > 2 ? " running screens: \n":" running screen: \n")
const seletcted = result => {
  if (result == " + Start a new screen...") {
    term.blue("\nEnter a name for new screen: ")
    term.inputField({cancelable:true}).promise.then(result => {
      if (result == undefined) {
        saveCommand("")
      } else {
        if (result == "") {
          term("\n[starting unnamed new screen]\n")
          saveCommand("screen")
        } else {
          term("\n[starting new screen named " + result + "]\n")
          saveCommand("screen -S " + result)
        }
      }
    }).catch(err)
  } else {
    result = result.split("\t")[0]
    term("\n[attaching to " + result + "]\n")
    let command = "screen -A -r -x " + result
    saveCommand(command)
  }
}


function loadMenu(message,suggest) {
  new AutoComplete({
    name:"menu",
    message:message,
    choices:ls,
    suggest:suggest
  }).run().then(seletcted).catch(err)
}

function fuzzySelect() {
  const Fuse = require("fuse.js")
  const fuseOptions = {
    shouldSort: true,
    includeMatches: true,
    tokenize: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["message"]
  }
  loadMenu("type to filter",(input,list) => {
    if (input == "") return list
    let fuse = new Fuse(list, fuseOptions)
    return fuse.search(input).map(r => {
      let r1 = r.item
      r1.highlightIndices = r.matches[0].indices
      return r1
    })
  })
}

fuzzySelect()