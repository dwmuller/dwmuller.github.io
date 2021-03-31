---
tags: tools
title: Notes on Node.js
layout: note.html
---
# {{ title }}

## Installing on Ubuntu/Debian

As of March 2021, the official apt package for Ubuntu 20.4 was way out of date. This article discusses several options for installing it:
- [How To Install Node.js on Ubuntu 20.4](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)

I used option 3, installing NVM to manage multiple versions of Node.js, since I anticipate working on multiple projects from various sources that are not all on the same version. Specifically, since nvm is a shell script available as a GitHub project, I included it as a submodule in [my dotfiles](https://github.com/dwmuller/dotfiles) project. This makes NVM readily available to me in all my development environments.

Once you have NVM, you can investigate available versions of Node.js using the ls-remote and version-remote commands. E.g. to see the latest long-term support version:
```
nvm version-remote --lts
```
or to see all LTS versions:
```
nvm ls-remote --lts
```

See nvm's help for more. Installing multiple versions, and choosing the active version, are all easy. Works on Windows in Git Bash, although you may need to enable [Symbolic links on Windows](symbolic-links-on-windows).