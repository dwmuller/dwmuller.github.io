---
tags: techniques
title: Managing SSH Keys
layout: note.html
---
# {{ title }}

SSH and tools which depend can use it, particularly Git, are much more pleasant and secure to use if you can 
arrange to use SSH keys rather than passwords. You can find lots of articles on how to do various parts of
this. Here I describe my overall approach, and the setup details that make it work.

I like to avoid generating unique keys for every context.
But I do like to have a distinct SSH certificate for each role that I play, so I typically have one for 
work and one for my private projects. 

I also dislike copying key files from place to place. There are two steps to avoiding that:
1. Use an SSH agent to serve the keys, instead of letting SSH get them from disk.
2. Arrange for that SSH agent to draw from a common source in all your environments.

An SSH agent provides a socket that SSH will talk to. Simply setting the environment variable ``SSH_AUTH_SOCK`` to point to this socket causes SSH clients to try using it. If they fail to get an SSH key for the connection they're trying to establish, they usually fall back to password prompting.

The default ``ssh-agent`` available on most Linux systems reads the keys from files. But I solve the challenge using [KeePass](https://keepass.info/), and the [KeeAgent](https://lechnology.com/software/keeagent/) plugin. Because I already have KeePass set up in a way that lets me share its data file across all the system I use, this avoids copying files around. You can read more about this setup, and other tricks & features of KeePass on [my page about how I use it](/notes/keepass-password-vault/).

KeeAgent itself is easy to use, so I won't go into details here. Configuring your environments to use it, and matching those needs with KeeAgent's configuration, is a bit complex. Following are details that worked for me on Windows 10. Corrections or updates to this information is welcome!

Once set up, this works reliably and seamlessly.

## Git for Windows' SSH
Tested on version 2.30.2.
Turn on KeeAgent's Cygwin compatible socket, and set ``SSH_AUTH_SOCK=``*path-to-your-socket*.

## OpenSSH on Windows
Tested on version 8.4.2.1, installed by Chocolatey as package mls-software-openss.

Note that the built-in OpenSSH software in Windows 10 is badly out of date, and I couldn't get it to work with KeeAgent.

Turn on KeeAgent's Cygwin compatible socket, and set ``SSH_AUTH_SOCK=``*path-to-your-socket*.

## SSH in WSL2

Turn on KeeAgent's experimental "Windows OpenSSH" feature. This listens on a socket that is supposedly compatible with Microsoft's conventions for OpenSSH. You then need software that runs in WSL2 to pipe requests to that socket. This is done using a combination of socal (which you may have to install first using your package manager) and npiprelay.

See [this how-to article](https://gist.github.com/strarsis/e533f4bca5ae158481bbe53185848d49) for details.

Based on that information, I have things working pretty trouble-free in my environments. I created [a Bash script](https://github.com/dwmuller/dotfiles/blob/main/bin/wsl/wsl-ssh-agent) that can help manage the process in WSL2 that does the forwarding.

## Making It Easy

I have some shell code that gets run on each login in all of the environments I mentioned here, which sets up SSH_AUTH_SOCK appropriately. [This file](https://github.com/dwmuller/dotfiles/blob/main/shell/external.sh) gets sourced by my .bashrc script.

Here's an example of what the KeeAgent configuration should look like:

![KeeAgent settings](/assets/keeagent-settings.png)

