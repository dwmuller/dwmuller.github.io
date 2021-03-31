---
tags: 
    - winconfig
    - wsl
title: X Window with WSL2
---
# {{ title }}

This was actually pretty straightforward:
- Install VcXsrv on Windows. (I used ``cinst vcxsrv``.)
- Install X apps on Linux. (My first use case was OWASP ZAP.)
- Set an environment variable on Linux that references the Windows host by its IP address.

The last step is arguably the hardest. It looks like this:
```
export DISPLAY=$(/sbin/ip route | awk '/default/ { print $3 }'):0
```
For more information about that, see [WSL2 Networking](wsl2-networking).

Run VcXsrv, choose no startup program. You get the most seamless experience by choosing multiple windows. Now just run the X clients on Linux from a shell window, and they should display on your Windows desktop.

## References

- [VcXsrv & Win10](https://sourceforge.net/p/vcxsrv/wiki/VcXsrv%20%26%20Win10/)


