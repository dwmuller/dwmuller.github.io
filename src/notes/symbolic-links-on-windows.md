---
tags: winconfig
title: Symbolic Links on Windows
---
# {{ title }}
The lack of symbolic links on Windows has been a thorn in the side of every Unix-savvy developer for decades. When similar functionality did finally appear, it was in limited forms. This is finally fixed in Windows 10, but you have to change some settings to get it to work. Do this only on machines you use for development; it is not recommended on other machines. (I'm not sure why that is, but it may have to do with behaviors other than the symlinks.)

The quick version:

Find the Developer Settings dialog. In there:
- Turn on Developer Mode.
- (optional) Apply the File Explorer settings that you want.
- (optional) Apply the Remote Desktop settings that you want.
- (optional) Apply the PowerShell settings that you want.

If you use Git for Windows, edit C:\ProgramData\Git\config and change [core] symlinks to true.

Turning on Developer Mode is really all that's needed to get symlinks working. The ``mklink`` command will now let non-admins create links.

Additionally, if you are using MinGW or MSYS tools (usually MSYS, via Git for Windows), make sure that the MSYS environment variable includes ``winsymlinks:nativestrict``. The same applies to the CYGWIN environment variable if you use Cygwin.

## References

- [Symlinks in Windows 10](https://blogs.windows.com/windowsdeveloper/2016/12/02/symlinks-windows-10/)
    - Includes info on enabling the CreateSymbolicLink Windows API function.
- [Symlinks in Windows, MinGW, Git and Cygwin](https://www.joshkel.com/2018/01/18/symlinks-in-windows/) - Recommended!
- [My dotfile](https://github.com/dwmuller/dotfiles/blob/main/shell/external.sh), which sets winsymlinks.
