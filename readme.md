# screen-command

Let you choose screen session to attach to just by using arrow keys to select from a list in terminal. 

## Install

```bash
$ npm i -g screen-command
```

## Usage

Just use the following command: 

```bash
$ sc
```

and then use arrow keys to navigate up and down, press enter to select a screen. 

You can also choose "+ Start a new screen..." and enter a name to start a named screen, or just press enter again to start an unnamed screen. 

## Compatibility

This package **should** work on both **macOS** and **Linux** with the latest version of Screen installed. 

Below are the tested combination of OS and Screen version: 

| OS                    | Screen Version |
| --------------------- | -------------- |
| macOS 10.15           | 4.00.03        |
| Raspbian GNU/Linux 10 | 4.06.02        |

## Note

Screen commands generated by this package are temporarily stored in `/tmp/screen-command.sh` and are replaced by new commands whenever you run this package. 
