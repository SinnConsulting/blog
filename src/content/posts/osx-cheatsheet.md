---
title: macOS Terminal Cheatsheet
summary: Terminal commands to install macOS updates, install and update App Store apps with mas, and start a Time Machine backup.
tldr:
  - "sudo softwareupdate --install --all installs every applicable macOS update; add --restart to reboot when an update needs it."
  - "mas installs and updates App Store apps from the terminal, but it cannot buy paid apps and needs you signed in to the App Store."
  - "tmutil startbackup starts a Time Machine backup now; --block waits until it has finished."
tags: [osx, cheatsheet]
authors: [marcel, claude]
date: 2020-12-24
updated: 2026-09-30
audience: Mac users who are comfortable in Terminal and want to script routine maintenance.
---

Clicking through System Settings, the App Store and Time Machine is slow when you just want everything
up to date and backed up. These commands do the same from Terminal, so you can run them in one go or
put them in a script.

## Install macOS updates

```sh
softwareupdate --list
sudo softwareupdate --install --all
sudo softwareupdate --install --all --restart
```

`--list` shows what is available. `--install --all` (short: `-i -a`) installs every update that applies
to your Mac, including ones Apple doesn't mark as recommended. `--restart` (`-R`) restarts
automatically when an update needs it; if you are logged in, macOS first tries to quit your apps and
log you out. Every command except `--list` needs administrator rights.

## Install and update App Store apps with mas

[mas](https://github.com/mas-cli/mas) is a command-line client for the Mac App Store. Install it with
Homebrew:

```sh
brew install mas
```

```sh
mas search "remote desktop"   # find an app's ID
mas get <id>                  # get a free app
mas install <id>              # install an app you already got or bought
mas outdated                  # list apps with pending updates
mas upgrade                   # update them (alias of mas update)
```

The catches, from the mas README:

- You must be signed in to the App Store with your Apple Account.
- mas cannot buy paid apps. Buy them in the App Store first, then `mas install` works.
- `get`, `install` and `update` need root privileges.
- It supports macOS 13 and later.

## Start a Time Machine backup

```sh
tmutil startbackup
tmutil startbackup --block
tmutil status
tmutil listbackups
```

`startbackup` starts a backup if none is running and returns right away. With `--block` (`-b`) it waits
until the backup has finished, which is useful at the end of a script. `status` shows the running
backup's progress, and `listbackups` prints the path of every backup, newest last.

## One maintenance run

```sh
sudo softwareupdate --install --all
mas upgrade
tmutil startbackup --block
```

Run these three before you travel or hand in a machine: system and apps updated, then a backup that
has finished before you close the lid.
