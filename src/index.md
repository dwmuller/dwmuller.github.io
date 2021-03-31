---
tags: meta
title: Muller's Memoranda
layout: base.html
---
# {{ title }}

This is my public scratchpad. I save notes here mainly for my own reference. Most of them are about details of software development tools and techniques.

I've been programming since the early nineteen-eighties, and the scale of information that a developer has to have at his or her fingertips has continued to grow that whole time. So, I try to make a habit of recording notes for myself. Searching the web is all fine and dandy, but it takes time to track down the most relevant information and filter out the outdated stuff. You might come across some of my notes and find them useful as well, but of course _they_ eventually become outdated, too. Caveat lector.

Occasionally I'll put real work into an article, especially if I found the topic difficult to research or summarize. I often provide references to my most significant sources.

There's not much here at the moment, but I'm still migrating notes from other locations. There's more [to do](TODO).

## Site Tools
Notes relevant to building and maintaining this site.
- [The GitHub repository for this site](https://github.com/dwmuller/dwmuller.github.io)
{%- for post in collections.site-tools %}
- [{{ post.data.title|urlencode }}]({{ post.url }})
{%- endfor %}

## Tools
{%- for post in collections.tools %}
- [{{ post.data.title|urlencode  }}]({{ post.url }})
{%- endfor %}

## Techniques
{%- for post in collections.techniques %}
- [{{ post.data.title|urlencode  }}]({{ post.url }})
{%- endfor %}

## Windows Configuration
{%- for post in collections.winconfig %}
- [{{ post.data.title|urlencode }}]({{ post.url }})
{%- endfor %}

## Misc

- [LICENSE](LICENSE)
- [README](README)
