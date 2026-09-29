---
title: OSX Cheatsheet
summary: The handful of terminal commands for keeping a Mac updated, installing App Store apps and starting a Time Machine backup.
tldr:
  - "Install every pending macOS update from the terminal with softwareupdate."
  - "Install and upgrade App Store apps with mas."
  - "Start a Time Machine backup on demand with tmutil."
tags: [osx, cheatsheet]
authors: [marcel]
date: 2020-12-24
---

## OSX Update

```shell
sudo softwareupdate -i -a
```

## AppStore Install & Update

```shell
mas install "1295203466" # Remote Desktop Client
mas upgrade
```

## TimeMachine

```shell
tmutil startbackup
```
