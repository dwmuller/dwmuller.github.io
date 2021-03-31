---
tags:
    - dotnet
    - tools
title: .NET Core
---
# {{ title }}

## Installation

To install .NET Core and its tools in any Linux environment, including WSL 2, search for specific information for your distro [in this lengthy Microsoft article](https://docs.microsoft.com/en-us/dotnet/core/install/). E.g. the instructions for Ubuntu 10.04 (and above?) are [here](https://docs.microsoft.com/en-us/dotnet/core/install/linux-ubuntu#2004-). They add a Microsoft package repository to apt, after which you can easily install the dotnet components of interest. I installed dotnet-sdk-5.0 explicitly.

On Windows, just run ``choco install dotnet-sdk``.
