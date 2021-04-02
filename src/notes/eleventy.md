---
tags: 
    - tools
    - site-tools
title: Eleventy (11ty) Static Site Generator
layout: note.html
---
# {{ title }}

This site is built using [Eleventy](https://www.11ty.dev/). I chose it 
because it uses javascript, which I want to learn better, and it takes
a minimalist approach, allowing me to start with a very simple site setup.

The main things to know:
- All input files are referred to as "templates" in the docs ...
- ... because by default they are processed by the ``liquid`` templating engine.

## Daily usage

I do my Node work in a WSL2 VM. I open a shell, cd to my local clone of this site, and run ``code .`` to start a 
Visual Studio Code instance. Then, in that same shell, I run ``npx @11ty/eleventy --serve`` and leave that running.

Now I can point my browser (on Windows, usually) at http://localhost:8080 to view the local version of the site. As I save edited and added files, the site updates automatically, I just have to refresh pages in the browser. 

Occasionally, check stuff in, then git push to update the public site. GitHub Actions automatically process the changes.

Build the static site from sources, by default the output goes to _site.
```
npx @11ty/eleventy
```

To serve the project up locally, in a way that will automatically update as you modify the source files:
```
npx @11ty/eleventy --serve
```

(``npx`` is (nearly) an alias for ```npm exec```.)

## Installation

You need Node.js. See (my notes)[nodejs] on installing it.

Install npm. 
```
npm install -g npm
```

If you're working on an existing eleventy project, clone it to a local repo and cd into it. Run ``npm install`` to install all the project's dependencies. You're done.

If you are setting up a new project, create a new repo, cd into it, and initialize it as a Node.js project:
```
npm init -y
```

Install Eleventy in this project, as a tool that's needed only for development (not production):
```
npm install --save-dev @11ty/eleventy
```

Add a .gitignore file. You can find templates online for Node.js projects. Or if you created the repo on GitHub, you can add a .gitignore file in GitHub's Web interface, and it will offer templates you can choose from. In any case, add a  line containing ``sites/`` to .gitignore so that eleventy's outputs don't get checked in. 

Now refer to the Daily usage section above.

## See also
- [Publishing GitHub Pages](../publish-github-pages/)

## References

- [Eleventy](https://www.11ty.dev/)
- [Eleventy Tutorial Level 1](https://www.zachleat.com/web/eleventy-tutorial-level-1/) and [Level 2](https://www.zachleat.com/web/eleventy-tutorial-level-2/): A gentle intro.
- [Eleventy Walkthrough](https://rphunt.github.io/eleventy-walkthrough/)
- [Nunjucks](https://mozilla.github.io/nunjucks/): Another templating language, implemented in JavaScript. Seems to be a popular alternative to Eleventy's default, Liquid.
- [Inline PostCSS generated with Eleventy](https://jouni.kantola.se/blog/2020-03-15/inline-postcss-generated-css-with-11ty/) - Interesting technique.

