---
tags:
    - winconfig
    - wsl
title: WSL2 Networking 
layout: note.html
---
# {{ title }}

WSL2 uses Hyper-V networking. There's a virtual network connected to a virtual interface
on the Windows host, and to a virtual interface on the WSL2 virtual machine, each with 
their own distinct IPV4 address drawn from the 172.16.0.0/12 private IPV4 address space.
The Windows interfaces is the VM's default route for outbound traffic. 
Unfortunately, these addresses change on restarts.

If a process running in WSL2 listens to a localhost port, then clients running on the
Windows host can also connect to that port via localhost. (I'm not sure how that's effected,
but I imagine that a better understanding of Hyper-V networking would reveal that.)

For example, this command in the WSL2 VM starts a simple file-serving HTTP server listening on localhost port 8000:
```
python3 -m http.server
```

If you point a browser running on Windows at http://localhost:8000, you can verify that this works.

Connecting in the other direction, from a WSL2 client to a Windows service, is a little more complicated. 
You need the virtual address of the Windows virtual interface, which is not provided explicitly anywhere that I know of. The
easiest, most reliable way I've seen of getting it is to get the default route from ``ip route``. This Bash statement
captures it by searching for the default route in the output of ``ip``:

```
export WSL2_HOST_IP="$(/sbin/ip route | awk '/^default/ { print $3 }')"
```

To test communication in that direction, run the python server on Windows, and try to connect to it from WSL2. This will likely fail, because the Windows Python installation creates explicit Block rules in the firewall to prevent connection from Public networks. The only workaround I know is to disable these rules, which is unfortunate. Similar rules often exist for Java (which is relevant if you want to run ZAP, a Java app, on Windows and proxy Linux process through it).

If you have problems, try temporarily disabling the firewall. If that works, then look for a specific Block rule that is applicable. While examining rules, note that the virtual network is considered by Windows to be a _Public_ network! This is very surprising, and I've found no way to change that. This makes it harder to craft safe firewall rules involving that network.

Making a port on the WSL2 VM accessible to other computers on the local network [might be a bit more involved](https://docs.microsoft.com/en-us/windows/wsl/compare-versions#accessing-a-wsl-2-distribution-from-your-local-area-network-lan).

## Routing through host VPN

If the host is routing through a VPN, networking from a WSL2 VM will fail. Various fixes are discussed online. Here's what worked for me, using NordVPN on the Windows host.

Add or edit the file /etc/wsl.conf in the WSL2 VM's file system. You need a command in the ``[boot]`` section that changes the MTU of the virtual network interface. You'll need to restart the VM after first doing this. Example content:
```
[boot]
# Fix problem with routing through host's VPN. This works for NordVPN in particular.
command="ip link set dev eth0 mtu 1400"```
```
