---
tags: techniques
title: Managing SSH Keys
layout: note.html
---
# {{ title }}

SSH and tools which can use it, particularly Git, are much more pleasant and secure if you can 
arrange to use SSH keys rather than passwords. You can find lots of articles on how to do various parts of this. Here I describe my overall approach, and the setup details that make it work.

I've changed my approach to this task. You can read about my previous preferences and setup below under "Old Approach", where I equated an SSH key with personal identity or role. For security and auditability, I've decided that it's preferable to generate an SSH key per client system and keep the private key forever local on that system. This means that I have to live with the inconvenience of installing the public key for each client on each target system. Since I work with only a few target systems, this should be tractable. If the need arises, I will assign a certificate per device and per role (e.g. work/personal).

Initial setup is much easier with this approach. Each device and each VM is treated as a distinct system with its own SSH key(s). No ssh-agent is needed.

To create a key on a client, using ECDSA:

````
ssh-keygen -t ecdsa -C *identifier*
````

For the identifier in the comment, I generally use the default (*username*@*hostname*), but for WSL I'll use *username*@*distro*@*windows-hostname*, just to keep things sorted out.

The choice of key type is complicated, but the differences are probably insignificant for most users, as long as the key is of adequate strength (determined by type and length). There are some concerns about a possible U.S. government backdoor in ECDSA, and ED25519 may be too new for some systems to support.

## Configuring OpenSSH ssh-agent

In case an ssh-agent *is* needed, current versions of Windows come with a version of OpenSSH pre-installed, and this works well enough once configured correctly. There are many articles on how to do this. In broad strokes:
- Make sure that the OpenSSH Authentication Agent service is running. Maybe set it to start automatically, delayed.
- Make sure that SSH_AUTH_SOCK is set to "//./pipe/openssh-ssh-agent" globally.

For some reason when I first tried this, the environment variable was set to an incorrect value, possibly by an installation package. (Maybe Git?)

## Installing/configuring Git for Windows to use ssh-agent

There are few ways to make Git for Windows work with OpenSSH. If you're installing it with Chocolatey, the easiest way is to provide the package parameter /NoOpenSSH to prevent it from installing its own version. (I also like the /GitAndUnixToolsOnPath parameter.)

An alternative is to use the OpenSSH version included with Git for Windows instead of Windows' pre-installed version, but at present that's not compatible with at least one program I'm using (KeePassXC).

## Old Approach
I like to avoid generating unique keys for every context.
But I do like to have a distinct SSH certificate for each role that I play, so I typically have one for 
work and one for my private projects. 

I also dislike copying key files from place to place. There are two steps to avoiding that:
1. Use an SSH agent to serve the keys, instead of letting SSH get them from disk.
2. Arrange for that SSH agent to draw from a common source in all your environments.

An SSH agent provides a socket that SSH will talk to. Simply setting the environment variable ``SSH_AUTH_SOCK`` to point to this socket causes SSH clients to try using it. If they fail to get an SSH key for the connection they're trying to establish, they usually fall back to password prompting.

The default ``ssh-agent`` available on most Linux systems reads the keys from files. But I solve the challenge using [KeePass](https://keepass.info/), and the [KeeAgent](https://lechnology.com/software/keeagent/) plugin. Because I already have KeePass set up in a way that lets me share its data file across all the system I use, this avoids distributing copies of additional files. You can read more about this setup, and other tricks & features of KeePass on [my page about how I use it](/notes/keepass-password-vault/).

KeeAgent itself is easy to use, so I won't go into details here. Configuring your environments to use it, and matching those needs with KeeAgent's configuration, is a bit complex. Following are details that worked for me on Windows 10. Corrections or updates to this information is welcome!

Once set up, this works reliably and seamlessly.

### Git for Windows' SSH
Tested on version 2.30.2.
Turn on KeeAgent's Cygwin compatible socket, and set ``SSH_AUTH_SOCK=``*path-to-your-socket*.

### OpenSSH on Windows
Tested on version 8.4.2.1, installed by Chocolatey as package mls-software-openss.

Note that the built-in OpenSSH software in Windows 10 is badly out of date, and I couldn't get it to work with KeeAgent.

Turn on KeeAgent's Cygwin compatible socket, and set ``SSH_AUTH_SOCK=``*path-to-your-socket*.

### SSH in WSL2

Tested on Windows 10 Pro, version 20H2, OS build 19042.870.

Turn on KeeAgent's experimental "Windows OpenSSH" feature. This listens on a socket that is supposedly compatible with Microsoft's conventions for OpenSSH. You then need software that runs in WSL2 to pipe requests to that socket. This is done using a combination of socal (which you may have to install first using your package manager) and npiperelay.

See [this how-to article](https://gist.github.com/strarsis/e533f4bca5ae158481bbe53185848d49) for details.

Based on that information, I have things working pretty trouble-free in my environments. I created [a Bash script](https://github.com/dwmuller/dotfiles/blob/main/bin/wsl/wsl-ssh-agent) that can help manage the process that does the forwarding in WSL2.

### Making It Easy

I have some shell code that gets run on each login in all of the environments I mentioned here, which sets up ``SSH_AUTH_SOCK`` appropriately. Look for the mentions of ``SSH_AUTH_SOCK`` in [this file](https://github.com/dwmuller/dotfiles/blob/main/shell/external.sh), which gets sourced by my .bashrc script.

You may also want to consider using [Dotbot](https://github.com/anishathalye/dotbot) to manage your dotfiles for all your Linux-like work environments, like my [dotfiles](https://github.com/dwmuller/dotfiles/) does.

Here's an example of what the KeeAgent configuration should look like:

![KeeAgent settings](/assets/keeagent-settings.png)

### Miscellany

I tried, and failed, to get the "official" Microsoft ``win32-openssh`` chocolatey package to work with KeeAgent. This may have been my fault, I don't know.

I described above how to get this to work with WSL2. If you use WSL1, a different solution, which I have not tested, is required. See [wsl-ssh-agent](https://github.com/rupor-github/wsl-ssh-agent).
