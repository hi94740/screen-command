#!/bin/bash
path=$(dirname $(readlink -f $0))
node ${path}'/screen.js'
/tmp/screen-command.sh