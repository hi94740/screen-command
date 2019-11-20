# screen-command

Let you choose screen session to attach to by using arrow keys to select from a list in terminal. 

## Install

`$ npm i -g screen-command`

## Usage

Just use the following command: 

`$ sc`

and then use arrow keys to navigate up and down, hit enter to select a screen. 

You can also choose "+ Start a new screen..." and enter a name to start a named screen, or just hit enter again to start an unnamed screen. 

## Note

Screen commands generated by this package are temporarily stored in `/tmp/screen-command.sh` and are replaced by new commands whenever you run this package. 
